# Architecture

`dist/engine.js` owns deterministic game rules and backup schema checks. `dist/app.js` renders the responsive UI and handles persistence/image normalization. `dist/style.css` and bundled font files provide the presentation. `dist/sw.js` caches the web app for offline use.

XP per completed mission: `20 + difficulty * 8 + fear * 4 + urgency * 3`. Ratings range from 0–5. Mission XP is awarded to the profile and each selected skill. Level is `floor(sqrt(totalXP / 100)) + 1`. Coins are configured per mission and spent separately; skill XP is never spent.

Recurrence schedules the next daily, weekly, or monthly occurrence. Completion is gated by unfinished subtasks and active direct child missions. Repeated completion of an already completed mission is ignored. Completed missions can be duplicated rather than reopened, avoiding duplicate XP awards.

The Android `MainActivity` intercepts requests to its fixed local HTTPS origin and serves bundled assets. Requests outside that origin are blocked; a JavaScript bridge exposes only backup export. Android document intents handle imports/images and backup exports. No hosted Site login is required in the APK.

To change the app: edit `dist/`, run checks/tests, then run the Android build script to synchronize and package the exact web assets. Android output and signing keys are excluded from Git.
