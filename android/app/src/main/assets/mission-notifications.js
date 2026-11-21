import {resolveAlert} from './alerts.js';
import {occurrenceTiming} from './timing.js';
import {repeatCutoff,nextRepeat,createRepeat} from './mission-lifecycle.js';
import {recurrenceFor} from './schedule.js';
export function notificationPlan(s,now,reminderTimes,localDateTime){const latest=new Map();for(const m of s.missions){const previous=latest.get(m.seriesId);if(!previous||m.occurrence>previous.occurrence)latest.set(m.seriesId,m);}const out=[];
 function plan(m,availableAfter=0,projected=false){const t=occurrenceTiming(s,m),deadline=Date.parse(t.deadline),cutoff=repeatCutoff(m),period=(s.settings.alerts.overdueDays||2)*86400000,effective={...m,dueAt:t.deadline,...(t.adjusted&&deadline!==Date.parse(m.dueAt)?{reminderMode:'even'}:{})};
 const cycle=nextRepeat(m)?{anchor:m.dueAt,currentOriginalAt:m.dueAt,occurrence:m.occurrence,seriesId:m.seriesId,overrides:s.calendarOverrides?.[m.seriesId]||{},rule:recurrenceFor(m),reminderCount:m.reminderCount,alarms:m.alerts?.alarms||[],dueAlarm:!!m.alerts?.dueAlarm,notificationSound:m.alerts?.notification?.uri||s.settings.alerts.notification.uri||'',alarmSound:m.alerts?.alarm?.uri||s.settings.alerts.alarm.uri||'',overdueEnabled:s.settings.alerts.overdueEnabled,overdueDays:s.settings.alerts.overdueDays,volumeDismiss:s.settings.alerts.volumeDismiss}:null;
 const events=[...reminderTimes(effective).map((at,i)=>({id:`${m.id}:pre:${i}`,at:Date.parse(at),title:m.title,body:`Pre-reminder ${i+1}/${m.reminderCount} · Due ${localDateTime(t.deadline).replace('T',' ')}`})),{id:`${m.id}:due`,at:deadline,title:m.title,body:'Mission due now.',...(cycle?{cycle}:{})}];
 if(s.settings.alerts.overdueEnabled){const at=deadline+Math.max(1,Math.floor((now-deadline)/period)+1)*period;if(at<cutoff)events.push({id:m.id+':overdue',at,title:m.title,body:'Mission overdue · Due '+localDateTime(t.deadline).replace('T',' '),repeatEvery:period,repeatUntil:Number.isFinite(cutoff)?cutoff:0});}
 for(const a of events)if(a.at>now&&a.at>=availableAfter&&a.at<=cutoff)out.push(resolveAlert(m,a,s.settings));
 if(!projected&&deadline<=now){const next=nextRepeat(m);if(next){const future=createRepeat(m,next);future.id=m.seriesId+':cycle:'+next.occurrence;plan(future,cutoff,true);}}
 }
 for(const m of s.missions)if(m.status==='active'&&!m.repeatable)plan(m);
 for(const m of latest.values())if(m.status==='failed'&&!m.repeatable&&!m.recurrenceStopped){const next=m.nextRepeat||nextRepeat(m);if(next){const future=createRepeat(m,next);future.id=m.seriesId+':cycle:'+next.occurrence;plan(future,Date.parse(next.releaseAt),true);}}
 return out;
}
