# Dungeon — v1.9.0

Branch: `Dungeon_Focus`. Offline match-three encounters linked to missions, with 43 opponents and a permanent 1,400-HP maximum.

## Health, recovery and Stim Fatigue

New players start at **1,400 HP**. All temporary maximum-HP bonuses have been removed, including High-tier bonuses. Health carries between encounters.

Each encounter has a **1,300-HP recovery budget**, shared by all non-mission healing: Field Patch, Stim objects and victory recovery. Only HP actually restored consumes the budget; attempted healing at full health does not. At 1,300 used, the player card displays **Stim Fatigue · Mission healing only**. The next encounter resets that budget.

Mission XP always restores HP at 1:1, capped at 1,400. It bypasses the encounter budget, never consumes it and remains available during Stim Fatigue. At zero HP the player cannot act; missions can revive them to continue the saved fight, provided its deadline has not passed.

Wins attempt to restore 300 HP, or 150 if an unfinished extended mission is at least 14 elapsed days beyond its original deadline. The actual amount is limited by available health capacity and the remaining recovery budget. A once-per-local-day popup lists qualifying missions. No enemy grants a separate maximum-HP or free-healing bonus.

Deck Vitals reflects health in six phases. A separate overdue-mission count turns yellow at two and red at three or more.

## Seven-day deadline

Every encounter starts a persisted **seven-day wall-clock timer**, including time while the app is closed or the player is defeated. A countdown and local deadline appear beneath the enemy card.

At the deadline the encounter is lost, its win streak resets and no rewards are awarded. Combat and mission revival cannot resume an expired fight. Find another opponent to begin a new seven-day encounter with a new healing budget; current HP carries over. Missions can still heal the player outside combat.

Existing v1.4 fights receive seven days from their first upgrade because previous versions did not record an encounter start timestamp. Existing normal-health deficits are preserved when increasing the old base to 1,400 (+600 current HP, capped at 1,400); zero HP stays zero. Previously bonus-buffed health is clamped to the new maximum. Enemy health, board, mana, missions, currency and inventory are preserved. Old log text remains readable; only actions recorded after this update have replays.

## Entry and circuits

Dungeon requires five distinct top-level Attributes: TECH, BODY, INTELLIGENCE, COOL and OPERATING SYSTEM. Config can map each circuit to another Attribute name. Name matching ignores case and surrounding spaces; duplicate names and Skills cannot satisfy a link. Missing links show instructions without deleting the fight.

The shared 8×8 grid contains Strike plus five Attribute circuits, Wildcards and occasional special objects. Tap adjacent circuits, swipe or use arrows and Enter. Invalid swaps use no turn. Cascades resolve fully. Four in a line normally grants another turn; five or more also creates a Wildcard. Swap a Wildcard with any regular type, including Strike, to clear that type; swap two Wildcards to clear the board. Dead boards automatically regenerate, losing existing Wildcards but preserving health and mana.

Strike is **28 damage per cleared gem**, for both sides, unaffected by Attribute/enemy levels. Player matches of an enemy's weak Attribute add **7 damage per gem**. Endurance in the original roster maps to BODY; Perception maps to OPERATING SYSTEM. Non-weak Attributes grant mana without direct damage. Every enemy has designated **attack circuits** that deal **7 damage per cleared gem** to the player, the same quarter-Strike rule as player weakness damage. Low and Mid enemies have one attack Attribute; High enemies have two. The channels are visible in compact and full cards. They are additional damage sources, not changes to the five permanent player Attributes. Only the selected channels hurt; other enemy Attribute matches just collect usable mana.

Each cleared Attribute circuit supplies one combat mana, up to 30 per pool, including cascades and row/column clears. Players collect all five channels; enemies collect only channels used by their assigned abilities. Strike and Wildcard have no mana pool. Combat mana is separate from permanent Attribute XP; combat grants no character/Attribute XP.

## Player abilities

Tap the corresponding Attribute beneath player health to inspect or activate an ability. Opening an explanation or canceling targeting costs nothing.

