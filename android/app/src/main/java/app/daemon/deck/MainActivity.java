package app.daemon.deck;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.*;
import android.graphics.Color;
import android.widget.Toast;
import android.app.AlertDialog;
import java.io.*;

/** Bundles the web application; no hosted website or account is required. */
public class MainActivity extends Activity {
    private static final String ORIGIN = "https://appassets.androidplatform.net";
    private WebView web;
    private ValueCallback<Uri[]> fileCallback;
    private String pendingBackup;
    private void hideSystemBars(){if(android.os.Build.VERSION.SDK_INT>=30){android.view.WindowInsetsController controller=getWindow().getInsetsController();if(controller!=null){controller.hide(android.view.WindowInsets.Type.systemBars());controller.setSystemBarsBehavior(android.view.WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);}}else getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE|android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION|android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);}
    @Override public void onWindowFocusChanged(boolean focus){super.onWindowFocusChanged(focus);if(focus)hideSystemBars();}
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(18,23,20));
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        if(android.os.Build.VERSION.SDK_INT>=29)getWindow().setNavigationBarContrastEnforced(false);
        if(android.os.Build.VERSION.SDK_INT>=28){android.view.WindowManager.LayoutParams attrs=getWindow().getAttributes();attrs.layoutInDisplayCutoutMode=android.view.WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;getWindow().setAttributes(attrs);}
        web = new WebView(this);
        // Keep cutouts safe and resize for the keyboard while system navigation is hidden.
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            if (android.os.Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars());
                int top=bars.top,left=bars.left,right=bars.right;android.view.DisplayCutout cutout=insets.getDisplayCutout();if(cutout!=null){top=Math.max(top,cutout.getSafeInsetTop());left=Math.max(left,cutout.getSafeInsetLeft());right=Math.max(right,cutout.getSafeInsetRight());}int bottom=Math.max(bars.bottom,insets.getInsets(android.view.WindowInsets.Type.ime()).bottom);view.setPadding(left,top,right,bottom);
            } else {
                int top=0,left=0,right=0;if(android.os.Build.VERSION.SDK_INT>=28&&insets.getDisplayCutout()!=null){android.view.DisplayCutout cutout=insets.getDisplayCutout();top=cutout.getSafeInsetTop();left=cutout.getSafeInsetLeft();right=cutout.getSafeInsetRight();}view.setPadding(left,top,right,insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        web.setBackgroundColor(Color.rgb(18,23,20));
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(true);
        web.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        web.addJavascriptInterface(new BackupBridge(), "DaemonNative");
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
                Uri uri=req.getUrl();
                if (!ORIGIN.equals(uri.getScheme()+"://"+uri.getHost())) return denied();
                String path=uri.getPath();
                if (path==null || !path.startsWith("/assets/") || path.contains("..") || path.startsWith("/assets/downloads/")) return denied();
                String name=path.substring(8);
                String mime=name.endsWith(".js")?"application/javascript":name.endsWith(".css")?"text/css":name.endsWith(".svg")?"image/svg+xml":name.endsWith(".woff2")?"font/woff2":name.endsWith(".ttf")?"font/ttf":name.endsWith(".webmanifest")?"application/manifest+json":"text/html";
                try { return new WebResourceResponse(mime,"UTF-8",getAssets().open(name)); }
                catch(IOException e) { return denied(); }
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view,WebResourceRequest request) {
                return !request.getUrl().toString().startsWith(ORIGIN+"/assets/");
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView view,ValueCallback<Uri[]> callback,FileChooserParams params) {
                if(fileCallback!=null)fileCallback.onReceiveValue(null);
                fileCallback=callback;
                try { startActivityForResult(params.createIntent(),10); }
                catch(Exception e) { fileCallback.onReceiveValue(null);fileCallback=null;return false; }
                return true;
            }
            @Override public boolean onJsConfirm(WebView view,String url,String message,JsResult result) {
                new AlertDialog.Builder(MainActivity.this).setMessage(message).setPositiveButton("Continue",(d,w)->result.confirm()).setNegativeButton("Cancel",(d,w)->result.cancel()).setOnCancelListener(d->result.cancel()).show();return true;
            }
        });
        setContentView(web);hideSystemBars();
        web.loadUrl(ORIGIN+"/assets/index.html");
    }
    private WebResourceResponse denied() { return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",null,new ByteArrayInputStream(new byte[0])); }
    @Override protected void onResume(){super.onResume();hideSystemBars();if(web!=null)web.evaluateJavascript("window.daemonRefreshPermissions && window.daemonRefreshPermissions()",null);}
    @Override public void onRequestPermissionsResult(int r,String[] p,int[] g){super.onRequestPermissionsResult(r,p,g);if(web!=null)web.evaluateJavascript("window.daemonRefreshPermissions && window.daemonRefreshPermissions()",null);}
    public class BackupBridge {
        @JavascriptInterface public String getPermissionState(){
            android.app.NotificationManager nm=(android.app.NotificationManager)getSystemService(NOTIFICATION_SERVICE);
            android.app.AlarmManager am=(android.app.AlarmManager)getSystemService(ALARM_SERVICE);
            android.os.PowerManager pm=(android.os.PowerManager)getSystemService(POWER_SERVICE);
            Alarms.channel(MainActivity.this);
            boolean notifications=nm.areNotificationsEnabled() && nm.getNotificationChannel(Alarms.CHANNEL).getImportance()!=0;
            return "{\"notifications\":"+notifications+",\"exact\":"+(android.os.Build.VERSION.SDK_INT<31||am.canScheduleExactAlarms())+",\"battery\":"+pm.isIgnoringBatteryOptimizations(getPackageName())+"}";
        }
        @JavascriptInterface public void requestPermission(String kind){runOnUiThread(()->{try{
            if(kind.equals("notifications")){if(android.os.Build.VERSION.SDK_INT>=33&&checkSelfPermission("android.permission.POST_NOTIFICATIONS")!=android.content.pm.PackageManager.PERMISSION_GRANTED){requestPermissions(new String[]{"android.permission.POST_NOTIFICATIONS"},20);return;}startActivity(new Intent("android.settings.APP_NOTIFICATION_SETTINGS").putExtra("android.provider.extra.APP_PACKAGE",getPackageName()));}
            if(kind.equals("exact")&&android.os.Build.VERSION.SDK_INT>=31)startActivity(new Intent("android.settings.REQUEST_SCHEDULE_EXACT_ALARM",Uri.parse("package:"+getPackageName())));
            if(kind.equals("battery"))startActivity(new Intent("android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS",Uri.parse("package:"+getPackageName())));
        }catch(Exception e){Toast.makeText(MainActivity.this,"Open Android app settings to enable access",Toast.LENGTH_LONG).show();}});}
        @JavascriptInterface public String setAlarms(String json){try{String error=Alarms.set(MainActivity.this,json);return new org.json.JSONObject().put("error",error).toString();}catch(Exception e){return "{\"error\":\"Scheduling failed\"}";}}
        @JavascriptInterface public void testAlarm(){try{org.json.JSONArray plan=new org.json.JSONArray(getSharedPreferences("alarms",0).getString("plan","[]"));plan.put(new org.json.JSONObject().put("id","test").put("at",System.currentTimeMillis()+5000).put("title","Daemon Deck / test").put("body","Alarm channel operational."));Alarms.set(MainActivity.this,plan.toString());}catch(Exception ignored){}}

        @JavascriptInterface public void exportBackup(String content,String name) {
            if(content.length()>30*1024*1024)return;
            runOnUiThread(()->{
                pendingBackup=content;
                Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT).setType(name.endsWith(".ics")?"text/calendar":"application/json").addCategory(Intent.CATEGORY_OPENABLE).putExtra(Intent.EXTRA_TITLE,name.replaceAll("[^a-zA-Z0-9._-]","_"));
                startActivityForResult(intent,11);
            });
        }
    }
    @Override protected void onActivityResult(int request,int result,Intent data) {
        super.onActivityResult(request,result,data);
        if(request==10 && fileCallback!=null) { fileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result,data));fileCallback=null; }
        if(request==11) {
            if(result==RESULT_OK && data!=null && data.getData()!=null && pendingBackup!=null) {
                try(OutputStream out=getContentResolver().openOutputStream(data.getData())) { out.write(pendingBackup.getBytes(java.nio.charset.StandardCharsets.UTF_8));Toast.makeText(this,"Backup saved",Toast.LENGTH_SHORT).show(); }
                catch(IOException e) { Toast.makeText(this,"Could not save backup",Toast.LENGTH_LONG).show(); }
            }
            pendingBackup=null;
        }
    }
    @Override public void onBackPressed() { web.evaluateJavascript("document.getElementById('editor').open",value->{if("true".equals(value))web.evaluateJavascript("document.getElementById('editor').close()",null);else new AlertDialog.Builder(this).setMessage("Leave Daemon Deck?").setPositiveButton("Leave",(d,w)->finish()).setNegativeButton("Stay",null).show();}); }
}
