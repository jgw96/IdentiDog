package com.identidog.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;
import com.getcapacitor.Plugin;

import android.webkit.WebSettings;
import android.webkit.WebView;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    Bridge goodBridge = this.getBridge();

    WebView wv = goodBridge.getWebView();
    WebSettings ws = wv.getSettings();
    ws.setMediaPlaybackRequiresUserGesture(false);

  }
}
