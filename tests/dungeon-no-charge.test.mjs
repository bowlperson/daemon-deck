import test from 'node:test';
import assert from 'node:assert/strict';
import {seed,validate} from '../dist/engine.js';
import {circuits,enemies,startBattle,takeSwap} from '../dist/dungeon.js';
import {newTactics} from '../dist/dungeon-tactics.js';
import {analyzeAI} from '../dist/dungeon-ai.js';

function ready(){
 const s=seed();s.skills=circuits.map((c,i)=>({...s.skills[0],id:''+i,title:c.name}));
 startBattle(s);const b=s.dungeon.battle,e=enemies[42];s.dungeon.index=42;
 b.enemyId=e.id;b.enemyHP=e.hp;b.tactics=newTactics(e);b.mechanics.falling=[];s.dungeon.rng=103;
 return s;
}
function match(type,count=3){const board=Array.from({length:64},(_,i)=>(i%8+Math.floor(i/8)*2)%6);for(let i=0;i<count;i++)board[i]=type;board[2]=(type+1)%6;board[10]=type;return board;}

test('obsolete banked Charge never changes either actor’s damage, mana, RNG or turn',()=>{
 for(const actor of ['player','enemy'])for(const type of [0,1,2,3,4,5]){
  const baseline=ready(),b=baseline.dungeon.battle;b.turn=actor;b.board=match(type);
  const old=structuredClone(baseline);old.dungeon.battle.mechanics.player.charge=2;old.dungeon.battle.mechanics.enemy.charge=2;
  const normal=takeSwap(baseline,actor,2,10,baseline.dungeon.revision),legacy=takeSwap(old,actor,2,10,old.dungeon.revision);
  for(const key of ['sources','damage','actualDamage','gained','crit','extraTurn','board','counts'])assert.deepEqual(legacy[key],normal[key],actor+' '+type+' '+key);
  assert.equal(old.dungeon.rng,baseline.dungeon.rng);assert.equal(old.dungeon.battle?.turn,baseline.dungeon.battle?.turn);
  assert.equal(legacy.chargeMultiplier,undefined);assert.equal(legacy.chargeEarned,undefined);
 }
});

test('four and five matches keep extra turns and Wildcards without accumulating Charge',()=>{
 for(const actor of ['player','enemy'])for(const count of [4,5]){
  const s=ready(),b=s.dungeon.battle;b.turn=actor;b.board=match(1,count);
  const r=takeSwap(s,actor,2,10,s.dungeon.revision);
  assert.equal(r.extraTurn,true);assert.equal(b.turn,actor);assert.equal(b.mechanics[actor].charge,0);
  if(count===5)assert.ok(r.frames.some(f=>f.created?.some(x=>x.type===6))||r.board.includes(6));
 }
});

test('loading an old save clears only live Charge and leaves recorded results intact',()=>{
 const s=ready(),b=s.dungeon.battle;b.board=match(1,4);takeSwap(s,'player',2,10,s.dungeon.revision);
 b.mechanics.player.charge=2;b.mechanics.enemy.charge=1;
 const replay=s.dungeon.replays.player;replay.before.battle.mechanics.player.charge=2;
 replay.result.chargeMultiplier=2;replay.result.chargeEarned=true;
 const expected=structuredClone(s);expected.dungeon.battle.mechanics.player.charge=0;expected.dungeon.battle.mechanics.enemy.charge=0;
 const loaded=validate(JSON.parse(JSON.stringify(s)));
 assert.deepEqual(loaded,expected);assert.deepEqual(loaded.dungeon.replays.player,replay);
 assert.deepEqual(validate(JSON.parse(JSON.stringify(loaded))),loaded);
});

test('AI planning is independent of obsolete Charge progress',()=>{
 const s=ready();s.dungeon.battle.turn='enemy';s.dungeon.battle.board=match(0);
 const baseline=analyzeAI(s,enemies[42]);s.dungeon.battle.mechanics.player.charge=2;s.dungeon.battle.mechanics.enemy.charge=2;
 assert.deepEqual(analyzeAI(s,enemies[42]),baseline);
});
