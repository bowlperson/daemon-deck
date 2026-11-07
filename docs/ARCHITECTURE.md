# Overhaul architecture

Schema v2 is implemented in `dist/engine.js`; `validate` migrates v1 without altering earned XP, coins, or history. Due dates are stored as ISO instants and displayed in local time. Recurrences reset creation time and evenly space reminders for the new occurrence.

`dist/character.js` draws an original 24×32 integer-grid SVG sprite. GIF profile uploads preserve animation. Appearance previews live in a separate draft and only explicit save commits them to storage.

Native `Alarms` persists the desired schedule, cancels replaced PendingIntents, and schedules future events with setExactAndAllowWhileIdle. `AlarmReceiver` posts alarm-category notifications; `RestoreReceiver` restores future events after reboot, package replacement, time changes, and exact-alarm permission grants. Missed events are not replayed. Notification channels and Android system policy retain final control.

The bundled web files and Android UI share one engine. Native file picking, backup export, permissions, and alarms are exposed only to the local HTTPS origin. No signing key is committed.

## 0.3.0 additions

Main skills have an empty `parentId`; subskills reference a main skill ID. Trees are limited to one level and validated on backup import. Mission assignments include selected subskill IDs; completion deduplicates parent awards and grants each selected subskill 45% of that parent’s mission XP.

Vitals uses the oldest overdue uncompleted mission. Green means none overdue, orange means less than 72 hours, and red means at least 72 hours. It is calculated from deadlines rather than stored as mutable state.

`dist/icons.js` contains 50 original SVG line icons. `dist/character.js` draws 18 hair, nine clothing, and 12 equipment variants. Additive v2 migration provides default character and appearance scales for previous backups.
