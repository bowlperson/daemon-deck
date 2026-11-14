# Dungeon — v1.3.1

Branch: `Dungeon_Focus`. Offline match-three encounters linked to mission completion. Version 1.3 adds eight creature/robot encounters and synchronizes mana meters with individual particle arrivals. Version 1.3.1 replaces all custom enemy drawings with clean standard Lucide symbols. Weighted encounters and fixed Strike damage remain as in v1.2.

## Entry, saves and recovery

Create five distinct top-level Attributes named TECH, BODY, INTELLIGENCE, COOL and OPERATING SYSTEM, or change their links in Config → Dungeon. Name matching ignores case and surrounding spaces. Duplicate names and Skills cannot satisfy a link. Missing links show setup instructions and preserve the saved fight.

Health starts at 800. Completing missions restores one HP per awarded character XP, capped at the current maximum; zero-XP quests do not heal. Health carries between enemies. At zero HP, the battle is saved and the win streak resets. Complete missions to continue the same fight. There is no passive healing or enemy healing ability. Battle mana is separate from permanent Attribute XP and resets between opponents.

Existing v1.1 battles keep their health, board, rewards and progress. Old damage boosts are disabled. Combat and victory history use regular names, including migrated logs. Payouts and final combat state save before their animations: reloads and duplicate taps cannot award the same victory twice. Leaving Dungeon, opening a dialog, hiding the page or losing Android focus pauses future enemy scheduling. An action already committed stays saved.

## Encounter odds and rewards

| Tier | Normal odds | After 5 consecutive wins | Abilities | Crit chance per damaging action | Item-drop chance |
|---|---:|---:|---:|---:|---:|
| Low | 60% | 55% | 0 | 0% | 0% |
| Mid | 30% | 30% | 1 | 15% | 35% |
| High | 10% | 15% | 2 | 20% | 65% |

The High chance increases by 50% relative (10% → 15%). This bonus stays active until a loss, including after a High opponent is drawn. An opponent is selected uniformly within the rolled tier. Repeated opponents are possible. Level identifies an opponent's HP/reward tier; it does not scale Strike damage.

The original 35 enemies retain their IDs, names, designations, levels, rewards and mapped weaknesses. Eight new encounters bring the total to 43. Endurance maps to BODY; Perception maps to OPERATING SYSTEM. HP and rewards rise from 335 HP / €$500 at level 1 to 1,525 HP / €$8,000 at level 35. There is no campaign endpoint or opponent above the level/reward cap.

A drop comes from stocked Exchange items, uniformly selected, and goes straight to inventory. Finite stock decreases without charging money, changing prices or incrementing purchases. No available stock means no drop. Mid/High victories also grant 48 hours with maximum HP 1,600. Activating an inactive bonus adds 800 current HP; further victories refresh the timer without another free heal. Expiration clamps health to 800. These rules preserve v1.1 behavior.

Deck Vitals has six health phases. Overdue missions have a separate count: yellow at two, red at three or more.

## Board, damage and mana

The 8×8 board contains Strike plus five Attribute circuits, with Wildcards created through play. Tap two adjacent circuits, swipe, or use keyboard arrows and Enter. Invalid swaps do not use a turn. Cascades resolve completely. Four in a line during a swap or cascade grants another turn; five or more also creates a Wildcard. A Wildcard swapped with any regular circuit—including Strike—clears that type. Two Wildcards clear the whole board. Dead boards reshuffle automatically.

**Strike is always 28 damage per cleared gem for both sides**, including cascades. Attribute levels and enemy levels have no effect on this number. A player gem matching an enemy's weakness adds **7 damage** (25% of Strike). Other Attribute gems supply mana only. Enemy Attribute matches do not deal direct damage.

Each cleared usable Attribute gem adds one mana, up to 30 per channel. Players can absorb all five channels. Enemies absorb only channels used by their one or two assigned abilities; other energy dissipates. No mana or XP is awarded to permanent Attributes by combat.

Mid/High damaging actions can crit once for ×1.5 damage, rounded to the nearest integer. Cloak applies afterward, retaining only 25% of incoming damage, rounded up. A damaging action consumes Cloak; a zero-damage action does not. Critical hits have their own original impact sound and burst effect.

## Player abilities

Tap an Attribute beneath player health to inspect its ability and cost. There is no separate ability grid. Inspecting an ability or canceling targeting costs nothing.

| Attribute | Ability | Cost | Effect |
|---|---|---:|---|
| TECH | Overclock | 10 | Deal 7 damage, then halve **all** enemy mana pools, each rounded down. Ends the turn. Cloak can reduce its damage. |
| BODY | Field Patch | 10 | Choose an Attribute and add 5 mana, capped at 30. Cost is paid first, so targeting BODY gives a net −5 BODY mana. Ends the turn. Does not heal HP. |
| INTELLIGENCE | Recompile | 10 | Select row/column, then tap a cell in that line. Clear the entire line and collect Attribute mana from it and resulting cascades. Deals **no damage**, including from destroyed Strikes. Keeps the turn if the selected line contains at least four of one regular color, even nonadjacent, or a subsequent cascade matches four. Normal five-in-line cascades can create Wildcards. |
| COOL | Cloak | 10 | Reduce the next incoming damaging action by 75%. Ends the turn; cannot stack an active Cloak. |
| OPERATING SYSTEM | Wildcard Forge | 18 | Choose a non-Wildcard circuit to convert into a Wildcard. Keep the turn. |

