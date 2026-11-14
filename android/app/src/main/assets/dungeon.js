import {createBoard,resolveSwap,resolveLine,legalMoves,swapped,findMatches} from './dungeon-board.js';
import {enemies,legacyNames} from './dungeon-enemies.js';
export {enemies};
export const circuits=[{key:'tech',name:'TECH',symbol:'⌘',color:'#6dd5ff'},{key:'body',name:'BODY',symbol:'⬢',color:'#ff927a'},{key:'intelligence',name:'INTELLIGENCE',symbol:'◆',color:'#c1a5ff'},{key:'cool',name:'COOL',symbol:'🕶',color:'#6ee4ba'},{key:'os',name:'OPERATING SYSTEM',symbol:'▣',color:'#f6cd6a'}];
export const abilities=[
 {id:'overclock',key:'tech',name:'Overclock',cost:10,description:'Deal 65 damage, or 100 against TECH-weak enemies or robots (15% critical chance for 150). Halve enemy mana. Ends your turn.'},
 {id:'patch',key:'body',name:'Field Patch',cost:10,description:'Take three immediate swaps and heal 20 HP per destroyed gem, within the encounter healing budget. Four-matches add no extra plays; a double-Wildcard wipe ends the sequence.'},
 {id:'recompile',key:'intelligence',name:'Recompile',cost:10,description:'Clear a chosen row or column and collect its Attribute mana, including cascades. Destroyed Strikes and weakness circuits also deal damage. Keep your turn if at least four of one color are cleared in the selected line, or a cascade matches four.'},
 {id:'cloak',key:'cool',name:'Cloak',cost:10,description:'Reduce damage by 50% for the next two enemy actions. Each damaging action reflects 25 plus the HP you actually lose. Ends your turn.'},
 {id:'forge',key:'os',name:'Wildcard Forge',cost:18,description:'Turn a chosen circuit into a wildcard and keep your turn.'}
];
const key=s=>s.trim().toUpperCase();
const randomFor=d=>()=>{d.rng=(Math.imul(d.rng,1664525)+1013904223)>>>0;return d.rng/4294967296;};
export function defaultDungeon(){return {version:3,hp:1400,buffUntil:0,index:0,rng:Math.floor(Math.random()*4294967295),revision:0,battle:null,log:[],wins:0,runs:0,streak:0,encounters:0,audit:[],scars:[],replays:{player:null,enemy:null}};}
export function upgradeDungeon(s){
 s.dungeon??=defaultDungeon();const d=s.dungeon;
 s.settings.dungeon??={mapping:Object.fromEntries(circuits.map(c=>[c.key,c.name]))};
 const config=s.settings.dungeon;config.sound??=true;config.attributeIcons??=false;config.compactEnemy??=false;config.zen??=false;
 if(![2,3].includes(d.version)){
  d.version=2;d.streak=0;d.encounters=d.wins+(d.battle?1:0);if(d.index>=35)d.index=0;
  const rename=text=>[...legacyNames].sort((a,b)=>b[0].length-a[0].length).reduce((v,[alias,name])=>v.replaceAll(alias,name),text);
  d.log=d.log.map(rename);for(const h of s.history||[])if(h.type==='dungeon')h.title=rename(h.title);
  if(d.battle){d.battle.playerBoost=0;d.battle.enemyBoost=0;const keys=new Set(enemies[d.index].abilities.map(a=>a.key));d.battle.enemyAP=d.battle.enemyAP.map((n,i)=>keys.has(circuits[i].key)?n:0);}
 }
 if(d.version===2){
  if(!Number.isInteger(d.hp)||d.hp<0||d.hp>1600)throw Error('Invalid saved health.');
  d.hp=d.hp===0?0:Math.min(1400,d.hp+(d.buffUntil>Date.now()?0:600));d.buffUntil=0;d.version=3;d.audit=[];d.scars=[];d.replays={player:null,enemy:null};
  if(d.battle){const b=d.battle;b.startedAt=Date.now();b.expiresAt=b.startedAt+7*86400000;b.healingUsed=0;b.scars=[];b.patchTurns=0;b.cloakTurns=b.playerShield?2:0;b.playerShield=b.cloakTurns>0;}
 }
 validateDungeon(s);return s;
}
export function validateDungeon(s){
 const d=s.dungeon,c=s.settings.dungeon,integer=(x,min,max)=>Number.isInteger(x)&&x>=min&&x<=max;
 if(!d||d.version!==3||!integer(d.hp,0,1400)||!integer(d.index,0,enemies.length-1)||!integer(d.rng,0,4294967295)||!integer(d.revision,0,Number.MAX_SAFE_INTEGER)||!Number.isFinite(d.buffUntil)||d.buffUntil<0||!['wins','runs','streak','encounters'].every(k=>integer(d[k],0,Number.MAX_SAFE_INTEGER))||!Array.isArray(d.log)||d.log.length>80||!d.log.every(x=>typeof x==='string'&&x.length<=2000)||!c||!['sound','attributeIcons','compactEnemy','zen'].every(k=>typeof c[k]==='boolean')||!c.mapping||!circuits.every(x=>typeof c.mapping[x.key]==='string'&&key(c.mapping[x.key]).length>0&&c.mapping[x.key].length<=160)||new Set(circuits.map(x=>key(c.mapping[x.key]))).size!==5)throw Error('Invalid Dungeon health or Attribute mapping.');
 const scars=points=>Array.isArray(points)&&points.length<=32&&points.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100);
 if(!scars(d.scars)||!Array.isArray(d.audit)||d.audit.length>60||!d.audit.every(a=>a&&typeof a.id==='string'&&['player','enemy'].includes(a.actor)&&typeof a.name==='string'&&typeof a.label==='string'&&a.name.length<=160&&a.label.length<=160&&typeof a.at==='string'&&Number.isFinite(Date.parse(a.at))&&typeof a.note==='string'&&a.note.length<=2000&&Array.isArray(a.gained)&&a.gained.length===5&&a.gained.every(n=>integer(n,0,30))&&integer(a.cost,0,30)&&(!a.cost||circuits.some(c=>c.key===a.key))&&['actualDamage','prevented','reflected','healed'].every(k=>Number.isFinite(a[k])&&a[k]>=0)&&Array.isArray(a.sources)&&a.sources.length<=8&&a.sources.every(x=>x&&typeof x.label==='string'&&Number.isFinite(x.raw)&&x.raw>=0)&&Number.isFinite(a.damage)&&a.damage>=0)||!d.replays||!['player','enemy'].every(actor=>validReplay(d.replays[actor],actor,s)))throw Error('Invalid combat log or replay.');
 const b=d.battle;if(b){
  if(!scars(b.scars)||b.enemyId!==enemies[d.index].id||!integer(b.enemyHP,1,enemies[d.index].hp)||!['player','enemy','defeated','expired'].includes(b.turn)||!Array.isArray(b.board)||b.board.length!==64||!b.board.every(n=>integer(n,0,6))||!Array.isArray(b.playerAP)||!Array.isArray(b.enemyAP)||b.playerAP.length!==5||b.enemyAP.length!==5||![...b.playerAP,...b.enemyAP].every(n=>integer(n,0,30))||typeof b.playerShield!=='boolean'||typeof b.enemyShield!=='boolean'||!integer(b.healingUsed,0,1300)||!integer(b.patchTurns,0,3)||!integer(b.cloakTurns,0,2)||b.playerShield!==(b.cloakTurns>0)||!Number.isFinite(b.startedAt)||b.startedAt<0||b.expiresAt!==b.startedAt+7*86400000)throw Error('Invalid saved Dungeon battle.');
  if(findMatches(b.board).length||!legalMoves(b.board).length)throw Error('Saved Dungeon board must be stable and playable.');
 }
}
function validReplay(r,actor,s){
 if(r===null)return true;const board=x=>Array.isArray(x)&&x.length===64&&x.every(n=>Number.isInteger(n)&&n>=0&&n<=6),indices=x=>Array.isArray(x)&&x.length<=64&&x.every(n=>Number.isInteger(n)&&n>=0&&n<64);
 if(!r||typeof r.id!=='string'||r.id.length>100||!r.before||!r.after||!r.result||r.result.actor!==actor||!Number.isInteger(r.before.index)||!enemies[r.before.index]||r.enemyId!==enemies[r.before.index].id||r.after.index!==r.before.index)return false;
 try{for(const d of [r.before,r.after]){if(!Array.isArray(d.log)||d.log.length>5||!Array.isArray(d.audit)||d.audit.length>3)return false;validateDungeon({...s,dungeon:{...d,replays:{player:null,enemy:null}}});}
  const final=r.result.finalBattle;if(final)validateDungeon({...s,dungeon:{...r.after,battle:{...final,enemyHP:Math.max(1,final.enemyHP)},replays:{player:null,enemy:null}}});
 }catch{return false;}
 const result=r.result;
 return board(r.before.battle?.board)&&(!result.board||board(result.board))&&(!result.move||Array.isArray(result.move)&&result.move.length===2&&indices(result.move))&&Array.isArray(result.frames)&&result.frames.length<=5&&result.frames.every(f=>board(f.before)&&board(f.after)&&indices(f.cleared)&&indices(f.spawned)&&Array.isArray(f.sources)&&f.sources.length===64&&f.sources.every(n=>Number.isInteger(n)&&n>=-1&&n<64))&&Array.isArray(result.gained)&&result.gained.length===5&&result.gained.every(n=>Number.isInteger(n)&&n>=0&&n<=30)&&Number.isFinite(result.damage)&&result.damage>=0;
}
export const maxHealth=()=>1400;
export const HEALING_LIMIT=1300;
export function normalizeHealth(s,now=Date.now()){s.dungeon.hp=Math.min(s.dungeon.hp,maxHealth(s,now));}
export function healthVitals(s,now=Date.now()){const hp=Math.min(s.dungeon.hp,maxHealth(s,now)),max=maxHealth(s,now),ratio=hp/max;return {hp,max,ratio,tone:ratio===0?'flat':ratio<=.2?'critical':ratio<=.4?'low':ratio<=.65?'strained':ratio<=.85?'steady':'strong',label:ratio===0?'OFFLINE':ratio<=.2?'CRITICAL':ratio<=.4?'LOW':ratio<=.65?'STRAINED':ratio<=.85?'STEADY':'STRONG'};}
export function healFromMission(s,xp,now=Date.now()){normalizeHealth(s,now);const before=s.dungeon.hp;s.dungeon.hp=Math.min(maxHealth(s,now),before+Math.max(0,xp));if(s.dungeon.hp!==before)s.dungeon.revision++;expireBattle(s,now);if(s.dungeon.hp>0&&s.dungeon.battle?.turn==='defeated')s.dungeon.battle.turn='player';return s.dungeon.hp-before;}
export function dungeonAccess(s){return circuits.map(c=>{const wanted=s.settings.dungeon.mapping[c.key],matches=s.skills.filter(a=>!a.parentId&&key(a.title)===key(wanted));return {...c,wanted,attribute:matches.length===1?matches[0]:null,ambiguous:matches.length>1};});}
function log(d,text){d.log.unshift(text);d.log=d.log.slice(0,80);}
export const encounterOdds=s=>s.dungeon.streak>=5?{low:.55,mid:.30,high:.15}:{low:.60,mid:.30,high:.10};
export function rollEnemy(s){const odds=encounterOdds(s),random=randomFor(s.dungeon),roll=random(),tier=roll<odds.low?'low':roll<odds.low+odds.mid?'mid':'high',pool=enemies.filter(e=>e.tier===tier);return pool[Math.floor(random()*pool.length)];}
export function startBattle(s,now=Date.now()){
 if(dungeonAccess(s).some(c=>!c.attribute))throw Error('Add or map all five required Attributes first.');normalizeHealth(s);const d=s.dungeon;expireBattle(s,now);if(d.battle&&d.battle.turn!=='expired')return d.battle;
 const enemy=rollEnemy(s);d.index=enemies.indexOf(enemy);d.encounters++;
 d.battle={enemyId:enemy.id,enemyHP:enemy.hp,turn:d.hp>0?'player':'defeated',board:createBoard(randomFor(d)),playerAP:[0,0,0,0,0],enemyAP:[0,0,0,0,0],playerShield:false,enemyShield:false,startedAt:now,expiresAt:now+7*86400000,healingUsed:0,scars:[],patchTurns:0,cloakTurns:0};
 d.revision++;log(d,'ENCOUNTER · '+enemy.name+' · Level '+enemy.level+' · '+enemy.tier.toUpperCase());return d.battle;
}
export function restartRun(){throw Error('Encounters are now endless and randomized.');}
function guard(s,actor,revision,now=Date.now()){const d=s.dungeon;normalizeHealth(s);expireBattle(s,now);if(dungeonAccess(s).some(c=>!c.attribute))throw Error('Required Attributes are missing.');if(!d.battle||d.battle.turn!==actor||d.hp<=0)throw Error('Wait for your turn or restore health with missions.');if(revision!==undefined&&revision!==d.revision)throw Error('That turn has already resolved.');return d.battle;}
export function expireBattle(s,now=Date.now()){
 const d=s.dungeon,b=d.battle;if(!b||b.turn==='expired'||now<b.expiresAt)return false;
 b.turn='expired';b.patchTurns=0;b.cloakTurns=0;b.playerShield=false;d.streak=0;d.revision++;log(d,'ENCOUNTER LOST · Seven-day deadline expired. No rewards awarded.');return true;
}
export function healFromCombat(s,amount){const d=s.dungeon,b=d.battle;if(!b)return 0;const healed=Math.max(0,Math.min(Math.floor(amount),HEALING_LIMIT-b.healingUsed,maxHealth(s)-d.hp));d.hp+=healed;b.healingUsed+=healed;return healed;}
export const strikePower=()=>28;
export function enemyManaKeys(s){return new Set(enemies[s.dungeon.index].abilities.map(a=>a.key));}
export function healingPenaltyMissions(s,now=Date.now()){return s.missions.filter(m=>m.status==='active'&&m.originalDueAt&&Number.isFinite(Date.parse(m.originalDueAt))&&now-Date.parse(m.originalDueAt)>=14*86400000);}
export function winHealing(s,now=Date.now()){return healingPenaltyMissions(s,now).length?150:300;}
function victory(s,now){
 const d=s.dungeon,enemy=enemies[d.index],random=randomFor(d);s.profile.coins+=enemy.reward;let drop=null,bonus=false;
 if(enemy.tier!=='low'){const pool=s.rewards.filter(r=>r.quantity!==0);if(pool.length&&random()<(enemy.tier==='high'?.65:.35)){const r=pool[Math.floor(random()*pool.length)];r.inventory++;if(r.quantity>0)r.quantity--;drop={id:r.id,title:r.title,icon:r.icon};}}
 const healing=winHealing(s,now),healed=healFromCombat(s,healing);const outcome={healing,healed,healingUsed:d.battle.healingUsed,enemy:enemy.name,level:enemy.level,coins:enemy.reward,drop,bonus};
 s.history.unshift({id:globalThis.crypto.randomUUID(),type:'dungeon',title:enemy.name,at:new Date(now).toISOString(),coins:enemy.reward,xp:0,drop:drop?.title||'',bossLevel:enemy.level,healed,healingUsed:outcome.healingUsed});
 d.wins++;d.streak++;log(d,'VICTORY · '+enemy.name+' · €$'+enemy.reward+' · '+d.streak+' win streak · Recovery +'+healed+' HP · '+outcome.healingUsed+'/1300 recovery used'+(drop?' · Drop: '+drop.title:''));d.battle=null;return outcome;
}
function endAction(s,actor,extra,now){const d=s.dungeon,b=d.battle;d.revision++;
 if(actor==='enemy'&&b.cloakTurns>0){b.cloakTurns--;b.playerShield=b.cloakTurns>0;}
 if(b.enemyHP<=0)return victory(s,now);
 if(d.hp<=0){b.turn='defeated';b.patchTurns=0;d.streak=0;log(d,'DEFEAT · Health depleted. Complete missions to heal; the encounter deadline still applies.');return null;}
 b.turn=extra?actor:(actor==='player'?'enemy':'player');return null;
}
function absorb(s,actor,counts){const b=s.dungeon.battle,ap=actor==='player'?b.playerAP:b.enemyAP,keys=enemyManaKeys(s),gained=[0,0,0,0,0];for(let i=0;i<5;i++)if(actor==='player'||keys.has(circuits[i].key)){const before=ap[i];ap[i]=Math.min(30,ap[i]+counts[i+1]);gained[i]=ap[i]-before;}return gained;}
function damageTarget(s,actor,raw,canCrit=false,playerChance=0){
 const b=s.dungeon.battle,enemy=enemies[s.dungeon.index],chance=actor==='player'?playerChance:canCrit&&enemy.tier!=='low'?(enemy.tier==='high'?.20:.15):0;
 const crit=raw>0&&chance>0&&randomFor(s.dungeon)()<chance;let damage=crit?Math.round(raw*1.5):raw;
 const original=damage,blocked=damage>0&&(actor==='enemy'?b.cloakTurns>0:b.enemyShield);
 if(blocked){damage=Math.ceil(damage*(actor==='enemy'?.5:.25));if(actor==='player')b.enemyShield=false;}
 const hpBefore=actor==='player'?b.enemyHP:s.dungeon.hp,actualDamage=Math.min(hpBefore,damage);
 if(actor==='player')b.enemyHP=Math.max(0,b.enemyHP-damage);else s.dungeon.hp=Math.max(0,s.dungeon.hp-damage);
 const reflected=actor==='enemy'&&blocked&&actualDamage>0?25+actualDamage:0;if(reflected)b.enemyHP=Math.max(0,b.enemyHP-reflected);
 return {damage,actualDamage,crit,blocked,prevented:original-damage,reflected};
}
function clearSources(s,actor,counts){const sources=[];if(counts[0])sources.push({label:'Strike',gems:counts[0],raw:counts[0]*28});
 if(actor==='player')for(let i=0;i<5;i++)if(enemies[s.dungeon.index].weakness.includes(circuits[i].key)&&counts[i+1])sources.push({label:s.settings.dungeon.mapping[circuits[i].key]+' weakness',gems:counts[i+1],raw:counts[i+1]*7});return sources;
}
export function dungeonSnapshot(s){const d=s.dungeon;return {version:3,hp:d.hp,buffUntil:0,index:d.index,rng:d.rng,revision:d.revision,battle:structuredClone(d.battle),log:d.log.slice(0,5),wins:d.wins,runs:d.runs,streak:d.streak,encounters:d.encounters,audit:structuredClone(d.audit.slice(0,3)),scars:structuredClone(d.scars)};}
function stampImpacts(s,result){
 const count=result.actualDamage>0?Math.max(1,Math.min(16,result.ability?1:result.counts?.[0]||1)):0;
 result.impactPoints=Array.from({length:count},()=>({x:18+Math.random()*64,y:18+Math.random()*64}));
 if(count){const scars=result.actor==='player'?s.dungeon.battle.scars:s.dungeon.scars;scars.push(...result.impactPoints);scars.splice(0,Math.max(0,scars.length-32));}
 if(result.reflected){result.reflectionPoints=[{x:40,y:45}];s.dungeon.battle.scars.push(...result.reflectionPoints);s.dungeon.battle.scars=s.dungeon.battle.scars.slice(-32);}
}
function recordAction(s,result,before,now){
 const id=globalThis.crypto.randomUUID(),name=result.actor==='player'?'You':enemies[before.index].name,sourceText=result.sources.map(x=>x.label+(x.gems?' '+x.gems+' × '+x.raw/x.gems:'')+' = '+x.raw).join('; ')||'No direct damage';
 const detail={id,at:new Date(now).toISOString(),actor:result.actor,name,label:result.ability||'Circuit swap',sources:result.sources,damage:result.damage,actualDamage:result.actualDamage||0,crit:!!result.crit,prevented:result.prevented||0,reflected:result.reflected||0,healed:result.healed||0,gained:result.gained,cost:result.cost||0,key:result.key||'',note:result.note||'',extraTurn:!!result.extraTurn};
 s.dungeon.audit.unshift(detail);s.dungeon.audit=s.dungeon.audit.slice(0,60);
 log(s.dungeon,name+' · '+detail.label+' · '+sourceText+' · '+result.damage+' damage'+(result.crit?' · CRITICAL ×1.5':'')+(result.prevented?' · Prevented '+result.prevented:'')+(result.reflected?' · Cloak reflection '+result.reflected:'')+(result.healed?' · Healed '+result.healed+' HP':'')+(result.note?' · '+result.note:'')+(result.extraTurn?' · EXTRA TURN':''));
 s.dungeon.replays[result.actor]={id,enemyId:enemies[before.index].id,encounter:before.encounters,at:detail.at,before,after:dungeonSnapshot(s),result:{...structuredClone(result),frames:structuredClone(result.frames.slice(0,5))}};
 result.actionId=id;return result;
}
export function takeSwap(s,actor,a,b,revision,now=Date.now()){
 const battle=guard(s,actor,revision,now),before=dungeonSnapshot(s),result=resolveSwap(battle.board,a,b,randomFor(s.dungeon));
 const sources=clearSources(s,actor,result.counts),gained=absorb(s,actor,result.counts),hit=damageTarget(s,actor,sources.reduce((sum,x)=>sum+x.raw,0),true);battle.board=result.board;
 const answer={...result,...hit,sources,gained,actor,healed:0,patchActive:actor==='player'&&battle.patchTurns>0};
 if(answer.patchActive){answer.healed=healFromCombat(s,result.frames.reduce((n,f)=>n+f.cleared.length,0)*20);battle.patchTurns=result.doubleWildcard?0:battle.patchTurns-1;answer.extraTurn=battle.patchTurns>0;answer.note='Field Patch: '+battle.patchTurns+' swaps left; '+battle.healingUsed+'/'+HEALING_LIMIT+' HP recovered';if(result.doubleWildcard)answer.note+='; double-Wildcard ended sequence';}
 stampImpacts(s,answer);answer.outcome=endAction(s,actor,answer.extraTurn,now);answer.finalBattle=structuredClone(battle);return recordAction(s,answer,before,now);
}
export function useAbility(s,actor,id,target,revision,now=Date.now()){
 const b=guard(s,actor,revision,now),enemy=enemies[s.dungeon.index],a=(actor==='player'?abilities:enemy.abilities).find(a=>a.id===id);if(!a)throw Error('This ability is not available.');
 if(actor==='player'&&b.patchTurns>0)throw Error('Finish the Field Patch swaps before using another ability.');
 const i=circuits.findIndex(c=>c.key===a.key),ap=actor==='player'?b.playerAP:b.enemyAP,effect=actor==='player'?id:a.effect;
 if(ap[i]<a.cost)throw Error('Match more '+s.settings.dungeon.mapping[a.key]+' circuits first.');
 if(effect==='forge'&&(!Number.isInteger(target)||target<0||target>=64||b.board[target]===6))throw Error('Choose a non-wildcard circuit.');
 if((effect==='cloak'||effect==='shield')&&b[actor+'Shield'])throw Error('Protection is already active.');
 const before=dungeonSnapshot(s);let line=null;if(effect==='recompile'||effect==='line')line=resolveLine(b.board,target,randomFor(s.dungeon));
 ap[i]-=a.cost;const result={ability:a.name,cost:a.cost,key:a.key,actor,damage:0,actualDamage:0,crit:false,extraTurn:effect==='forge'||effect==='patch',gained:[0,0,0,0,0],frames:[],sources:[],note:'',healed:0};
 if(effect==='overclock'){const enhanced=enemy.weakness.includes('tech')||/robot/i.test(enemy.designation),raw=enhanced?100:65;result.sources=[{label:enhanced?'Overclock · TECH vulnerability/robot':'Overclock',raw}];Object.assign(result,damageTarget(s,actor,raw,false,enhanced?.15:0));const prior=b.enemyAP.reduce((n,x)=>n+x,0);b.enemyAP=b.enemyAP.map(n=>Math.floor(n/2));result.note='Enemy mana halved (−'+(prior-b.enemyAP.reduce((n,x)=>n+x,0))+')';}
 if(effect==='patch'){b.patchTurns=3;result.note='Three immediate swaps; +20 HP per cleared gem; no four-match bonus turns';}
 if(effect==='cloak'){b.cloakTurns=2;b.playerShield=true;result.note='50% protection for two enemy actions; reflect 25 + HP lost';}
 if(effect==='shield'){b.enemyShield=true;result.note='75% protection armed';}
 if(effect==='forge'){b.board[target]=6;result.note='Wildcard at row '+(Math.floor(target/8)+1)+', column '+(target%8+1);}
 if(line){result.note=(target.axis==='row'?'Row ':'Column ')+(target.index+1)+' cleared';Object.assign(result,line);b.board=line.board;result.gained=absorb(s,actor,line.counts);result.sources=clearSources(s,actor,line.counts);Object.assign(result,damageTarget(s,actor,result.sources.reduce((n,x)=>n+x.raw,0),actor==='enemy'));}
 if(effect==='attack'){const raw=enemy.tier==='high'?84:56;result.sources=[{label:a.name,raw}];Object.assign(result,damageTarget(s,actor,raw,true));}
 if(effect==='drain'){const max=Math.max(...b.playerAP),j=b.playerAP.indexOf(max);b.playerAP[j]=Math.floor(max/2);result.note='Drained '+s.settings.dungeon.mapping[circuits[j].key]+' mana by '+(max-b.playerAP[j]);}
 stampImpacts(s,result);result.outcome=endAction(s,actor,result.extraTurn,now);result.finalBattle=structuredClone(b);return recordAction(s,result,before,now);
}

