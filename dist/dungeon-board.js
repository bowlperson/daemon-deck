// Pure match-three board mechanics. 0 = strike; 1–5 = Attribute circuits; 6 = wildcard.
export const SIZE=8;
const index=(x,y)=>y*SIZE+x;
export const adjacent=(a,b)=>Math.abs(a%SIZE-b%SIZE)+Math.abs(Math.floor(a/SIZE)-Math.floor(b/SIZE))===1;
export function findMatches(board){const runs=[];for(const vertical of [false,true])for(let line=0;line<SIZE;line++){let start=0;while(start<SIZE){const at=n=>vertical?index(line,n):index(n,line),type=board[at(start)];let end=start+1;while(end<SIZE&&type!==6&&type>=0&&board[at(end)]===type)end++;if(end-start>=3)runs.push({type,cells:Array.from({length:end-start},(_,i)=>at(start+i))});start=end;}}return runs;}
export function swapped(board,a,b){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=64||b>=64||!adjacent(a,b))return null;const next=[...board];[next[a],next[b]]=[next[b],next[a]];if(board[a]===6||board[b]===6)return next;return findMatches(next).length?next:null;}
export function legalMoves(board){const moves=[];for(let a=0;a<64;a++)for(const b of [a%8<7?a+1:-1,a<56?a+8:-1])if(b>=0&&swapped(board,a,b))moves.push([a,b]);return moves;}
export function createBoard(random=Math.random){for(let attempt=0;attempt<100;attempt++){const board=[];for(let i=0;i<64;i++){const choices=[0,1,2,3,4,5].filter(n=>!(i%8>=2&&board[i-1]===n&&board[i-2]===n)&&!(i>=16&&board[i-8]===n&&board[i-16]===n));board.push(choices[Math.floor(random()*choices.length)]);}if(legalMoves(board).length)return board;}throw Error('Could not generate a playable board.');}
function collapse(board,random){for(let x=0;x<8;x++){const column=[];for(let y=7;y>=0;y--)if(board[index(x,y)]>=0)column.push(board[index(x,y)]);for(let y=7;y>=0;y--)board[index(x,y)]=column[7-y]??Math.floor(random()*6);}}
// Each frame records the real before/after grid and falling source cells for presentation.
function settle(next,random,forced=null,forcedExtra=false){
 let bonus=forcedExtra,wildcards=0;const counts=[0,0,0,0,0,0],frames=[];
 for(let cascade=0;cascade<100;cascade++){
  const runs=findMatches(next);if(!runs.length&&!forced)break;
  const cells=new Set(forced||[]),spawns=[];
  for(const run of runs){run.cells.forEach(i=>cells.add(i));if(run.cells.length>=4)bonus=true;if(run.cells.length>=5){const preferred=run.cells[Math.floor(run.cells.length/2)];if(!spawns.includes(preferred))spawns.push(preferred);}}
  const before=[...next];for(const i of cells)if(next[i]>=0&&next[i]<6)counts[next[i]]++;
  for(const i of cells)next[i]=-1;for(const i of spawns){next[i]=6;wildcards++;}
  const sources=Array(64).fill(-1);
  for(let x=0;x<8;x++){let dest=7;for(let y=7;y>=0;y--)if(next[index(x,y)]>=0)sources[index(x,dest--)]=index(x,y);}
  collapse(next,random);frames.push({before,cleared:[...cells],spawned:spawns,after:[...next],sources,depth:cascade+1});
  forced=null;if(cascade===99)throw Error('Cascade limit reached.');
 }
 const reshuffled=!legalMoves(next).length;return {board:reshuffled?createBoard(random):next,counts,extraTurn:bonus,wildcards,frames,reshuffled};
}
export function resolveSwap(board,a,b,random=Math.random){
 const next=swapped(board,a,b);if(!next)throw Error('Swap adjacent circuits to make a match.');let forced=null;
 if(board[a]===6||board[b]===6){const type=board[a]===6?board[b]:board[a];forced=next.map((n,i)=>type===6||n===type||i===a||i===b?i:-1).filter(i=>i>=0);}
 return {...settle(next,random,forced),move:[a,b],doubleWildcard:board[a]===6&&board[b]===6};
}
export function resolveLine(board,target,random=Math.random){
 if(!target||!['row','column'].includes(target.axis)||!Number.isInteger(target.index)||target.index<0||target.index>7)throw Error('Choose a row or column.');
 const cells=Array.from({length:8},(_,i)=>target.axis==='row'?target.index*8+i:i*8+target.index),counts=[0,0,0,0,0,0];
 cells.forEach(i=>{if(board[i]<6)counts[board[i]]++;});
 return settle([...board],random,cells,counts.some(n=>n>=4));
}
