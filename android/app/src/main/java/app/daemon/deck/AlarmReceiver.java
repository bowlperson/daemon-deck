package app.daemon.deck;
import android.app.*;import android.content.*;import org.json.*;
public class AlarmReceiver extends BroadcastReceiver {
 public void onReceive(Context c,Intent received){if("dismiss".equals(received.getAction())){c.stopService(new Intent(c,AlarmService.class));return;}JSONArray events=Alarms.takeDue(c,received);for(int j=0;j<events.length();j++)try{Intent i=Alarms.eventIntent(c,events.getJSONObject(j));boolean alarm="alarm".equals(i.getStringExtra("type"));if(alarm){try{c.startForegroundService(new Intent(c,AlarmService.class).putExtras(i));continue;}catch(Exception ignored){}}try{((NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE)).notify(i.getDataString()==null?1:i.getDataString().hashCode(),Alarms.notification(c,i,alarm));}catch(SecurityException ignored){}}catch(Exception ignored){}
 }
}
