import {createBoard} from './dungeon-board.js';
export const talentCatalog={
 mines:{name:'Minefield',cooldown:3,description:'Before every third enemy action, freely trap two visible board cells. Clearing either cell hurts you. At most two mines stay armed.'},
 veil:{name:'Signal Veil',cooldown:3,description:'Random new refill circuits are hidden for two player actions. Its three-action cooldown starts only after the concealment ends.'},
 overdrive:{name:'Strike Overdrive',cooldown:3,description:'Double Strike damage for one enemy action, then wait three full enemy actions before activating again.'},
 siphon:{name:'Mana Siphon',cooldown:3,description:'Steal mana from your largest pool to charge an enemy ability. A free bonus action every three enemy actions.'},
 plating:{name:'Reactive Plating',cooldown:3,description:'Reduce incoming damage by a flat amount for two player actions. Its cooldown starts when the plating expires.'},
 lock:{name:'Mana Lock',cooldown:3,description:'Block mana collection in your strongest Attribute channel temporarily. Other channels still work. Cooldown starts after the lock ends.'},
 counter:{name:'Countercharge',cooldown:3,description:'For two player actions, bank part of your first damaging hit as a bonus to the next enemy attack. Cooldown starts when the bonus is spent or the window expires.'},
 reboot:{name:'Grid Reboot',cooldown:5,description:'Freely replace the grid with a fresh playable board every five enemy actions. Wildcards are lost; health and stored mana are preserved.'}
};
export const tierRank=e=>e.tier==='high'?2:e.tier==='mid'?1:0;
export const minePower=e=>[20,30,45][tierRank(e)];
export const armorPower=e=>[8,16,24][tierRank(e)];
export const counterPower=e=>[12,24,40][tierRank(e)];
export function newTactics(enemy){return {enemyActions:0,nextAt:enemy?.talent==='reboot'?5:3,firedAt:-1,mines:[],blindTurns:0,hidden:[],overdriveTurns:0,plateTurns:0,lockTurns:0,lockedIndex:-1,chargeWindow:0,counterBoost:0};}
export function validateTactics(t){const n=(x,max)=>Number.isInteger(x)&&x>=0&&x<=max,indices=(x,max)=>Array.isArray(x)&&x.length<=max&&new Set(x).size===x.length&&x.every(i=>n(i,63));return t&&n(t.enemyActions,Number.MAX_SAFE_INTEGER)&&n(t.nextAt,Number.MAX_SAFE_INTEGER)&&Number.isInteger(t.firedAt)&&t.firedAt>=-1&&t.firedAt<=t.enemyActions&&indices(t.mines,2)&&indices(t.hidden,64)&&['blindTurns','plateTurns','lockTurns','chargeWindow'].every(k=>n(t[k],2))&&n(t.overdriveTurns,1)&&n(t.counterBoost,40)&&Number.isInteger(t.lockedIndex)&&t.lockedIndex>=-1&&t.lockedIndex<5&&(!t.blindTurns?t.hidden.length===0:true)&&(!t.lockTurns||t.lockedIndex>=0);}
export function talentActive(t){return !!(t.blindTurns||t.overdriveTurns||t.plateTurns||t.lockTurns||t.chargeWindow||t.counterBoost);}
export function talentReady(b){const t=b.tactics;return b.turn==='enemy'&&t.firedAt!==t.enemyActions&&!talentActive(t)&&t.enemyActions+1>=t.nextAt;}
function cooldown(t,enemy){t.nextAt=t.enemyActions+talentCatalog[enemy.talent].cooldown+1;}
export function talentStatus(b,enemy){const t=b.tactics;if(t.blindTurns)return 'Concealment · '+t.blindTurns+' player actions';if(t.overdriveTurns)return 'Double Strikes · next enemy action';if(t.plateTurns)return 'Armor −'+armorPower(enemy)+' · '+t.plateTurns+' player actions';if(t.lockTurns)return 'Mana lock · '+t.lockTurns+' player actions';if(t.counterBoost)return 'Countercharge +'+t.counterBoost+' damage';if(t.chargeWindow)return 'Counter window · '+t.chargeWindow+' player actions';if(talentReady(b))return 'Ready · free bonus action';return 'Triggers in '+Math.max(1,t.nextAt-t.enemyActions)+' enemy actions';}
export function applyTalent(s,enemy,random){
 const b=s.dungeon.battle,t=b.tactics,rank=tierRank(enemy),kind=enemy.talent;const result={talent:true,ability:'Talent · '+talentCatalog[kind].name,actor:'enemy',key:enemy.attackCircuits[0],extraTurn:true,gained:[0,0,0,0,0],sources:[],frames:[],damage:0,actualDamage:0,crit:false,healed:0,note:''};
 t.firedAt=t.enemyActions;
 if(kind==='mines'){const cells=Array.from({length:64},(_,i)=>i);t.mines=[];for(let i=0;i<2;i++)t.mines.push(cells.splice(Math.floor(random()*cells.length),1)[0]);result.note='Two mines armed · '+minePower(enemy)+' damage each when you clear their cells';}
 if(kind==='veil'){t.blindTurns=2;result.note='New refill pieces can be hidden for two player actions; cooldown waits for expiry';}
 if(kind==='overdrive'){t.overdriveTurns=1;result.note='Next enemy action: 56 damage per Strike circuit';}
 if(kind==='siphon'){const i=b.playerAP.indexOf(Math.max(...b.playerAP)),j=['tech','body','intelligence','cool','os'].indexOf(enemy.abilities[0].key),amount=Math.min([2,4,6][rank],b.playerAP[i],30-b.enemyAP[j]);b.playerAP[i]-=amount;b.enemyAP[j]+=amount;result.gained[j]=amount;result.note='Stole '+amount+' mana from '+s.settings.dungeon.mapping[['tech','body','intelligence','cool','os'][i]];}
 if(kind==='plating'){t.plateTurns=2;result.note='Flat armor blocks '+armorPower(enemy)+' damage for two player actions';}
 if(kind==='lock'){t.lockedIndex=b.playerAP.indexOf(Math.max(...b.playerAP));t.lockTurns=rank===2?2:1;result.note='No '+s.settings.dungeon.mapping[['tech','body','intelligence','cool','os'][t.lockedIndex]]+' mana gains for '+t.lockTurns+' player action(s)';}
 if(kind==='counter'){t.chargeWindow=2;result.note='First direct hit within two player actions charges up to '+counterPower(enemy)+' bonus attack damage';}
 if(kind==='reboot'){b.board=createBoard(random);t.hidden=[];result.board=[...b.board];result.note='Fresh playable grid · old Wildcards removed';}
 if(['mines','siphon','reboot'].includes(kind))t.nextAt=t.enemyActions+1+talentCatalog[kind].cooldown;
 return result;
}
export function tickStatuses(b,actor,enemy){const t=b.tactics;
 if(actor==='enemy'){t.enemyActions++;if(t.overdriveTurns){t.overdriveTurns=0;cooldown(t,enemy);}}
 if(actor==='player'){
  if(t.blindTurns&&!--t.blindTurns){t.hidden=[];cooldown(t,enemy);}
  if(t.plateTurns&&!--t.plateTurns)cooldown(t,enemy);
  if(t.lockTurns&&!--t.lockTurns){t.lockedIndex=-1;cooldown(t,enemy);}
  if(t.chargeWindow&&!--t.chargeWindow)cooldown(t,enemy);
 }
}
export function captureCounter(b,actual,enemy){const t=b.tactics;if(t.chargeWindow&&actual>0){t.counterBoost=Math.min(actual,counterPower(enemy));t.chargeWindow=0;}}
export function spendCounter(b,enemy){const amount=b.tactics.counterBoost;if(amount){b.tactics.counterBoost=0;b.tactics.nextAt=b.tactics.enemyActions+talentCatalog[enemy.talent].cooldown+2;}return amount;}
// Hidden markers travel with surviving pieces. Only newly generated pieces can become hidden.
export function mapHiddenRefills(b,result,enemy,random){
 const t=b.tactics;let hidden=new Set(t.hidden);
 if(result.move){const [a,c]=result.move,x=hidden.has(a),y=hidden.has(c);hidden.delete(a);hidden.delete(c);if(x)hidden.add(c);if(y)hidden.add(a);}
 for(const frame of result.frames){frame.hiddenBefore=[...hidden];const next=new Set();for(let i=0;i<64;i++){const source=frame.sources[i];if(source>=0&&hidden.has(source)||source<0&&t.blindTurns&&random()<[.2,.35,.5][tierRank(enemy)])next.add(i);}hidden=next;frame.hiddenAfter=[...hidden];}
 if(result.reshuffled){hidden=new Set();if(t.blindTurns)result.board.forEach((_,i)=>{if(random()<.35)hidden.add(i);});}
 t.hidden=[...hidden];result.hiddenAfter=[...hidden];
}
