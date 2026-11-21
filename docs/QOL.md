# QOL updates — v1.13.0

Branch: `QOL-Updates`; Android version code 39, signed with the existing development certificate.

## Icons and mission filters

The shared selector now includes 262 icons. The nine additions are Eurodollar (€$), Toothbrush, Tooth, Shower, Shirt, Pants, Hair brush, Medical/first aid and a simple Heart. They use the existing 24px line style, work on quests/Attributes/Skills and persist by stable IDs. Uploaded images and existing icons are preserved.

Mission sorting defaults to **Due date, earliest first**. The sort and Calendar controls are app-owned dropdowns rather than Android select dialogs. The adjacent arrow shows the current direction and reverses it. Switching sort fields starts with that field's natural order (earliest due, newest created, highest XP or A–Z). The independent Calendar filter offers **All / Calendar / Non-Calendar**, combining with the existing status, tag, Attribute and Skill filters. Actual adjusted/extended deadlines determine due sorting; undated repeatable side quests stay last.

Cold start and app resume restore Due date/default direction and Calendar=All. Temporary choices remain usable while navigating within a session. Resuming does not discard an open editor draft.

## Overdue notifications

Reminders & alarm audio contains an enabled-by-default overdue toggle and a 1–365 day interval, initially **2 days**. A dated active quest receives its first overdue notification at effective deadline + interval, then every interval until completion, failure, deletion, disabling the setting or its repeat cutoff. Old missed intervals are skipped rather than replayed as a notification flood.

These alerts always use **notification** delivery, even when the deadline is an Alarm. Mission-specific notification audio overrides the global notification sound as before. Repeating schedule metadata includes the chosen sound and delivery defaults. Infinite undated Repeatable side quests are excluded.

Android stores the event queue locally, schedules its earliest event and delivers an entire due batch in one wake-up. The receiver advances overdue events and calendar recurrence chains; it does not rely on an open WebView or JavaScript timer. Boot, clock/timezone changes and package replacement restore the queue. Plan replacement cancels pending broadcasts, and stale receipts must match a current event ID/timestamp before they can advance the queue. Completing/failing/deleting a quest or changing settings immediately replaces the native plan. Future cycle deadlines honor stored per-date overrides. Android channels, permissions, Do Not Disturb and manufacturer restrictions still apply.

Web notifications remain session-only under browser control. Desktop/mobile browser timing is not a substitute for background Android delivery.

## Scheduled recurrence, failure and extension

This applies to scheduled daily/weekly/biweekly/monthly/yearly recurrence. It does not add dates to unlimited **Repeatable** side quests.

For an occurrence with a next repeat, the latest deadline and automatic-failure point are **24 elapsed hours before that next scheduled deadline**. The point cannot precede the current occurrence's original deadline; this prevents failure before the deadline during a 23-hour daylight-saving day. A normal daily quest consequently fails exactly at its deadline. A weekly quest can remain overdue until six days after its original deadline. The final occurrence of a count/until rule has no next repeat and therefore no such automatic cutoff.

Manual failure before the current original deadline queues the successor until that cycle boundary. If failure happens after the successor's cycle has already begun, it becomes available immediately. Daily auto-failure at the deadline releases the next daily occurrence then, with the following day's deadline. Each series has one current occurrence; catch-up can archive missed occurrences and bring its current cycle forward after the app was closed. Failed records keep their failure timestamp and no completion XP, currency or healing is awarded. Completed quests retain their existing next-occurrence behavior.

The native scheduler advances future alerts while closed. Quest records are reconciled on startup/resume and periodically while open using the scheduled timestamps. Save/reload is idempotent. The failed Calendar record remains visible and future repeats are still projected. Earlier failed history cannot be reopened over a newer existing occurrence; deleting the current series occurrence stops surviving records from recreating it. Deleting older history alone does not stop the current series.

Extend due date, the mission editor and per-date Calendar edits reject deadlines beyond the repeat cutoff. The extension dialog shows the latest permissible date; when there is no extension room it disables submission with an explanation. Older future overrides past the boundary are safely capped during reconciliation rather than rejecting the whole backup. Original-deadline information and slots/notes remain available. A draft saved after its occurrence auto-fails preserves the failed status and successor, instead of reactivating the old occurrence.

## Calendar gestures

Horizontal swipes within Calendar navigate its current view instead of switching app tabs:

- Month grid: previous/next month, retaining the selected day where possible.
- Day view: previous/next day.
- Week hourly/day section: one day at a time, crossing into the preceding/following week at the boundary.
- Week strip/period section: one full week.
- Schedule view: previous/next month, matching its displayed period.

Vertical scrolling, input editing and dialogs keep their usual behavior. Short taps still select events and dates; a completed horizontal swipe suppresses its trailing tap. Main-tab and quest-editor swipe navigation remains available outside Calendar content.

## Verification

288 automated tests pass, including defaults/migration, notification modes/audio, interval boundaries and cancellation, cutoff/release/idempotence, finite recurrence, backup metadata, extension limits, Calendar projections, sort/filter behavior, icon availability and prior Dungeon/app behavior. A pure Java recurrence test is compiled and compared against web calculations across daily/weekly/biweekly/monthly/yearly, daylight-saving, month-end, leap-year and ending rules. Test execution therefore requires a JDK on PATH; CI configures Java 21 before running it.

Browser checks cover custom dropdowns and menu bounds, reversed sorting, Calendar filtering, return/reload defaults, icon selection/save, overdue settings, editor-draft preservation, day/week/month swipes and week-boundary crossing, vertical-scroll behavior, mobile widths, daily auto-failure/release without rewards, and saving a draft after its cutoff. Offline reload checks confirm the new filter, icon and settings modules remain available. Native-bridge simulation checks emitted repeat plans and immediate setting updates/cancellation. Android compilation/signature and exact bundled web-asset parity are checked for the downloadable APK. Physical-phone notifications, audio and Doze behavior remain pending hardware testing.
