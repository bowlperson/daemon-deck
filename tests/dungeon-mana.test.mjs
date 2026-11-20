import test from 'node:test';import assert from 'node:assert/strict';
import {manaFramePlan,remainingManaPlan,presentationMana} from '../dist/dungeon-mana.js';
import {enemyIcons,shadesIcon} from '../dist/enemy-icons.js';
import {extraIcons} from '../dist/extra-icons.js';

test('mana arrivals follow cleared-cell order and each gem supplies only one numbered mote',()=>{const remaining=[3,1,0,0,0],frame={before:[1,0,2,1,6,1,2],cleared:[0,1,2,3,4,5,6]},events=manaFramePlan(frame,remaining);assert.deepEqual(events.map(e=>[e.cell,e.index]),[[0,0],[2,1],[3,0],[5,0]]);assert.deepEqual(remaining,[0,0,0,0,0]);assert.equal(events[0].arrival,850);for(let i=1;i<events.length;i++)assert.ok(events[i].arrival>events[i-1].arrival);});
test('capped/unsupported channels have no absorption events across cascades',()=>{const remaining=[1,0,0,2,0],frame={before:[1,1,2,3,4,4,5],cleared:[0,1,2,3,4,5,6]};const a=manaFramePlan(frame,remaining),b=manaFramePlan(frame,remaining);assert.deepEqual(a.map(e=>e.index),[0,3,3]);assert.deepEqual(b,[]);assert.equal(remaining.reduce((a,b)=>a+b,0),0);});
test('long cascades and non-board gains have a complete bounded arrival plan',()=>{const remaining=[30,30,30,30,30],frame={before:Array.from({length:64},(_,i)=>i%6),cleared:Array.from({length:64},(_,i)=>i)};const a=manaFramePlan(frame,remaining),tail=remainingManaPlan(remaining);assert.equal(a.length+tail.length,150);assert.ok(a.at(-1).arrival<=1850);assert.ok(tail.at(-1).arrival<=1850);assert.deepEqual(remaining,[0,0,0,0,0]);assert.ok(tail.every(e=>e.cell===null));});
test('ability presentation deducts cost before incoming mana without mutating saved state',()=>{const before={battle:{playerAP:[1,30,20,0,0],enemyAP:[5,6,7,8,9]}},copy=structuredClone(before);assert.deepEqual(presentationMana(before,{actor:'player',cost:10,key:'body'}),[1,20,20,0,0]);assert.deepEqual(presentationMana(before,{actor:'enemy'}),copy.battle.enemyAP);assert.deepEqual(before,copy);});
test('43 distinct enemy symbols use standard Lucide art and preserve saved icon IDs',()=>{
 assert.equal(enemyIcons.length,43);assert.equal(new Set(enemyIcons.map(i=>i.markup)).size,43);
 for(let i=0;i<43;i++){assert.equal(enemyIcons[i].id,'dd:enemy-'+i);assert.match(enemyIcons[i].source,/^lucide(?:-lab)?:/);}
 // Existing library symbols are reused exactly, rather than redrawn variants.
 assert.equal(enemyIcons[0].markup,extraIcons.find(i=>i.id==='dd:69').markup);
 assert.equal(enemyIcons[10].markup,extraIcons.find(i=>i.id==='dd:85').markup);
 assert.equal(enemyIcons[35].markup,extraIcons.find(i=>i.id==='dd:94').markup);
 assert.equal(enemyIcons[37].source,'lucide:dog');assert.equal(enemyIcons[38].source,'lucide-lab:bear-face');
 assert.equal(shadesIcon.source,'lucide-lab:glasses-sun');
});
