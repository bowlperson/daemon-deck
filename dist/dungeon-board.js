// Pure match-three mechanics. Special objects never form ordinary color matches.
export const SIZE=8;
export const TILE={STRIKE:0,WILD:6,MYSTERY:7,STIM:8,GRENADE:9,MIMIC:10,MINE:11,TURRET:12};
const index=(x,y)=>y*SIZE+x;
export const adjacent=(a,b)=>Math.abs(a%SIZE-b%SIZE)+Math.abs(Math.floor(a/SIZE)-Math.floor(b/SIZE))===1;
export function findMatches(board){const runs=[];for(const vertical of [false,true])for(let line=0;line<SIZE;line++){let start=0;while(start<SIZE){const at=n=>vertical?index(line,n):index(n,line),type=board[at(start)];let end=start+1;while(end<SIZE&&type>=0&&type<=5&&board[at(end)]===type)end++;if(end-start>=3)runs.push({type,cells:Array.from({length:end-start},(_,i)=>at(start+i))});start=end;}}return runs;}
export function swapped(board,a,b){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=64||b>=64||!adjacent(a,b)||board[a]===TILE.TURRET||board[b]===TILE.TURRET)return null;const next=[...board];[next[a],next[b]]=[next[b],next[a]];if(board[a]>=6||board[b]>=6)return next;return findMatches(next).length?next:null;}
export function legalMoves(board){const moves=[];for(let a=0;a<64;a++)for(const b of [a%8<7?a+1:-1,a<56?a+8:-1])if(b>=0&&swapped(board,a,b))moves.push([a,b]);return moves;}
function refill(random,options){if(options.specials){const roll=random();if(roll<.04)return TILE.MYSTERY;if(roll<.06)return TILE.MINE;}return Math.floor(random()*6);}
export function createBoard(random=Math.random,options={}){for(let attempt=0;attempt<100;attempt++){const board=[];for(let i=0;i<64;i++){const choices=[0,1,2,3,4,5].filter(n=>!(i%8>=2&&board[i-1]===n&&board[i-2]===n)&&!(i>=16&&board[i-8]===n&&board[i-16]===n));const tile=options.specials?refill(random,options):-1;board.push(tile>=7?tile:choices[Math.floor(random()*choices.length)]);}if(legalMoves(board).length)return board;}throw Error('Could not generate a playable board.');}
function collapse(board,random,options){const sources=Array(64).fill(-1);for(let x=0;x<8;x++){let dest=7;for(let y=7;y>=0;y--)if(board[index(x,y)]>=0){board[index(x,dest)]=board[index(x,y)];sources[index(x,dest--)]=index(x,y);}for(;dest>=0;dest--)board[index(x,dest)]=refill(random,options);}return sources;}
const blast=cell=>Array.from({length:64},(_,i)=>i).filter(i=>Math.abs(i%8-cell%8)<=1&&Math.abs(Math.floor(i/8)-Math.floor(cell/8))<=1);
// Per-frame source indices preserve object identity through falling/cascades/replays.
function settle(next,random,forced=null,forcedExtra=false,options={}){
 let bonus=forcedExtra,wildcards=0,stim=0;const counts=[0,0,0,0,0,0],frames=[];let turrets=structuredClone(options.turrets||[]),pending=forced;
 for(let cascade=0;cascade<100;cascade++){
  const runs=findMatches(next);if(!runs.length&&!pending?.length)break;
  const cells=new Set(pending||[]),spawns=[];for(const run of runs){run.cells.forEach(i=>cells.add(i));if(run.cells.length>=4)bonus=true;if(run.cells.length>=5){const preferred=run.cells[Math.floor(run.cells.length/2)];if(!spawns.includes(preferred))spawns.push(preferred);}}
  const before=[...next],turretsBefore=structuredClone(turrets);for(const i of cells){if(next[i]>=0&&next[i]<6)counts[next[i]]++;if(next[i]===TILE.STIM)stim++;}
  const turretFalls=[];turrets=turrets.filter(t=>{if(cells.has(t.cell)){turretFalls.push({...t,from:t.cell,to:t.cell,destroyed:true,reason:'blast'});return false;}return true;});
  for(const i of cells)next[i]=-1;for(const i of spawns){next[i]=6;wildcards++;}
  const sources=collapse(next,random,options);pending=[];
  turrets=turrets.filter(t=>{const to=sources.indexOf(t.cell);if(to<0)return false;const from=t.cell,drop=Math.max(0,Math.floor(to/8)-Math.floor(from/8));t.cell=to;t.fallen+=drop;if(drop){const destroyed=t.fallen>=3;turretFalls.push({...t,from,to,destroyed,reason:'fall'});if(destroyed){pending.push(to);return false;}}return true;});
  frames.push({before,cleared:[...cells],spawned:spawns,after:[...next],sources,depth:cascade+1,turretFalls,turretsBefore,turretsAfter:structuredClone(turrets)});
  if(cascade===99)throw Error('Cascade limit reached.');
 }
 const reshuffled=!legalMoves(next).length;if(reshuffled)turrets=[];
 return {board:reshuffled?createBoard(random,options):next,counts,extraTurn:bonus,wildcards,frames,reshuffled,turrets,stim};
}
export function resolveSwap(board,a,b,random=Math.random,options={}){
 const next=swapped(board,a,b);if(!next)throw Error('Swap adjacent circuits to make a match.');let forced=null;const events=[],selected=[a,b],turrets=structuredClone(options.turrets||[]);let mines=0,forceEnd=false;
 // Reveal only deliberately switched Mystery pieces. Turrets have half the weight of each other outcome.
 for(const cell of selected)if(next[cell]===TILE.MYSTERY){const roll=random()*7,type=roll<2?TILE.STIM:roll<4?TILE.GRENADE:roll<6?TILE.MIMIC:TILE.TURRET;next[cell]=type;events.push({kind:'reveal',cell,type});}
 for(const cell of selected)if(next[cell]===TILE.MIMIC){const other=cell===a?b:a;next[cell]=board[cell];if(next[cell]===TILE.MIMIC)next[cell]=TILE.STRIKE;events.push({kind:'mimic',cell,type:next[cell]});}
 const clears=new Set();for(const cell of selected){const type=next[cell];if(type===TILE.STIM)clears.add(cell);if(type===TILE.GRENADE){blast(cell).forEach(i=>clears.add(i));forceEnd=true;events.push({kind:'grenade',cell});}if(type===TILE.MINE){mines++;clears.add(cell);events.push({kind:'mine',cell});}if(type===TILE.TURRET){turrets.push({cell,owner:options.actor||'player',originRow:Math.floor(cell/8),fallen:0});events.push({kind:'turret',cell,owner:options.actor||'player'});}}
 if(next[a]===TILE.WILD||next[b]===TILE.WILD){const type=next[a]===TILE.WILD?next[b]:next[a];next.forEach((n,i)=>{if(type===TILE.WILD||type<=5&&n===type||selected.includes(i)&&n!==TILE.TURRET)clears.add(i);});}
 if(clears.size)forced=[...clears];
 const revealed=[...next],doubleWildcard=next[a]===6&&next[b]===6;const result=settle(next,random,forced,false,{...options,turrets});return {...result,extraTurn:forceEnd?false:result.extraTurn,forceEnd,events,mines,move:[a,b],doubleWildcard,revealed};
}
export function resolveLine(board,target,random=Math.random,options={}){
 if(!target||!['row','column'].includes(target.axis)||!Number.isInteger(target.index)||target.index<0||target.index>7)throw Error('Choose a row or column.');
 const cells=Array.from({length:8},(_,i)=>target.axis==='row'?target.index*8+i:i*8+target.index),counts=[0,0,0,0,0,0];cells.forEach(i=>{if(board[i]<6)counts[board[i]]++;});return settle([...board],random,cells,counts.some(n=>n>=4),options);
}
export function resolveTransform(board,changes,random=Math.random,options={}){const next=[...board];for(const {index,type} of changes){if(!Number.isInteger(index)||index<0||index>=64||!Number.isInteger(type)||type<0||type>TILE.TURRET)throw Error('Invalid circuit transformation.');next[index]=type;}return {...settle(next,random,null,false,options),changed:changes.map(c=>c.index)};}
