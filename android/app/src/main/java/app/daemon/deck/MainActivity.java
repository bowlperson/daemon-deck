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
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(Color.rgb(18,23,20));
        getWindow().setNavigationBarColor(Color.rgb(21,27,23));
        web = new WebView(this);
        // Target 35 uses edge-to-edge. Apply system bar insets to the native view.
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            if (android.os.Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars());
                view.setPadding(bars.left,bars.top,bars.right,bars.bottom);
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
        setContentView(web);
        web.loadUrl(ORIGIN+"/assets/index.html");
    }
    private WebResourceResponse denied() { return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",null,new ByteArrayInputStream(new byte[0])); }
    public class BackupBridge {
        @JavascriptInterface public void exportBackup(String content,String name) {
            if(content.length()>30*1024*1024)return;
            runOnUiThread(()->{
                pendingBackup=content;
                Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT).setType("application/json").addCategory(Intent.CATEGORY_OPENABLE).putExtra(Intent.EXTRA_TITLE,"daemon-deck-backup.json");
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
