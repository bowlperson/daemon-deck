# Latest Android build / v1.12.0 — Streak records and tougher opponents

[Download v1.12.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.12.0-dungeon.apk)

Android version code 38, same signing certificate. Encounter odds advance every five consecutive wins, reaching 50% Mid/50% High at 20 and 100% High at 45. Small Streak History control opens dated current/highest runs and a Boss Streak section for consecutive High-tier victories. First death per enemy preserves streaks; the second breaks them. Timeout loses both streaks and encounter. Mid/High maximum and existing remaining HP double once; player HP and rewards stay unchanged. Backups preserve counters/history, and old replays retain original health/damage accounting. Validation: 271 tests, mobile dialog/combat/reload checks and 560 simulated combat commands. Physical-device testing remains pending.

# Previous Android build / v1.11.0 — Mine health and ownership

[Download v1.11.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.11.0-dungeon.apk)

Android version code 37, same signing certificate. Mine placement is top-row only for Mine Kits and Minefield. Both sides can swap a Mine if it makes a legal move; it explodes immediately regardless of health. Mines have 2 HP shared between falling and clears above in the same column, with no damage from side clears. Health-triggered explosions wait for gravity to settle. The mover takes damage; the creator takes half (rounded up), retaining a 30% self-cripple chance. Mystery cap increases to six. Full top rows offer a Mine Kit discard so setup cannot block combat. Validation: 260 tests, mobile controls and 583 simulated combat commands across 13 enemy loadouts. Physical-device testing remains pending.

# Previous Android build / v1.10.1 — Mystery spawning and one-time board reset

[Download v1.10.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.10.1-dungeon.apk)

Android version code 36, same signing certificate. Fresh boards, no-moves reshuffles and double-Wildcard wipes contain no Mysteries. Normal refills can introduce them only in the top row, up to five on the board. Existing fights receive a one-time board reset on first Dungeon entry after updating; board objects and pending setup choices clear while health, mana, enemy, currency and deadline persist. Validation: 249 tests and browser upgrade/entry/reload checks. Physical-device testing remains pending.

# Previous Android build / v1.10.0 — Special circuits and mission selection

[Download v1.10.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.10.0-dungeon.apk)

