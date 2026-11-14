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
async function particles(frame,events,actor,access,active,onManaArrival,sourceKey=null){
 if(!active())return;
 const canvas=document.createElement('canvas');canvas.className='dungeon-particles';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 const ratio=Math.min(devicePixelRatio||1,2),width=innerWidth,height=innerHeight;canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=width+'px';canvas.style.height=height+'px';const ctx=canvas.getContext('2d');ctx?.scale(ratio,ratio);
 const groups=[],eventByCell=new Map(events.filter(e=>e.cell!==null).map(e=>[e.cell,e]));
 const rectFor=event=>event.cell!==null?cell(event.cell)?.getBoundingClientRect():document.querySelector(sourceKey?`[data-mana-target="${actor}-${sourceKey}"]`:'.dungeon-board')?.getBoundingClientRect();
 const add=(event,type,rect)=>{if(!rect)return;const c=access[type-1],dots=Array.from({length:events.length>64?1:3},(_,n)=>{const angle=Math.random()*Math.PI*2,distance=14+Math.random()*30;return {dx:Math.cos(angle)*distance,dy:Math.sin(angle)*distance,size:n===0?3.5:1.8};});groups.push({event,type,x:rect.x+rect.width/2,y:rect.y+rect.height/2,color:c?.color||'#f9e8b3',dots});};
 for(const i of frame?.cleared||[])if(frame.before[i]!==0)add(eventByCell.get(i)||null,frame.before[i],cell(i)?.getBoundingClientRect());
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
 if(quiet){paint(result.board||before.battle?.board,'Resolving turn');if(result.damage)dungeonHitSound(sounds,result.crit).catch(()=>{});await quietMana(result.gained||[0,0,0,0,0],active,onManaArrival);await wait(120);return;}
 if(result.actor==='enemy'&&result.move){paint(before.battle.board,'Enemy selecting circuits',result.move);await wait(1000);if(!active())return;}
 if(result.move){dungeonCue(sounds,'swap').catch(()=>{});paint(before.battle.board,'Switching circuits');await animateSwap(result.move,active);}
 if(result.ability){paint(before.battle.board,result.ability);dungeonCue(sounds,'ability').catch(()=>{});const target=document.querySelector(result.key==='cool'?(result.actor==='player'?'.player-hp-panel':'.boss-panel'):'.dungeon-board');const aura=document.createElement('div');aura.className='ability-aura aura-'+result.key;aura.textContent=result.ability+(result.note?' · '+result.note:'');target?.append(aura);await wait(600);aura.remove();}
 const budget=[...(result.gained||[0,0,0,0,0])],frames=result.frames||[];
 // Long cascades remain bounded on phones; all rewards still account for every frame.
 for(const frame of frames.slice(0,5)){
  if(!active())break;paint(frame.before,'Breaking circuits',[],frame.cleared);const runs=findMatches(frame.before),longest=Math.max(0,...runs.map(r=>r.cells.length));if(longest>=4){dungeonCue(sounds,longest>=5?'five':'four').catch(()=>{});const board=document.querySelector('.dungeon-board');board?.classList.add(longest>=5?'match-five':'match-four');const label=document.createElement('div');label.className='combo-caption';label.textContent=longest>=5?'WILDCARD · EXTRA TURN':'4 MATCH · EXTRA TURN';board?.append(label);}
  const events=manaFramePlan(frame,budget);await particles(frame,events,result.actor,access,active,index=>{onManaArrival(index);dungeonCue(sounds,'mana').catch(()=>{});});if(!active())break;
  paint(frame.after,'Circuits settling');await fall(frame);await wait(90);
 }
 if(active()&&budget.some(n=>n>0)){paint(result.board||before.battle?.board,'Absorbing mana');await particles(null,remainingManaPlan(budget),result.actor,access,active,onManaArrival,result.key);}
 if(active()){
  paint(result.board||before.battle?.board,result.crit?'CRITICAL HIT':result.damage?'Impact · '+result.damage+' damage':result.ability||'Mana absorbed');
  if(result.damage){await strikeVolley(result,before,active,sounds);if(!active())return;const target=document.querySelector(result.actor==='player'?'.boss-panel':'.player-hp-panel');target?.classList.add(result.crit?'critical-impact':'damage-impact');const badge=document.createElement('div');badge.className='dungeon-damage-number'+(result.crit?' is-critical':'');badge.textContent=(result.crit?'CRITICAL ':'')+'−'+result.damage;target?.append(badge);
   dungeonHitSound(sounds,result.crit).catch(()=>{});
   if(result.crit){const rect=target?.getBoundingClientRect();if(rect){const halo=document.createElement('div');halo.className='critical-ring';Object.assign(halo.style,{left:rect.x+rect.width/2+'px',top:rect.y+rect.height/2+'px'});document.body.append(halo);for(let i=0;i<14;i++){const spark=document.createElement('i'),angle=i/14*Math.PI*2,distance=30+Math.random()*40;spark.style.setProperty('--sx',Math.cos(angle)*distance+'px');spark.style.setProperty('--sy',Math.sin(angle)*distance+'px');halo.append(spark);}setTimeout(()=>halo.remove(),800);}}
  }
  await wait(result.damage?650:250);
 }
}

