// Display-only effects: accounting and combat have already been saved by the caller.
import {dungeonCue,dungeonHitSound} from './sound.js';
import {findMatches} from './dungeon-board.js';
import {manaFramePlan,remainingManaPlan} from './dungeon-mana.js';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const cell=i=>document.querySelector('[data-circuit="'+i+'"]');
export async function animateSwap(move,active){
 if(!move||!active())return;const [a,b]=move.map(cell);if(!a||!b)return;
 const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),dx=br.x-ar.x,dy=br.y-ar.y;
 const options={duration:380,easing:'cubic-bezier(.22,.75,.25,1)',fill:'forwards'};
 const animations=[a.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx}px,${dy}px) scale(.94)`}],options),b.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${-dx}px,${-dy}px) scale(.94)`}],options)];
 await wait(400);animations.forEach(a=>a.cancel());
}
async function sparkBurst(cells,rainbow,active){
 const nodes=[];for(const at of cells.slice(0,6)){const r=cell(at)?.getBoundingClientRect();if(!r)continue;for(let n=0;n<10;n++){const spark=document.createElement('i'),angle=Math.PI*2*n/10,distance=30+Math.random()*65;spark.className='combo-spark'+(rainbow?' rainbow-spark':'');Object.assign(spark.style,{left:r.x+r.width/2+'px',top:r.y+r.height/2+'px',color:rainbow?`hsl(${n*36} 100% 75%)`:'#fff3bb'});document.body.append(spark);spark.animate([{transform:'translate(-50%,-50%) scale(.4)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(angle)*distance}px),calc(-50% + ${Math.sin(angle)*distance+12}px)) scale(.1)`,opacity:0}],{duration:720,easing:'cubic-bezier(.1,.65,.25,1)',fill:'forwards'});nodes.push(spark);}}
 try{for(let elapsed=0;elapsed<720&&active();elapsed+=90)await wait(90);}finally{nodes.forEach(n=>n.remove());}
}
function impactFlash(target,x,y){const r=target.getBoundingClientRect(),flash=document.createElement('i');flash.className='card-shot-impact';Object.assign(flash.style,{left:x-r.x+'px',top:y-r.y+'px'});target.append(flash);setTimeout(()=>flash.remove(),650);}
async function strikeShots(origins,actor,active,sounds){
 const nodes=[];try{for(const start of origins.slice(0,5)){if(!active())break;const target=document.querySelector(actor==='player'?'.boss-panel':'.player-hp-panel'),r=target?.getBoundingClientRect();if(!r)break;const end={x:r.x+r.width*(.22+Math.random()*.56),y:r.y+r.height*(.25+Math.random()*.5)},dx=end.x-start.x,dy=end.y-start.y,angle=Math.atan2(dy,dx),shot=document.createElement('i');shot.className='strike-shot';Object.assign(shot.style,{left:start.x+'px',top:start.y+'px'});document.body.append(shot);nodes.push(shot);dungeonCue(sounds,'shot').catch(()=>{});const flight=shot.animate([{transform:`translate(-50%,-50%) rotate(${angle}rad) scaleX(.4)`,opacity:0},{transform:`translate(${dx*.12}px,${dy*.12}px) rotate(${angle}rad) scaleX(1.6)`,opacity:1,offset:.12},{transform:`translate(${dx}px,${dy}px) rotate(${angle}rad) scaleX(.7)`,opacity:1}],{duration:340,easing:'cubic-bezier(.3,.15,.7,1)',fill:'forwards'});flight.finished.then(()=>{shot.remove();if(active())impactFlash(target,end.x,end.y);}).catch(()=>{});await wait(95);}await wait(350);}finally{nodes.forEach(n=>{n.getAnimations().forEach(a=>a.cancel());n.remove();});}
}
const originsFor=cells=>cells.map(i=>cell(i)?.getBoundingClientRect()).filter(Boolean).map(r=>({x:r.x+r.width/2,y:r.y+r.height/2}));
async function particles(frame,events,actor,access,active,onManaArrival,sourceKey=null){
 if(!active())return;
 const canvas=document.createElement('canvas');canvas.className='dungeon-particles';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 const ratio=Math.min(devicePixelRatio||1,2),width=innerWidth,height=innerHeight;canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=width+'px';canvas.style.height=height+'px';const ctx=canvas.getContext('2d');ctx?.scale(ratio,ratio);
 const groups=[];
 const rectFor=event=>event.cell!==null?cell(event.cell)?.getBoundingClientRect():document.querySelector(sourceKey?`[data-mana-target="${actor}-${sourceKey}"]`:'.dungeon-board')?.getBoundingClientRect();
 const add=(event,type,rect)=>{if(!rect)return;const c=access[type-1],dots=Array.from({length:events.length>64?1:3},(_,n)=>{const angle=Math.random()*Math.PI*2,distance=14+Math.random()*30;return {dx:Math.cos(angle)*distance,dy:Math.sin(angle)*distance,size:n===0?3.5:1.8};});groups.push({event,type,x:rect.x+rect.width/2,y:rect.y+rect.height/2,color:c?.color||'#f9e8b3',dots});};
 for(const i of frame?.cleared||[])if(frame.before[i]!==0){const motes=events.filter(e=>e.cell===i);if(motes.length)for(const mote of motes)add(mote,frame.before[i],cell(i)?.getBoundingClientRect());else add(null,frame.before[i],cell(i)?.getBoundingClientRect());}
 for(const event of events)if(event.cell===null)add(event,event.index+1,rectFor(event));
 let arrived=0;const duration=Math.max(1100,(events.at(-1)?.arrival||850)+160);
 try{await new Promise(resolve=>{const start=performance.now();function draw(now){
  const elapsed=now-start;if(!active()){resolve();return;}
  // Each callback corresponds to the arrival of ONE main mote, not its decorative trails.
  while(arrived<events.length&&elapsed>=events[arrived].arrival){onManaArrival(events[arrived].index);arrived++;}
  ctx?.clearRect(0,0,width,height);
  if(elapsed>=duration){resolve();return;}
  if(ctx)for(const g of groups){
   const arrival=g.event?.arrival||1100;if(elapsed>=arrival)continue;
   const spread=1-Math.pow(1-Math.min(elapsed/450,1),3),startSiphon=Math.max(460,arrival-340),progress=Math.max(0,Math.min(1,(elapsed-startSiphon)/(arrival-startSiphon))),siphon=progress**3;
   const c=access[g.event?.index],target=c&&document.querySelector(`[data-mana-target="${actor}-${c.key}"]`)?.getBoundingClientRect();
   for(const d of g.dots){let x=g.x+d.dx*spread,y=g.y+d.dy*spread,alpha;
    if(target){x+=(target.x+target.width/2-x)*siphon;y+=(target.y+target.height/2-y)*siphon;alpha=1-progress**8;}else alpha=Math.pow(Math.max(0,1-elapsed/1100),1.5);
    ctx.globalAlpha=alpha;ctx.fillStyle=g.color;ctx.shadowColor=g.color;ctx.shadowBlur=18;ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.arc(x,y,d.size*(1-progress*.45),0,Math.PI*2);ctx.fill();
   }
  }
  requestAnimationFrame(draw);
 }requestAnimationFrame(draw);});}finally{canvas.remove();}
}
async function quietMana(gained,active,onManaArrival){
 const events=remainingManaPlan([...gained]),gap=Math.min(35,600/Math.max(1,events.length));
 for(const event of events){if(!active())return;onManaArrival(event.index);await wait(gap);}
}

async function fall(frame){
 const animations=[];for(let i=0;i<64;i++){const tile=cell(i),source=frame.sources?.[i];if(!tile)continue;const r=tile.getBoundingClientRect(),from=source>=0?cell(source)?.getBoundingClientRect():null,dy=from?from.y-r.y:-(r.height+5)*(Math.floor(i/8)+1);if(dy)animations.push(tile.animate([{transform:`translateY(${dy}px)`,opacity:source<0?.25:1},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,.7,.3,1)'}));}await wait(330);animations.forEach(a=>a.cancel());
}
export async function presentDungeonTurn({result,before,paint,access,quiet,active,sounds,onManaArrival=()=>{}}){
 if(quiet){paint(result.board||before.battle?.board,'Resolving turn',[],[],result.hiddenAfter??null,result.finalBattle?.mechanics?.falling??null,result.finalBattle?.mechanics?.turrets??null);if(result.damage)dungeonHitSound(sounds,result.crit).catch(()=>{});await quietMana(result.gained||[0,0,0,0,0],active,onManaArrival);await wait(120);return;}
 if(result.actor==='enemy'&&result.move){paint(before.battle.board,'Enemy selecting circuits',result.move,[],before.battle.tactics.hidden,before.battle.mechanics.falling,before.battle.mechanics.turrets);await wait(1000);if(!active())return;}
 if(result.move){dungeonCue(sounds,'swap').catch(()=>{});paint(before.battle.board,'Switching circuits',[],[],before.battle.tactics.hidden,before.battle.mechanics.falling,before.battle.mechanics.turrets);await animateSwap(result.move,active);}
 if(!result.activationFrames&&result.events?.some(e=>e.kind==='reveal')){paint(result.revealed,'Mystery revealed',[],[],result.frames[0]?.hiddenBefore??result.hiddenAfter??before.battle.tactics.hidden,before.battle.mechanics.falling,before.battle.mechanics.turrets);for(const e of result.events.filter(e=>e.kind==='reveal'))cell(e.cell)?.classList.add('mystery-reveal');dungeonCue(sounds,'ability').catch(()=>{});await wait(600);}
 if(result.ability){paint(before.battle.board,result.ability,[],[],before.battle.tactics.hidden,before.battle.mechanics.falling,before.battle.mechanics.turrets);dungeonCue(sounds,'ability').catch(()=>{});const target=document.querySelector(result.key==='cool'?(result.actor==='player'?'.player-hp-panel':'.boss-panel'):'.dungeon-board');const aura=document.createElement('div');aura.className='ability-aura aura-'+result.key;aura.textContent=result.ability+(result.note?' · '+result.note:'');target?.append(aura);await wait(600);aura.remove();}
 const budget=[...(result.gained||[0,0,0,0,0])],frames=result.frames||[];let lastShot=null;
 // Every Mystery activation is presented in order; no batch member is skipped by a frame cap.
 for(const frame of frames){
  if(!active())break;
  if(frame.activated?.length){paint(frame.activationBefore,'Mystery ready · '+frame.activated.length+' resolving together',[],[],frame.hiddenBefore??null,frame.fallingBefore,frame.turretsBefore);for(const i of frame.activated)cell(i)?.classList.add('mystery-ready');await wait(220);if(!active())break;paint(frame.before,'Mystery group · all outcomes resolve before gravity',[],[],frame.hiddenBefore??null,frame.fallingRevealed??frame.fallingBefore,frame.turretsRevealed??frame.turretsBefore);for(const i of frame.activated)cell(i)?.classList.add('mystery-reveal');dungeonCue(sounds,'ability').catch(()=>{});await wait(600);}
  paint(frame.before,'Breaking circuits',[],frame.cleared,frame.hiddenBefore??null,frame.fallingRevealed??frame.fallingBefore??null,frame.turretsRevealed??frame.turretsBefore??null);for(const e of frame.events||[])if(e.kind==='mine')cell(e.cell)?.classList.add('mine-detonating');const runs=findMatches(frame.before),longest=Math.max(0,...runs.map(r=>r.cells.length));if(longest>=4){dungeonCue(sounds,longest>=5?'five':'four').catch(()=>{});const board=document.querySelector('.dungeon-board');board?.classList.add(longest>=5?'match-five':'match-four');const label=document.createElement('div');label.className='combo-caption';label.textContent=result.forceEnd?(longest>=5?'WILDCARD · GRENADE ENDS TURN':'4 MATCH · GRENADE ENDS TURN'):result.patchActive?(longest>=5?'WILDCARD · FIELD PATCH':'4 MATCH · FIELD PATCH'):(longest>=5?'WILDCARD · EXTRA TURN':'4 MATCH · EXTRA TURN');board?.append(label);}
  const events=manaFramePlan(frame,budget,result.chargeMultiplier||1),shots=originsFor(frame.cleared.filter(i=>frame.before[i]===0));if(lastShot)shots.unshift(lastShot);lastShot=shots.pop()||lastShot;const comboCells=runs.filter(r=>r.cells.length>=4).flatMap(r=>r.cells);await Promise.all([particles(frame,events,result.actor,access,active,index=>{onManaArrival(index);dungeonCue(sounds,'mana').catch(()=>{});}),strikeShots(shots,result.actor,active,sounds),frame.events?.some(e=>e.kind==='grenade'||e.kind==='mine')?sparkBurst(frame.events.filter(e=>e.kind==='grenade'||e.kind==='mine').map(e=>e.cell),false,active):Promise.resolve(),longest>=4?sparkBurst([...new Set(comboCells)],longest>=5,active):Promise.resolve()]);if(!active())break;
  paint(frame.after,'Circuits settling',[],[],frame.hiddenAfter??null,frame.fallingAfter??null,frame.turretsAfter??null);await fall(frame);for(const o of frame.objectFalls||[])cell(o.to)?.classList.add(o.ready?'object-fuse-ready':'object-fall-hit');if(frame.objectFalls?.some(o=>o.ready))await wait(200);for(const t of frame.turretFalls||[]){cell(t.to)?.classList.add(t.destroyed?'turret-break':'turret-dent');if(t.destroyed){dungeonHitSound(sounds,false).catch(()=>{});await sparkBurst([t.to],false,active);}}await wait(90);
 }
 if(active()&&budget.some(n=>n>0)){paint(result.board||before.battle?.board,'Absorbing mana',[],[],result.hiddenAfter??null,result.finalBattle?.mechanics?.falling??null,result.finalBattle?.mechanics?.turrets??null);await particles(null,remainingManaPlan(budget),result.actor,access,active,onManaArrival,result.key);}
 if(active()){
  paint(result.board||before.battle?.board,result.crit?'CRITICAL HIT':result.damage?'Impact · '+result.damage+' damage':result.ability||'Mana absorbed',[],[],result.hiddenAfter??null,result.finalBattle?.mechanics?.falling??null,result.finalBattle?.mechanics?.turrets??null);
  if(lastShot)await strikeShots([lastShot],result.actor,active,sounds);
  if(result.damage||result.prevented){const target=document.querySelector(result.actor==='player'?'.boss-panel':'.player-hp-panel');target?.classList.add(result.crit?'critical-impact':'damage-impact');const badge=document.createElement('div');badge.className='dungeon-damage-number'+(result.crit?' is-critical':'');badge.textContent=result.damage?(result.crit?'CRITICAL ':'')+'−'+result.damage:'BLOCKED';target?.append(badge);
   dungeonHitSound(sounds,result.crit).catch(()=>{});
   if(result.reflected){const reflected=document.querySelector('.boss-panel'),number=document.createElement('div');number.className='dungeon-damage-number reflection-hit';number.textContent='CLOAK −'+result.reflected;reflected?.append(number);reflected?.classList.add('damage-impact');}
   if(result.crit){const rect=target?.getBoundingClientRect();if(rect){const halo=document.createElement('div');halo.className='critical-ring';Object.assign(halo.style,{left:rect.x+rect.width/2+'px',top:rect.y+rect.height/2+'px'});document.body.append(halo);for(let i=0;i<14;i++){const spark=document.createElement('i'),angle=i/14*Math.PI*2,distance=30+Math.random()*40;spark.style.setProperty('--sx',Math.cos(angle)*distance+'px');spark.style.setProperty('--sy',Math.sin(angle)*distance+'px');halo.append(spark);}setTimeout(()=>halo.remove(),800);}}
  }
  if(result.reactionDamage){const card=document.querySelector('.player-hp-panel'),badge=document.createElement('div');badge.className='dungeon-damage-number';badge.textContent='MINE −'+result.reactionDamage;card?.append(badge);card?.classList.add('damage-impact');dungeonHitSound(sounds,false).catch(()=>{});if(result.reactionReflected){const other=document.querySelector('.boss-panel'),label=document.createElement('div');label.className='dungeon-damage-number reflection-hit';label.textContent='CLOAK −'+result.reactionReflected;other?.append(label);}}
  for(const hit of result.sideHits||[]){if(!active())break;if(hit.source.startsWith('Turret'))await strikeShots(originsFor((result.finalBattle?.mechanics?.turrets||[]).filter(t=>t.owner===hit.actor).map(t=>t.cell).concat((result.bottomShots||[]).filter(t=>t.owner===hit.actor).map(t=>t.cell))),hit.actor,active,sounds);const target=document.querySelector(hit.actor==='player'?'.boss-panel':'.player-hp-panel'),badge=document.createElement('div');badge.className='dungeon-damage-number';badge.textContent=hit.source.split(' ')[0]+' −'+hit.damage;target?.append(badge);target?.classList.add('damage-impact');dungeonHitSound(sounds,false).catch(()=>{});if(hit.reflected){const reflected=document.querySelector('.boss-panel'),label=document.createElement('div');label.className='dungeon-damage-number reflection-hit';label.textContent='CLOAK −'+hit.reflected;reflected?.append(label);}await wait(280);}
  await wait(result.damage||result.reactionDamage?650:250);
 }
}