| Attribute | Ability | Cost | Effect |
|---|---|---:|---|
| TECH | Overclock | 10 | Deal 65 damage. Against a TECH-weak enemy **or a robot**, deal 100 instead, with a 15% critical chance for 150. Also halve every enemy mana pool, rounding down. Ends the turn. |
| BODY | Field Patch | 12 | Enter a **three-swap sequence**, healing **10 HP per destroyed circuit**, subject to the recovery budget and maximum HP. **No mana is gained. Only Strikes damage the enemy, at half strength: 14 per gem.** Activation does not consume a swap. |
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

Every tier now uses tactical search; Low opponents no longer choose random moves. All legal swaps and charged abilities are evaluated for damage, healing, mana/ability readiness, extra turns, Mine self-damage, Mystery activation, turret ownership/destruction, shields and Cloak. The best candidates are searched against player replies, including abilities and follow-up extra actions. Higher tiers inspect more candidate replies and use more independent refill/outcome samples. Minefield placement also preserves legal moves and considers the immediate board threats.

The AI uses the same immutable objects, cumulative fuses and simultaneous group resolver as live combat. It can deliberately leave a dangerous Mine for the player, avoid exploding one on itself, clear one safely, or trigger a beneficial Mystery group. It has no access to actual future refills/outcomes: its simulation seeds come from the visible board, independently of saved combat RNG. Planning neither consumes RNG nor alters combat state. Unknown outcomes can still defeat a reasonable plan. A 43-loadout desktop benchmark averaged about 21 ms per decision (57 ms maximum); physical-phone timing remains unmeasured. Enemy active abilities never directly grant healing; Stim objects remain available to either activator.

Enemy criticals multiply damage by 1.5, rounded to the nearest integer, before protection. Enhanced Overclock has its own 15% player critical chance; regular player attacks do not otherwise crit.

Successful item rolls choose uniformly among currently stocked Exchange items and add one to inventory, consuming finite stock without spending currency, changing prices or incrementing purchase counts. Empty stock means no item. Currency and eligible victory healing are awarded independently of drops.

## Cripple

A successful normal **Strike hit** has a **15%** chance to inflict cripple on its opponent. A successful **critical hit**, including a critical ability, uses **30%** instead. Critical damage remains ×1.5; a critical is not a guaranteed cripple and does not cripple its own attacker. Noncritical Attribute-only or passive/self-hits do not roll cripple. Completely blocked/zero-HP-loss hits do not roll it either.

Cripple randomly chooses one of Strike or the five Attribute types. The target cannot swap either endpoint of that type for its **next normal action**. Those pieces remain matchable/clearable indirectly. The card names the disabled type; pieces show a lock marker, and the player receives a brief message. A paid ability can be used instead of swapping and ends the disable normally. If no legal swap remains, an explicit pass button clears that locked action; the AI can also pass. An extra-turn action still consumes its actor's one-action disable. Free talents never consume it.

## Mystery objects, Mines and Turrets

New boards and refills have a **4% Mystery / 2% Mine** object chance; the rest are regular circuits. **Mines, Mystery and Turrets cannot be selected, swapped or targeted by Forge.** Row/column/area clears can still reach them. Every Mine/Mystery tile shows its remaining distance (`2↓`, `1↓`, etc.). New pieces start at zero fall distance at their **first visible position**; entering from above the board does not spend their fuse.

A **Mine detonates after falling two cumulative rows**. The actor whose move/ability causes the final drop takes its damage, regardless of who placed it or caused earlier drops. A drop of two or more rows counts immediately; separate one-row drops accumulate across turns, reloads and player/enemy ownership changes. Neutral Mines deal **30 raw damage**. Minefield Mines use their enemy's 20/30/45 raw damage. A direct clear of an unripe Mine disarms it safely. An exploding Mine removes itself; it does not apply a second Grenade-style area clear. Mine damage is logged separately and respects applicable protection/reflection.

