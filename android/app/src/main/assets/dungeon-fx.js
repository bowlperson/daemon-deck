// Display-only effects: accounting and combat have already been saved by the caller.
import {dungeonHitSound} from './sound.js';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const cell=i=>document.querySelector('[data-circuit="'+i+'"]');
export async function animateSwap(move,active){
 if(!move||!active())return;const [a,b]=move.map(cell);if(!a||!b)return;
 const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect(),dx=br.x-ar.x,dy=br.y-ar.y;
 const options={duration:380,easing:'cubic-bezier(.22,.75,.25,1)',fill:'forwards'};
 const animations=[a.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx}px,${dy}px) scale(.94)`}],options),b.animate([{transform:'translate(0,0) scale(1)'},{transform:`translate(${-dx}px,${-dy}px) scale(.94)`}],options)];
 await wait(400);animations.forEach(a=>a.cancel());
}
async function particles(frame,actor,access,budget,active){
 if(!active())return;const canvas=document.createElement('canvas');canvas.className='dungeon-particles';canvas.setAttribute('aria-hidden','true');document.body.append(canvas);
 const ratio=Math.min(devicePixelRatio||1,2),width=innerWidth,height=innerHeight;canvas.width=width*ratio;canvas.height=height*ratio;canvas.style.width=width+'px';canvas.style.height=height+'px';const ctx=canvas.getContext('2d');if(!ctx){canvas.remove();return;}ctx.scale(ratio,ratio);
 const dots=[];
 for(const i of frame.cleared){const tile=cell(i),r=tile?.getBoundingClientRect(),type=frame.before[i];if(!r||r.bottom<0||r.top>height)continue;
  const c=access[type-1],target=c&&document.querySelector(`[data-mana-target="${actor}-${c.key}"]`),tr=target?.getBoundingClientRect();
  const absorb=type>0&&type<6&&budget[type-1]>0&&tr;if(absorb)budget[type-1]--;
  for(let n=0;n<3;n++){const angle=Math.random()*Math.PI*2,distance=14+Math.random()*32;dots.push({x:r.x+r.width/2,y:r.y+r.height/2,dx:Math.cos(angle)*distance,dy:Math.sin(angle)*distance,color:c?.color||'#f9e8b3',tx:absorb?tr.x+tr.width/2:null,ty:absorb?tr.y+tr.height/2:null,size:2+Math.random()*2});}
 }
 await new Promise(resolve=>{const start=performance.now();function draw(now){const t=(now-start)/1100;ctx.clearRect(0,0,width,height);if(t>=1||!active()){canvas.remove();resolve();return;}
  for(const d of dots){const spread=1-Math.pow(1-Math.min(t/.48,1),3),s=Math.max(0,(t-.48)/.52),siphon=s*s*s;let x=d.x+d.dx*spread,y=d.y+d.dy*spread,alpha=1-t*.3;
   if(d.tx!==null){x+=(d.tx-x)*siphon;y+=(d.ty-y)*siphon;alpha=1-Math.pow(s,5);}else alpha=Math.pow(1-t,1.5);
   ctx.globalAlpha=alpha;ctx.fillStyle=d.color;ctx.shadowColor=d.color;ctx.shadowBlur=5;ctx.beginPath();ctx.arc(x,y,d.size*(1-s*.65),0,Math.PI*2);ctx.fill();
  }requestAnimationFrame(draw);
 }requestAnimationFrame(draw);});
}
async function fall(frame){
 const animations=[];for(let i=0;i<64;i++){const tile=cell(i),source=frame.sources?.[i];if(!tile)continue;const r=tile.getBoundingClientRect(),from=source>=0?cell(source)?.getBoundingClientRect():null,dy=from?from.y-r.y:-(r.height+5)*(Math.floor(i/8)+1);if(dy)animations.push(tile.animate([{transform:`translateY(${dy}px)`,opacity:source<0?.25:1},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,.7,.3,1)'}));}await wait(330);animations.forEach(a=>a.cancel());
}
export async function presentDungeonTurn({result,before,paint,access,quiet,active,sounds}){
 if(quiet){paint(result.board||before.battle?.board,'Resolving turn');if(result.damage)dungeonHitSound(sounds,result.crit).catch(()=>{});await wait(120);return;}
 if(result.actor==='enemy'&&result.move){paint(before.battle.board,'Enemy selecting circuits',result.move);await wait(1000);if(!active())return;}
 if(result.move){paint(before.battle.board,'Switching circuits');await animateSwap(result.move,active);}
 const budget=[...(result.gained||[0,0,0,0,0])],frames=result.frames||[];
 // Long cascades remain bounded on phones; all rewards still account for every frame.
 for(const frame of frames.slice(0,5)){
  if(!active())break;paint(frame.before,'Breaking circuits',[],frame.cleared);
  await particles(frame,result.actor,access,budget,active);if(!active())break;
  paint(frame.after,'Circuits settling');await fall(frame);await wait(90);
 }
 if(active()){
  paint(result.board||before.battle?.board,result.crit?'CRITICAL HIT':result.damage?'Impact · '+result.damage+' damage':result.ability||'Mana absorbed');
  if(result.damage){const target=document.querySelector(result.actor==='player'?'.boss-panel':'.player-hp-panel');target?.classList.add(result.crit?'critical-impact':'damage-impact');const badge=document.createElement('div');badge.className='dungeon-damage-number'+(result.crit?' is-critical':'');badge.textContent=(result.crit?'CRITICAL ':'')+'−'+result.damage;target?.append(badge);
   dungeonHitSound(sounds,result.crit).catch(()=>{});
   if(result.crit){const rect=target?.getBoundingClientRect();if(rect){const halo=document.createElement('div');halo.className='critical-ring';Object.assign(halo.style,{left:rect.x+rect.width/2+'px',top:rect.y+rect.height/2+'px'});document.body.append(halo);for(let i=0;i<14;i++){const spark=document.createElement('i'),angle=i/14*Math.PI*2,distance=30+Math.random()*40;spark.style.setProperty('--sx',Math.cos(angle)*distance+'px');spark.style.setProperty('--sy',Math.sin(angle)*distance+'px');halo.append(spark);}setTimeout(()=>halo.remove(),800);}}
  }
  await wait(result.damage?650:250);
 }
}
