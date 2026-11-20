// Pure match-three mechanics. Fixed objects move only through gravity.
export const SIZE=8;
export const TILE={STRIKE:0,WILD:6,MYSTERY:7,STIM:8,GRENADE:9,MIMIC:10,MINE:11,TURRET:12,MINE_KIT:13,MACHINE_GUN:14,BATTERY:15};
const index=(x,y)=>y*SIZE+x;
export const immovable=type=>[TILE.MYSTERY,TILE.TURRET,TILE.MACHINE_GUN,TILE.BATTERY].includes(type);
export const fuseLimit=type=>type===TILE.MYSTERY||type===TILE.BATTERY?4:2;
export const adjacent=(a,b)=>Math.abs(a%SIZE-b%SIZE)+Math.abs(Math.floor(a/SIZE)-Math.floor(b/SIZE))===1;
function runsOf(board,accept){const runs=[];for(const vertical of [false,true])for(let line=0;line<8;line++){let start=0;while(start<8){const at=n=>vertical?index(line,n):index(n,line),type=board[at(start)];let end=start+1;while(end<8&&accept(type)&&board[at(end)]===type)end++;if(end-start>=3)runs.push({type,cells:Array.from({length:end-start},(_,i)=>at(start+i))});start=end;}}return runs;}
export const findMatches=board=>runsOf(board,type=>type>=0&&type<=5);
export const findMysteryRuns=board=>runsOf(board,type=>type===TILE.MYSTERY);
function matchAt(board,cell){const type=board[cell];if(type<0||type>5)return false;const x=cell%8,y=Math.floor(cell/8);for(const [dx,dy] of [[1,0],[0,1]]){let count=1;for(const direction of [-1,1])for(let step=1;step<8;step++){const nx=x+dx*step*direction,ny=y+dy*step*direction;if(nx<0||nx>7||ny<0||ny>7||board[index(nx,ny)]!==type)break;count++;}if(count>=3)return true;}return false;}
export function swapped(board,a,b){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=64||b>=64||!adjacent(a,b)||immovable(board[a])||immovable(board[b]))return null;const next=[...board];[next[a],next[b]]=[next[b],next[a]];const mine=board[a]===TILE.MINE||board[b]===TILE.MINE;if(matchAt(next,a)||matchAt(next,b)||(!mine&&(board[a]>=6||board[b]>=6))||mine&&(board[a]===TILE.WILD||board[b]===TILE.WILD))return next;return null;}
export function legalMoves(board){const moves=[];for(let a=0;a<64;a++)for(const b of [a%8<7?a+1:-1,a<56?a+8:-1])if(b>=0&&swapped(board,a,b))moves.push([a,b]);return moves;}
export function fallingObjects(board,existing=[]){return board.flatMap((type,cell)=>{if(type!==TILE.MYSTERY&&type!==TILE.MINE)return [];const prior=existing.find(o=>o.cell===cell&&o.type===type);return [prior?{...prior}:type===TILE.MINE?{cell,type,fallen:0,power:30,minefield:false}:{cell,type,fallen:0}];});}
function refill(random,options){if(options.specials){const roll=random();if(roll<.04)return TILE.MYSTERY;}return Math.floor(random()*6);}
// Fresh boards contain regular circuits only, including encounter starts and reshuffles.
export function createBoard(random=Math.random,options={}){for(let attempt=0;attempt<100;attempt++){const board=[];for(let i=0;i<64;i++){const choices=[0,1,2,3,4,5].filter(n=>!(i%8>=2&&board[i-1]===n&&board[i-2]===n)&&!(i>=16&&board[i-8]===n&&board[i-16]===n));board.push(choices[Math.floor(random()*choices.length)]);}if(legalMoves(board).length)return board;}throw Error('Could not generate a playable board.');}
export function limitMysteries(board,max=6){let kept=0;const removed=[];for(let cell=0;cell<64;cell++)if(board[cell]===TILE.MYSTERY&&++kept>max){for(let type=0;type<6;type++){board[cell]=type;if(!findMatches(board).length)break;}removed.push(cell);}return removed;}
function collapse(board,random,options){const sources=Array(64).fill(-1);let slots=Math.max(0,6-board.filter(type=>type===TILE.MYSTERY).length);for(let x=0;x<8;x++){let dest=7;for(let y=7;y>=0;y--)if(board[index(x,y)]>=0){board[index(x,dest)]=board[index(x,y)];sources[index(x,dest--)]=index(x,y);}for(;dest>=0;dest--){const type=refill(random,{...options,specials:!!options.specials&&dest===0&&slots>0});board[index(x,dest)]=type;if(type===TILE.MYSTERY)slots--;}}return sources;}
const blast=cell=>Array.from({length:64},(_,i)=>i).filter(i=>Math.abs(i%8-cell%8)<=1&&Math.abs(Math.floor(i/8)-Math.floor(cell/8))<=1);
export const mysteryOutcome=roll=>roll<2/9?TILE.GRENADE:roll<4/9?TILE.MINE_KIT:roll<5/9?TILE.TURRET:roll<7/9?TILE.MACHINE_GUN:TILE.BATTERY;
export function mimicCircuit(board,cell){return cell<56&&board[cell+8]>=0?board[cell+8]:null;}
// Every ready Mystery is revealed from the SAME snapshot. No gravity happens inside a batch.
function activate(board,falling,turrets,devices,random,actor,allowMines=true){
 const lineCells=new Set(findMysteryRuns(board).flatMap(r=>r.cells)),mysteries=falling.filter(o=>o.type===7&&(o.fallen>=4||lineCells.has(o.cell))),mines=falling.filter(o=>allowMines&&o.type===11&&o.fallen>=2),protectedCells=new Set(mysteries.map(o=>o.cell)),events=[],clears=new Set(),before=[...board];
 for(const o of mysteries){const type=mysteryOutcome(random());board[o.cell]=type;events.push({kind:'reveal',cell:o.cell,type,reason:lineCells.has(o.cell)?'line':'fall'});}
 for(const o of mysteries){const type=board[o.cell];
  if(type===TILE.MINE_KIT)clears.add(o.cell);
  if(type===TILE.GRENADE){for(const i of blast(o.cell))if(!protectedCells.has(i))clears.add(i);clears.add(o.cell);events.push({kind:'grenade',cell:o.cell});}
  if(type===TILE.TURRET){turrets.push({cell:o.cell,owner:actor,originRow:Math.floor(o.cell/8),fallen:0});events.push({kind:'turret',cell:o.cell,owner:actor});}
  if(type===TILE.BATTERY||type===TILE.MACHINE_GUN)devices.push({cell:o.cell,type,owner:actor,fallen:0,channel:-1});
 }
 for(const o of mines){clears.add(o.cell);events.push({kind:'mine',cell:o.cell,power:o.power,minefield:o.minefield,...((o.owner??(o.minefield?'enemy':undefined))?{owner:o.owner??'enemy'}:{})});}
 return {events,clears,before,activated:[...protectedCells],mines,minedDamage:mines.reduce((n,o)=>n+((o.owner??(o.minefield?'enemy':undefined))===actor?Math.ceil(o.power/2):o.power),0),falling:falling.filter(o=>!protectedCells.has(o.cell)&&!mines.some(m=>m.cell===o.cell)),forceEnd:events.some(e=>e.kind==='grenade')};
}
function settle(next,random,forced=null,forcedExtra=false,options={}){
 let bonus=forcedExtra,wildcards=0,stim=0,mineDamage=0,mineCount=0,forceEnd=false;const counts=[0,0,0,0,0,0],frames=[],bottomShots=[],events=[...(options.events||[])];let devices=structuredClone(options.devices||[]),turrets=structuredClone(options.turrets||[]),falling=fallingObjects(next,options.falling||[]),pending=forced;
 for(let cascade=0;cascade<100;cascade++){
  const fallingBefore=structuredClone(falling),turretsBefore=structuredClone(turrets),activation=activate(next,falling,turrets,devices,random,options.actor||'player');falling=activation.falling;events.push(...activation.events);mineDamage+=activation.minedDamage;mineCount+=activation.mines.length;forceEnd||=activation.forceEnd;
  const runs=findMatches(next);if(!runs.length&&!pending?.length&&!activation.clears.size&&!activation.activated.length)break;
  const cells=new Set([...(pending||[]),...activation.clears]),spawns=[];for(const run of runs){run.cells.forEach(i=>cells.add(i));if(run.cells.length>=4)bonus=true;if(run.cells.length>=5){const preferred=run.cells[Math.floor(run.cells.length/2)];if(!spawns.includes(preferred))spawns.push(preferred);}}
  // Count only orthogonal destroyed neighbours, once per cell in this clear batch.
  const injured=new Set();for(let pass=0;pass<65;pass++){
   const fresh=[...cells].filter(i=>!injured.has(i));if(!fresh.length)break;fresh.forEach(i=>injured.add(i));
   for(const o of [...falling.filter(o=>o.type===7),...turrets,...devices.filter(o=>o.type===15)])if(!cells.has(o.cell)){const amount=fresh.filter(i=>adjacent(i,o.cell)).length;o.fallen+=amount;if(amount){const e={kind:'object-hit',cell:o.cell,type:o.type||12};events.push(e);activation.events.push(e);}}
   for(const o of falling.filter(o=>o.type===11))if(!cells.has(o.cell)){const amount=fresh.filter(i=>i%8===o.cell%8&&i<o.cell).length;o.fallen+=amount;if(amount){const e={kind:'object-hit',cell:o.cell,type:11};events.push(e);activation.events.push(e);}}
   const ready=activate(next,falling,turrets,devices,random,options.actor||'player',false);falling=ready.falling;events.push(...ready.events);activation.events.push(...ready.events);activation.activated.push(...ready.activated);mineDamage+=ready.minedDamage;mineCount+=ready.mines.length;forceEnd||=ready.forceEnd;for(const i of ready.clears)cells.add(i);
  }
  for(const t of turrets)if(t.fallen>=2)cells.add(t.cell);
  for(const d of devices)if(d.type===15&&(d.fallen>=4||d.cell>=56))cells.add(d.cell);
  devices=devices.filter(d=>!cells.has(d.cell));
  const bottom=turrets.filter(t=>t.cell>=56&&!cells.has(t.cell));for(const t of bottom){cells.add(t.cell);}const before=[...next],fallingRevealed=structuredClone([...falling,...activation.mines]),turretsRevealed=structuredClone(turrets);for(const i of cells){if(next[i]>=0&&next[i]<6)counts[next[i]]++;if(next[i]===TILE.STIM)stim++;}
  const turretFalls=[];turrets=turrets.filter(t=>{if(cells.has(t.cell)){turretFalls.push({...t,from:t.cell,to:t.cell,destroyed:true,reason:'blast'});return false;}return true;});falling=falling.filter(o=>!cells.has(o.cell));
  for(const i of cells)next[i]=-1;for(const i of spawns){next[i]=6;wildcards++;}
  const sources=collapse(next,random,options),objectFalls=[];pending=[];
  falling=falling.map(o=>{const to=sources.indexOf(o.cell);if(to<0)return null;const from=o.cell,drop=Math.max(0,Math.floor(to/8)-Math.floor(from/8)),updated={...o,cell:to,fallen:o.fallen+drop};if(drop)objectFalls.push({...updated,from,to,ready:updated.fallen>=fuseLimit(o.type)});return updated;}).filter(Boolean);
  for(let i=0;i<64;i++)if(sources[i]<0&&(next[i]===7||next[i]===11))falling.push(next[i]===11?{cell:i,type:11,fallen:0,power:30,minefield:false}:{cell:i,type:7,fallen:0});
  turrets=turrets.filter(t=>{const to=sources.indexOf(t.cell);if(to<0)return false;const from=t.cell,drop=Math.max(0,Math.floor(to/8)-Math.floor(from/8));t.cell=to;t.fallen+=drop;if(drop){const destroyed=t.fallen>=2||to>=56;turretFalls.push({...t,from,to,destroyed,reason:'fall'});if(destroyed){pending.push(to);return false;}}return true;});
  devices=devices.filter(d=>{const to=sources.indexOf(d.cell);if(to<0)return false;d.fallen+=Math.max(0,Math.floor(to/8)-Math.floor(d.cell/8));d.cell=to;if(d.type===15&&(d.fallen>=4||to>=56)){pending.push(to);return false;}return true;});
  frames.push({before,activationBefore:activation.activated.length?activation.before:null,activated:activation.activated,events:activation.events,fallingBefore,fallingRevealed,turretsRevealed,fallingAfter:structuredClone(falling),cleared:[...cells],spawned:spawns,after:[...next],sources,depth:cascade+1,turretFalls,objectFalls,turretsBefore,turretsAfter:structuredClone(turrets)});
  if(cascade===99)throw Error('Cascade limit reached.');
 }
 const reshuffled=!legalMoves(next).length&&!devices.some(d=>d.type===14||d.type===15&&d.channel<0);if(reshuffled){const fixed=next.map((type,cell)=>({type,cell})).filter(o=>(immovable(o.type)||o.type===TILE.MINE)&&o.type!==TILE.MYSTERY);falling=falling.filter(o=>o.type!==TILE.MYSTERY);let found=false;for(let attempt=0;attempt<250;attempt++){const candidate=createBoard(random);for(const o of fixed)candidate[o.cell]=o.type;if(!findMatches(candidate).length&&legalMoves(candidate).length){next=candidate;found=true;break;}}if(!found)throw Error('Could not reshuffle the board around deployed objects.');}
 return {board:next,counts,extraTurn:forceEnd?false:bonus,wildcards,frames,reshuffled,turrets,devices,falling,stim,events,bottomShots,mines:mineCount,mineDamage,forceEnd,activationFrames:true};
}
export function resolveSwap(board,a,b,random=Math.random,options={}){
 const next=swapped(board,a,b);if(!next)throw Error('Choose an adjacent swap that makes a legal match; Mystery and deployed devices cannot move.');const selected=[a,b],clears=new Set(),events=[],turrets=structuredClone(options.turrets||[]);let forceEnd=false;
 // These direct object types remain supported for old saves; new Mysteries resolve through gravity.
 for(const cell of selected)if(next[cell]===TILE.MIMIC){const type=mimicCircuit(next,cell);if(type===null)clears.add(cell);else next[cell]=type;events.push({kind:'mimic',cell,type:type??10,vanished:type===null});if(type===12)turrets.push({cell,owner:options.actor||'player',originRow:Math.floor(cell/8),fallen:0});}
 for(const cell of selected){if(next[cell]===TILE.STIM)clears.add(cell);if(next[cell]===TILE.GRENADE){blast(cell).forEach(i=>clears.add(i));forceEnd=true;events.push({kind:'grenade',cell});}}
 if(next[a]===TILE.WILD||next[b]===TILE.WILD){const type=next[a]===TILE.WILD?next[b]:next[a];next.forEach((n,i)=>{if(type===TILE.WILD||type<=5&&n===type||selected.includes(i)&&n!==TILE.TURRET)clears.add(i);});}
 const falling=(options.falling||fallingObjects(board)).map(o=>{const cell=o.cell===a?b:o.cell===b?a:o.cell;return {...o,cell,fallen:o.type===11&&selected.includes(o.cell)?Math.max(2,o.fallen):o.fallen};});
 const revealed=[...next],doubleWildcard=next[a]===6&&next[b]===6,result=settle(next,random,clears.size?[...clears]:null,false,{...options,specials:doubleWildcard?false:options.specials,events,turrets,falling});return {...result,extraTurn:forceEnd?false:result.extraTurn,forceEnd:forceEnd||result.forceEnd,move:[a,b],doubleWildcard,revealed};
}
export function resolveLine(board,target,random=Math.random,options={}){if(!target||!['row','column'].includes(target.axis)||!Number.isInteger(target.index)||target.index<0||target.index>7)throw Error('Choose a row or column.');const cells=Array.from({length:8},(_,i)=>target.axis==='row'?target.index*8+i:i*8+target.index),counts=[0,0,0,0,0,0];cells.forEach(i=>{if(board[i]<6)counts[board[i]]++;});return settle([...board],random,cells,counts.some(n=>n>=4),options);}
export function resolveTransform(board,changes,random=Math.random,options={}){const next=[...board];for(const {index,type} of changes){if(!Number.isInteger(index)||index<0||index>=64||!Number.isInteger(type)||type<0||type>TILE.BATTERY)throw Error('Invalid circuit transformation.');next[index]=type;}return {...settle(next,random,null,false,options),changed:changes.map(c=>c.index)};}
