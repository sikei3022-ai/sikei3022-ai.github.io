#!/data/data/com.termux/files/usr/bin/bash
# Termux one-shot builder for the Vikings: Rollo teaser.
# Installs deps if missing, runs build_film.sh, and copies the finished mp4s to
# your phone's shared storage (Movies/Vikings_Rollo) so they show up in the gallery.
#
# Usage in Termux:
#   bash build_termux.sh
set -euo pipefail

echo ">> Ensuring dependencies (git, ffmpeg, curl)..."
need=""
for b in git ffmpeg ffprobe curl awk; do command -v "$b" >/dev/null 2>&1 || need="yes"; done
if [ -n "$need" ]; then
  pkg update -y || true
  pkg install -y git ffmpeg curl coreutils
fi

HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

echo ">> Building (this downloads ~17 clips at 1080p — a few hundred MB)..."
bash build_film.sh

OUTDIR="$HERE/viking_build_v3"
echo ">> Outputs in: $OUTDIR"
ls -lh "$OUTDIR"/Vikings_Rollo_v3_*.mp4 2>/dev/null || true

# Copy to shared storage if available (run 'termux-setup-storage' once to grant access).
if [ -d "$HOME/storage/shared" ]; then
  DEST="$HOME/storage/shared/Movies/Vikings_Rollo"
  mkdir -p "$DEST"
  cp -f "$OUTDIR"/Vikings_Rollo_v3_*.mp4 "$DEST"/ 2>/dev/null || true
  echo ">> Copied final mp4s to: $DEST (check your gallery / Movies folder)"
else
  echo ">> Tip: run 'termux-setup-storage' once, then re-run to auto-copy into your gallery."
fi
echo ">> DONE."
