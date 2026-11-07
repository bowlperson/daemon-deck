# Daemon Deck — Extensive Overhaul

Branch: `Extensive_Overhaul` · version 0.5.0

[Download the Android overhaul APK](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.5.0-overhaul.apk)

Cyberdeck interface, a 24×32 pixel operator with 18 hairstyles, accessories and colors, operator analytics, four theme presets, three subthemes, custom colors, and explicit appearance saves. Editing colors or subthemes marks the theme Custom; navigation prompts to save unsaved appearance changes.

Missions require due dates and times. Select 0–5 evenly spaced pre-reminders between creation and deadline, or edit their individual times. The due alert is separate. Completed, failed, and deleted missions cancel their pending alarms. Repeating missions generate fresh schedules. Existing v1 progress and JSON backups migrate to v2; old missions receive zero pre-reminders until configured.

XP can be disabled per mission. Base XP is 20, Friction and Resistance each contribute 0–48, Slip Rate contributes 0–48, and Drain contributes 0/24/56/96. Automatic credits follow XP (including a zero payout when XP is disabled); manual credit overrides remain independent.

## Quests, recurrence, Calendar, and sound deck (0.5.0)

Creating a quest begins with **Mission** or **Side Quest**. Side quests keep 100% of profile/skill XP and pay exactly 50% of the calculated/manual base credits (half credits are retained to two decimal places). Every completion requires a confirmation showing the actual payout.

Only side quests offer **Repeatable**: infinite uses, no deadline, no pre-reminders, no calendar date, and no automatic removal from the board. Each confirmed use increments the use count, grants the payout, and resets subtasks. Delete manually when finished.

Scheduled quests support daily, weekly, biweekly (two-week), and monthly recurrence; an interval multiplier; weekday selection; monthly day-of-month with clamp/skip for short months, or ordinal weekday (including last); and never/date/count endings. Completion generates the next future occurrence while respecting missed dates and end rules. The on-device local clock time is preserved through DST.

### Integrated local Calendar

Calendar has month, week, day/hour, and agenda views, date navigation, Today, quest-type filters, additional tag filters, text search, cleared-event visibility, event details, and completion/edit actions. The primary tags are **Main** and **Side Quest**. Only quests with **Add to Calendar** enabled appear. Enabling it reveals event duration, color, all-day/busy flags, tags, and separate calendar notes. The quest deadline is the event start. Timed durations can span days; the all-day setting represents one local day. Recurring future dates are projected, without granting progress. Editing a projected event edits the current quest/series.

Calendar JSON preserves exact quest settings. iCalendar `.ics` exports to other calendar apps and imports ordinary timed/all-day events, IANA time zones, daily/weekly/monthly RRULEs, tags, descriptions, and locations. Imports preview the count and event list, merge rather than replace existing quests, skip duplicate identities, and never grant XP/credits. Future imported quests can schedule deadline alarms. Imported recurring times follow the device’s local clock after conversion.

This is an offline local calendar, with no Google/Outlook account sync. Arbitrary iCalendar recurrence exceptions, RDATE/EXDATE, yearly rules, and unsupported complex combinations are rejected with a message; export such calendars as individual events. JSON is the lossless option for Daemon-specific settings. Scheduled background alarms remain Android-only. Projected future dates are not yet separate scheduled Android alarms: an actual next occurrence is created on completion.

### Reward sounds and Android display

Completion, XP, credits, and level-up each have **four original synthesized cues**, preview controls, and local audio upload. The original Wasteland terminal level-up cue uses retro sci-fi arpeggios; no game audio is copied. Mute/volume apply globally. Accepted local clips are up to 12 seconds and 550 KB, stored in backups. Browser/app storage quotas apply.

Android auto-hides the status bar, allows transient reveal by swipe, reserves system/cutout insets, and shows a local live clock/date in the cyberdeck header. The center of the mobile header is empty for a centered camera. The bottom tab strip scrolls horizontally and keeps the selected tab visible.

Validation: 34 domain tests, browser workflows for confirmations, repeatable quests, scheduled recurrence, Calendar import/export and duplicate handling, custom audio persistence, and four mobile widths with enlarged type. APK compilation and signature verification pass. Physical-device audio, alarm, cutout, and status-bar testing remains outstanding.

## Credits, skill web, and part colors (0.4.0)

New mission credits default to `round(XP / 5)`. Rating changes update the displayed amount immediately. Typing a different amount marks a manual override; **Reset to XP default** returns to automatic calculation. Completion and history use the same calculated payout, and repeated missions retain their auto/manual setting. Existing balances/history are unchanged; payouts from pre-0.4 backups are preserved as manual, with the reset button available to adopt the new default.

The Deck displays operator telemetry, analytics, and a connected skill radar instead of mission cards. The compact radar covers all main skills. Tap it for a larger web containing all main skills and subskills, with a complete numbered legend. Points represent cumulative XP on one common linear scale, so lower stats sit nearer the center. Zero XP remains at the center. One/two skills and empty profiles are handled; dense graphs can be panned inside the expanded dialog.

The operator editor separates Body & Hair, Eyes, Outfit Parts, and Equipment Parts. Six eye shapes include iris, white/highlight, and pupil color controls. Every clothing style and equipment item has its own saved palette with selectors matching actual sprite regions (fabric, lining, plates, lenses, straps, lights, and other parts where applicable). Trousers and footwear are included in outfit palettes. Changing styles preserves their individual colors. Saves and JSON backups include all palettes; older profiles receive defaults without losing previous hair, skin, outfit, or iris colors.

