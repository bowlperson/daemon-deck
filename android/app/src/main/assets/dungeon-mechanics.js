import {TILE,legalMoves,findMatches,fallingObjects,immovable,fuseLimit} from './dungeon-board.js';
export const newMechanics=(board=[])=>({player:{charge:0,cripple:-1},enemy:{charge:0,cripple:-1},turrets:[],falling:fallingObjects(board)});
export function validateMechanics(m,board){const side=x=>x&&Number.isInteger(x.charge)&&x.charge>=0&&x.charge<=2&&Number.isInteger(x.cripple)&&x.cripple>=-1&&x.cripple<=5;return Array.isArray(board)&&m&&side(m.player)&&side(m.enemy)&&Array.isArray(m.falling)&&m.falling.length<=64&&new Set(m.falling.map(o=>o?.cell)).size===m.falling.length&&m.falling.every(o=>o&&Number.isInteger(o.cell)&&o.cell>=0&&o.cell<64&&[7,11].includes(o.type)&&board[o.cell]===o.type&&Number.isInteger(o.fallen)&&o.fallen>=0&&o.fallen<fuseLimit(o.type)&&(o.type!==11||[20,30,45].includes(o.power)&&typeof o.minefield==='boolean'))&&board.filter(n=>n===7||n===11).length===m.falling.length&&Array.isArray(m.turrets)&&m.turrets.length<=64&&new Set(m.turrets.map(t=>t?.cell)).size===m.turrets.length&&m.turrets.every(t=>t&&Number.isInteger(t.cell)&&t.cell>=0&&t.cell<64&&['player','enemy'].includes(t.owner)&&Number.isInteger(t.originRow)&&t.originRow>=0&&t.originRow<8&&Number.isInteger(t.fallen)&&t.fallen>=0&&t.fallen<3&&Math.floor(t.cell/8)-t.originRow===t.fallen&&board[t.cell]===TILE.TURRET)&&board.filter(n=>n===TILE.TURRET).length===m.turrets.length;}
export const canMove=(b,actor,a,c)=>!immovable(b.board[a])&&!immovable(b.board[c])&&(b.mechanics[actor].cripple<0||b.board[a]!==b.mechanics[actor].cripple&&b.board[c]!==b.mechanics[actor].cripple);
export const combatMoves=(b,actor)=>legalMoves(b.board).filter(([a,c])=>canMove(b,actor,a,c));
export const boardOptions=(b,actor)=>({specials:true,actor,turrets:b.mechanics.turrets,falling:b.mechanics.falling});
export function useCharge(b,actor){const side=b.mechanics[actor],multiplier=side.charge===2?2:1;if(multiplier===2)side.charge=0;return multiplier;}
export function earnCharge(b,actor,result){const four=result.frames.some(f=>findMatches(f.before).some(run=>run.cells.length>=4));if(four){b.mechanics[actor].charge=Math.min(2,b.mechanics[actor].charge+1);result.chargeEarned=true;}result.chargeProgress=b.mechanics[actor].charge;}
export function finishMechanics(b,actor,result,random){
 b.mechanics[actor].cripple=-1;
 // A crit raises the chance to 30%; it does not guarantee a disable or penalize its attacker.
 const chance=result.actualDamage>0?(result.crit?.30:result.sources.some(x=>x.label.startsWith('Strike'))?.15:0):0;
 if(chance&&random()<chance){const target=actor==='player'?'enemy':'player',type=Math.floor(random()*6);b.mechanics[target].cripple=type;result.crippled={actor:target,type,chance};}
}