A **Mystery activates after falling three cumulative rows**, or as part of a horizontal/vertical line of **three or more Mystery pieces**, regardless of their remaining distances. New initial boards avoid already-formed Mystery lines. All members of an activating group reveal and apply their outcomes **before gravity resumes**. A group Grenade clears surrounding circuits but cannot erase other members of that activating group. Stims all heal, Mimics all copy/disappear, and Turrets all deploy; subsequent normal gravity may still damage a newly deployed Turret. Longer/crossing Mystery lines are merged so each piece activates once per batch. Mystery lines themselves do not grant normal four-match extra-turn bonuses; regular matches caused by their outcomes still can.

| Outcome | Relative weight | Effect |
|---|---:|---|
| Stim | 2 | Consume the injector and restore **20 HP** to the mover. Player healing shares the 1,300 encounter budget and 1,400 maximum; enemy healing caps at that enemy's maximum. Field Patch's per-clear recovery can also apply within the same budget. |
| Grenade | 2 | Clear a **3×3 area**, clipping at edges and protecting the other activating group members. Collect normal circuit mana/damage and resolve all cascades. **End the turn even with a four/five-match**; during Field Patch it ends the remaining sequence. Multiple group Grenades all resolve. |
| Mimic | 2 | Copy **the piece directly below it at landing**. If there is no piece below, it disappears. The landing snapshot is read before the group's reveals, so the result is independent of reveal order. A copied Mine or Mystery starts with a fresh fuse; a copied Turret belongs to the mover. Copied Mine damage follows the support Mine's value. |
| Turret | 1 | Deploy a stationary gun owned by the mover. Half as common as each other outcome (**1/7**, versus **2/7** each). |

Mimic preserves the copied type, including Strike, Attributes, Wildcard or another object. A copied Mystery can participate in a later valid activation; a copied Wildcard waits for normal use. Directly clearing an unripe Mystery removes it without rolling an outcome. Every activation is shown as a group before its next gravity frame, and all outcome/damage/mana/healing accounting is retained in replays.

A deployed Turret cannot be swapped by either side. It fires **25 base damage at the end of each normal action by its owner**, starting with deployment, if the fight is still active. It does not fire on the opponent's actions or free talent casts; Strike Overdrive does not multiply it. Multiple surviving Turrets each fire once, with a combined separate damage entry. Protection can reduce their damage. Clearing a Turret destroys it.

Turrets fall with gravity when pieces below clear. Every downward row reduces their three-row fall allowance. This is **cumulative from the deployment row**, not three rows in a single drop. The `3↓ / 2↓ / 1↓` marker shows the remaining allowance; falling produces a hit effect. At the third row it explodes and is removed, including any further gravity/cascades. A Turret reaching the bottom retires immediately; one created there fires once and disappears. A full-board wipe or dead-board reboot also removes Turrets. The same grid, ownership, falls and effects are preserved in saved replays.

The six object icons are included in the shared mission/Attribute icon library; there are now 250 choices. Existing saved icon IDs remain unchanged.

Enemy Mana Siphon, drain and disruption now take **1/2/3 points** by Low/Mid/High, halving the previous amounts and rounding down to whole mana. Player Overclock still destroys half the enemy's mana; it is not a theft effect and transfers no points to the player.

## Strategic enemy abilities and free talents

[All 43 enemy assignments](DUNGEON-LOADOUTS.md) have curated loadouts: **one active ability and one talent** for Low/Mid, **two active abilities and one talent** for High. Their attack circuits are the same channels that charge their abilities. Active abilities spend mana and are board/control effects instead of independent flat-damage attacks:

- **Line clear:** destroy a selected row or column, collect usable mana and apply Strike/attack-circuit damage. Four of one regular color in the line, or a four-match cascade, can retain the turn.
- **Strike conversion:** convert up to 1/2/3 circuits into Strikes (Low/Mid/High), then resolve created matches and cascades.
- **Mana drain:** steal up to 1/2/3 mana from the player's largest pool, then convert one board circuit into an attack circuit.
- **Wildcard disruption:** drain up to 1/2/3 of the player's strongest mana and replace up to 1/2/3 Wildcards with attack circuits. Newly created matches resolve normally.
- **Shield:** block 75% of the next damaging player action and add two own-channel mana.
- **Forge:** create a Wildcard beside a useful circuit and keep the turn. It still costs mana; the AI does not repeatedly forge an already Wildcard-filled board.

