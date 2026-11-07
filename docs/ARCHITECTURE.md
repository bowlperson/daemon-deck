# Overhaul architecture

Schema v2 is implemented in `dist/engine.js`; `validate` migrates v1 without altering earned XP, coins, or history. Due dates are stored as ISO instants and displayed in local time. Recurrences reset creation time and evenly space reminders for the new occurrence.

`dist/character.js` draws an original 24×32 integer-grid SVG sprite. GIF profile uploads preserve animation. Appearance previews live in a separate draft and only explicit save commits them to storage.

Native `Alarms` persists the desired schedule, cancels replaced PendingIntents, and schedules future events with setExactAndAllowWhileIdle. `AlarmReceiver` posts alarm-category notifications; `RestoreReceiver` restores future events after reboot, package replacement, time changes, and exact-alarm permission grants. Missed events are not replayed. Notification channels and Android system policy retain final control.

The bundled web files and Android UI share one engine. Native file picking, backup export, permissions, and alarms are exposed only to the local HTTPS origin. No signing key is committed.

## 0.3.0 additions

Main skills have an empty `parentId`; subskills reference a main skill ID. Trees are limited to one level and validated on backup import. Mission assignments include selected subskill IDs; completion deduplicates parent awards and grants each selected subskill 45% of that parent’s mission XP.

Vitals uses the oldest overdue uncompleted mission. Green means none overdue, orange means less than 72 hours, and red means at least 72 hours. It is calculated from deadlines rather than stored as mutable state.

`dist/icons.js` contains 50 original SVG line icons. `dist/character.js` draws 18 hair, nine clothing, and 12 equipment variants. Additive v2 migration provides default character and appearance scales for previous backups.

## 0.4.0 additions

`coinsFor` is the sole payout calculation used by the editor, lists, completion, and history. `coinMode: auto` computes round(XP / 5); `manual` uses the stored amount. Old records migrate to manual to preserve payouts. Neither mode changes previously earned currency.

`radar.js` renders a connected SVG web with a common linear cumulative-XP scale and an accessible exact-value legend. Main skills appear on the Deck; tapping expands all main/subskills. No mission rows are rendered on the Deck.

`customization.js` defines the real painted parts for each of nine clothing styles and twelve equipment options. Per-style maps (`outfitColors`, `itemColors`) persist separately. Validation accepts only known indices/parts and hex colors. Eye style and eye colors are separate controls. Editing uses a draft so previews, style switching, cancel, save, and backup import preserve all palettes correctly.
