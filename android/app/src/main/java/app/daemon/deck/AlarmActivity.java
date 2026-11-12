package app.daemon.deck;
import android.app.*;import android.content.*;import android.os.*;import android.view.*;import android.widget.*;
public class AlarmActivity extends Activity {
 BroadcastReceiver stopped=new BroadcastReceiver(){public void onReceive(Context c,Intent i){finish();}};
 public void onCreate(Bundle b){super.onCreate(b);if(Build.VERSION.SDK_INT>=27){setShowWhenLocked(true);setTurnScreenOn(true);}else getWindow().addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED|WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);LinearLayout layout=new LinearLayout(this);layout.setOrientation(1);layout.setPadding(32,80,32,32);layout.setBackgroundColor(0xff080e17);TextView title=new TextView(this);title.setText(getIntent().getStringExtra("title"));title.setTextSize(28);title.setTextColor(0xff50f4d4);layout.addView(title);Button dismiss=new Button(this);dismiss.setText("Dismiss alarm");dismiss.setOnClickListener(v->dismiss());layout.addView(dismiss);setContentView(layout);if(Build.VERSION.SDK_INT>=33)registerReceiver(stopped,new IntentFilter("app.daemon.deck.ALARM_STOPPED"),Context.RECEIVER_NOT_EXPORTED);else registerReceiver(stopped,new IntentFilter("app.daemon.deck.ALARM_STOPPED"));}
 void dismiss(){stopService(new Intent(this,AlarmService.class));finish();}
 public boolean onKeyDown(int key,KeyEvent e){if((key==KeyEvent.KEYCODE_VOLUME_UP||key==KeyEvent.KEYCODE_VOLUME_DOWN)&&getIntent().getBooleanExtra("volumeDismiss",true)){dismiss();return true;}return super.onKeyDown(key,e);}
 protected void onDestroy(){unregisterReceiver(stopped);super.onDestroy();}
}