Ordinary active abilities cost 8/10/12 mana by tier; Forge costs 8/12/18. Their descriptions and costs appear on the enemy card's Info panel. Line/conversion attacks use the actual destroyed circuits, including cascades and attack Attributes. No old flat-damage ability remains active. Yao Guai's Maul now clears a row; those destroyed circuits actually supply its damage and mana in the same action.

Talents are automatic **free bonus actions**, followed by the enemy's normal move or paid ability. They do not spend mana, heal enemies, advance the enemy-action counter, consume Cloak duration or recursively trigger themselves. The first cast is before normal enemy action three, except Grid Reboot (five). Extra-turn swaps and paid abilities count as normal actions for timing.

| Talent | Effect | Timing after activation |
|---|---|---|
| Minefield | Maintain up to two actual immovable Mines, each dealing 20/30/45 raw damage to whoever causes its second row of falling. Existing Mines retain their fuse progress; a cast fills missing Minefield slots instead of resetting them. Direct clears safely disarm unripe Mines. | Free casts before actions 3, 6, 9… |
| Signal Veil | Random newly generated refill pieces are hidden (20%/35%/50% chance by tier). Existing pieces stay visible; hidden survivors retain their masks when swapped or falling. Masks conceal color, icon and accessible name. | Lasts two player actions. All masks then reveal; only then does the three-full-enemy-action cooldown begin. |
| Strike Overdrive | Next enemy action deals 56 per Strike instead of 28. Attack-Attribute damage stays 7. It expires even if the enemy uses a non-damaging ability. | One enemy action, then three full enemy actions before reactivation. |
| Mana Siphon | Steal 1/2/3 actual stored mana from the player's largest pool and add it to the enemy's primary ability channel, respecting its 30 cap. | Free casts every three normal enemy actions. |
| Reactive Plating | Flat reduction of 8/16/24 damage per incoming player action, before any separate shield. Cannot heal or turn damage negative. | Two player actions, then a three-full-enemy-action cooldown. |
| Mana Lock | Disable collection in the player's strongest mana channel. Other channels and already stored mana remain usable. | One player action for Low/Mid, two for High; then three full enemy actions of cooldown. |
| Countercharge | During a two-player-action window, bank the first actual direct hit as bonus damage, capped at 12/24/40. The next damaging enemy action spends that bonus once; non-damaging moves preserve it. | Three full enemy actions after spending the bonus, or after an unused window expires. |
| Grid Reboot | Replace the grid with a fresh stable/playable board, removing Wildcards. HP, stored mana, deadline and healing budget stay intact. Assigned only to High enemies. | Before actions 5, 10, 15… |

The first three are the requested talents; the remaining five add resource pressure, defense, counterplay and board control. High enemies get stronger tier-scaled effects and two attack channels; Low enemies retain smaller talent values and a narrower tactical search; their moves are still selected strategically. The current enemy card always shows the talent name and active duration/trigger countdown, including compact mode. The grid labels mines visibly and the player card calls out lock/concealment hazards. Inspection costs no turn. Each character’s Info includes only its assigned talent’s specific values. For example, Delroy shows a two-mana Mana Siphon, without unrelated Mine damage, Plating or Countercharge values. The full rules still list all talents as a general reference.

Non-damaging extra actions still count as player actions when expiring player-action effects (for example Wildcard Forge); invalid swaps and canceled dialogs do not. Cooldowns pause while duration-based effects are active. A Field Patch sequence supplies three player actions, so concealment/armor can expire during that sequence.

## Save compatibility

Version 6 saves add per-object Mine/Mystery fall counters. Existing v1.7 fights keep HP, mana, seven-day deadline, healing budget, rewards, currency, cripple and Turrets; existing Mine/Mystery pieces begin with fresh counters. Old cell-marker Minefield traps are retired; subsequent casts place the new physical Mines. If an old board had legal moves only because objects could be swapped, it gets a fresh playable grid while preserving health/resources/deadline. Previously saved action replays keep their original accounting and are flagged as historical; playback can still show the formerly legal object swaps without executing them under the new rules. An authentic v1.7.1 Mystery-swap save is covered by migration tests. Live and replay fuse/event metadata is validated before rendering.

