import {createBoard,resolveSwap,resolveLine,legalMoves,swapped,findMatches} from './dungeon-board.js';
import {enemies,legacyNames} from './dungeon-enemies.js';
export {enemies};
export const circuits=[{key:'tech',name:'TECH',symbol:'⌘',color:'#6dd5ff'},{key:'body',name:'BODY',symbol:'⬢',color:'#ff927a'},{key:'intelligence',name:'INTELLIGENCE',symbol:'◆',color:'#c1a5ff'},{key:'cool',name:'COOL',symbol:'🕶',color:'#6ee4ba'},{key:'os',name:'OPERATING SYSTEM',symbol:'▣',color:'#f6cd6a'}];
export const abilities=[
 {id:'overclock',key:'tech',name:'Overclock',cost:10,description:'Deal 7 damage and halve every enemy mana pool, rounded down. Ends your turn.'},
 {id:'patch',key:'body',name:'Field Patch',cost:10,description:'Add 5 mana to a chosen Attribute, up to 30. Ends your turn. Does not heal HP.'},
 {id:'recompile',key:'intelligence',name:'Recompile',cost:10,description:'Clear a chosen row or column and collect its Attribute mana, including cascades. No damage. Keep your turn if at least four of one color are cleared in the selected line, or a cascade matches four.'},
 {id:'cloak',key:'cool',name:'Cloak',cost:10,description:'Block 75% of the next incoming damaging action. Ends your turn.'},
 {id:'forge',key:'os',name:'Wildcard Forge',cost:18,description:'Turn a chosen circuit into a wildcard and keep your turn.'}
];
const key=s=>s.trim().toUpperCase();
const randomFor=d=>()=>{d.rng=(Math.imul(d.rng,1664525)+1013904223)>>>0;return d.rng/4294967296;};
export function defaultDungeon(){return {version:2,hp:800,buffUntil:0,index:0,rng:Math.floor(Math.random()*4294967295),revision:0,battle:null,log:[],wins:0,runs:0,streak:0,encounters:0};}
export function upgradeDungeon(s){
 s.dungeon??=defaultDungeon();const d=s.dungeon;
 s.settings.dungeon??={mapping:Object.fromEntries(circuits.map(c=>[c.key,c.name]))};
 const config=s.settings.dungeon;config.sound??=true;config.attributeIcons??=false;config.compactEnemy??=false;config.zen??=false;
 if(d.version!==2){
  d.version=2;d.streak=0;d.encounters=d.wins+(d.battle?1:0);if(d.index>=35)d.index=0;
  const rename=text=>[...legacyNames].sort((a,b)=>b[0].length-a[0].length).reduce((v,[alias,name])=>v.replaceAll(alias,name),text);
  d.log=d.log.map(rename);for(const h of s.history||[])if(h.type==='dungeon')h.title=rename(h.title);
  if(d.battle){d.battle.playerBoost=0;d.battle.enemyBoost=0;const keys=new Set(enemies[d.index].abilities.map(a=>a.key));d.battle.enemyAP=d.battle.enemyAP.map((n,i)=>keys.has(circuits[i].key)?n:0);}
 }
 validateDungeon(s);return s;
}
export function validateDungeon(s){
 const d=s.dungeon,c=s.settings.dungeon,integer=(x,min,max)=>Number.isInteger(x)&&x>=min&&x<=max;
 if(!d||d.version!==2||!integer(d.hp,0,1600)||!integer(d.index,0,enemies.length-1)||!integer(d.rng,0,4294967295)||!integer(d.revision,0,Number.MAX_SAFE_INTEGER)||!Number.isFinite(d.buffUntil)||d.buffUntil<0||!['wins','runs','streak','encounters'].every(k=>integer(d[k],0,Number.MAX_SAFE_INTEGER))||!Array.isArray(d.log)||d.log.length>80||!d.log.every(x=>typeof x==='string'&&x.length<=2000)||!c||!['sound','attributeIcons','compactEnemy','zen'].every(k=>typeof c[k]==='boolean')||!c.mapping||!circuits.every(x=>typeof c.mapping[x.key]==='string'&&key(c.mapping[x.key]).length>0&&c.mapping[x.key].length<=160)||new Set(circuits.map(x=>key(c.mapping[x.key]))).size!==5)throw Error('Invalid Dungeon health or Attribute mapping.');
 const b=d.battle;if(b){
  if(b.enemyId!==enemies[d.index].id||!integer(b.enemyHP,1,enemies[d.index].hp)||!['player','enemy','defeated'].includes(b.turn)||!Array.isArray(b.board)||b.board.length!==64||!b.board.every(n=>integer(n,0,6))||!Array.isArray(b.playerAP)||!Array.isArray(b.enemyAP)||b.playerAP.length!==5||b.enemyAP.length!==5||![...b.playerAP,...b.enemyAP].every(n=>integer(n,0,30))||typeof b.playerShield!=='boolean'||typeof b.enemyShield!=='boolean')throw Error('Invalid saved Dungeon battle.');
  if(findMatches(b.board).length||!legalMoves(b.board).length)throw Error('Saved Dungeon board must be stable and playable.');
 }
}
export const maxHealth=(s,now=Date.now())=>s.dungeon.buffUntil>now?1600:800;
export function normalizeHealth(s,now=Date.now()){s.dungeon.hp=Math.min(s.dungeon.hp,maxHealth(s,now));}
export function healthVitals(s,now=Date.now()){const hp=Math.min(s.dungeon.hp,maxHealth(s,now)),max=maxHealth(s,now),ratio=hp/max;return {hp,max,ratio,tone:ratio===0?'flat':ratio<=.2?'critical':ratio<=.4?'low':ratio<=.65?'strained':ratio<=.85?'steady':'strong',label:ratio===0?'OFFLINE':ratio<=.2?'CRITICAL':ratio<=.4?'LOW':ratio<=.65?'STRAINED':ratio<=.85?'STEADY':'STRONG'};}
export function healFromMission(s,xp,now=Date.now()){normalizeHealth(s,now);const before=s.dungeon.hp;s.dungeon.hp=Math.min(maxHealth(s,now),before+Math.max(0,xp));if(s.dungeon.hp!==before)s.dungeon.revision++;if(s.dungeon.hp>0&&s.dungeon.battle?.turn==='defeated')s.dungeon.battle.turn='player';return s.dungeon.hp-before;}
export function dungeonAccess(s){return circuits.map(c=>{const wanted=s.settings.dungeon.mapping[c.key],matches=s.skills.filter(a=>!a.parentId&&key(a.title)===key(wanted));return {...c,wanted,attribute:matches.length===1?matches[0]:null,ambiguous:matches.length>1};});}
function log(d,text){d.log.unshift(text);d.log=d.log.slice(0,80);}
export const encounterOdds=s=>s.dungeon.streak>=5?{low:.55,mid:.30,high:.15}:{low:.60,mid:.30,high:.10};
export function rollEnemy(s){const odds=encounterOdds(s),random=randomFor(s.dungeon),roll=random(),tier=roll<odds.low?'low':roll<odds.low+odds.mid?'mid':'high',pool=enemies.filter(e=>e.tier===tier);return pool[Math.floor(random()*pool.length)];}
export function startBattle(s){
 if(dungeonAccess(s).some(c=>!c.attribute))throw Error('Add or map all five required Attributes first.');normalizeHealth(s);const d=s.dungeon;if(d.battle)return d.battle;
 const enemy=rollEnemy(s);d.index=enemies.indexOf(enemy);d.encounters++;
 d.battle={enemyId:enemy.id,enemyHP:enemy.hp,turn:d.hp>0?'player':'defeated',board:createBoard(randomFor(d)),playerAP:[0,0,0,0,0],enemyAP:[0,0,0,0,0],playerShield:false,enemyShield:false};
 d.revision++;log(d,'ENCOUNTER · '+enemy.name+' · Level '+enemy.level+' · '+enemy.tier.toUpperCase());return d.battle;
}
export function restartRun(){throw Error('Encounters are now endless and randomized.');}
function guard(s,actor,revision){const d=s.dungeon;normalizeHealth(s);if(dungeonAccess(s).some(c=>!c.attribute))throw Error('Required Attributes are missing.');if(!d.battle||d.battle.turn!==actor||d.hp<=0)throw Error('Wait for your turn or restore health with missions.');if(revision!==undefined&&revision!==d.revision)throw Error('That turn has already resolved.');return d.battle;}
export const strikePower=()=>28;
export function enemyManaKeys(s){return new Set(enemies[s.dungeon.index].abilities.map(a=>a.key));}
export function healingPenaltyMissions(s,now=Date.now()){return s.missions.filter(m=>m.status==='active'&&m.originalDueAt&&Number.isFinite(Date.parse(m.originalDueAt))&&now-Date.parse(m.originalDueAt)>=14*86400000);}
export function winHealing(s,now=Date.now()){return healingPenaltyMissions(s,now).length?150:300;}
function victory(s,now){
 const d=s.dungeon,enemy=enemies[d.index],random=randomFor(d);s.profile.coins+=enemy.reward;let drop=null,bonus=false;
 if(enemy.tier!=='low'){d.buffUntil=now+2*86400000;bonus=true;const pool=s.rewards.filter(r=>r.quantity!==0);if(pool.length&&random()<(enemy.tier==='high'?.65:.35)){const r=pool[Math.floor(random()*pool.length)];r.inventory++;if(r.quantity>0)r.quantity--;drop={id:r.id,title:r.title,icon:r.icon};}}
 const healing=winHealing(s,now),beforeHP=d.hp;d.hp=Math.min(maxHealth(s,now),d.hp+healing);const outcome={healing,healed:d.hp-beforeHP,enemy:enemy.name,level:enemy.level,coins:enemy.reward,drop,bonus};
 s.history.unshift({id:globalThis.crypto.randomUUID(),type:'dungeon',title:enemy.name,at:new Date(now).toISOString(),coins:enemy.reward,xp:0,drop:drop?.title||'',bossLevel:enemy.level});
 d.wins++;d.streak++;log(d,'VICTORY · '+enemy.name+' · €$'+enemy.reward+' · '+d.streak+' win streak'+(drop?' · Drop: '+drop.title:''));d.battle=null;return outcome;
}
function endAction(s,actor,extra,now){const d=s.dungeon,b=d.battle;d.revision++;if(b.enemyHP<=0)return victory(s,now);if(d.hp<=0){b.turn='defeated';d.streak=0;log(d,'DEFEAT · Health depleted. Win streak and encounter bonus reset. Complete missions to resume this saved fight.');return null;}b.turn=extra?actor:(actor==='player'?'enemy':'player');return null;}
function absorb(s,actor,counts){const b=s.dungeon.battle,ap=actor==='player'?b.playerAP:b.enemyAP,keys=enemyManaKeys(s),gained=[0,0,0,0,0];for(let i=0;i<5;i++)if(actor==='player'||keys.has(circuits[i].key)){const before=ap[i];ap[i]=Math.min(30,ap[i]+counts[i+1]);gained[i]=ap[i]-before;}return gained;}
function damageTarget(s,actor,raw,canCrit=false){const b=s.dungeon.battle,enemy=enemies[s.dungeon.index];const crit=raw>0&&actor==='enemy'&&canCrit&&enemy.tier!=='low'&&randomFor(s.dungeon)()<(enemy.tier==='high'?.20:.15);let damage=crit?Math.round(raw*1.5):raw;const shield=actor==='player'?'enemyShield':'playerShield',blocked=damage>0&&b[shield];if(blocked){damage=Math.ceil(damage*.25);b[shield]=false;}if(actor==='player')b.enemyHP=Math.max(0,b.enemyHP-damage);else s.dungeon.hp=Math.max(0,s.dungeon.hp-damage);return {damage,crit,blocked};}
function actionLog(s,actor,result){const name=actor==='player'?'You':enemies[s.dungeon.index].name,charges=(result.gained||[]).map((n,i)=>n?'+'+n+' '+s.settings.dungeon.mapping[circuits[i].key]:'').filter(Boolean);log(s.dungeon,name+' · '+(result.ability||'Matched circuits')+' · '+(result.crit?'CRITICAL · ':'')+result.damage+' damage'+(result.blocked?' · CLOAK BLOCK':'')+(charges.length?' · '+charges.join(', '):'')+(result.cost?' · Spent '+result.cost+' '+s.settings.dungeon.mapping[result.key]+' mana':'')+(result.note?' · '+result.note:'')+(result.reshuffled?' · Grid reshuffled':'')+(result.extraTurn?' · EXTRA TURN':'')+(result.wildcards?' · WILDCARD CREATED':''));}
export function takeSwap(s,actor,a,b,revision,now=Date.now()){
 const battle=guard(s,actor,revision),result=resolveSwap(battle.board,a,b,randomFor(s.dungeon));let raw=result.counts[0]*28;
 if(actor==='player')for(let i=0;i<5;i++)if(enemies[s.dungeon.index].weakness.includes(circuits[i].key))raw+=result.counts[i+1]*7;
 const gained=absorb(s,actor,result.counts),hit=damageTarget(s,actor,raw,true);battle.board=result.board;
 const answer={...result,...hit,gained,actor};actionLog(s,actor,answer);answer.outcome=endAction(s,actor,result.extraTurn,now);return answer;
}
export function useAbility(s,actor,id,target,revision,now=Date.now()){
 const b=guard(s,actor,revision),enemy=enemies[s.dungeon.index],a=(actor==='player'?abilities:enemy.abilities).find(a=>a.id===id);if(!a)throw Error('This ability is not available.');
 const i=circuits.findIndex(c=>c.key===a.key),ap=actor==='player'?b.playerAP:b.enemyAP,effect=actor==='player'?id:a.effect;
 if(ap[i]<a.cost)throw Error('Match more '+s.settings.dungeon.mapping[a.key]+' circuits first.');
 if(effect==='forge'&&(!Number.isInteger(target)||target<0||target>=64||b.board[target]===6))throw Error('Choose a non-wildcard circuit.');
 if(effect==='patch'&&(!Number.isInteger(target)||target<0||target>4||ap[target]-(target===i?a.cost:0)>=30))throw Error('Choose an Attribute with room for mana.');
 if((effect==='cloak'||effect==='shield')&&b[actor+'Shield'])throw Error('Cloak is already active.');
 let line=null;if(effect==='recompile'||effect==='line')line=resolveLine(b.board,target,randomFor(s.dungeon));
 ap[i]-=a.cost;const result={ability:a.name,cost:a.cost,key:a.key,actor,damage:0,crit:false,extraTurn:effect==='forge',gained:[0,0,0,0,0],frames:[],note:''};
 if(effect==='overclock'){Object.assign(result,damageTarget(s,actor,7));const before=b.enemyAP.reduce((n,x)=>n+x,0);b.enemyAP=b.enemyAP.map(n=>Math.floor(n/2));result.note='Enemy mana halved (−'+(before-b.enemyAP.reduce((n,x)=>n+x,0))+')';}
 if(effect==='patch'){const before=ap[target];ap[target]=Math.min(30,ap[target]+5);result.gained[target]=ap[target]-before;}
 if(effect==='cloak'||effect==='shield'){b[actor+'Shield']=true;result.note='75% protection armed';}
 if(effect==='forge'){b.board[target]=6;result.note='Wildcard at row '+(Math.floor(target/8)+1)+', column '+(target%8+1);}
 if(line){result.note=(target.axis==='row'?'Row ':'Column ')+(target.index+1)+' cleared';Object.assign(result,line);b.board=line.board;result.gained=absorb(s,actor,line.counts);if(effect==='line')Object.assign(result,damageTarget(s,actor,line.counts[0]*28,true));}
 if(effect==='attack')Object.assign(result,damageTarget(s,actor,enemy.tier==='high'?84:56,true));
 if(effect==='drain'){const max=Math.max(...b.playerAP),j=b.playerAP.indexOf(max);b.playerAP[j]=Math.floor(max/2);result.note='Drained '+s.settings.dungeon.mapping[circuits[j].key]+' mana by '+(max-b.playerAP[j]);}
 actionLog(s,actor,result);result.outcome=endAction(s,actor,result.extraTurn,now);return result;
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
  const finisher=moves.find(move=>(b.playerShield?Math.ceil(evaluate(b.board,move,s,'enemy').direct*.25):evaluate(b.board,move,s,'enemy').direct)>=s.dungeon.hp);if(finisher)return {move:finisher};
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
