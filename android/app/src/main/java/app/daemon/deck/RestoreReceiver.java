package app.daemon.deck;
import android.content.*;
public class RestoreReceiver extends BroadcastReceiver {public void onReceive(Context c,Intent i){Alarms.restore(c);}}
