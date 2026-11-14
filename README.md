# Daemon Deck — Dungeon

Branch: `Dungeon_Focus` · version 1.2.0

[Download the Dungeon APK](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.2.0-dungeon.apk)

Dungeon now uses weighted random encounters (60% Low / 30% Mid / 10% High), a five-win pity bonus, fixed 28-damage Strike gems, revised player abilities and character-specific enemy loadouts/criticals. Staged swaps and viscous mana particles make turns easier to follow. A compact header, collapsible enemy card, mana-icon ability controls, Zen and an always-open log focus the game screen. All 35 original portraits and COOL shades are reusable icons; Dungeon can mirror linked Attribute icons/images. Read the [full rules and validation](docs/DUNGEON.md). Android version code 20, same signing certificate. Physical-device testing remains pending.

Cyberdeck interface, a 24×32 pixel operator with 18 hairstyles, accessories and colors, operator analytics, four theme presets, three subthemes, custom colors, and explicit appearance saves. Editing colors or subthemes marks the theme Custom; navigation prompts to save unsaved appearance changes.

Missions require due dates and times. Select 0–5 evenly spaced pre-reminders between creation and deadline, or edit their individual times. The due alert is separate. Completed, failed, and deleted missions cancel their pending alarms. Repeating missions generate fresh schedules. Existing v1 progress and JSON backups migrate to v2; old missions receive zero pre-reminders until configured.

XP can be disabled per mission. Base XP is 20, Friction and Resistance each contribute 0–48, Slip Rate contributes 0–48, and Drain contributes 0/24/56/96. Automatic credits follow XP (including a zero payout when XP is disabled); manual credit overrides remain independent.

## UI and mechanics 2.0 (1.0.0)

A calmer, more readable cyberdeck with spaced quest cards, larger controls and consistent color roles. Calmer Interface is on by default; reward motion can be reduced independently. OS reduced-motion preferences are respected. No universal ADHD font/color claim is made. Read [design rationale and research](docs/UI-2.0.md).

**Character studio 2.0:** live preview, focused sections and silhouette galleries; 36 hairstyles, 18 outfits, 18 accessories, 8 faces, 6 expressions, 6 brow styles, 6 facial-hair styles, 6 eye styles and 3 builds. Individual clothing/item palette controls, additional face/outline colors and existing GIF support are preserved.

**€$ currency:** automatic max-rated missions pay €$5,200. Existing balances, mission amounts, reward prices/increases and historical currency entries scale together 100× once, preserving purchasing power. Stock, XP and inventory stay unchanged. New manual amounts use the new units; backups carry an explicit unit marker.

**Reward transfer:** a centered earned-versus-total dialog animates particles, money, XP-bar progress and level-ups with selected reward sounds. Accounting saves first. The panel closes one second after its last effect; Continue/Escape/Android Back can skip it. Transfers use bounded visual/sound bundles, avoiding thousands of simultaneous sound events. Reduced-motion mode shows a short static summary.

Android version code 15, same signing certificate. Domain and mobile browser validation passed; phone testing remains pending.

## Notification-first reminders and alarm audio (0.9.0)

All pre-reminders and deadline alerts now default to **notifications**, including migrated quests. In each mission’s Schedule section, toggle **Alarm** separately for each pre-reminder and deadline. Scheduling remains exact using Android AlarmManager; delivery mode determines notification versus ringing alarm, not the scheduler API.

**Config → Reminders & alarm audio** provides independent Android notification/alarm sound lists and file uploads. Mission Schedule includes separate notification/alarm overrides, greyed out and disabled when that delivery type is unused. Empty mission selections inherit global defaults; empty global selections use Android’s system defaults. Overrides are preserved when temporarily disabled. Reward/XP/credit sound settings remain separate.

Uploaded audio uses Android’s document picker with retained URI access; it stays local and is not uploaded to a server. Backups keep sound references, not the audio files. Reselect audio on another phone. Missing/unreadable files fall back to the relevant system default. Android channels are keyed by notification sound so each mission can use its own selected jingle. Channel overrides made in Android settings remain authoritative.

Alarm-mode events start a foreground media playback service with looping alarm-stream audio, a Dismiss action, and a lock-screen alarm activity via a full-screen intent. One alarm rings at a time; a newer alarm replaces the currently playing one. Ringing stops automatically after ten minutes. A default-on **Volume buttons dismiss ringing alarms** setting applies while that alarm activity is active, including over the lock screen. Android does not allow global interception of those keys when it keeps the activity in the background. On Android 14+, use **Android alarm-screen access** to allow full-screen alarms. Users can always dismiss through the notification action. Android controls full-screen eligibility, channels, volume and Do Not Disturb; bypass is not claimed.

