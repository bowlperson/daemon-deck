// Bounded tactical search. Refill/outcome samples use board-derived seeds, never combat's RNG.
import {resolveSwap,resolveLine,resolveTransform,legalMoves,swapped,findMatches} from './dungeon-board.js';
import {tierRank,armorPower,counterPower,tickStatuses} from './dungeon-tactics.js';
const keys=['tech','body','intelligence','cool','os'];
const playerAbilities=[{id:'overclock',key:'tech',cost:10},{id:'patch',key:'body',cost:12},{id:'recompile',key:'intelligence',cost:10},{id:'cloak',key:'cool',cost:10},{id:'forge',key:'os',cost:18}];
const randomFor=seed=>()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const other=actor=>actor==='enemy'?'player':'enemy';
const neighbors=i=>[i%8?i-1:-1,i%8<7?i+1:-1,i>=8?i-8:-1,i<56?i+8:-1].filter(i=>i>=0);
function viewOf(s){const b=s.dungeon.battle;return {board:[...b.board],hp:{player:s.dungeon.hp,enemy:b.enemyHP},mana:{player:[...b.playerAP],enemy:[...b.enemyAP]},shield:b.enemyShield,cloak:b.cloakTurns,patch:b.patchTurns,healingUsed:b.healingUsed,tactics:structuredClone(b.tactics),mechanics:structuredClone(b.mechanics)};}
const movesFor=(v,actor)=>legalMoves(v.board).filter(([a,b])=>v.mechanics[actor].cripple<0||v.board[a]!==v.mechanics[actor].cripple&&v.board[b]!==v.mechanics[actor].cripple);
function visibleValue(board,attack){const runs=findMatches(board);return runs.reduce((sum,r)=>sum+r.cells.length*(r.type===0?28:attack.includes(keys[r.type-1])?7:2)+(r.cells.length>=4?55:0),0);}
function conversionTargets(board,type,max,attack){const choices=new Map();const add=indices=>{if(!indices.length||indices.length>max)return;const sorted=[...new Set(indices)].sort((a,b)=>a-b),next=[...board];sorted.forEach(i=>next[i]=type);choices.set(sorted.join(','),{target:sorted,score:visibleValue(next,attack)});};
 for(let i=0;i<64;i++)if(board[i]<=5&&board[i]!==type)add([i]);
 if(type===0)for(let i=0;i<64;i++)for(const step of [1,8]){if(step===1&&i%8>5||step===8&&i>=48)continue;const window=[i,i+step,i+step*2];if(window.some(n=>board[n]>5))continue;add(window.filter(n=>board[n]!==type));}
 return [...choices.values()].sort((a,b)=>b.score-a.score).slice(0,6).map(x=>x.target);
}
function candidates(v,actor,enemy){const result=movesFor(v,actor).map(move=>({move})),abilities=actor==='enemy'?enemy.abilities:playerAbilities,ap=v.mana[actor];
 for(const a of abilities){const channel=keys.indexOf(a.key),effect=actor==='enemy'?a.effect:a.id;if(ap[channel]<a.cost||actor==='player'&&v.patch>0)continue;
  if((effect==='shield'&&v.shield)||(effect==='cloak'&&v.cloak))continue;
  if(effect==='patch'&&(v.hp.player>=1400||v.healingUsed>=1300))continue;
  if(effect==='line'||effect==='recompile'){for(const axis of effect==='recompile'?['row','column']:[a.axis])for(let index=0;index<8;index++)result.push({ability:a.id,target:{axis,index}});continue;}
  if(effect==='forge'){const targets=v.board.map((type,i)=>({type,i,score:neighbors(i).filter(j=>v.board[j]===0).length*10+neighbors(i).filter(j=>v.board[j]===6).length*20})).filter(x=>x.type<=5).sort((a,b)=>b.score-a.score).slice(0,5);for(const x of targets)result.push({ability:a.id,target:x.i});continue;}
  if(effect==='convert'){for(const target of conversionTargets(v.board,0,tierRank(enemy)+1,enemy.attackCircuits))result.push({ability:a.id,target});continue;}
  if(effect==='drain'){if(!Math.max(...v.mana.player))continue;for(const target of conversionTargets(v.board,channel+1,1,enemy.attackCircuits).slice(0,4))result.push({ability:a.id,target:target[0]});continue;}
  if(effect==='disrupt'&&!v.board.includes(6)&&!Math.max(...v.mana.player))continue;
  result.push({ability:a.id,target:null});
 }
 return result.length?result:[{pass:true}];
}
function heal(v,actor,amount,enemy){const max=actor==='enemy'?enemy.hp:1400,limit=actor==='enemy'?Infinity:1300-v.healingUsed,actual=Math.max(0,Math.min(amount,max-v.hp[actor],limit));v.hp[actor]+=actual;if(actor==='player')v.healingUsed+=actual;}
function preview(before,actor,action,enemy,seed){const v=structuredClone(before),random=randomFor(seed),ap=v.mana[actor],actorState=v.mechanics[actor],options={specials:true,actor,devices:v.mechanics.devices,turrets:v.mechanics.turrets,falling:v.mechanics.falling};let r=null,extra=false,raw=0,mainBlocked=false,armorUsed=0,reflectedOnce=false;
 const hit=(attacker,amount,{critical=false,shieldCovered=false,self=false}={})=>{if(!amount)return;const target=other(attacker),rank=tierRank(enemy);let damage=critical&&attacker==='enemy'?amount*(1+(rank===2?.20:rank===1?.15:0)*.5):amount;if(attacker==='player'&&v.tactics.plateTurns){const blocked=Math.min(damage,Math.max(0,armorPower(enemy)-(!self?armorUsed:0)));damage-=blocked;if(!self)armorUsed+=blocked;}
  const blocked=damage>0&&(attacker==='enemy'?v.cloak>0:v.shield||shieldCovered);if(blocked){damage=Math.ceil(damage*(attacker==='enemy'?.5:.25));if(attacker==='player')v.shield=false;}
  const actual=Math.max(0,Math.min(v.hp[target],damage));v.hp[target]=Math.max(0,v.hp[target]-damage);
  if(attacker==='enemy'&&blocked&&actual>0){v.hp.enemy=Math.max(0,v.hp.enemy-actual-(reflectedOnce?0:25));reflectedOnce=true;}
  if(attacker==='player'&&!self&&actual>0&&v.tactics.chargeWindow){v.tactics.counterBoost=Math.min(actual,counterPower(enemy));v.tactics.chargeWindow=0;}
  return blocked;
 };
 if(action.move){r=resolveSwap(v.board,...action.move,random,options);extra=r.extraTurn;}
 if(action.ability){const a=(actor==='enemy'?enemy.abilities:playerAbilities).find(a=>a.id===action.ability),i=keys.indexOf(a.key),effect=actor==='enemy'?a.effect:a.id;ap[i]-=a.cost;
  if(effect==='overclock'){raw=enemy.weakness.includes('tech')||/robot/i.test(enemy.designation)?100:65;v.mana.enemy=v.mana.enemy.map(n=>Math.floor(n/2));}
  if(effect==='cloak')v.cloak=2;
  if(effect==='patch'){v.patch=3;extra=true;}
  if(effect==='shield'){v.shield=true;ap[i]=Math.min(30,ap[i]+2);}
  if(effect==='forge'){v.board[action.target]=6;extra=true;}
  if(effect==='line'||effect==='recompile')r=resolveLine(v.board,action.target,random,options);
  if(effect==='convert')r=resolveTransform(v.board,action.target.map(index=>({index,type:0})),random,options);
  if(effect==='drain'||effect==='disrupt'){const j=v.mana.player.indexOf(Math.max(...v.mana.player)),amount=Math.min(v.mana.player[j],[1,2,3][tierRank(enemy)],effect==='drain'?30-ap[i]:30);v.mana.player[j]-=amount;const changes=[];if(effect==='drain'){ap[i]+=amount;changes.push({index:action.target,type:i+1});}else v.board.forEach((type,index)=>{if(type===6&&changes.length<tierRank(enemy)+1)changes.push({index,type:i+1});});r=resolveTransform(v.board,changes,random,options);}
 }
 if(r){v.board=r.board;v.mechanics.turrets=r.turrets;v.mechanics.falling=r.falling;v.mechanics.devices=r.devices;const patch=actor==='player'&&before.patch>0;const strike=patch?14:actor==='enemy'&&v.tactics.overdriveTurns?56:28,attack=actor==='enemy'?enemy.attackCircuits:enemy.weakness;
  raw=r.counts[0]*strike;if(!patch)for(let i=0;i<5;i++)if(attack.includes(keys[i]))raw+=r.counts[i+1]*7;
  if(actor==='enemy'&&raw>0&&v.tactics.counterBoost){raw+=v.tactics.counterBoost;v.tactics.counterBoost=0;}
  if(!patch)for(let i=0;i<5;i++)if(actor==='enemy'?enemy.abilities.some(a=>a.key===keys[i]):!(v.tactics.lockTurns&&v.tactics.lockedIndex===i))ap[i]=Math.min(30,ap[i]+r.counts[i+1]);
  heal(v,actor,r.stim*20,enemy);if(patch)heal(v,actor,r.frames.reduce((n,f)=>n+f.cleared.length,0)*10,enemy);
  extra=r.extraTurn;if(patch){v.patch=r.forceEnd||r.doubleWildcard?0:v.patch-1;extra=v.patch>0;}
 }
 mainBlocked=hit(actor,raw,{critical:true});if(r?.mineDamage)hit(other(actor),r.mineDamage,{self:true});
 if(v.hp.enemy>0&&v.hp.player>0){const turretCount=v.mechanics.turrets.filter(t=>t.owner===actor).length+(r?.bottomShots||[]).filter(t=>t.owner===actor).length;if(turretCount)hit(actor,turretCount*25,{shieldCovered:actor==='player'&&mainBlocked});}
 tickStatuses({tactics:v.tactics},actor,enemy);if(actor==='enemy'&&v.cloak)v.cloak--;actorState.cripple=-1;
 return {v,extra,result:r};
}
function manaValue(v,actor,enemy){return (actor==='enemy'?enemy.abilities:playerAbilities).reduce((sum,a)=>{const n=v.mana[actor][keys.indexOf(a.key)];return sum+Math.min(n,a.cost)*2.5+Math.max(0,n-a.cost)*.7+(n>=a.cost?12:0);},0);}
function position(v,enemy){if(v.hp.enemy<=0)return -200000;if(v.hp.player<=0)return 200000;return -v.hp.player*1.15+v.hp.enemy*1.5+manaValue(v,'enemy',enemy)-manaValue(v,'player',enemy)*.75+v.mechanics.turrets.reduce((n,t)=>n+(t.owner==='enemy'?70:-70),0)+(v.shield?25:0)-(v.cloak?20:0)+(v.patch?Math.min(90,1400-v.hp.player,1300-v.healingUsed)*-1:0)+(v.mechanics.devices||[]).reduce((n,d)=>n+(d.owner==='enemy'?1:-1)*(d.type===15?40:55),0)+v.board.filter(n=>n===6).length*3;}
function terrainRank(v,actor,cells){let value=0;for(const o of v.mechanics.falling){if(cells.has(o.cell)){value+=o.type===11?8:-4;continue;}const drop=[...cells].filter(i=>i%8===o.cell%8&&i>o.cell).length;if(o.type===11&&o.fallen+drop>=2)value-=o.power*1.5+(o.power>=v.hp[actor]?500:0);if(o.type===7&&o.fallen+drop>=4)value+=15;}
 for(const t of v.mechanics.turrets){const drop=[...cells].filter(i=>i%8===t.cell%8&&i>t.cell).length;if(cells.has(t.cell)||(t.fallen+drop>=2||Math.floor(t.cell/8)+drop>=7))value+=t.owner===actor?-70:70;}return value;}
