# Dungeon — v1.1.0

Branch: `Dungeon_Focus`. A local, offline-capable 35-encounter match-three campaign. Existing missions, calendar, notifications, character customization and saved progress remain available.

## Entry and health

Dungeon requires five distinct top-level Attributes: TECH, BODY, INTELLIGENCE, COOL and OPERATING SYSTEM. Names are matched case-insensitively, ignoring surrounding spaces. Config → Dungeon allows each circuit to map to a different Attribute name. Missing or ambiguous names show setup instructions instead of the board. Skills do not satisfy this requirement. No existing Attributes are silently renamed.

Player health starts at 800. Completing a mission restores one HP per awarded character XP, capped at the current maximum. Zero-XP missions restore zero HP. Combat does not generate character or Attribute XP. Board Attribute points are temporary combat resources, separate from permanent XP.

Health carries between encounters. At zero HP the fight, enemy health and board are saved; completing missions restores health and permits continuing. There is no passive refill. The next enemy starts with its own full health. This interpretation preserves the requested connection between completing missions and returning to combat.

Deck Vitals now reflects health in six phases: strong, steady, strained, low, critical and offline. A separate overdue-mission count turns yellow at two and red at three or more.

## Board and turns

The 8×8 shared board has Strike tiles plus five Attribute circuits. Swap adjacent tiles by tapping two cells, swiping, or using keyboard arrows and Enter. Invalid swaps cost no turn. Cascades resolve before control changes. A match of four or more in a swap or cascade grants another turn; a line of five or more also leaves a wildcard. Swap a wildcard with a circuit to clear that type, or swap two wildcards to clear the board. Dead boards reshuffle automatically.

Strike matches damage either combatant. Player matches of an enemy's weak Attribute deal **25% of the equivalent normal Strike damage**. Other Attribute matches supply points without direct damage. Endurance in the supplied enemy roster maps to BODY; Perception maps to OPERATING SYSTEM. Enemy Attribute matches charge abilities but do not directly hurt the player.

Player Strike power grows modestly with the five mapped Attribute levels. Enemy Strike power grows with level. Combat state and payouts save before their presentation; repeated taps and stale turns cannot claim another payout. Leaving Dungeon, opening a modal, hiding the page or losing Android window focus pauses enemy scheduling. An action already committed remains saved.

## Five abilities

Points accumulate separately for each side, capped at 30 per Attribute. Unspent points reset for the next boss.

| Circuit | Ability | Cost | Effect |
|---|---|---:|---|
| TECH | Overclock | 10 | +50% Strike damage on the next two swaps; uses a turn. |
| BODY | Field patch | 10 | Heal up to 120 HP; uses a turn. Cannot revive at zero HP. |
| INTELLIGENCE | Recompile | 10 | Replace the board with a playable grid, losing existing wildcards; uses a turn. |
| COOL | Cloak | 10 | Reduce the next damaging enemy swap by 75%; uses a turn. |
| OPERATING SYSTEM | Wildcard forge | 18 | Convert a chosen circuit to a wildcard and keep the turn. |

Low enemies mostly choose random legal moves, occasionally choosing immediate value. Mid enemies score visible matches and use abilities. High enemies also consider likely counterplay. Hypothetical refill samples differ from actual future refill randomness, so the AI does not read the actual future grid. Mid/high enemies prioritize a visible lethal Strike match.

## Campaign rewards

All 35 supplied aliases, names and designations are included in roster order, with the supplied weaknesses mapped as above. Boss HP and rewards strictly increase: level 1 has 335 HP and pays €$500; level 35 has 1,525 HP and pays €$8,000. The first 11 enemies are low, the next 12 mid, and the final 12 high. A completed campaign can restart at level 1 without resetting earned currency or refilling health.

Mid victories have a 35% item-drop chance and high victories 65%. A drop is selected uniformly from currently stocked Exchange items, enters inventory and consumes finite stock. It does not charge currency, increase prices or count as a purchase. An empty eligible pool means no item drop; the UI states this. Existing library icons represent enemies and loot, avoiding a separate inaccessible set of game-only icons.

Every mid/high victory grants a 48-hour maximum-health bonus: 1,600 instead of 800. Activating an inactive bonus adds 800 current HP; another victory while it is active refreshes the duration without another free heal. Expiration clamps health to 800. Mission healing remains 1:1. Bonuses never stack above 1,600. Victory receipts show credits, item drops and health; payout history persists through reloads.

## Presentation and validation

Large touch targets, shape-plus-color circuits, explicit turn messages, bounded cascade effects, optional game sounds and reduced-motion support keep feedback legible. Game sounds respect the existing global sound controls. Native notification synchronization is deduplicated so tile selection does not repeatedly query permissions or reschedule unchanged reminders.

Validation includes 112 automated domain tests; browser checks for setup gating, swapping/AI, reload persistence, victory, defeat/mission recovery, abilities, keyboard controls, enlarged mobile layouts, native bridge call counts, pause/resume and offline combat. A deterministic automated campaign completed all 35 bosses without stalled fights; later tiers required substantially more turns and healing than early tiers. This is a balance smoke test, not a substitute for human playtesting.

The APK is a development build signed with the existing project certificate. Physical-phone gameplay, audio, lifecycle interruptions and performance still need device testing. Export a local backup before updating.
