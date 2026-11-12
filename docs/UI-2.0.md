# UI and mechanics 2.0

## Design rationale and sources

ADHD experiences differ; this is an accessibility-oriented interface, not a treatment or a claim that a particular font/color works for every ADHD user. The design uses clear hierarchy, short labels, predictable controls, larger touch targets and user control over stimulation.

- W3C WAI, [Help Users Focus](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o5-user-focus/): reduce distractions and support reorientation.
- W3C WAI, [Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/): simple language and identifiable structure.
- NHS inform, [Managing ADHD symptoms in work and education](https://www.nhsinform.scot/illnesses-and-conditions/adhd/managing-adhd-symptoms-in-work-and-education): break tasks into smaller steps and use reminders. This supports existing quest subtasks, descriptions and opt-in alerts.

Calmer Interface defaults on. It removes ambient sprite/cursor motion and CRT decoration, and uses spaced quest cards with prominent names, a clear completion control and readable payout lines. Descriptions are limited to two lines on cards; complete content and all tags remain in quest details. XP formula help is collapsed, not removed. Theme and text-size settings remain available. Color distinguishes interaction/total progress from earned rewards, while written labels convey the same meaning. Focus can be switched off, and reward motion has a separate setting. Device reduced-motion preferences always apply.

## Character studio 2.0

Original 24×32 SVG pixel art; no Terraria artwork or items were used. Identity, Face, Hair & body, Outfit & gear, and Image & size sections keep a live preview visible. Galleries supplement accessible select controls; drafts commit only on Save. There are 36 hairstyle silhouettes, 18 outfits, 18 accessories, 8 face shapes, 6 expressions, 6 eye styles, 6 brow styles, 6 facial-hair styles and 3 builds. All clothing/item palette regions remain individually editable. Additional controls cover outlines, mouth, brows, facial hair and the accent on new hairstyles. Per-style palettes and GIF uploads survive save/restore. This is an expanded original creator, not a promise of feature parity with Terraria.

## Eurodollar accounting

The unit marker is `currencyVersion: 2`. Existing balances, stored mission credit amounts, exchange prices/increases and historical currency transactions are multiplied by 100 once; XP, stock, purchased quantities and completion counts are not changed. Newly created values already use the new unit. Purchasing power is preserved. Max-rated automatic missions earn €$5,200; side quests still pay half. Manual overrides remain independent of XP. Legacy calendar JSON manual amounts are also scaled on import. Full backups retain the marker, preventing repeat conversion.

## Reward transfer

Completion saves rewards atomically before opening a centered dialog. The earned XP/€$ appear left, personal XP/level/balance right. The XP bar fills and rolls through a level boundary; level-up text and a particle burst accompany the existing selected level-up sound. Up to 12 particle/sound bundles represent the transfer, rather than attempting thousands of sound events. Custom credit audio plays once. Visual counters never mutate saved accounting. Reduced motion shows a static summary; Continue, Escape or Android Back skips the presentation without changing rewards. Auto-close waits for the last visual effect plus one second. Ordinary reward-sound mute/volume settings are honored; notification/alarm audio remains separate.

## Verification and limits

Domain tests cover one-time currency migration, balance/price/history consistency, max/side payouts, expanded character geometry, palettes and validation. Mobile browser checks cover studio draft/save, completion animation, level crossing, exactly-once awards, reduced-motion/skip behavior and enlarged text at 320–430px. Android builds use the existing development signing key. Physical-phone usability, sound timing and accessibility user testing remain pending.