## Combat feedback and playback

The compact enemy card retains visible weaknesses. Player and enemy stat cards stay clean at every health level. Strike rounds now fly from cleared cells into the opposing card, with short glowing impact flashes and shot sounds. The final round arrives with the damage number. Glass cracks, bullet holes and persistent burn overlays remain removed. Damage numbers, brief card shake, original sounds, match bonuses, glowing mana and the active Cloak outline remain. Old cosmetic metadata is accepted for save compatibility but is not rendered, and new actions no longer generate it.

The log includes automatic talent casts and separate mine damage/protection/reflection, as well as actor, damage sources and gem counts, raw damage, criticals, protection, actual HP removed, reflection, healing and mana costs/gains, cripple and separate passive/self-hit sources. The latest player action and latest enemy action are clickable replays. Both are saved across reloads, including a winning action. Playback shows their saved board, counters and effects, then restores the current live screen. It never executes a combat command or changes health, mana, rewards, healing budget, RNG, turns or the encounter deadline. Only the most recent action per side is retained for replay; replays retain up to the resolver’s 100-frame bound, including every activation batch and complete final accounting. No Mystery group is skipped by the old five-frame display cap.

Glowing mana, per-mote mana counters, original synthesized cues and smaller damage numbers remain available. Four-matches explode in bright warm sparks; five-matches explode in rainbow glow. Strike shots hit the target card; passive turret fire has a separate shot and damage entry. The new compact enemy card uses an inline identity/level/HP header, all weakness/attack icons, a separate free-talent timer and short paid ability mana rows. At 390 px width/default type it is about 137–150 px tall across the 43 enemies; Delroy is 137 px compared with 208 px in the former compact view. That former compact view is now Expanded; the old large view has been removed. Both views retain name, original icon, HP, level/tier, every weakness, attack circuit, talent timing, cripple, paid ability names/costs/mana, reward/drop availability and protection. Text can wrap when enlarged. Class/designation and full mapped Attribute names remain in Info. Sounds respect global mute/volume and the Dungeon toggle. Reduced motion omits shake/particles but preserves messages and ordered counters. Leaving Dungeon, hiding the app or opening a dialog pauses future enemy scheduling; the seven-day wall clock continues.

All enemy symbols use the existing Lucide family. [Preview and source credits](ICON-SOURCES.md). Shared icon IDs, uploaded Attribute images and the optional Attribute-icon mapping remain available; Strike and Wildcard always keep their own symbols.

## Enemy card layout preview

| Compact | Expanded (the previous compact view) |
|---|---|
| ![New compact Delroy card with both weaknesses and separate free talent and paid mana](enemy-card-compact.png) | ![Expanded Delroy card retaining the previous compact layout](enemy-card-expanded.png) |

## Validation

239 automated tests cover health and budget limits, mission exceptions, expiry, all ability rules, robot/weakness criticals, Field Patch extra-turn suppression/double Wildcards, Cloak duration/reflection, mana collection, save migration, replay bounds, rewards and existing app features. Additional tests cover removal of Charge multipliers and preservation of legacy replay accounting, cripple probabilities and blocked turns, all four Mystery outcomes, weighted turret rarity, cumulative falling destruction, owner-only passive fire, Mine activation/disarming, Stim budgets, 1,000 consecutive stable object swaps, shared icon availability, and all 43 attack-channel assignments and AI loadouts, ten-HP/no-mana/half-Strike Field Patch, every talent, free-action timing, duration-based cooldowns, mine/Cloak reactions, concealment identity, save/replay migration and malformed metadata. A 43-opponent simulation completed 1,937 actions with every talent and active ability type exercised, validating saved results. New tests include a 2,000-swap fuse/ownership run, a full 64-Mystery activation batch, horizontal/vertical groups, batch explosion protection, all Mimic support/empty cases, both movers taking Mine damage, AI avoiding suicidal Mines at every tier, RNG-independent planning, stricter fuse validation and authentic legacy replay migration. Browser checks additionally cover immutable tiles/counters, cumulative fuses across reload, explosion causality, protected simultaneous outcomes before gravity, disappearing Mimics and historical replay playback. Browser checks cover Strike projectiles/card impacts, bright four/rainbow-five sparks, every Mystery outcome, turret integrity/fall explosion, cripple and pass controls, enlarged text without page overflow, exact replay accounting, attack channels, talent timing, mines, hidden icons/accessible labels, compact weaknesses, Stim Fatigue, controls, card layers, timed mana, both actors' replays after victory/reload/interruption, exact saved-state equality after playback, native scheduling, offline play and pause/resume.

