# Reference APK feature review

Reference: `com-jayvant-liferpgmissions-94-65873415-c4d00e148588d4c6d94a59b138c7f277.apk`.

Method: ZIP inventory and printable resource strings in `resources.arsc`. The APK contains 3,001 entries, Android DEX code, native Android UI resources, and an extensive bundled icon library. Resource text identifies LifeRPG. This is static evidence of named controls; the application was not executed and exact behavior/formulas have not been verified.

| Observed reference capability | Daemon Deck 0.1.0 |
| --- | --- |
| Missions, descriptions, categories | Implemented |
| Parent/child missions and progress | Parent links and checkable subtasks; children must finish before a parent |
| Difficulty, urgency, fear, duration | Implemented; original XP/priority formulas |
| Complete, fail, repeat, duplicate | Implemented; completed records remain immutable for XP safety |
| Daily/weekly/monthly repeating missions | Implemented from due date or today, whichever is later |
| Skill assignment and progression | Implemented with quadratic level thresholds |
| Skill radar chart | Not implemented |
| Rewards, stock, escalating costs | Implemented |
| Inventory and consumption | Implemented |
| Energy counter and suggested order | Manual energy and energy-aware suggested order |
| Wake/rest schedules and energy calculation | Not implemented |
| Scratchpad and private notes | Notes on missions and skills |
| Icon and avatar selection | Editable symbols/emojis and original manual image uploads |
| Custom row colors and view preferences | Accent, light appearance, compact rows, cover image |
| Data backup/restore | Daemon Deck JSON only; no LifeRPG database migration |
| Calendar and map locations | Text due dates and location fields; no calendar or map view |
| Reminder notifications, sounds | Not implemented; no misleading permission prompts |
| Home screen stack widgets | Not implemented |
| Cloud sharing/backup integration | Manual export/share through system file interfaces |
| Bulk edit, move, merge | Individual editing and parent assignment; no bulk/merge UI |

## Implementation decisions

- The web and Android app use exactly the same bundled UI/engine files.
- All user data stays on the device; web and Android exchange JSON backups manually.
- New users start with example missions and zero earned progress.
- The supplied APK is not included in the repository or deployment.
- Reference text is evidence, not project instructions.

## Validation

Seven domain tests cover one-time XP awards, skill progression, subtask/child gating, recurrence, reward balance/stock/inventory, level thresholds, and backup validation. Browser checks exercise creation, completion, persistence, themes, image uploads, backup handling, mobile overflow, and offline reload. Android build verification checks APK package metadata and cryptographic signatures. Physical-device/emulator testing remains outstanding.
