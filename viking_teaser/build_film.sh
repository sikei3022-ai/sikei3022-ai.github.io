#!/usr/bin/env bash
# Vikings: Rollo (cut v3) — download Higgsfield clips + audio and assemble the teaser.
# Builds BOTH voiceover versions (RU + EN) in one run.
# Requires: bash, curl, ffmpeg (with libx264, drawtext/freetype). Needs network access
# to host d8j0ntlcm91z4.cloudfront.net (if sandboxed, add it to the egress allowlist first).
#
# All 17 timeline URLs are filled. Shot 15 ("7 DAYS LATER" card, job 633847ff) never
# finished rendering on Higgsfield, so it is drawn locally with ffmpeg (no network needed).
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3F5Banjnf4nEee92ijSAsD8BLH7"
WORK="$(pwd)/viking_build_v3"; mkdir -p "$WORK"; cd "$WORK"

# ---- 17 shots in timeline order. Slot 15 is rendered locally (see LOCAL_CARD). ----
URLS=(
  "$BASE/hf_20260616_153039_47504000-ad6d-439a-be5f-94546547911b.mp4"   # 1  title VIKINGS/ROLLO + raven
  "$BASE/hf_20260616_140624_eecb5c90-024c-4df2-9eeb-a6b456f3d2c1.mp4"    # 2  793 A.D. NORTHUMBRIA card
  "$BASE/hf_20260616_140635_411513d0-332a-4100-ac2d-577c7c854f59.mp4"    # 3  drakkar reveal
  "$BASE/hf_20260616_140645_bd21d009-489a-47eb-83e9-e8d2ffe6671d.mp4"    # 4  THREE DAYS LATER card
  "$BASE/hf_20260616_140651_df3897ae-98f9-4556-8079-782d28c2ef4c.mp4"    # 5  fleet aerial
  "$BASE/hf_20260616_140700_173384e5-1957-4c0f-ace8-84ea38f7751d.mp4"    # 6  landing
  "$BASE/hf_20260616_153049_63e699e4-bb23-4c7a-a62c-6bb0bbd62f1a.mp4"    # 7  charge
  "$BASE/hf_20260616_153118_2fbc8716-2b52-4bf2-b953-28e5bf3ccf12.mp4"    # 8  shield walls collide
  "$BASE/hf_20260616_153058_e5491bb3-baa5-482e-a2c2-e801d1a76506.mp4"    # 9  main battle melee
  "$BASE/hf_20260616_153107_f4b71644-e703-4074-a2c0-c751a24f08f7.mp4"    # 10 helmet split close-up
  "$BASE/hf_20260616_153128_bd62901e-cc40-41a3-bdf7-783acfe63119.mp4"    # 11 duel champion
  "$BASE/hf_20260616_145024_0d4fe9fa-a6b1-4371-b70a-aa0dd12d7288.mp4"    # 12 aerial over fallen
  "$BASE/hf_20260616_142443_a0c3216f-b50d-445d-8017-42768a027e43.mp4"    # 13 aftermath sits
  "$BASE/hf_20260616_145039_dfed105c-fbc8-4e90-bddc-405c0f22bbca.mp4"    # 14 throws cloak / hailed
  "LOCAL_CARD"                                                           # 15 "7 DAYS LATER" (drawn locally)
  "$BASE/hf_20260616_163734_4f533efd-3b76-4d32-b118-68e1d7900c76.mp4"    # 16 London hilltop
  "$BASE/hf_20260616_163743_ba2cff4c-9ecd-4d11-a39b-2f6201a63b43.mp4"    # 17 teaser legions + text
)
N=${#URLS[@]}
CARD15_TEXT="7 DAYS LATER"
CARD15_DUR=6

# ---- Audio: 110s primary score, 78s fallback; narration RU + EN. ----
MUSIC_URL="$BASE/hf_20260616_163752_18bb928a-a1ff-4897-a97a-8012cac7ee28.m4a"   # 110s score
MUSIC_FALLBACK="$BASE/hf_20260616_143001_701a2284-23db-4444-9ea3-dd3d1d5a5808.m4a"  # 78s score
NARR_RU="$BASE/hf_20260616_145542_cdfdb9e3-9781-4f87-8d98-f82d98cdd563.wav"  # Nikolai (deep)
NARR_EN="$BASE/hf_20260616_145551_38e49fec-209b-41a8-a706-e8a414ddff45.wav"  # Hades (deep)

dl() { curl -fSL --retry 4 --retry-delay 2 --retry-all-errors -o "$1" "$2"; }

# Make sure ffmpeg + ffprobe exist. Prefer system, then apt, then a pip static build
# (downloads static binaries from github.com, which is allowed even on dev egress policies).
ensure_ffmpeg() {
  if command -v ffmpeg >/dev/null 2>&1 && command -v ffprobe >/dev/null 2>&1; then return; fi
  echo ">> ffmpeg not found, bootstrapping..."
  if command -v apt-get >/dev/null 2>&1 && apt-get update -y >/dev/null 2>&1 \
     && apt-get install -y ffmpeg >/dev/null 2>&1 \
     && command -v ffmpeg >/dev/null 2>&1; then return; fi
  (python3 -m pip install --quiet static-ffmpeg || pip install --quiet static-ffmpeg)
  local bindir
  bindir="$(python3 -c 'import os,shutil,static_ffmpeg;static_ffmpeg.add_paths();print(os.path.dirname(shutil.which("ffmpeg")))')"
  export PATH="$bindir:$PATH"
  command -v ffmpeg >/dev/null 2>&1 || { echo "ERROR: could not provision ffmpeg."; exit 1; }
}
ensure_ffmpeg

# Pick a usable bold font for the local title card.
FONT=""
for f in \
  /usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf \
  /usr/share/fonts/truetype/freefont/FreeSansBold.ttf \
  /System/Library/Fonts/Supplemental/Arial\ Bold.ttf \
  /Library/Fonts/Arial.ttf \
  /System/Library/Fonts/Helvetica.ttc ; do
  [ -f "$f" ] && FONT="$f" && break
done

echo ">> Downloading clips..."
i=1
for u in "${URLS[@]}"; do
  o=$(printf "%02d.mp4" "$i")
  if [ "$u" = "LOCAL_CARD" ]; then
    echo "   $o (local card: '$CARD15_TEXT')"
    if [ -n "$FONT" ]; then DT="drawtext=fontfile=$FONT"; else DT="drawtext=font=Sans"; fi
    ffmpeg -y -f lavfi -i "color=c=black:s=1920x1080:r=24:d=${CARD15_DUR}" \
      -vf "${DT}:text='${CARD15_TEXT}':fontcolor=white:fontsize=96:x=(w-text_w)/2:y=(h-text_h)/2,fade=t=in:st=0:d=0.5,fade=t=out:st=$((CARD15_DUR-1)):d=1,format=yuv420p" \
      -an -c:v libx264 -preset medium -crf 18 -t "${CARD15_DUR}" "$o"
  else
    echo "   $o"
    dl "$o" "$u"
  fi
  i=$((i+1))
done

echo ">> Downloading music..."
if ! dl music_in "$MUSIC_URL"; then
  echo "   primary 110s score failed, using 78s fallback."
  dl music_in "$MUSIC_FALLBACK"
fi
echo ">> Downloading narration (RU + EN)..."
dl narr_ru.wav "$NARR_RU"
dl narr_en.wav "$NARR_EN"

echo ">> Normalizing clips to 1920x1080 / 24fps, stripping native audio..."
for n in $(seq -w 1 "$N"); do
  ffmpeg -y -i "$n.mp4" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=24,format=yuv420p" \
    -an -c:v libx264 -preset medium -crf 18 "norm_$n.mp4"
done

echo ">> Concatenating (hard cuts)..."
: > concat.txt
for n in $(seq -w 1 "$N"); do echo "file 'norm_$n.mp4'" >> concat.txt; done
ffmpeg -y -f concat -safe 0 -i concat.txt -c copy silent.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 silent.mp4)
FO=$(awk "BEGIN{printf \"%.2f\", $DUR-2}")

# Mix: music under (40%, fade in/out) + narration on top (100%).
mix_vo() {  # $1 = narration wav, $2 = output file
  local narr="$1" out="$2"
  echo ">> Mixing music + narration -> $out"
  ffmpeg -y -i silent.mp4 -i music_in -i "$narr" -filter_complex \
    "[1:a]volume=0.40,afade=t=in:st=0:d=1,afade=t=out:st=${FO}:d=2[m];[2:a]volume=1.0[v];[m][v]amix=inputs=2:duration=first:dropout_transition=0[a]" \
    -map 0:v -map "[a]" -shortest -c:v copy -c:a aac -b:a 192k "$out"
}

mix_vo narr_ru.wav "Vikings_Rollo_v3_vo_ru.mp4"
mix_vo narr_en.wav "Vikings_Rollo_v3_vo_en.mp4"

echo ">> DONE"
echo "   $WORK/Vikings_Rollo_v3_vo_ru.mp4"
echo "   $WORK/Vikings_Rollo_v3_vo_en.mp4"
