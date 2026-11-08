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

## 0.5.0 additions

`schedule.js` is the recurrence engine shared by quest completion and calendar projection. It handles local calendar dates, interval multipliers, weekdays, monthly patterns, and series end rules. Recurring actual records share a `seriesId` and increment `occurrence`. Unlimited side quests have no due date and reset in place.

`calendar.js` provides projection, iCalendar serialization/parsing, timezone conversion, and supported recurrence import. Calendar JSON is exact; unsupported iCalendar rules are rejected instead of silently flattened. Only opted-in dated quests are rendered or exported. Calendar projection does not mutate the mission board or award progress.

`sound.js` creates original Web Audio cues and validates/imports short local clips. Four distinct reward categories are sequenced after successful confirmed completion. Sound playback errors do not roll back or block awarded progress.

The Android shell hides status bars through WindowInsetsController (legacy flags before API 30), restores immersive behavior on focus/resume, preserves cutout/navigation insets, and exports both JSON and ICS via ACTION_CREATE_DOCUMENT. No device-calendar or media-library permission is required; imports use the system file picker.

## 0.6.0 additions

`tags.js` owns a stable shared catalog (`id`, `name`, `color`, `parentId`), multi-tag assignments (`tagIds`), primary color (`primaryTagId`), catalog validation/migration, subtree removal, palette assignment, and calendar import/export mapping. A tag can have one parent; cycles and deeper nesting are rejected. Item IDs reference the catalog, so rename/recolor is shared immediately without modifying historical progress.

Calendar uses a month-and-agenda layout with date selection, focused sheets, and full-size event cards. Tags drive event title colors and color dots. The underlying recurrence and skill/quest completion engines are unchanged. Calendar JSON v2 and ICS metadata preserve tag definitions; existing local tag paths/colors win on merge.

## 0.7.0 additions

`timing.js` separates scheduled occurrence identity, effective deadline, same-day slot ranges, and per-date overrides. `calendarOverrides` stores edits by series and original local day, retaining the original instant for lookup. Date changes affect actual quest alarms/Vitals while the recurrence engine keeps the original anchor. Calendar projections resolve the same overrides and omit orphaned exception dates after a schedule changes.

Calendar exports carry exact metadata in JSON v3/ICS. ICS exposes individual timed slots and EXDATE/replacement entries for other apps. Direct imports collapse Daemon slot copies back to one quest and remap override series IDs. Private notes remain out of ICS; exact JSON retains quest fields.

The quest creator organizes existing DOM controls into four persistent panels. A shared detail view handles board and calendar taps; edit actions use menus/long press. Inline subtasks persist independently. Icon IDs dd:01–dd:50 remain stable; dd:51–dd:200 use bundled Lucide SVG geometry under its ISC license. No runtime icon package/network request is needed.

## 0.8.0 additions

UI terminology is Attributes (empty `parentId`) and Skills (references an Attribute). The underlying `skills` array/mission assignment IDs remain compatible. `skills[].boundTagId` is mandatory after additive migration. `tags.js` supplies deterministic automatic tags, optional `generatedFor` rename tracking and `everBound` release tracking, required pairings, reserved quest tags, and guarded subtree deletion. Pairings may share a tag; every owner must move before deletion is permitted.

Automatic tags are derived by `itemTags` from quest kind and linked entities; they are never manually stored in `tagIds`. Selecting a Skill implicitly links its Attribute for organization and existing XP rules. Migration strips stale manual assignments of bound tags, creates missing bindings, preserves existing progress, and renames legacy ordinary tags colliding with reserved names. Quest kinds determine system-tag matching even when an entity has the same displayed name. `matchesOrganization` combines independent Attribute/Skill/tag filter groups, OR within entity groups and configurable any/all within ordinary/system tags.

`complete` supports explicit checklist finalization and expected-use guards for repeatable confirmations. All UI completion paths share one controller, with child blockers, atomic persistence rollback and audio independent of payout. `persist` now uses the returned normalized state, rather than validating a clone and discarding its additive migration. Starter missions receive unique series IDs; duplicate legacy series/occurrence identities are repaired without discarding quests.

`settings.calendar.autoDelete` defaults false; `retentionYears` defaults 4, validated as an integer 1–8. `pruneCalendarHistory` removes only completed Calendar-opted records after their creation anniversary, clamping leap-day anniversaries to the last valid date. It preserves rewards/history/progress and any still-used series overrides. Cleanup runs locally at startup and successful saves, not while the app is closed. Both actual completed and active recurring occurrences remain available to calendar projection.

The native shell hides `systemBars()` on API 30+, and uses fullscreen/hide-navigation/immersive-sticky flags on API 26–29. Insets preserve camera cutouts and keyboards while avoiding permanent space for hidden navigation. Android can reveal bars by swipe and retains control of navigation behavior.
