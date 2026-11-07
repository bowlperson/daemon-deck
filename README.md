# Daemon Deck

A private, offline-first life RPG for the web and Android. HTML, CSS, and JavaScript power both interfaces. The Android app bundles the web files and works without a hosted service.

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