## Vitals, subskills, and mobile customization (0.3.0)

- Energy controls and direct hairstyle cycling have been removed. Hair changes happen in the operator editor.
- Vitals is green with a tall heartbeat when no unfinished mission is overdue; orange with smaller peaks from the first overdue instant up to 72 hours; red at 72 hours overdue for even one unfinished mission. Failed missions remain unfinished; completing/deleting the oldest overdue mission updates the display. It refreshes every minute while open and on resume.
- The mission and skill editors include 50 original vector icons. Existing emoji and image uploads are preserved.
- Open a main skill to see/add/edit its subskills. Select subskills in the mission editor. Each selected subskill earns exactly 45% of its main skill’s XP for that mission (two-decimal precision), without splitting the amount. Selecting a subskill credits its main skill the full mission XP once, even if that main skill or sibling subskills are also selected. Unselected subskills receive no XP. The profile still receives only the mission’s original XP. Disabling mission XP also disables subskill XP.
- The editor includes 18 distinct hairstyles, nine clothing silhouettes, and 12 item options, plus colors and a 60–160% character-size slider. Appearance includes 85–140% text size and 85–120% interface-size sliders, with the same Custom/Save workflow.
- Mobile layout puts the character screen first, with Vitals and identity below. Touch targets, icon grids, skills, configuration, and editors adapt to narrow screens and enlarged type.
- V1 and earlier v2 backups migrate without changing earned progress. Deleting a main skill deletes its subskills and removes their mission links, while preserving historical XP and event records.

## Android alarm setup

Onboarding requires notification access, exact alarm access, and a battery optimization exemption before entering the deck. Alarms use AlarmManager, a high-importance alarm sound channel, persistent schedules, and reboot/update/time-change restoration. Config includes a test alert.

Android **cannot guarantee unrestricted delivery**. Do Not Disturb, notification-channel configuration, force-stop, Doze throttling for closely spaced alarms, and manufacturer power controls remain in effect. Web notifications require an open tab; background scheduling is Android-only. Physical-device alarm, reboot, and permission testing is outstanding. Browser/domain tests and APK signature/build verification pass.

Export a backup before updating or uninstalling. This APK uses the same local development signing key as v0.1.0, enabling in-place updates for that build. Independently generated CI APKs may use another key.

## Start locally

Requires Python 3 and Node.js 22+ for checks. No npm dependencies or frontend build step.

```sh
npm run dev
# Open http://localhost:5173
npm run check
npm test
```

`dist/` is the complete web app and can be served by any static host over HTTPS. The `.openai/hosting.json` file connects the owner-private Sites deployment. That deployment is distinct from GitHub repository visibility.

## Included in v0.1.0

- Create/edit/delete missions, skill associations, categories, descriptions, private notes, locations, and estimated durations.
- Difficulty, urgency, and fear determine XP; successful missions award configurable coins.
- Parent missions and checkable subtasks gate completion; duplicate, fail, and reopen failed missions.
- Daily, weekly, and monthly recurrence creates a fresh occurrence on completion.
- Search, category/status filters, suggested/due/XP/name sorting; deadline-based suggestions.
- Custom skills with individual XP and quadratic levels.
- Reward shop with stock, escalating costs, purchases, inventory, and consumption.
- Custom uploaded images for mission/skill/reward icons, avatar, and dashboard cover; local image resizing.
- Theme accent, light appearance, compact layout, and activity history.
- JSON backup export/import, including images and progress, across web and Android.
- Offline app shell and bundled fonts; responsive layouts and reduced-motion support.

New profiles start at zero XP/coins. Example missions, skills, and rewards are editable starting points. Web and Android currently have independent device storage. Export/import transfers progress; there is no automatic synchronization or server database.

## Android

Minimum Android 8.0 (API 26), target API 35. Install an up-to-date Android System WebView.

Install JDK 21, Android SDK platform 35 and build-tools 35.0.0, plus `zip`. Accept the Android SDK licenses.

```sh
export ANDROID_SDK_ROOT=/path/to/android-sdk
bash scripts/build-android.sh
```

Output: `android/app/build/daemon-deck-debug.apk`. This is a signed development APK for sideloading, not a Play Store release. Its development signing key is generated locally and ignored by Git. Preserve that key securely for future updates to the installed build. Different CI runs produce different debug keys; uninstalling loses local data, so export before replacing an installation signed by another key.

The native shell serves only bundled assets at a fixed HTTPS origin, disables file URL access and mixed content, and provides Android file picking and document saving. No Internet permission, analytics, or account requirement. The Android build uses official `aapt`, `d8`, `zipalign`, and `apksigner` without Gradle dependencies. The GitHub workflow checks the web app and builds an APK artifact when repository access is configured.

## Storage and privacy

LocalStorage holds app data, including resized uploaded images. Browser storage quotas apply; export backups regularly. Clearing site/app data removes progress. Backups contain personal notes and images: treat them as private. Backup imports validate the schema and require confirmation before replacing local data.

## Reference and scope

See [APK feature review](docs/APK-REVIEW.md). This is an original implementation inspired by LifeRPG's workflows; no source code, branding, icon pack, or other assets were copied from the supplied APK. The APK was inspected statically, not run in an Android emulator. Exact behavioral parity has not been established. XP/priority algorithms are original and documented in `dist/engine.js`.

Not included yet: scheduled/background notifications, custom notification sounds, home-screen widgets, calendar/map views, automatic sync, or importing LifeRPG's proprietary database. See the feature review for details. These are explicit follow-up work, not hidden working controls.
