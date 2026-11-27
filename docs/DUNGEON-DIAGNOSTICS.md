# Dungeon diagnostics — v1.16.0

When Dungeon fails, choose **Export diagnostics** in the popup. You can also use **Config → Dungeon recovery → Export Dungeon diagnostics**, then attach the downloaded JSON to your bug report. **Copy error summary** provides a shorter text report; JSON contains the reproducible combat state.

Reports are captured before failed mutations roll back, before combat history is automatically discarded, and before manual grid repair. Animation and replay-animation failures are classified separately. A failed generated replay is captured before the cache is cleared. The latest three reports persist locally across reopening. Large report bundles shed older entries/replay payloads; storage failures leave the current report in memory so it can still be exported before closing.

Each report includes app version, timestamp, error message/stack, stage, viewport/platform, exact before/after Dungeon state, board, RNG, encounter HP, mana, effects, audit and replay data when available. An ordinary illegal adjacent swap produces its normal feedback rather than a reset prompt.

The export does not serialize the application save. Missions, private notes, profile information, uploaded images/audio and reward drops are excluded. Identity, Attribute/Skill names and existing reward titles are redacted from combat strings. Reports are local; nothing uploads automatically. Settings export without an existing failure creates a manual snapshot.

Copy uses the clipboard when available and a selectable text box otherwise. The Android APK uses the existing native document-save picker, while browsers download a JSON file. Diagnostics do not alter combat rewards, health, streaks or the saved encounter.

Validation: 298 tests; diagnostic privacy/retention tests; injected combat failure proves before/after capture, original-state rollback, popup controls and persistence across reload. Mobile checks verify JSON downloads exclude mission titles. The new module is bundled in Android and cached for offline web use.

# Compact layouts

Deck shares the Attribute Network panel color. A compact identity header, six inline stats, thin XP progress and one-line Vitals replace the tall terminal. Mission List is a grid of flat rows: icon/content left, completion/edit controls right, rewards below content. Description, deadline/extension history, urgency, recurrence, reminders, steps and child status remain; tags alone are hidden. Calmer Interface does not suppress list metadata. All list type sizes use the app text-scale variable.

At 390px/100% text, the sample Deck is approximately 277px tall and a sample mission row is 78px versus 174px in Tiles. Long content or larger text expands rows naturally. Checks cover 100%, 150% and 200% text with no horizontal document overflow. Tiles/List preference and filters continue to work.
