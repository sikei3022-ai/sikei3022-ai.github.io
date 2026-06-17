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

### BEST identity method — TRAINED SOUL CHARACTERS (use these!)
The user already trained Soul V2 characters — identity is rock-solid. Generate per-character shots
with `model: soul_2` + `soul_id` (ONE soul per image; for multi-person frames use Elements instead).
- **Volodia = KING ALFRED** — soul_id `93a5ea3a-1e84-42bf-93d1-9b78501b1132`  ✅ likeness CONFIRMED by user
- **Serezha = ROLLO** — soul_id `54e1de1a-9b53-49e0-9d89-2ecf3b62a443` (alt **Serezha2** `f3f7e1c0-67ad-4276-94e5-12f6ca82aafd`)
- (No Soul for Edward yet — use the Element below, or train one from his photo.)
Confirmed working call: `generate_image {model:"soul_2", soul_id:..., aspect_ratio:"16:9", prompt:...}`.
Example results: Alfred `3323c5aa-...` (confirmed), Rollo `a055833b-...`.

### Reference ELEMENTS (for multi-character frames / non-Soul models: nano_banana_pro, seedance_2_0, kling3_0)
Embed `<<<element_id>>>` in the prompt (multiple allowed in one shot).
- Alfred: `51fa91d3-742c-44ce-9e00-2e3dc3a94e27`
- Rollo: `00318f6d-54a0-45f5-9cf6-cba72073194a` (alt Rollo2 `93d628e0-da94-4cb4-b599-d2d549618b17`)
- **Vlad = EDWARD**: `0eca8a4a-d897-4762-a3c4-54e8310acfed`
Uploaded Volodia photos (media_input): `c385e619-cf5a-47f7-a1ef-3c711ed8bac1`, `11e63413-4eda-471d-a32a-14ab63c00e55`.

ROLLO identity method — CONFIRMED by user: use **seedance_2_0 with a VIDEO reference** of the close-up
clip `f4b71644-e703-4074-a2c0-c751a24f08f7` (role `video`) — this transfers his EXACT face, beard and
build, no upload needed. (Also usable: `bd62901e`, `4f533efd`.) His look: LARGE, broad-shouldered, burly,
thick arms; SHORT neatly trimmed dark full beard (NOT braided); short cropped hair, faded short sides;
long steel chainmail hauberk + tan/grey fur mantle on one shoulder + studded leather bracers. The palace
scene is a continuation of that storyline, so keep it identical. (Soul "Serezha" gives the face but its
beard/build drift — prefer the video-reference route for Rollo.) Rollo throne test: `2273f258-...`.


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

## 6. Voice plan (ElevenLabs) — user clones on THEIR side
ElevenLabs is NOT reachable from the sandbox (api.elevenlabs.io 403, no key, no connector) — verified again.
The USER has ElevenLabs working on their own account. Plan: user clones the 3 voices (Serezha=Rollo,
Volodia=Alfred, Vlad=Edward) and renders the 8 lines, then sends the 8 audio files (open an audio
`media_upload_widget`, or `media_import_url` if they're at a URL). Numbered script (RU), filename → text:
```
01_rollo : Твой город уже мой, Альфред. Стены — это просто камни, которые ещё не упали. Открой ворота — и твои люди доживут до утра.
02_alfred: Мои люди молятся. Твои — грызут конину под дождём. Голод осаждает осаждающего, конунг. Я могу ждать. А ты?
03_edward: У нас хлеба на три дня. Три, отец!
04_alfred: Значит, на день дольше, чем у него терпения.
05_rollo : Ты отказываешь мне, сидя в клетке, которую я построил вокруг тебя за одну ночь.
06_alfred: Я отказываю тебе, потому что король, что сдаёт город ради лишнего рассвета, теряет оба.
07_rollo : Твои стены простоят до рассвета.
08_rollo : Ты — нет.
```

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
