# HANDOFF — Vikings: Rollo teaser + NEW palace opening scene

Read this fully before acting. It is written for a fresh Claude Code session that will
finish the job once the environment has proper network + an ElevenLabs key.

## 0. Mission
Two deliverables, in one final teaser:
1. **Existing teaser** "Vikings: Rollo (cut v3)" — 17 shots, ~109 s, with voiceover (RU + EN).
   Build is already scripted and ready: see `viking_teaser/build_film.sh` (+ `clips.json`, `README.md`).
2. **NEW opening scene** the user requested: a **palace dialogue** that the teaser must START with —
   Rollo (Роллон) confronts King Alfred (Альфред) and Prince Edward (Эдвард) in the throne room,
   with **cloned voices** (ElevenLabs) and lip-sync, then it cuts into the existing teaser.

Final output: `Vikings_Rollo_v3_vo_ru.mp4` and `..._en.mp4`, now with the palace scene prepended.

## 1. ENVIRONMENT REQUIREMENTS (critical — this is why the previous session was blocked)
The previous session ran on the default **Trusted** network policy. Verified blockers there:
- `d8j0ntlcm91z4.cloudfront.net` (Higgsfield CDN, where all clips/audio live) → **403 host_not_allowed**
  → cannot download source media for ffmpeg/Remotion.
- `upload.higgsfield.ai` (PUT presigned upload) → **403** → cannot upload local reference files.
- `api.elevenlabs.io` → **403**; no `ELEVENLABS_API_KEY` env; no ElevenLabs MCP connector → cannot clone voices.
- Only `github.com` / `pypi.org` (package registries) were reachable.

**Before continuing, the environment must have:**
- **Network access = Full** (or Custom incl. `*.cloudfront.net`, `*.higgsfield.ai`, `api.elevenlabs.io`).
- Env var **`ELEVENLABS_API_KEY`** set (Environment variables / Secrets).
- MCP connectors enabled: **Higgsfield** (required). Optional: an ElevenLabs MCP if you prefer it over the raw API.

Quick self-check at start:
```bash
curl -fsSI https://d8j0ntlcm91z4.cloudfront.net/ ; echo $?
[ -n "$ELEVENLABS_API_KEY" ] && echo "EL key present" || echo "EL key MISSING"
```

## 2. ffmpeg in this environment
ffmpeg is NOT preinstalled. `build_film.sh` self-bootstraps it (apt, else `pip install static-ffmpeg`,
which pulls a static build from github — works even on Trusted). Static build verified: libx264 + drawtext OK.

## 3. Assets that PERSIST (already in the Higgsfield library — reference by job_id, no upload needed)
**Rollo identity:**
- still portrait (image_job): `332c821c-141e-4f45-b0c6-f1209743b795`  ← best image reference
- clips: `bd62901e-cc40-41a3-bdf7-783acfe63119` (duel), `4f533efd-3b76-4d32-b118-68e1d7900c76` (hilltop)
- original storm portrait video: `5ec63b9f-4090-4140-9b57-3bd794528a4b`

