# Vikings: Rollo — Project Handoff (cut v3)

Cinematic Viking teaser, ~109 s, 17 shots. Higgsfield Seedance 2.0, 1080p, 16:9.
This is the latest cut: new title (ROLLO), unified battle on one battlefield, real-time
(non-slowmo) combat with realistic helmet impacts, plus the full ending act.

## Build status (resolved)
All PENDING slots are now filled in `clips.json` and `build_film.sh`:
- clip 16 `4f533efd` (London hilltop) and clip 17 `ba2cff4c` (teaser legions) — found completed in the Higgsfield library.
- music 110s `18bb928a` — found completed in the library.
- clip 15 (`7 DAYS LATER` card) — the original `633847ff` never landed in the library,
  so it was regenerated (Seedance 2.0, 1080p/16:9/6s, job `b7dd6d91`) in the same card style.
- `build_film.sh` now builds **both** narration versions (RU + EN) plus a music-only
  cut in a single run.

NOT YET RENDERED HERE: the final mp4 could not be assembled in the Claude Code web
sandbox because the egress policy blocks `d8j0ntlcm91z4.cloudfront.net`
(`x-deny-reason: host_not_allowed`) — so `curl` cannot fetch the clips. To produce
the films, run `bash build_film.sh` locally (curl + ffmpeg), or add that host to the
environment's network allowlist and re-run.

## Files
- `clips.json` — manifest (order, id, duration, filename, label).
- `build_film.sh` — downloads clips + audio, normalizes, concatenates, lays music
  + narration and exports the films (RU, EN, music-only).
- `README.md` — this file (Suno prompts + narrator script included).

## Build (Claude Code, with network)
```bash
bash build_film.sh   # -> viking_build_v3/Vikings_Rollo_v3(_vo).mp4
```
curl + ffmpeg required. If sandboxed, allow host `d8j0ntlcm91z4.cloudfront.net`.
Pending at handoff (paste real URLs into the PENDING_* slots from the Higgsfield library):
clips `633847ff` (7 days card), `4f533efd` (London hilltop), `ba2cff4c` (teaser legions),
and music `18bb928a` (110s score; script falls back to the 78s track if not filled).

## Timeline
| # | id | dur | shot |
|---|----|-----|------|
| 1 | 47504000 | 8 | Title "VIKINGS / ROLLO" + raven (Odin) |
| 2 | eecb5c90 | 8 | Card "793 A.D. / NORTHUMBRIA" |
| 3 | 411513d0 | 8 | Drakkar reveal: lone hero -> many oarsmen, ship moves forward |
| 4 | bd21d009 | 6 | Card "THREE DAYS LATER" |
| 5 | df3897ae | 7 | Aerial over the fleet nearing the shore |
| 6 | 173384e5 | 6 | Landing: hero leaps off the drakkar |
| 7 | 63e699e4 | 6 | Charge up from the beach |
| 8 | 2fbc8716 | 6 | Shield walls collide (wide) |
| 9 | e5491bb3 | 6 | Main battle melee (hero) |
| 10 | f4b71644 | 6 | Close-up: axe splits an enemy helmet, enemy drops |
| 11 | bd62901e | 6 | Duel: splits champion's helmet, strikes him down |
| 12 | 0d4fe9fa | 7 | Aerial over the fallen enemies |
| 13 | a0c3216f | 7 | Aftermath: hero walks the won field and sits |
| 14 | dfed105c | 7 | Throws off fur cloak, raises fist, warriors hail him as leader |
| 15 | 633847ff | 6 | Card "7 DAYS LATER" (pending) |
| 16 | 4f533efd | 8 | Finale: rides to hilltop, camera flies back, walled LONDON below (pending) |
| 17 | ba2cff4c | 8 | Teaser: raven over London -> 100,000s of Vikings, hero on horse, text (pending) |

All battle shots (7-11) share one location: a muddy field just above the landing beach,
sea and beached dragon-ships in the background. Combat is real-time (no slow motion),
weapons land with realistic impact (helmets dent/split).

## Audio
- Music primary `18bb928a` (~110 s, dark -> battle -> triumphant). Fallback `701a2284` (78 s).
- Narrator VO (Higgsfield Inworld TTS, deep voices): RU `cdfdb9e3` (Nikolai), EN `38e49fec` (Hades).
  build_film.sh mixes music under (40%) + narration on top. NOTE: the requested
  KIE.ai/ElevenLabs "Chonishvili-style" voice was not produced — that connector timed out,
  and a specific real person's voice is not cloned; these are deep preset narrator voices.