Version 1.9.3 is Android version code 34. The downloadable APK uses the existing development signing certificate. Card-specific browser checks cover all 43 relevant Info panels, every weakness and ability in both layouts, view preference persistence, shield/cripple states, live ordered mana counters, combat-state equality across layout/Info changes, and 320–430 px layouts at 100–160% text without horizontal clipping. Physical-device gameplay, audio, touch and performance still need testing. Automated tests establish rule behavior, not final human difficulty balance.

## Player card and turret retirement (v1.9.0)

The player card defaults to a compact layout: operator name/HP, health bar, vitals, recovery budget, five ability/mana controls and the ability hint. Tap the name to expand or compact; this independent preference persists. Existing icons, statuses, locks, fatigue and ability dialogs remain available, including at enlarged text sizes. Field Patch costs **12 BODY mana**; its healing, three swaps and damage/mana restrictions stay the same.

A Turret dies when it reaches the bottom row, even if it has fallen fewer than three rows. A Turret created there queues one 25-damage shot and disappears. Its removal is part of board resolution: gravity, matches, damage, mana, Mystery activations and Mine fuses all count normally, including cascades caused by the empty cell. The AI models this retirement and its one-shot reward. Historical saved bottom Turrets retire when the board next resolves. Player-card browser checks cover compact/expanded persistence, all controls, 12-point gating, bottom-shot/cascade accounting, replay invariance and 320–430 px layouts at 100–160% text. Physical-phone testing remains pending.

## Charge removal (v1.9.1)

Charge ×2 no longer accumulates, doubles damage/mana, influences AI choices or appears on combat cards, results or rules. Existing live Charge progress is cleared on load without changing health, mana, board, deadlines, rewards or turn. Saved replays retain their originally recorded damage/mana and particle timing; playback never recalculates rewards. Four-match extra turns, five-match Wildcards, criticals, Strike Overdrive and the distinct Countercharge enemy talent retain their existing behavior.

Release verification: all 239 automated tests pass, including both actors’ unchanged base damage/mana with obsolete Charge present, four/five extra turns, legacy-save/replay integrity and AI choices independent of Charge. Mobile browser checks cover both card modes, Rules, normal mana collection, four-match extra turns, ability costs, exact replay state and 320–430 px layouts at 100–160% text.

## Compact player layout correction (v1.9.2)

The player card now follows the supplied compact layout: name/HP on one row, a 4 px bar, close-set vitals and recovery lines and five short ability tiles. Default height at a 390 px viewport is about 165 px, versus 208 px previously. Attribute labels truncate to one line in compact mode; their full names remain in button accessible labels, title tooltips and ability dialogs. Ability names/costs wrap without clipping; larger text can increase card height. Cloak, cripple, Stim Fatigue, Field Patch, mana locks, concealment and Mine warnings remain visible. The independent saved expand/collapse toggle and current combat mechanics are preserved. Mobile browser checks cover both layouts, costs, statuses, state integrity and 320–430 px widths at 100–160% text.

## Player-card hints (v1.9.3)

The Mine-drop warning is removed from the player card in both layouts. Compact mode hides the Attribute-tap hint; expanded mode keeps it. Mine fuse counters, mechanics, active statuses and all five ability controls remain unchanged.
