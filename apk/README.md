# Latest Android build / v0.7.0

[Download v0.7.0 — Quest Details, Time Slots & Date Overrides](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.7.0-overhaul.apk)

Android 8+, version code 7, signed with the same local development key. Export a backup before updating. Physical-device testing remains pending.

Tap quests to read details and check subtasks; use three dots or a long press for editing. In the creator, switch between Quest, Schedule, Rewards and Customize. Test optional Calendar time slots, Any-time quests, daily/yearly recurrence, and date-only slot/deadline edits. Verify the following day keeps its original slots and that custom reminder times are preserved when only slots change. Try icon search across all 200 icons and Calendar JSON/ICS export/import.

# Latest Android build / v0.6.0

[Download v0.6.0 — Mobile Calendar & Colored Tags](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.6.0-overhaul.apk)

Android 8+, version code 6, same development signing key as previous downloadable builds. Export a backup before updating. Physical-device testing remains pending.

Test the month date grid and selected-day agenda, Today/date/view sheets, and color-coded quest names. Use Skills → Add tags to create a tag and subtag, select multiple tags on a quest, choose its primary title color, and verify parent filtering and shared color changes. Config contains palette, tag, and individual untagged-quest colors. Confirm calendar exports/imports preserve tags and that enlarged text works on your phone.

# Latest Android build / v0.5.0

[Download v0.5.0 — Quests, Calendar & Sound Deck](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.5.0-overhaul.apk)

Android 8+, version code 5, same development signing key as earlier downloadable versions. Export a backup before updating. Physical-device testing remains pending.

Test Mission/Side Quest creation, half-credit side payouts, infinite Repeatable uses, detailed recurrence and opt-in calendar notes/tags. Verify month/week/day/agenda, file import/export, and completion confirmation. Preview each of the four sound categories, upload a short local clip, and test level-up playback. On a Pixel, check that the system status bar hides, swipe temporarily reveals it, the local clock/date remains visible, and centered camera cutouts do not overlap controls. Tab navigation scrolls sideways.

# Latest Android test build / v0.4.0

[Download v0.4.0 — Credits, skill web & part colors](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.4.0-overhaul.apk)

Android 8+. Signed with the same local development key; version code 4 supports an in-place update over earlier downloadable builds. Export a backup first. Physical-device testing remains pending.

Test automatic XP-based credits, manual overrides and reset, the Deck’s expandable radar, separate eye controls, and switching outfits/equipment after coloring their parts. Colors should persist on save/relaunch and backup restore. Existing mission payouts remain manual until reset; existing balances do not change.

# Latest Android test build / v0.3.0

[Download v0.3.0 — Vitals & subskills](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.3.0-overhaul.apk)

Android 8+. Export a backup before installation. Uses the same development signing key as previous downloadable builds; version code 3 permits an in-place update. Device testing remains pending.

Test Vitals against overdue deadlines, create subskills from a main skill, assign multiple sibling subskills to a mission and check each receives 45%, try all icon choices, and save the expanded character editor. Check enlarged text/interface controls on your phone and verify alarm permissions after upgrading.

# Android test builds

[Download v0.2.0 Extensive Overhaul](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.2.0-overhaul.apk)

Android 8+. Open the downloaded APK and allow installation from your browser/file manager when prompted. This is a signed development build. Export a backup first. On first launch, enable the three alarm access settings before proceeding.

Test due alerts and 0–5 pre-reminders with the app closed, reboot restoration, permission denial/regrant, mission editing/completion cancellation, and your phone’s battery controls. Device testing remains pending; no app can bypass Android force-stop or Do Not Disturb.

# Download & test Daemon Deck for Android

[Download Daemon Deck v0.1.0 APK](https://github.com/bowlperson/daemon-deck/raw/refs/heads/main/apk/daemon-deck-v0.1.0-debug.apk)

This signed development build installs directly on Android 8.0 or newer. No computer, build tools, or website account is required. It is intended for sideload testing, not a Play Store release. Physical-device testing is still pending.

## Install

1. Open the download link on your Android phone and download the APK.
2. Open the downloaded file. If Android asks, allow **Install unknown apps** for the browser or file manager you used.
3. Tap **Install**, then open **Daemon Deck**.

The app bundles its interface and fonts and can run offline. No Android permissions are requested. Keep Android System WebView up to date.

## Try it

- Create a mission with a custom image, skill, and coin reward.
- Add and finish its subtasks, then complete the mission. Check your XP and coins.
- Redeem a reward and use it from the reward shop inventory.
- Close and reopen the app to check that progress persists.
- In Settings, export a backup, then import it to verify restore. Import replaces local progress after confirmation.
- Switch to airplane mode and reopen the app to test offline use.

## Updating

Export a backup before replacing or uninstalling the app. Uninstalling removes local progress. Android only installs updates over an existing app when both APKs have the same signing key; independently built or CI-generated debug APKs may use different keys and require uninstalling first. Restore your backup afterward.

The build uses package ID `app.daemon.deck`, version `0.1.0`, minimum Android API 26 and target API 35. See [SHA256SUMS](SHA256SUMS) to verify the download. Build instructions are in the [project README](../README.md#android).