function quickRank(v,actor,action,enemy){if(action.pass)return -999;const attack=actor==='enemy'?enemy.attackCircuits:enemy.weakness;if(action.ability){const a=(actor==='enemy'?enemy.abilities:playerAbilities).find(a=>a.id===action.ability),effect=actor==='enemy'?a.effect:a.id;if(effect==='line'||effect==='recompile'){const cells=new Set(Array.from({length:8},(_,j)=>action.target.axis==='row'?action.target.index*8+j:j*8+action.target.index));return [...cells].reduce((n,i)=>n+(v.board[i]===0?28:8),0)+terrainRank(v,actor,cells);}return 70;}
 const next=swapped(v.board,...action.move),cells=new Set(findMatches(next).flatMap(r=>r.cells));if(action.move.some(i=>v.board[i]===6)){const type=next[action.move[0]]===6?next[action.move[1]]:next[action.move[0]];next.forEach((n,i)=>{if(type===6||n===type||action.move.includes(i))cells.add(i);});}return visibleValue(next,attack)+terrainRank(v,actor,cells);
}
function replyCandidates(v,actor,enemy,limit){const all=candidates(v,actor,enemy).sort((a,b)=>quickRank(v,actor,b,enemy)-quickRank(v,actor,a,enemy)),selected=[],seen=new Set();for(const action of all)if(action.ability&&!seen.has(action.ability)){selected.push(action);seen.add(action.ability);}for(const action of all)if(selected.length<limit&&!selected.includes(action))selected.push(action);return selected.slice(0,limit);}
export function analyzeAI(s,enemy){const start=viewOf(s),rank=tierRank(enemy),base=position(start,enemy),hash=start.board.reduce((n,type,i)=>(Math.imul(n,31)+type*(i+1))>>>0,0x2f6e2b1),limits=[{samples:2,beam:3,replies:8},{samples:2,beam:5,replies:12},{samples:3,beam:7,replies:16}][rank];let previews=0;const roots=candidates(start,'enemy',enemy).map((action,index)=>{const outcomes=[];for(let sample=0;sample<limits.samples;sample++){const out=preview(start,'enemy',action,enemy,(hash^Math.imul(index+1,0x9e3779b9)^Math.imul(sample+7,0x85ebca6b))>>>0);previews++;outcomes.push(out);}const scores=outcomes.map(o=>position(o.v,enemy)-base),mean=scores.reduce((a,b)=>a+b,0)/scores.length,risk=Math.sqrt(scores.reduce((n,x)=>n+(x-mean)**2,0)/scores.length);return {action,outcomes,score:mean-risk*.18};}).sort((a,b)=>b.score-a.score);
 for(let i=0;i<Math.min(limits.beam,roots.length);i++){const item=roots[i];let future=0;for(let sample=0;sample<Math.min(2,item.outcomes.length);sample++){const out=item.outcomes[sample];if(out.v.hp.enemy<=0||out.v.hp.player<=0)continue;const nextActor=out.extra?'enemy':'player',prior=position(out.v,enemy),choices=replyCandidates(out.v,nextActor,enemy,limits.replies);let best=nextActor==='enemy'?-Infinity:Infinity;for(let j=0;j<choices.length;j++){const reply=preview(out.v,nextActor,choices[j],enemy,(hash^Math.imul(i+31,0xc2b2ae35)^Math.imul(j+47,0x27d4eb2d)^sample)>>>0);previews++;let delta=position(reply.v,enemy)-prior;if(reply.extra)delta+=nextActor==='enemy'?30:-40;best=nextActor==='enemy'?Math.max(best,delta):Math.min(best,delta);}if(Number.isFinite(best))future+=best;}
  item.finalScore=item.score+future/Math.min(2,item.outcomes.length)*.9;
 }
 const finalists=roots.slice(0,limits.beam).sort((a,b)=>b.finalScore-a.finalScore);return {action:finalists[0].action,previews,considered:roots.length};
}
export const chooseStrategicAction=(s,enemy)=>analyzeAI(s,enemy).action;