function evaluate(board,move,s,actor){
 const sim={rng:(s.dungeon.rng^0x9e3779b9^(move[0]*131+move[1]*17))>>>0},r=resolveSwap(board,...move,randomFor(sim)),enemy=enemies[s.dungeon.index],next=swapped(board,...move),runs=findMatches(next),cells=new Set(runs.flatMap(r=>r.cells));
 if(board[move[0]]===6||board[move[1]]===6){const type=board[move[0]]===6?board[move[1]]:board[move[0]];next.forEach((n,i)=>{if(type===6||n===type)cells.add(i);});}
 const counts=[0,0,0,0,0,0];for(const i of cells)if(next[i]<6)counts[next[i]]++;
 const keys=enemyManaKeys(s),score=counts[0]*28+counts.slice(1).reduce((sum,n,i)=>sum+n*(actor==='player'?(enemy.weakness.includes(circuits[i].key)?11:4):keys.has(circuits[i].key)?8:0),0)+(runs.some(r=>r.cells.length>=4)?70:0)+(runs.some(r=>r.cells.length>=5)?35:0);
 return {score,r,direct:counts[0]*28};
}
export function chooseAI(s){
 const b=s.dungeon.battle,enemy=enemies[s.dungeon.index],moves=legalMoves(b.board),random=randomFor(s.dungeon);
 if(enemy.tier==='low'&&random()<.65)return {move:moves[Math.floor(random()*moves.length)]};
 if(enemy.tier!=='low'){
  const finisher=moves.find(move=>(b.playerShield?Math.ceil(evaluate(b.board,move,s,'enemy').direct*.5):evaluate(b.board,move,s,'enemy').direct)>=s.dungeon.hp);if(finisher)return {move:finisher};
  for(const a of enemy.abilities){const i=circuits.findIndex(c=>c.key===a.key);if(b.enemyAP[i]<a.cost)continue;
   if(a.effect==='shield'&&b.enemyShield)continue;if(a.effect==='drain'&&Math.max(...b.playerAP)<6)continue;
   let target=null;if(a.effect==='forge'){target=b.board.findIndex((t,i)=>t!==6&&[i%8?i-1:-1,i%8<7?i+1:-1,i>=8?i-8:-1,i<56?i+8:-1].some(n=>n>=0&&b.board[n]===0));if(target<0)continue;}
   if(a.effect==='line'){let best=-1;for(let row=0;row<8;row++){const value=b.board.slice(row*8,row*8+8).reduce((v,t)=>v+(t===0?28:circuits[t-1]&&enemyManaKeys(s).has(circuits[t-1].key)?8:0),0);if(value>best){best=value;target={axis:'row',index:row};}}}
   return {ability:a.id,target};
  }
 }
 const rated=moves.map(move=>({move,...evaluate(b.board,move,s,'enemy')})).sort((a,b)=>b.score-a.score);
 if(enemy.tier==='high')for(const item of rated.slice(0,8))item.score-=item.r.extraTurn?0:.65*Math.max(0,...legalMoves(item.r.board).map(m=>evaluate(item.r.board,m,s,'player').score));
 return {move:(enemy.tier==='high'?rated.slice(0,8).sort((a,b)=>b.score-a.score):rated)[0].move};
}
// Plan on a clone for the visible enemy cursor; execution rechecks the revision.
export const planAI=s=>chooseAI(structuredClone(s));
export function takeAITurn(s,revision,planned=null){guard(s,'enemy',revision);const a=planned||chooseAI(s);return a.ability?useAbility(s,'enemy',a.ability,a.target,revision):takeSwap(s,'enemy',...a.move,revision);}