All targeting is explicit and cancelable. No ability can be cast while defeated or during an enemy turn.

## Enemy abilities and AI

Low opponents have no special abilities and mostly choose random legal swaps, with occasional greedy choices. Mid opponents score visible matches and use their assigned ability. High opponents also consider counterplay and have two abilities. Their analysis uses hypothetical refill randomness, rather than reading the actual future refill sequence. A visible lethal match takes priority.

Each Mid/High character has a named loadout fitting their designation. Effects include fixed direct damage (56 Mid / 84 High, before crits/Cloak), halving the player's largest mana pool, blocking the next hit, forging a Wildcard or clearing a row for Strike damage and usable mana. Enemy abilities never heal. The enemy card shows each assigned ability's mana meter; Info explains the effects and costs.

## Presentation and icons

The Dungeon header is shorter and retains time/date/battery telemetry with center-camera clearance on mobile. Tap the enemy card to toggle its saved compact view. Zen hides navigation, including the desktop sidebar; Exit zen stays visible on the game screen. The combat log is always open and separates actor, damage, mana, crits, defense and extra-turn information.

COOL uses shades. Config can make all five Dungeon Attribute icons mirror their linked Attributes, including uploaded images. Strike and Wildcard never change. All 43 enemies use simple, unmodified Lucide symbols matching the existing library: a dog for Mongrel, a bear for Yao Guai, a bug for Radroach, a rat for Mole Rat, and recognizable tools/items for human enemies. All saved icon IDs stay stable. The shared picker has 244 named choices, including intentional reuse of existing symbols. See the [visual preview and source credits](ICON-SOURCES.md).

Turns use staged selection, a 380ms swap, destruction, viscous outward particles, accelerating mana absorption and settling. Enemy-selected cells are outlined for one second before the swap; the grid perimeter stays red through enemy presentation. Unusable/full mana fades, while usable mana travels to the matching combatant's meter. Each main mana mote represents exactly one point; its two decorative trails do not add points. Motes arrive sequentially and the corresponding number and bar advance at each arrival. Costs show before incoming mana. Field Patch uses the same timed arrivals; reduced motion retains a brief ordered number count without particles. Offscreen meters still update. Visual updates never write to saved state or re-award mana; interruption reconciles to the already-saved result. Strike particles dissipate; impact feedback indicates the damaged combatant. Presentation handles at most five cascade frames and 192 particles per frame on phones; all cascades still count in saved results. Reduced motion skips particle/movement effects but retains accounting, messages and optional sound. Game audio respects the global mute/volume and Dungeon sound toggle; effects are original synthesis.

## Added creatures and robots

New opponents use the existing tier odds, crit/drop rules and level-based HP/reward formula. No enemy gains a healing ability; Strike remains 28 damage for every opponent.

| Opponent | Tier / level | HP | Reward | Abilities |
|---|---|---:|---:|---|
| Radroach | Low / 2 | 370 | €$720 | None |
| Mole Rat | Low / 5 | 475 | €$1,382 | None |
| Mongrel | Low / 8 | 580 | €$2,044 | None |
| Yao Guai | Mid / 19 | 965 | €$4,470 | Maul |
| Mister Gutsy | Mid / 21 | 1,035 | €$4,911 | Suppressing fire |
| Protectron | Mid / 14 | 790 | €$3,367 | Laser pulse |
| Assaultron | High / 31 | 1,385 | €$7,117 | Head laser, Optical cloak |
| Deathclaw | High / 35 | 1,525 | €$8,000 | Savage lunge, Rending sweep |

Circuit art uses a fixed centered face and SVG bounds normalization, so shape geometry rather than font baselines determines alignment. Uploaded images stay centered with their aspect ratios preserved. No custom portrait or monster drawing code remains in the current icon module.

## Validation and limitations

All 132 automated tests pass. Domain tests cover weighted sampling, pity reset, fixed damage, weaknesses, crit probabilities, exact-once rewards, all player/enemy abilities, mana filtering, persistence, migration, health bonuses and loot. Browser checks cover targeting, compact/Zen controls, custom icons/images, enlarged mobile layouts, the one-second enemy cursor, particle stages, offline play, native scheduling deduplication and focus pause/resume. Android build and signing checks accompany the downloadable development APK.

A focused simulation completed all eight new opponents without stalled fights. The previous deterministic 70-encounter simulation also completed; later tiers needed substantially more actions and mission recovery. Automated simulations check for stalled fights, not human enjoyment or final balance. Physical-device touch/audio/performance and Android interruptions still need testing. Export a backup before installing an update.
