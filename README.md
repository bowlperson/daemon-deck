# Daemon Deck — Extensive Overhaul

Branch: `Extensive_Overhaul` · version 0.2.0

[Download the Android overhaul APK](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.2.0-overhaul.apk)

Cyberdeck interface, a 24×32 pixel operator with six hairstyles, accessories and colors, operator analytics, four theme presets, three subthemes, custom colors, and explicit appearance saves. Editing colors or subthemes marks the theme Custom; navigation prompts to save unsaved appearance changes.

Missions require due dates and times. Select 0–5 evenly spaced pre-reminders between creation and deadline, or edit their individual times. The due alert is separate. Completed, failed, and deleted missions cancel their pending alarms. Repeating missions generate fresh schedules. Existing v1 progress and JSON backups migrate to v2; old missions receive zero pre-reminders until configured.

XP can be disabled per mission. Base XP is 20, Friction and Resistance each contribute 0–48, Slip Rate contributes 0–48, and Drain contributes 0/24/56/96. Credits are independent of the XP toggle.

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
- Search, category/status filters, suggested/due/XP/name sorting; energy-aware suggestions.
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
