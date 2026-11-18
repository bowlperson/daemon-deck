# Dungeon — v1.6.0

Branch: `Dungeon_Focus`. Offline match-three encounters linked to missions, with 43 opponents and a permanent 1,400-HP maximum.

## Health, recovery and Stim Fatigue

New players start at **1,400 HP**. All temporary maximum-HP bonuses have been removed, including High-tier bonuses. Health carries between encounters.

Each encounter has a **1,300-HP recovery budget**, shared by all non-mission healing: Field Patch and victory recovery. Only HP actually restored consumes the budget; attempted healing at full health does not. At 1,300 used, the player card displays **Stim Fatigue · Mission healing only**. The next encounter resets that budget.

Mission XP always restores HP at 1:1, capped at 1,400. It bypasses the encounter budget, never consumes it and remains available during Stim Fatigue. At zero HP the player cannot act; missions can revive them to continue the saved fight, provided its deadline has not passed.

Wins attempt to restore 300 HP, or 150 if an unfinished extended mission is at least 14 elapsed days beyond its original deadline. The actual amount is limited by available health capacity and the remaining recovery budget. A once-per-local-day popup lists qualifying missions. No enemy grants a separate maximum-HP or free-healing bonus.

Deck Vitals reflects health in six phases. A separate overdue-mission count turns yellow at two and red at three or more.

## Seven-day deadline

Every encounter starts a persisted **seven-day wall-clock timer**, including time while the app is closed or the player is defeated. A countdown and local deadline appear beneath the enemy card.

At the deadline the encounter is lost, its win streak resets and no rewards are awarded. Combat and mission revival cannot resume an expired fight. Find another opponent to begin a new seven-day encounter with a new healing budget; current HP carries over. Missions can still heal the player outside combat.

Existing v1.4 fights receive seven days from their first upgrade because previous versions did not record an encounter start timestamp. Existing normal-health deficits are preserved when increasing the old base to 1,400 (+600 current HP, capped at 1,400); zero HP stays zero. Previously bonus-buffed health is clamped to the new maximum. Enemy health, board, mana, missions, currency and inventory are preserved. Old log text remains readable; only actions recorded after this update have replays.

## Entry and circuits

Dungeon requires five distinct top-level Attributes: TECH, BODY, INTELLIGENCE, COOL and OPERATING SYSTEM. Config can map each circuit to another Attribute name. Name matching ignores case and surrounding spaces; duplicate names and Skills cannot satisfy a link. Missing links show instructions without deleting the fight.

The shared 8×8 grid contains Strike plus five Attribute circuits. Tap adjacent circuits, swipe or use arrows and Enter. Invalid swaps use no turn. Cascades resolve fully. Four in a line normally grants another turn; five or more also creates a Wildcard. Swap a Wildcard with any regular type, including Strike, to clear that type; swap two Wildcards to clear the board. Dead boards automatically regenerate, losing existing Wildcards but preserving health and mana.

Strike is **28 damage per cleared gem**, for both sides, unaffected by Attribute/enemy levels. Player matches of an enemy's weak Attribute add **7 damage per gem**. Endurance in the original roster maps to BODY; Perception maps to OPERATING SYSTEM. Non-weak Attributes grant mana without direct damage. Every enemy has designated **attack circuits** that deal **7 damage per cleared gem** to the player, the same quarter-Strike rule as player weakness damage. Low and Mid enemies have one attack Attribute; High enemies have two. The channels are visible in compact and full cards. They are additional damage sources, not changes to the five permanent player Attributes. Only the selected channels hurt; other enemy Attribute matches just collect usable mana.

Each cleared Attribute circuit supplies one combat mana, up to 30 per pool, including cascades and row/column clears. Players collect all five channels; enemies collect only channels used by their assigned abilities. Strike and Wildcard have no mana pool. Combat mana is separate from permanent Attribute XP; combat grants no character/Attribute XP.

## Player abilities

Tap the corresponding Attribute beneath player health to inspect or activate an ability. Opening an explanation or canceling targeting costs nothing.

