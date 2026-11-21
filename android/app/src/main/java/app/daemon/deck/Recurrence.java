package app.daemon.deck;
import java.time.*;import java.time.temporal.*;
// Pure Java calendar arithmetic, also exercised on the host against the web rules.
public final class Recurrence {
 public static long next(long anchorMs,long afterMs,String frequency,int interval,int[] weekdays,String monthlyMode,int monthDay,int ordinal,int weekday,boolean lastDay,String until,int count,int occurrence,String zoneName){
  if("none".equals(frequency)||occurrence>=count)return 0;ZoneId zone=ZoneId.of(zoneName);ZonedDateTime anchor=Instant.ofEpochMilli(anchorMs).atZone(zone);LocalDate start=Instant.ofEpochMilli(Math.max(anchorMs,afterMs)).atZone(zone).toLocalDate(),date=start.plusDays(1),end=until.isEmpty()?null:LocalDate.parse(until);int limit=366*("yearly".equals(frequency)?Math.min(400,interval+8):40);
  for(int i=0;i<limit;i++,date=date.plusDays(1)){if(end!=null&&date.isAfter(end))return 0;boolean match=false;long diff=ChronoUnit.DAYS.between(anchor.toLocalDate(),date);
   if("daily".equals(frequency))match=diff%interval==0;
   else if("weekly".equals(frequency)||"biweekly".equals(frequency)){LocalDate monday=anchor.toLocalDate().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));long week=Math.floorDiv(ChronoUnit.DAYS.between(monday,date),7);int day=date.getDayOfWeek().getValue()%7;boolean selected=false;for(int value:weekdays)if(day==value)selected=true;match=week%(interval*("biweekly".equals(frequency)?2:1))==0&&selected;}
   else {long months=ChronoUnit.MONTHS.between(anchor.toLocalDate().withDayOfMonth(1),date.withDayOfMonth(1));boolean period="yearly".equals(frequency)?(date.getYear()-anchor.getYear())%interval==0&&date.getMonth()==anchor.getMonth():months%interval==0;if(period){if("date".equals(monthlyMode))match=date.getDayOfMonth()==(lastDay?Math.min(monthDay,date.lengthOfMonth()):monthDay);else match=date.getDayOfWeek().getValue()%7==weekday&&(ordinal==-1?date.plusDays(7).getMonth()!=date.getMonth():(date.getDayOfMonth()-1)/7+1==ordinal);}}
   if(match)return date.atTime(anchor.toLocalTime()).atZone(zone).toInstant().toEpochMilli();
  }return 0;
 }
}
