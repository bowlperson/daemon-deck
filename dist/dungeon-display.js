import {tierRank,minePower,armorPower,counterPower} from './dungeon-tactics.js';
export function encounterCountdown(deadline,now=Date.now()){const seconds=Math.max(0,Math.ceil((deadline-now)/1000)),days=Math.floor(seconds/86400),hours=Math.floor(seconds%86400/3600),minutes=Math.floor(seconds%3600/60);return seconds===0?'Encounter expired':seconds<60?seconds+'s remaining':`${days}d ${hours}h ${minutes}m remaining`;}

// Show the assigned talent's values only; these are display facts, not new combat rules.
export function enemyTalentFacts(enemy,mapping={tech:'TECH',body:'BODY',intelligence:'INTELLIGENCE',cool:'COOL',os:'OPERATING SYSTEM'}){const rank=tierRank(enemy);switch(enemy.talent){
 case 'mines':return ['Up to 2 immovable Mines',minePower(enemy)+' damage to the mover after 2 rows of falling','Direct clears disarm them; each Mine keeps its fall progress'];
 case 'veil':return [[20,35,50][rank]+'% of new refill pieces concealed','2 player actions','Cooldown starts after concealment ends'];
 case 'overdrive':return ['56 damage per Strike','1 enemy action','Then 3 full enemy actions of cooldown'];
 case 'siphon':return ['Steal up to '+[1,2,3][rank]+' mana','Charges '+mapping[enemy.abilities[0].key]+' ability mana','Every 3 enemy actions'];
 case 'plating':return ['Block up to '+armorPower(enemy)+' damage per incoming action','2 player actions','Then 3 full enemy actions of cooldown'];
 case 'lock':return ['Blocks collection in your strongest mana channel',(rank===2?2:1)+' player action'+(rank===2?'s':''),'Stored mana remains usable'];
 case 'counter':return ['Countercharge cap '+counterPower(enemy),'First direct hit within 2 player actions','Bonus is spent on the next damaging enemy attack'];
 case 'reboot':return ['Every 5 enemy actions','Fresh playable grid removes Wildcards and Turrets','Health and stored mana are preserved'];
 default:return [];
}}