| Attribute | Ability | Cost | Effect |
|---|---|---:|---|
| TECH | Overclock | 10 | Deal 65 damage. Against a TECH-weak enemy **or a robot**, deal 100 instead, with a 15% critical chance for 150. Also halve every enemy mana pool, rounding down. Ends the turn. |
| BODY | Field Patch | 10 | Enter a **three-swap sequence**, healing **5 HP per destroyed circuit**, subject to the recovery budget and maximum HP. **No mana is gained. Only Strikes damage the enemy, at half strength: 14 per gem.** Activation does not consume a swap. |
| INTELLIGENCE | Recompile | 10 | Choose a row or column, then a cell. Destroy that line and resolve cascades. Collect all destroyed Attribute mana up to pool caps; Strikes deal 28 each and weakness circuits deal 7 each. Retain the turn if the selected line contains four of one regular color, even nonadjacent, or a cascade matches four. |
| COOL | Cloak | 10 | Reduce damage by 50% for the next **two enemy actions**. Each damaging action reflects **25 + actual HP lost after reduction** to the enemy. Ends the turn. |
| OPERATING SYSTEM | Wildcard Forge | 18 | Convert a selected non-Wildcard circuit into a Wildcard and keep the turn. |

Field Patch counts only valid swaps. Invalid swaps consume no play. Other abilities are unavailable until its sequence ends. Four/five matches can still produce Wildcards but do not add more plays. After the third swap, control passes to the enemy regardless of ordinary extra-turn matches. A double-Wildcard wipe counts all 64 cleared cells, plus resulting cascade clears, for healing, then immediately ends the sequence even with unused plays. Each cleared cell—including a destroyed Wildcard—counts once per cascade frame. Stim Fatigue prevents recovery but does not prevent the three swaps or their half-strength Strike damage. The no-mana/Strike-only/half-damage restrictions apply only during Field Patch. Normal player mana and weakness damage resume after its sequence ends. Visible mines can still hurt the player during Field Patch, and Cloak can still reflect those hits.

Cloak lasts through two enemy actions, including extra-turn swaps and zero-damage abilities. It decrements once per normal enemy action, not per cleared gem. Free talent casts do not consume Cloak duration. Mines triggered during a player action can also be reduced and reflected without consuming an enemy-action duration. Reduction rounds up, then reflection uses the actual HP lost (not overkill damage). Reflection is direct damage, can defeat the enemy and does not recursively reflect or consume enemy protection. If both combatants reach zero from the same protected hit/reflection, the reflection victory resolves first; normal capped victory recovery then applies. Enemy shield abilities retain their separate 75% one-damaging-action protection.

Mister Gutsy, Protectron and Assaultron qualify as robots. A human who works with robots is not automatically a robot, though TECH weakness independently qualifies them for enhanced Overclock damage.

## Encounters, AI and rewards

| Tier | Normal odds | After 5 consecutive wins | Abilities | Crit chance per damaging action | Item-drop chance |
|---|---:|---:|---:|---:|---:|
| Low | 60% | 55% | 1 | 0% | 0% |
| Mid | 30% | 30% | 1 | 15% | 35% |
| High | 10% | 15% | 2 | 20% | 65% |

An opponent is drawn uniformly within the rolled tier. The High chance rises by 50% relative (10% to 15%) after five consecutive victories, remaining active until a loss/expiry. Repeated opponents are possible. Levels identify HP/reward difficulty, not Strike damage.

The original 35 named enemies and the eight added encounters retain their levels/rewards. Creature additions are Radroach, Mole Rat, Mongrel, Yao Guai, Mister Gutsy, Protectron, Assaultron and Deathclaw. HP ranges 335–1,525; currency rewards range €$500–8,000. There is no campaign endpoint.

Low AI mostly chooses random legal moves, with occasional greedy choices. Mid enemies score visible matches and use their one ability. High enemies also consider counterplay and have two abilities. AI refill simulations differ from actual future randomness; the AI does not read the incoming grid. A visible lethal damage match takes priority. Enemy abilities never heal. AI values its own attack circuits and active talents; it still cannot know actual future refills.

