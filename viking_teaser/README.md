# Vikings: Rollo — Teaser (cut v3, with voiceover)

Cinematic Viking teaser, ~109 s, 17 shots. Higgsfield Seedance 2.0, 1080p, 16:9.
Latest cut: new title (ROLLO), unified battle, real-time combat, full ending act.
This build produces **both** voiceover versions in one run: RU (Nikolai) and EN (Hades).

## Status (resolved)
All Higgsfield assets are rendered and their real URLs are baked into `build_film.sh`:
- 3 shots that were pending at handoff are now done: `4f533efd` (London hilltop),
  `ba2cff4c` (teaser legions), and music `18bb928a` (110 s score).
- Shot 15 — `633847ff` "7 DAYS LATER" card — **never finished rendering on Higgsfield**,
  so `build_film.sh` draws it locally with ffmpeg (`drawtext`), no network needed.
  (If you later render a real 633847ff clip, drop its URL into slot 15 of the URLS array.)

## Build (needs network to the Higgsfield CDN)
```bash
bash build_film.sh
# -> viking_build_v3/Vikings_Rollo_v3_vo_ru.mp4
# -> viking_build_v3/Vikings_Rollo_v3_vo_en.mp4
```
Requires `curl` + `ffmpeg` (with libx264 and freetype/drawtext).
The CDN host `d8j0ntlcm91z4.cloudfront.net` must be reachable. In Claude Code on the
web this means an environment whose network policy allows that host (or "all access");
the default dev policy blocks it (`host_not_allowed`). Locally on macOS/Linux it just works.

## Timeline
| # | id | dur | shot |
|---|----|-----|------|
| 1 | 47504000 | 8 | Title "VIKINGS / ROLLO" + raven (Odin) |
| 2 | eecb5c90 | 8 | Card "793 A.D. / NORTHUMBRIA" |
| 3 | 411513d0 | 8 | Drakkar reveal: lone hero -> many oarsmen |
| 4 | bd21d009 | 6 | Card "THREE DAYS LATER" |
| 5 | df3897ae | 7 | Aerial over the fleet nearing shore |
| 6 | 173384e5 | 6 | Landing: hero leaps off the drakkar |
| 7 | 63e699e4 | 6 | Charge up from the beach |
| 8 | 2fbc8716 | 6 | Shield walls collide (wide) |
| 9 | e5491bb3 | 6 | Main battle melee (hero) |
| 10 | f4b71644 | 6 | Close-up: axe splits an enemy helmet |
| 11 | bd62901e | 6 | Duel: splits champion's helmet |
| 12 | 0d4fe9fa | 7 | Aerial over the fallen enemies |
| 13 | a0c3216f | 7 | Aftermath: hero walks the won field and sits |
| 14 | dfed105c | 7 | Throws off fur cloak, raises fist, hailed as leader |
| 15 | 633847ff | 6 | Card "7 DAYS LATER" (drawn locally) |
| 16 | 4f533efd | 8 | Finale: hilltop, camera flies back, walled LONDON below |
| 17 | ba2cff4c | 8 | Teaser: raven over London -> Viking legions + text |

## Audio
- Music primary `18bb928a` (~110 s). Fallback `701a2284` (78 s) if primary is unreachable.
- Narrator VO (Higgsfield Inworld TTS, deep voices): RU `cdfdb9e3` (Nikolai), EN `38e49fec` (Hades).
  Music is laid under at 40% with fade in/out; narration sits on top at 100%.

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