Validation: 77 domain tests, mobile browser native-picker simulation, override persistence and conditional control checks, Android compilation and signature verification. Hardware sound playback, locked-screen presentation, provider-specific file access and physical volume-button behavior require phone testing. This is a development APK (version code 14), signed with the existing development certificate.

## Attribute and Skill description previews (0.8.3)

In Mission and Side Quest Rewards, hold an Attribute or Skill icon to read its description without leaving the draft or changing XP selections. Locked Skills can still be inspected. Tapping the icon or activating it with the keyboard also opens the preview; close it with × or Escape. Empty descriptions show a clear fallback, and moving to scroll cancels the hold. Android version code 11, same development signing key; physical-device testing remains pending.

## XP assignments, scalable navigation, and battery (0.8.2)

Rewards groups Attributes and their Skills using contrasting theme colors, explicit type/XP labels, and indentation. Skills are greyed out and disabled until their parent Attribute is checked. Turning an Attribute off clears its selected Skills. Opening an older child-only assignment checks its parent automatically, preserving the existing XP relationship. XP formulas and awards remain unchanged.

Bottom navigation buttons now grow to their full label width, including user text scaling, with space between buttons. The strip scrolls horizontally and keeps the active tab visible. Labels do not require reducing text size below default.

The header shows a battery icon, percentage, charging indicator and low-battery color. Android reads its current sticky battery broadcast without a new permission and refreshes approximately every 15 seconds while open. Web uses the Battery Status API where supported and hides the indicator when unavailable. Camera-cutout clearance remains intact.

Validation: 73 domain tests; mobile browser checks for gating, legacy selections, contrasting states, battery bridge simulation, and 320–430px layouts at 100–140% text / 120% interface scaling. Native compilation/signature verification passed; physical-phone battery behavior still needs device testing. Android version code 10.

## Swipe navigation and mission labels (0.8.1)

Mission cards show only the automatic quest-type tag, without a second plain type indicator. The mission-list Main Mission tag displays as **Main**; Calendar retains its existing type headers and tag labels.

Swipe left/right across page content to move forward/backward through the main navigation tabs. Inside the mission creator/editor, swipes switch Quest, Schedule, Rewards and Customize without saving or discarding the draft. Vertical scrolling, sliders, text inputs, horizontally scrolling controls and other dialogs retain their own gestures. Navigation stops at the first/last tab, and unsaved appearance changes still use the existing save prompt.

Validation: 73 domain tests plus mobile browser checks for both swipe directions, editor draft preservation, control/vertical gesture exclusions, mission-only labels and unchanged Calendar presentation. Android version code 9; physical-device testing remains pending.

## Completion, Attributes, and protected organization (0.8.0)

Android now hides both status and navigation bars in immersive mode, including the gesture line where Android permits it. Swiping can temporarily reveal system navigation. Camera-cutout safety and keyboard insets are preserved. Native behavior still needs physical-device verification.

The mission board and Calendar use one completion confirmation. Unchecked subtasks can be finished together with the quest after explicit confirmation; unfinished child missions are listed with direct links. Confirmation guards prevent stale/double awards, including unlimited side quests. Zero-XP quests and unavailable audio do not block completion. Validation/storage errors leave progress unchanged and permit retry.

Completed Calendar-opted quests remain in the month agenda, Day/Week timeline, and Schedule. They are slightly desaturated with a visible **✓ Completed** indicator. **Config → Completed Calendar history** offers optional automatic cleanup, **off by default**, with **4 years** selected initially and a **1–8 year** range. Age is measured from the individual occurrence’s creation date. Cleanup runs when opening/saving the app and removes only completed, opted-in quest records; earned XP, credits, Attribute/Skill progress and the activity log are preserved. The app does not run a background deletion service.

The former main Skills are now **Attributes**; former subskills are **Skills**, opened inside their Attribute. Existing assignments and XP are preserved: an Attribute receives its full mission XP once, and each selected Skill receives 45%. Every Attribute/Skill has a required **Paired tag** in its editor. A same-name tag is created automatically; choose another existing tag to move the pairing. Automatically generated names follow entity renames until the tag is manually renamed. Paired tags apply only through selected Attributes/Skills, and selecting a Skill also applies its parent Attribute’s tag. They are excluded from manual quest-tag selection. Tag colors still control linked Calendar text.

A tag cannot be deleted while paired with any Attribute or Skill, including paired descendants of a tag being deleted. Move all pairings first; deleting an Attribute/Skill releases its pairing. **Main Mission** and **Side Quest** are automatic, fixed, undeletable tags. The mission board and Calendar each have separate **Attributes**, **Skills**, and **Tags** multi-select controls with visible checkmarks. Options within Attributes/Skills match any selection; groups combine to narrow results. Tags supports any/all matching and includes the two fixed quest tags, while paired tags are represented by their entity filters.