**King Alfred identity** (user's recurring AI character; these are his clips):
- `c87ef6f7-625e-46be-8dde-667424d3b6c2` (used as the Alfred face ref for the keyframes)
- `42f3b756-c635-4a3b-94a8-df96ec6d48ea`
- `1f473471-89a8-4f96-908f-b803c9296379`

**Palace keyframes (WIP, nano_banana_pro, 16:9 2k):**
- `da0b285b-2651-4013-8714-616682059219`  (current — Rollo ref only)
- `cc990618-fe27-4975-b45a-d18e651f7362`  (current — Rollo ref only)
- (`0ab58132…` and `bb755ac1…` FAILED — see note below.)
Inspect with `job_display`. In these, only **Rollo's** face is ref-locked (`332c821c`); **Alfred** and
**Edward** are described-only — lock their faces at the video/lip-sync stage (Alfred via his video ref;
Edward via his photo once uploaded), or regenerate the still once you have Alfred/Edward STILL images.

**LEARNING:** `nano_banana_pro` (image model) REJECTS a **video** job_id as an image reference (the Alfred
clips are `.mp4`) → those jobs fail. To use Alfred's face in a still you need an Alfred **still image**
(extract a frame from his clip and bring it in via `media_upload_widget`/`media_import_url`, then ref it).
`wan2_7`/`seedance_2_0` DO accept a `video` role for identity, so Alfred's clips work directly at the video stage.

**Teaser clips + audio:** all resolved — see `viking_teaser/clips.json` (real CDN filenames baked in).
The "7 DAYS LATER" card (`633847ff`) never rendered on Higgsfield → `build_film.sh` draws it locally.

## 4. Assets the USER MUST RE-ATTACH next session (ephemeral — were in /root/.claude/uploads, gone in a fresh container; NOT committed for privacy)
Ask the user to re-attach at session start:
- **Voice sample — Alfred** (~62 s, m4a, mono 48k)
- **Voice sample — Rollo** (~98 s, m4a)
- **Voice sample — Edward** ("Vlad", m4a)
- **Edward headshot** (frontal studio portrait: man ~20, fair skin, light-brown hair swept back,
  grey-blue eyes). Bring it into Higgsfield via `media_upload_widget` (user-side) or `media_import_url`,
  then use as the identity ref to regenerate the keyframes' Edward + his lip-sync shots.

## 5. The opening scene — full dialogue (RU), per line
Setting: candlelit Anglo-Saxon throne room, cold cinematic grade. Tense siege parley.

1. **РОЛЛОН:** «Твой город уже мой, Альфред. Стены — это просто камни, которые ещё не упали. Открой ворота — и твои люди доживут до утра.»
2. **АЛЬФРЕД** (спокойно): «Мои люди молятся. Твои — грызут конину под дождём. Голод осаждает осаждающего, конунг. Я могу ждать. А ты?»
3. **ЭДВАРД** (сквозь зубы, отцу): «У нас хлеба на три дня. Три, отец!»
4. **АЛЬФРЕД** (не оборачиваясь): «Значит, на день дольше, чем у него терпения.»
5. **РОЛЛОН** (тихо смеётся): «Ты отказываешь мне, сидя в клетке, которую я построил вокруг тебя за одну ночь.»
6. **АЛЬФРЕД:** «Я отказываю тебе, потому что король, что сдаёт город ради лишнего рассвета, теряет оба.»
   *(Роллон кивает — почти с уважением. Идёт к выходу. У дверей оборачивается, смотрит на Альфреда в упор.)*
7. **РОЛЛОН:** «Твои стены простоят до рассвета.»
   *(Пауза. Кладёт ладонь на дверной косяк — дерево трещит.)*
8. **РОЛЛОН:** «Ты — нет.»

Identity mapping for any generation: Alfred = seated king (refs in §3); Rollo = standing Viking in
chainmail + cream/brown fur cloak (refs in §3); Edward = young prince (ref in §4).

## 6. Voice plan (ElevenLabs)
- Create/instant-clone 3 voices from the user's samples (Alfred, Rollo, Edward).
- Render each of the 8 lines with its character's cloned voice → 8 wavs (keep order/IDs).
- Russian source text from §5. Keep takes; the user may want re-rolls.

## 7. Scene build (visual + lip-sync)
- For each character, produce a clean throne-room shot (start frame) from the approved keyframe
  (crop/medium of that character) — or reuse the wide keyframe with camera framing per line.
- Lip-sync each line: model **`wan2_7`** (Higgsfield) — medias roles `start_image` + `audio`,
  1080p, 16:9, duration = the line's audio length (2–15 s). One render per line.
- Cut the scene together in line order with the action beats (Rollo turns at the door, hand on the jamb).

## 8. Final assembly
Two viable paths (user explicitly asked about **Remotion**):
- **Remotion** (node 22 present; `npx create-video`/`@remotion/cli`): nice for subtitles, title cards,
  crossfades, audio ducking. Renders via headless Chrome (downloads from googleapis — allow it) + ffmpeg.
- **ffmpeg** (`build_film.sh`) — already does normalize/concat/music-duck/VO-mix for the teaser.
Plan: build the palace scene, then **prepend** it to the teaser timeline and re-export RU + EN.
- RU export: cloned RU dialogue audio on the scene.
- EN export: simplest is **EN subtitles** over the RU dialogue scene (re-cloning EN may not match);
  confirm with user whether they want EN dialogue re-voiced or subtitled.

## 9. Suggested order of operations (next session)
1. Verify Full network + `ELEVENLABS_API_KEY` (§1). Ask user to re-attach §4 assets.
2. Bring Edward photo into Higgsfield; regenerate/confirm the 2 palace keyframes with all 3 correct faces.
3. Clone 3 voices, render the 8 dialogue lines (§5/§6).
4. Lip-sync each line with `wan2_7` (§7); assemble the palace scene.
5. Run `viking_teaser/build_film.sh` for the teaser body; prepend the palace scene; export RU + EN.
6. Deliver both MP4s to the user (SendUserFile).

Branch: `claude/viking-teaser-voiceover-taghn4`. Do not open a PR unless asked.