Enemy criticals multiply damage by 1.5, rounded to the nearest integer, before protection. Enhanced Overclock has its own 15% player critical chance; regular player attacks do not otherwise crit.

Successful item rolls choose uniformly among currently stocked Exchange items and add one to inventory, consuming finite stock without spending currency, changing prices or incrementing purchase counts. Empty stock means no item. Currency and eligible victory healing are awarded independently of drops.

## Strategic enemy abilities and free talents

[All 43 enemy assignments](DUNGEON-LOADOUTS.md) have curated loadouts: **one active ability and one talent** for Low/Mid, **two active abilities and one talent** for High. Their attack circuits are the same channels that charge their abilities. Active abilities spend mana and are board/control effects instead of independent flat-damage attacks:

- **Line clear:** destroy a selected row or column, collect usable mana and apply Strike/attack-circuit damage. Four of one regular color in the line, or a four-match cascade, can retain the turn.
- **Strike conversion:** convert up to 1/2/3 circuits into Strikes (Low/Mid/High), then resolve created matches and cascades.
- **Mana drain:** steal up to 3/5/7 mana from the player's largest pool, then convert one board circuit into an attack circuit.
- **Wildcard disruption:** drain up to 3/5/7 of the player's strongest mana and replace up to 1/2/3 Wildcards with attack circuits. Newly created matches resolve normally.
- **Shield:** block 75% of the next damaging player action and add two own-channel mana.
- **Forge:** create a Wildcard beside a useful circuit and keep the turn. It still costs mana; the AI does not repeatedly forge an already Wildcard-filled board.

Ordinary active abilities cost 8/10/12 mana by tier; Forge costs 8/12/18. Their descriptions and costs appear on the enemy card's Info panel. Line/conversion attacks use the actual destroyed circuits, including cascades and attack Attributes. No old flat-damage ability remains active. Yao Guai's Maul now clears a row; those destroyed circuits actually supply its damage and mana in the same action.

Talents are automatic **free bonus actions**, followed by the enemy's normal move or paid ability. They do not spend mana, heal enemies, advance the enemy-action counter, consume Cloak duration or recursively trigger themselves. The first cast is before normal enemy action three, except Grid Reboot (five). Extra-turn swaps and paid abilities count as normal actions for timing.

| Talent | Effect | Timing after activation |
|---|---|---|
| Minefield | Arm exactly two visible cell traps. A player clear of either cell deals 20/30/45 raw damage per mine by tier. Enemy clears do not trigger them. Mines stay attached to grid positions, not falling pieces; each triggers once. A recast replaces any old mines, so at most two stay armed. | Free casts before actions 3, 6, 9… |
| Signal Veil | Random newly generated refill pieces are hidden (20%/35%/50% chance by tier). Existing pieces stay visible; hidden survivors retain their masks when swapped or falling. Masks conceal color, icon and accessible name. | Lasts two player actions. All masks then reveal; only then does the three-full-enemy-action cooldown begin. |
| Strike Overdrive | Next enemy action deals 56 per Strike instead of 28. Attack-Attribute damage stays 7. It expires even if the enemy uses a non-damaging ability. | One enemy action, then three full enemy actions before reactivation. |
| Mana Siphon | Steal 2/4/6 actual stored mana from the player's largest pool and add it to the enemy's primary ability channel, respecting its 30 cap. | Free casts every three normal enemy actions. |
| Reactive Plating | Flat reduction of 8/16/24 damage per incoming player action, before any separate shield. Cannot heal or turn damage negative. | Two player actions, then a three-full-enemy-action cooldown. |
| Mana Lock | Disable collection in the player's strongest mana channel. Other channels and already stored mana remain usable. | One player action for Low/Mid, two for High; then three full enemy actions of cooldown. |
| Countercharge | During a two-player-action window, bank the first actual direct hit as bonus damage, capped at 12/24/40. The next damaging enemy action spends that bonus once; non-damaging moves preserve it. | Three full enemy actions after spending the bonus, or after an unused window expires. |
| Grid Reboot | Replace the grid with a fresh stable/playable board, removing Wildcards. HP, stored mana, deadline and healing budget stay intact. Assigned only to High enemies. | Before actions 5, 10, 15… |