Validation: **73 domain tests**, browser completion flows, protected tag/reassignment workflows, combined filters, narrow mobile/enlarged-text layouts, and offline checks. The downloadable APK uses version code 8 and the same development signing certificate as v0.7.0. Physical-device testing remains pending.

## Quest details, time slots, and per-date edits (0.7.0)

Tapping a quest on the mission board or Calendar opens the same read-first detail view: description, tags, actual deadline, slots, payout, schedule, effort estimate, checkable subtasks, child missions, **private notes**, Calendar notes, skills and location. Projected dates show template notes/subtasks without presenting them as completed progress. Three dots or a long press opens the full editor. Completion still requires confirmation.

The creator/editor has four focused sections — Quest, Schedule, Rewards, Customize — with all existing controls retained. Switching sections keeps the draft. Required-field validation opens the relevant section. Icons are searchable and the original 50 IDs remain unchanged.

**Time slots** are optional when Add to Calendar is enabled: up to eight non-overlapping same-day start/end ranges. Blank slots appear separately at the top as **Any time**, without reserving hours. Slots reserve their exact hours in Day/Week and show their ranges in Schedule. A quest with a 19:00–22:00 slot appears only on its actual/repeated dates; slot duration never creates extra calendar days. Recurrence now includes **Yearly** with the existing interval/end/month-pattern controls; no biannual option was added.

From an occurrence’s details, or the date’s agenda card, choose **Edit this specific date’s Timeslots & Deadline**. Save or reset that date independently of the series. The change updates the actual occurrence’s displayed deadline, alarms, reminders and Vitals. Its original recurrence anchor is preserved. Changing only slots preserves custom reminder times; changing the deadline redistributes that occurrence’s pre-reminders evenly. Projected dates remain projections until the recurring quest engine creates the next actual quest on completion.

Full backups and Calendar JSON v3 preserve date overrides. ICS exports slots as real timed events, untimed entries as dates, and overridden dates with exclusions/replacement events. Daemon metadata preserves exact slot/deadline/override settings on direct round-trip; external calendar clients may omit that metadata. External arbitrary recurrence exceptions remain unsupported. Slots are restricted to one local day; repeat the quest to schedule several days.

The library now contains **236 icons**: 50 original symbols, 150 selected Lucide icons, 35 original enemy portraits and COOL shades. Lucide attribution and ISC license are bundled in [icons-LICENSE.txt](dist/icons-LICENSE.txt).

Validation: 56 domain tests and mobile browser checks for read-first details, subtasks/private notes, three-dot/long-press editing, creator sections, yearly recurrence, untimed entries, daily time blocks, isolated date overrides, and JSON/ICS exchange. APK compilation/signature checks pass; physical-device testing remains pending.

## Mobile Calendar and stable tags (0.6.0)

Calendar now opens with an Android-style month grid: large tappable dates, colored event dots, a selected-day agenda with full-size colored quest titles, and focused controls for Today, search, date navigation, and creation. View selection opens a sheet for Month, Week, Day, or Schedule. Week shows a seven-day strip and timeline. Search, any/all tag filters, cleared-event visibility, and import/export tools are available without crowding the month view. Existing quest, skill XP, recurrence, confirmation, notes, and calendar file integration remain intact.

**Skills → Add tags** opens the shared tag library. Create, rename, recolor, or delete reusable tags; turn on **Subtag** and select a parent for one-level tag groups. Mission/skill/reward editors now select multiple tags rather than typing categories. Tags can also be created inline without losing the quest draft. A primary selected tag determines the Calendar title color. Parent filters include their subtags; Calendar supports matching any or all selected filters.

Untagged quests receive a saved random color from an editable palette, balanced across existing colors when created. In **Config → Calendar colors & tags**, edit/add/remove palette colors, shuffle untagged colors, manage tags, or manually choose a color for an individual untagged quest. Tagged quests use their tag's shared color; editing that tag updates every linked event. Hue is preserved while text shades are adjusted for readability in light/dark themes.

Existing categories and old calendar tag strings migrate into reusable tags. Progress, balances, skills, deadlines, and earned history are preserved. Renaming uses stable IDs. Deleting a tag removes assignments (and its subtags when deleting a parent), without deleting quests/skills or changing XP.

Backups preserve the catalog and assignments. Calendar JSON v2 includes tag definitions, hierarchy, primary colors, and quests, and still accepts v1 calendar files. ICS includes ordinary categories/color plus Daemon tag metadata for exact hierarchy round-trips. Import merges matching tag paths and keeps the existing local library's colors.

Validation: 43 domain tests plus mobile browser workflows for tags/subtags, multi-tag assignment, shared colors, parent filtering, inline creation, calendar file exchange, and narrow/enlarged-text layouts. APK build/signature checks pass; physical-device testing remains pending.

## Quests, recurrence, Calendar, and sound deck (0.5.0)