const burns=[];
export function restoreDungeonBurns(){const now=Date.now();while(burns.length&&now-burns[0].at>4000)burns.shift();for(const b of burns){const card=document.querySelector(b.selector);if(!card||b.foe&&card.dataset.foe!==b.foe||card.querySelector('[data-burn="'+b.id+'"]'))continue;const mark=document.createElement('i');mark.className='impact-burn';mark.dataset.burn=b.id;mark.style.left=b.x+'%';mark.style.top=b.y+'%';mark.style.animationDelay=-(now-b.at)+'ms';card.append(mark);setTimeout(()=>mark.remove(),Math.max(0,4000-(now-b.at)));}}
async function strikeVolley(result,before,active,sounds){
 const selector=result.actor==='player'?'.boss-panel':'.player-hp-panel',count=result.ability?1:Math.min(16,result.counts?.[0]||0);if(!count)return;
 const board=document.querySelector('.dungeon-board')?.getBoundingClientRect();if(!board)return;
 for(let i=0;i<count;i++){if(!active())return;const card=document.querySelector(selector),r=card?.getBoundingClientRect();if(!r)return;const x=25+Math.random()*50,y=25+Math.random()*50,shot=document.createElement('i');shot.className='strike-projectile'+(result.ability?' ability-projectile ability-'+result.key:'');document.body.append(shot);const strikeCells=(result.frames||[]).flatMap(f=>f.cleared.filter(j=>f.before[j]===0)),source=cell(strikeCells[i%Math.max(1,strikeCells.length)])?.getBoundingClientRect();const sx=source?source.x+source.width/2:board.x+board.width/2,sy=source?source.y+source.height/2:board.y+board.height*.5,tx=r.x+r.width*x/100,ty=r.y+r.height*y/100;shot.style.left=sx+'px';shot.style.top=sy+'px';shot.animate([{transform:'translate(0,0)',opacity:1},{transform:'translate('+(tx-sx)+'px,'+(ty-sy)+'px)',opacity:1}],{duration:220,easing:'ease-in'});dungeonCue(sounds,result.ability?'ability':'shot').catch(()=>{});
 await wait(220);shot.remove();if(!active())return;burns.push({id:crypto.randomUUID(),at:Date.now(),selector,foe:card.dataset.foe||null,x,y});if(burns.length>32)burns.shift();restoreDungeonBurns();card.getAnimations().forEach(a=>a.cancel());card.animate([{transform:'translateX(-2px)'},{transform:'translateX(2px)'},{transform:'translateX(0)'}],{duration:130});
 }
}
