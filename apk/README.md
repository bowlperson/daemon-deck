# UI 2.0 update — v1.0.2

[Download v1.0.2](https://github.com/bowlperson/daemon-deck/raw/refs/heads/New_UI_and_Mechanics/apk/daemon-deck-v1.0.2-ui2.apk)

Android version code 17, same signing key. Urgency is border-only by default. Each theme/level has separate border and optional card-fill controls. Custom fills sit beneath content; scoped text contrast protection keeps labels readable. Use normal theme fill resets the fill independently. Physical-device testing remains pending.

# UI 2.0 update — v1.0.1

[Download v1.0.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/New_UI_and_Mechanics/apk/daemon-deck-v1.0.1-ui2.apk)

Android version code 16, same signing key. Reorganized Customize, mission-only title-color control removed, visual Urgency 1–5, independent theme urgency palettes, and saved/original color swatches across pickers. Reward dialog uses tap-to-skip and a three-second hold after effects (three seconds total in reduced motion). Physical-device testing remains pending.

# UI and Mechanics 2.0 branch — v1.0.0

[Download v1.0.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/New_UI_and_Mechanics/apk/daemon-deck-v1.0.0-ui2.apk)

Android 8+, version code 15, existing development signing key. Calmer interface controls, expanded character studio and centered animated reward transfers. Currency, balances and prices scale together 100× to €$ units once; export a backup before updating. Character controls and GIF support remain local. Reduced motion and a Continue button let you limit reward presentation. Physical-phone usability/audio testing remains pending. See [UI rationale](../docs/UI-2.0.md).

# Notification/Alarm Audio branch — v0.9.0

[Download v0.9.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Notification_Alarm_Audio/apk/daemon-deck-v0.9.0-alerts.apk)

Android 8+, version code 14, same signing key. All alerts default to notifications. Toggle Alarm separately for pre-reminders and deadlines in Schedule. Config offers Android sound lists and audio-file selection for notification and alarm defaults; missions can override either type when used.

Volume-button dismissal defaults on and works while the alarm screen is active, including over the lock screen when Android allows it. Grant alarm-screen access on Android 14+; without it Android may keep the alarm behind a notification, where hardware keys cannot be globally intercepted. A Dismiss notification action is available. Ringing auto-stops after ten minutes; simultaneous alarms replace the current ringing audio.

Phone testing is pending: verify screen-off delivery, uploaded audio and OS jingles for both types, mission override/global fallback, volume-key dismissal on/off, full-screen permission denied/granted, reboot restoration, and deletion/completion canceling pending reminders. Audio file references are device-local and must be reselected after backup transfer.

# Latest Android build / v0.8.5

[Download v0.8.5](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.5-overhaul.apk)

Most Recent is the default mission sort. Suggested is removed. Android version code 13, same signing key.

# Latest Android build / v0.8.4

[Download v0.8.4](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.4-overhaul.apk)

Today is the default mission view; All replaces Pending. Most recent orders by creation time. Settings ends with a completion audit and typed-CONFIRM XP reset. Credits, missions and history survive reset. Android version code 12, same signing key. Device testing remains pending.

# Latest Android build / v0.8.3

[Download v0.8.3 — Attribute & Skill Description Previews](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.3-overhaul.apk)

Android 8+, version code 11, same development signing key. Hold or tap Attribute/Skill icons in Mission or Side Quest Rewards to read their descriptions. Locked Skills remain inspectable. Previews preserve the draft and XP selections. Physical-device testing remains pending.

# Latest Android build / v0.8.2

[Download v0.8.2 — XP Assignments, Tab Spacing & Battery](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.2-overhaul.apk)

Android 8+, version code 10, same development signing key. Attributes and Skills use contrasting colors and type labels in Rewards. Enable an Attribute to unlock its Skills; disabling it clears those selections. Bottom tabs size to their labels and scroll, including enlarged text. The header shows actual battery percentage, charging and low-battery state without new permissions. Physical-phone testing remains pending.

# Latest Android build / v0.8.1

[Download v0.8.1 — Swipe Navigation & Mission Labels](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.1-overhaul.apk)

Android 8+, version code 9, same development signing key. Mission cards show one quest-type tag, with Main shortened on the mission list. Calendar presentation is preserved. Swipe across content to switch main tabs or mission editor sections; editor drafts remain intact. Input controls and scrolling areas retain their gestures. Physical-device testing remains pending.

# Latest Android build / v0.8.0

[Download v0.8.0 — Completion, Attributes & Protected Tags](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Extensive_Overhaul/apk/daemon-deck-v0.8.0-overhaul.apk)

Android 8+, version code 8, signed with the same local development key as v0.7.0. Export a backup before updating. Physical-device testing remains pending.

Test completion from the board, quest details and Calendar, including remaining subtasks, child blockers, zero-XP missions and repeatable side quests. Completed events should remain desaturated with a checkmark in the calendar list and timed Day/Week/Schedule views. Optional history cleanup is in Config: disabled by default, 4 years initially, adjustable 1–8 years from quest creation.

Open Attributes to create a Skill. Each automatically gets a required named tag; selecting the entity on a quest applies its tag. Test tag reassignment in the entity editor, protected deletion, immutable Main Mission/Side Quest tags, and mixed multi-select Attribute/Skill/tag filters in Missions and Calendar. Confirm existing XP and assignments survive the update.

On a Pixel, verify status/navigation bars and the gesture line hide during normal use, swipe temporarily reveals them, and the camera cutout and keyboard remain usable. Android controls final navigation visibility.

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