The first three are the requested talents; the remaining five add resource pressure, defense, counterplay and board control. High enemies get stronger tier-scaled effects and two attack channels; Low enemies retain weaker AI and smaller talent values. The current enemy card always shows the talent name and active duration/trigger countdown, including compact mode. The grid labels mines visibly and the player card calls out lock/concealment hazards. Inspection costs no turn.

Non-damaging extra actions still count as player actions when expiring player-action effects (for example Wildcard Forge); invalid swaps and canceled dialogs do not. Cooldowns pause while duration-based effects are active. A Field Patch sequence supplies three player actions, so concealment/armor can expire during that sequence.

## Save compatibility

Version 4 combat saves add talent counters, mines and hidden-piece positions. Existing v1.5 fights gain fresh talent state without resetting HP, mana, board, seven-day deadline, healing use, rewards or currency. Both stored last-action replays migrate as well; their original accounting is retained. Older log entries remain readable even if their ability descriptions predate the current rules. Imported hazard, audit and replay metadata is validated before rendering.

## Combat feedback and playback

The compact enemy card retains visible weaknesses. Player and enemy stat cards stay clean at every health level. Glass cracks, bullet holes, scorch marks and all projectile visuals have been removed, including during playback of older saved actions. Damage numbers, brief card shake, original sounds, match bonuses, glowing mana and the active Cloak outline remain. Old cosmetic metadata is accepted for save compatibility but is not rendered, and new actions no longer generate it.

The log includes automatic talent casts and separate mine damage/protection/reflection, as well as actor, damage sources and gem counts, raw damage, criticals, protection, actual HP removed, reflection, healing and mana costs/gains. The latest player action and latest enemy action are clickable replays. Both are saved across reloads, including a winning action. Playback shows their saved board, counters and effects, then restores the current live screen. It never executes a combat command or changes health, mana, rewards, healing budget, RNG, turns or the encounter deadline. Only the most recent action per side is retained for replay; long cascades preserve the first five visual frames and the complete final accounting.

Glowing mana, per-mote mana counters, original synthesized cues and smaller damage numbers remain available. Damage feedback appears directly on the target card without a projectile sequence. Sounds respect global mute/volume and the Dungeon toggle. Reduced motion omits shake/particles but preserves messages and ordered counters. Leaving Dungeon, hiding the app or opening a dialog pauses future enemy scheduling; the seven-day wall clock continues.

All enemy symbols use the existing Lucide family. [Preview and source credits](ICON-SOURCES.md). Shared icon IDs, uploaded Attribute images and the optional Attribute-icon mapping remain available; Strike and Wildcard always keep their own symbols.

## Validation

172 automated tests cover health and budget limits, mission exceptions, expiry, all ability rules, robot/weakness criticals, Field Patch extra-turn suppression/double Wildcards, Cloak duration/reflection, mana collection, save migration, replay bounds, rewards and existing app features. Additional tests cover all 43 attack-channel assignments and AI loadouts, five-HP/no-mana/half-Strike Field Patch, every talent, free-action timing, duration-based cooldowns, mine/Cloak reactions, concealment identity, save/replay migration and malformed metadata. A 43-opponent simulation completed 2,098 actions with all eight talents and all six active ability effects exercised, validating each saved result. Browser checks cover attack channels, talent timing, mines, hidden icons/accessible labels, compact weaknesses, Stim Fatigue, controls, card layers, timed mana, both actors' replays after victory/reload/interruption, exact saved-state equality after playback, native scheduling, offline play and pause/resume.

Version 1.6.0 is Android version code 27. The downloadable APK uses the existing development signing certificate. Physical-device gameplay, audio, touch and performance still need testing. Automated tests establish rule behavior, not final human difficulty balance.