## Direct URLs
Base: `https://d8j0ntlcm91z4.cloudfront.net/user_3F5Banjnf4nEee92ijSAsD8BLH7/`
- 1 47504000 `hf_20260616_153039_47504000-ad6d-439a-be5f-94546547911b.mp4`
- 2 eecb5c90 `hf_20260616_140624_eecb5c90-024c-4df2-9eeb-a6b456f3d2c1.mp4`
- 3 411513d0 `hf_20260616_140635_411513d0-332a-4100-ac2d-577c7c854f59.mp4`
- 4 bd21d009 `hf_20260616_140645_bd21d009-489a-47eb-83e9-e8d2ffe6671d.mp4`
- 5 df3897ae `hf_20260616_140651_df3897ae-98f9-4556-8079-782d28c2ef4c.mp4`
- 6 173384e5 `hf_20260616_140700_173384e5-1957-4c0f-ace8-84ea38f7751d.mp4`
- 7 63e699e4 `hf_20260616_153049_63e699e4-bb23-4c7a-a62c-6bb0bbd62f1a.mp4`
- 8 2fbc8716 `hf_20260616_153118_2fbc8716-2b52-4bf2-b953-28e5bf3ccf12.mp4`
- 9 e5491bb3 `hf_20260616_153058_e5491bb3-baa5-482e-a2c2-e801d1a76506.mp4`
- 10 f4b71644 `hf_20260616_153107_f4b71644-e703-4074-a2c0-c751a24f08f7.mp4`
- 11 bd62901e `hf_20260616_153128_bd62901e-cc40-41a3-bdf7-783acfe63119.mp4`
- 12 0d4fe9fa `hf_20260616_145024_0d4fe9fa-a6b1-4371-b70a-aa0dd12d7288.mp4`
- 13 a0c3216f `hf_20260616_142443_a0c3216f-b50d-445d-8017-42768a027e43.mp4`
- 14 dfed105c `hf_20260616_145039_dfed105c-fbc8-4e90-bddc-405c0f22bbca.mp4`
- 15 633847ff PENDING
- 16 4f533efd PENDING
- 17 ba2cff4c PENDING
- music110 18bb928a PENDING
- music78  701a2284 `hf_20260616_143001_701a2284-23db-4444-9ea3-dd3d1d5a5808.m4a`
- narr-ru  cdfdb9e3 `hf_20260616_145542_cdfdb9e3-9781-4f87-8d98-f82d98cdd563.wav`
- narr-en  38e49fec `hf_20260616_145551_38e49fec-209b-41a8-a706-e8a414ddff45.wav`

## Music via Suno (KIE.ai) — paste-ready (bigger selection there)
Style (instrumental):
  Epic Nordic cinematic battle score, war drums and frame drums, throat singing, war horn,
  low brass, lone female Scandinavian vocal, dark building to a thunderous battle climax then
  triumphant melancholic finale, trailer score, ~85 BPM, instrumental
Style (with choir):
  Epic Viking war chant, massive male choir, frame drums, throat singing, Old Norse feel,
  brutal and heroic, cinematic trailer, building intensity

## Narrator script
RU: Север не знал пощады. И из его льдов вышла буря. Семьсот девяносто третий год.
Море несёт их к чужим берегам. Один смотрит их глазами. Ворон ведёт их вперёд.
Один человек у весла — а за ним тысячи вёсел. Три дня и три ночи — и земля врага
встречает их сталью. Они пришли не за золотом. Они пришли остаться. Когда битва стихла,
павшие молчали — а живые звали его вождём. Впереди лежал город. А значит, это только начало.
EN: The North knew no mercy. And from its ice came the storm. 793. The sea carries them to
foreign shores. Odin watches through their eyes; the raven leads them on. One man at the oar,
and behind him, a thousand more. Three days and three nights, and the enemy's land meets them
in steel. They did not come for gold. They came to stay. When the battle fell silent, the dead
lay still, and the living called him their lord. Ahead lay the city. And so, this was only the beginning.

## Notes
- Model seedance_2_0, 1080p, std, 16:9. Battle shots use genre "action" (faster), others "epic".
- Identity/costume via original armored clip `5ec63b9f` as a VIDEO reference. Passing a video id
  as start_image/end_image FAILS on Seedance — use role "video" or upload a real still frame.
- Titles are Latin for legibility; Cyrillic can be re-rendered on request (may distort).
- Shots 16 and 17 both reveal London; if it feels repetitive, keep one.