Creating a quest begins with **Mission** or **Side Quest**. Side quests keep 100% of profile/skill XP and pay exactly 50% of the calculated/manual base credits (half credits are retained to two decimal places). Every completion requires a confirmation showing the actual payout.

Only side quests offer **Repeatable**: infinite uses, no deadline, no pre-reminders, no calendar date, and no automatic removal from the board. Each confirmed use increments the use count, grants the payout, and resets subtasks. Delete manually when finished.

Scheduled quests support daily, weekly, biweekly (two-week), monthly, and yearly recurrence; an interval multiplier; weekday selection; monthly day-of-month with clamp/skip for short months, or ordinal weekday (including last); and never/date/count endings. Completion generates the next future occurrence while respecting missed dates and end rules. The on-device local clock time is preserved through DST.

### Integrated local Calendar

Calendar has month, week, day/hour, and agenda views, date navigation, Today, quest-type filters, additional tag filters, text search, cleared-event visibility, event details, and completion/edit actions. The primary tags are **Main** and **Side Quest**. Only quests with **Add to Calendar** enabled appear. Enabling it reveals event duration, color, all-day/busy flags, tags, and separate calendar notes. The quest deadline is the event start. Timed durations can span days; the all-day setting represents one local day. Recurring future dates are projected, without granting progress. Editing a projected event edits the current quest/series.

Calendar JSON preserves exact quest settings. iCalendar `.ics` exports to other calendar apps and imports ordinary timed/all-day events, IANA time zones, daily/weekly/monthly RRULEs, tags, descriptions, and locations. Imports preview the count and event list, merge rather than replace existing quests, skip duplicate identities, and never grant XP/credits. Future imported quests can schedule deadline alarms. Imported recurring times follow the device’s local clock after conversion.

This is an offline local calendar, with no Google/Outlook account sync. Arbitrary iCalendar recurrence exceptions, RDATE/EXDATE, and unsupported complex combinations are rejected with a message; export such calendars as individual events. JSON is the lossless option for Daemon-specific settings. Scheduled background alarms remain Android-only. Projected future dates are not yet separate scheduled Android alarms: an actual next occurrence is created on completion.

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

## 0.8.4

Missions opens on Today; All replaces Pending and includes all unfinished missions. Most recent sorts by creation time, newest first. Config ends with a completion-only audit log and an experience reset requiring exact typed CONFIRM. Reset clears character, Attribute and Skill XP, returning levels to 1, while keeping credits, quests and history.

## 0.8.5

Most Recent is now the default mission sort; Suggested has been removed from the menu. Android version code 13.

## Customize, urgency and shared colors (1.0.1)

Mission Customize is grouped into Quest appearance, Organization and expandable Connections & location. The mission-only Title color from tag control is removed; existing stored Calendar color choices are preserved.

Urgency is a separate 1–5 slider in Quest, affecting mission-card emphasis without changing XP or alert delivery. Level 1 retains the theme’s standard card appearance; levels 2–5 progressively tint the card and border. Config → Urgency colors lets you customize/reset each of Neon, Acid, Amber, Ghost and Custom independently. A visible urgency number accompanies the color. Calendar retains its tag/event colors.

All color pickers provide a shared saved palette (up to 48 colors) and an Original swatch. Original captures the color before its first edit for that theme/control, is retained in backups, and remains available after editing. Save color adds the current value; saved colors can be removed in Config. This applies to appearance, character parts, tags, Calendar colors and urgency palettes.

Reward presentation now has a subtle Tap to skip hint and no Continue button. Tapping the dialog or backdrop, Enter/Space, Escape or Android Back dismisses it without changing awards. Animated rewards close three seconds after the last effect; reduced-motion summaries remain for three seconds. Android version code 16; physical-device testing remains pending.

## Urgency borders and independent fills (1.0.2)

Urgency now changes only the border by default; the previous automatic background tint is removed. Appearance → Urgency colors offers separate Border color and optional Card fill controls for each of the five levels in every theme. Use normal theme fill removes that level’s custom fill; restoring theme urgency defaults resets both border and fill overrides. Existing border choices are preserved.

Custom fill is applied as the background color, never as an overlay/filter/opacity across card content. Text/accent colors remain unchanged when legible, otherwise they are adjusted within that card to reach 4.5:1 contrast against the selected fill. Custom-filled tag labels use readable neutral text while retaining their colored markers/borders. Mission-button hover brightness is removed to avoid washing out text. Saved/Original swatches remain available for both color controls. Android version code 17; physical-device testing remains pending.

## Deadline extensions (1.0.3)

Active dated quests offer Extend due date beside Complete quest. Extensions retain the first original deadline, show both dates on the card and details, and display calendar days since the original date (or days until it when still future). The extension changes one occurrence via date overrides; recurrence anchors remain intact. Future reminders redistribute to the extended deadline. New recurring occurrences start without extension metadata.