Android version code 35, same signing certificate. Mystery health now responds to falls and orthogonal clears. Grenade, Mine Kit, Turret, Machine Gun and Battery replace the old reveal pool. Random Mines are removed; Minefield and Mine Kits provide Mines. Setup choices persist across reloads and are implemented for AI. Mission cards use their artwork and a small corner completion control; hold to select multiple missions, then confirm deletion. [Rules, migration and validation](../docs/DUNGEON.md#special-circuit-rework-v1100). Physical-phone testing remains pending.

# Previous Android build / v1.9.3 — Fewer player-card hints

[Download v1.9.3](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.9.3-dungeon.apk)

Android version code 34, same signing certificate. Removes the Mine drop warning from the player card and hides the Attribute-tap hint in compact mode. Expanded mode retains the ability hint. Combat rules, counters and controls are unchanged.

# Previous Android build / v1.9.2 — Tighter player card

[Download v1.9.2](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.9.2-dungeon.apk)

Android version code 33, same signing certificate. The compact player card matches the supplied five-tile layout, reducing its default 390 px height from 208 to approximately 165 px. Tight name/HP, a thin health bar, short status/recovery rows and one-line Attribute labels retain every ability, cost and active status. Expand/collapse preferences persist. Charge remains removed and Field Patch still costs 12. Mobile checks include 320–430 px widths, 100–160% text, active status visibility, ability gating and combat-state integrity. Physical-phone testing remains pending.

# Previous Android build / v1.9.1 — Charge removed

[Download v1.9.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.9.1-dungeon.apk)

Android version code 32, signed with the existing certificate. Charge ×2 is removed from both actors, AI and combat UI. Four-match extra turns and five-match Wildcards remain. Existing saves lose only obsolete live Charge progress; historical replays preserve their original accounting. Automated gameplay/migration tests and mobile browser checks cover the removal and enlarged text. Physical-phone testing remains pending.

# Previous Android build / v1.9.0 Player card and turret retirement

[Download v1.9.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.9.0-dungeon.apk)

Android version code 31, same signing certificate. Turrets retire when they reach the bottom; one created there fires once and disappears. Its gravity and cascades grant normal mana/damage and resolve all objects. Player cards gain a compact layout with a saved expand/compact toggle, retaining every ability control and status. Field Patch costs 12 BODY mana. Validation: 235 automated tests plus mobile browser layout, cost gating, bottom-shot/cascade accounting and replay checks. Physical-phone testing remains pending.

# Previous Android build / v1.8.0 Falling objects and tactical AI

[Download v1.8.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.8.0-dungeon.apk)

Android version code 30, same signing certificate. Mines and Mystery tiles cannot be selected. Mines detonate after falling two cumulative rows, damaging whoever caused the final drop. Mystery tiles activate after three rows or in horizontal/vertical groups of three; all group outcomes resolve before gravity and protect one another from group Grenades. Mimic copies the piece below at landing or disappears if there is none. Fuse counters persist across turns/reloads. Minefield now maintains up to two physical Mines with the same fall rules. All enemy tiers use tactical search for damage, mana, Mine self-damage, Mystery rewards, abilities, extra turns, Turrets and player counterplay; higher tiers search more replies. The AI samples unknown outcomes independently of combat RNG. Existing fights and historical replays migrate without replaying rewards. [Full rules](../docs/DUNGEON.md).

Validation: 230 automated tests, 2,000 object swaps, a full 64-Mystery batch and 43 complete simulated fights over 1,937 actions. Browser checks cover counters, immutable tiles, protected group animation, Mine explosions, Mimic disappearance, replays and migration from a real v1.7.1 save. Physical-phone testing remains pending.

# Previous Android build / v1.7.1 Compact enemy cards

[Download v1.7.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.7.1-dungeon.apk)

Android version code 29, same signing certificate. Character Info now shows only the assigned talent’s values. Delroy no longer lists Mine, Plating or Countercharge statistics. New compact cards retain the original icons, every weakness, attacks, HP, level/tier, Charge/status, talent timer, all paid ability names/costs/mana meters and rewards/loot availability in shorter rows. The previous compact card becomes Expanded and replaces the former large view. Class and full linked Attribute names remain in Info. Existing view preferences, saved fights and combat rules are preserved. [Full rules](../docs/DUNGEON.md).

Validation: 202 automated tests; all 43 Info/card layouts; dynamic status/mana controls, persistent view switching, unchanged combat state when inspecting, and enlarged mobile text. Physical-phone testing remains pending.

# Previous Android build / v1.7.0 Charge and Mystery objects

[Download v1.7.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.7.0-dungeon.apk)

Android version code 28, same signing certificate. Field Patch restores 10 HP per cleared circuit while retaining no mana, half-Strike-only damage and its three-swap limit. Enemy mana theft/drain is halved. Persistent Charge doubles the next valid swap after two separate 4+ moves. Normal Strike hits can cripple at 15%, critical hits at 30%, locking one random regular type for one action. Four Mystery outcomes—Stim, Grenade, Mimic and a half-weight Turret—plus separate swap-only Mines add board decisions. Turrets fire for 25 on owner actions and break after three cumulative rows of falling. Short Strike rounds and card impacts return; four-matches gain bright sparks and five-matches rainbow glow. Compact enemy telemetry is shorter. The six object icons are reusable in the shared library. Existing saves and replays migrate. [Full rules](../docs/DUNGEON.md).

Validation: 202 automated tests, all 43 enemies simulated over 2,166 actions, special-board stability, mobile browser effects/controls, offline play, native scheduling and exact replay accounting. Physical-phone gameplay/audio/performance still need testing.

# Previous Android build / v1.6.0 Strategic enemy talents

[Download v1.6.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.6.0-dungeon.apk)

Android version code 27, same signing key. Field Patch heals 5 HP per cleared circuit, gains no mana and deals only half-strength Strike damage (14 each) during its three swaps. Low/Mid enemies have one attack Attribute and one active ability; High enemies have two of each. All 43 have curated strategic abilities and an automatic free talent. Eight talents include visible mines, two-action refill concealment, one-action double Strikes, mana theft, flat armor, a mana-channel lock, Countercharge and High-only Grid Reboot. Compact cards, Info and combat logs show effects and timing. Existing fights and saved replays migrate without resetting progress. See [complete rules](../docs/DUNGEON.md). 172 automated tests, all-opponent simulation and mobile browser checks passed; physical-phone testing remains pending.

# Previous Android build / v1.5.2 Field Patch balance

[Download v1.5.2](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.5.2-dungeon.apk)

Android version code 26, same signing key. Field Patch heals 10 HP per destroyed circuit, including cascades and Wildcards. Its three-swap sequence, 10 BODY mana cost and shared 1,300-HP encounter recovery budget are unchanged. Descriptions and the active status reflect the new amount.

# Latest Android build / v1.5.1 Clean combat cards

[Download v1.5.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.5.1-dungeon.apk)

Android version code 25, same signing key. Removes glass cracks, bullet holes, scorch marks and projectile visuals from combat and replays. Keeps clean stat cards, damage numbers, card shake, sounds, mana glow and Cloak outlines. Existing fights and replays load normally; combat rules are unchanged. Physical-phone testing remains pending.

# Latest Android build / v1.5.0 Dungeon mechanics

[Download v1.5.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.5.0-dungeon.apk)

Android version code 24, same signing certificate. Permanent 1,400 HP; a 1,300-HP non-mission healing budget per encounter with Stim Fatigue; missions bypass the budget. Encounters expire after seven days. New TECH damage, three-swap Field Patch, damaging Recompile and two-action reflecting Cloak. Persistent glass damage, compact weaknesses and replayable last player/enemy actions. Existing fights migrate with seven days from upgrade; old logs stay readable. See [complete rules](../docs/DUNGEON.md). Physical-phone testing remains pending.

# Latest Android build / v1.4.0 Combat feedback

[Download v1.4.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.4.0-dungeon.apk)

Android version code 23, same signing key. Glowing mana, distinct match-four/five sound and visual cues, single-shot Strike projectiles, fading scorch marks, card shake and half-size damage numbers. Win recovery is 300 HP, reduced to 150 by active extended missions at least 14 days beyond the original deadline; a once-per-local-day notice lists them. The boss health-cap bonus no longer adds 800 HP separately. Effects respect mute/volume and reduced motion. Physical-device audio/performance testing remains pending.

# Latest Android build / v1.3.1 Icon cleanup

[Download v1.3.1](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.3.1-dungeon.apk)

Android 8+, version code 22, same development signing certificate. Replaces the custom enemy drawings with simple, standard Lucide symbols matching the existing icon library. Mongrel uses Dog; Yao Guai uses Bear Face. All 43 enemy assignments and saved icon IDs remain distinct and stable. [Preview and source credits](../docs/ICON-SOURCES.md). Combat, centering and timed mana counters are preserved. Physical-phone testing remains pending.

# Latest Android build / v1.3.0 Dungeon

[Download v1.3.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.3.0-dungeon.apk)

Android 8+, version code 21, same development signing certificate. Replaces all 35 portrait icons with specific item emblems, adds Radroach, Mole Rat, Mongrel, Yao Guai, Mister Gutsy, Protectron, Assaultron and Deathclaw encounters, and expands the shared library to 244 icons. Centers circuit art and counts mana point by point as motes arrive, including enemy absorption and Field Patch. Saved IDs/fights, fixed damage and encounter odds are preserved. See [full rules and validation](../docs/DUNGEON.md). Physical-phone touch/audio/performance testing remains pending.

# Latest Android build / v1.2.0 Dungeon

[Download v1.2.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.2.0-dungeon.apk)

Android 8+, version code 20, same development signing certificate. Random encounters with streak pity, fixed Strike damage, revised player abilities, tier-specific enemy abilities/criticals, personalized portraits, Attribute icon mirroring, staged particles/swaps, compact cards, Zen and an open combat log. Existing fights migrate without removing progress; aliases in old Dungeon logs/history are replaced with regular names. See [full rules and validation](../docs/DUNGEON.md). Export a backup before updating. Physical-phone gameplay, audio and interruption testing remain pending.

# Latest Android build / v1.1.0 Dungeon

[Download v1.1.0](https://github.com/bowlperson/daemon-deck/raw/refs/heads/Dungeon_Focus/apk/daemon-deck-v1.1.0-dungeon.apk)

Android 8+, version code 19, signed with the existing development certificate. Adds the 35-boss Dungeon campaign, Attribute mapping, health from mission XP, five abilities, tiered AI, rewards and loot. Health carries between encounters; mid/high victories grant a 48-hour 1,600 maximum-HP bonus. See [full rules and validation](../docs/DUNGEON.md). Export a backup before updating. Physical-device gameplay, sounds and interruption testing remain pending.

# Latest Android build / v1.0.3

[Download v1.0.3](https://github.com/bowlperson/daemon-deck/raw/refs/heads/New_UI_and_Mechanics/apk/daemon-deck-v1.0.3-ui2.apk)

Extend due date from quest details. Original deadlines remain visible alongside extended deadlines and an original-date age counter. Android version code 18, same signing key.

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
