// Pure display planning. A mana mote is one point; its small visual trails are not extra points.
// The remaining budget comes from combat's already-capped gains, not from raw particle counts.
export function manaFramePlan(frame,remaining){
 const events=[];
 for(const cell of frame.cleared){const type=frame.before[cell];if(type>=1&&type<=5&&remaining[type-1]>0){remaining[type-1]--;events.push({cell,index:type-1});}}
 return timeManaEvents(events);
}
export function timeManaEvents(events){
 const gap=events.length>1?Math.min(75,1000/(events.length-1)):0;
 return events.map((event,order)=>({...event,order,arrival:850+order*gap}));
}
export function remainingManaPlan(remaining){const events=[];remaining.forEach((count,index)=>{for(let i=0;i<count;i++)events.push({cell:null,index});remaining[index]=0;});return timeManaEvents(events);}
export function presentationMana(before,result){
 const ap=[...before.battle[result.actor+'AP']];if(result.cost){const index=['tech','body','intelligence','cool','os'].indexOf(result.key);if(index>=0)ap[index]=Math.max(0,ap[index]-result.cost);}return ap;
}
