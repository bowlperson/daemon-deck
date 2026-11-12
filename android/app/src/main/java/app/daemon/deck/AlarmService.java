package app.daemon.deck;
import android.app.*;import android.content.*;import android.media.*;import android.net.Uri;import android.os.*;
public class AlarmService extends Service {
 MediaPlayer player;Handler handler=new Handler(Looper.getMainLooper());
 public IBinder onBind(Intent i){return null;}
 public int onStartCommand(Intent i,int flags,int id){if(i==null){stopSelf();return START_NOT_STICKY;}startForeground(47001,Alarms.notification(this,i,true));if(player!=null)player.release();String sound=i.getStringExtra("sound");Uri uri=sound==null||sound.isEmpty()?RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM):Uri.parse(sound);if(!play(uri))play(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM));handler.removeCallbacksAndMessages(null);handler.postDelayed(()->stopSelf(),10*60*1000);return START_NOT_STICKY;}
 boolean play(Uri uri){try{player=new MediaPlayer();player.setAudioAttributes(new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION).build());player.setDataSource(this,uri);player.setLooping(true);player.setWakeMode(this,PowerManager.PARTIAL_WAKE_LOCK);player.prepare();player.start();return true;}catch(Exception e){if(player!=null){player.release();player=null;}return false;}}
 public void onDestroy(){handler.removeCallbacksAndMessages(null);if(player!=null)player.release();sendBroadcast(new Intent("app.daemon.deck.ALARM_STOPPED").setPackage(getPackageName()));stopForeground(true);super.onDestroy();}
}
