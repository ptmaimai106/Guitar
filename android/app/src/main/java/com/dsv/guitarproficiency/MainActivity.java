package com.dsv.guitarproficiency;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {

    // @Override
    // public void onConfigurationChanged(Configuration newConfig) {
    //     super.onConfigurationChanged(newConfig);
    //     Intent intent = new Intent("onConfigurationChanged");
    //     intent.putExtra("newConfig", newConfig);
    //     this.sendBroadcast(intent);
    // }
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        SplashScreen.show(this,R.style.SplashScreenTheme);  // here
        super.onCreate(savedInstanceState);
    }
    /**
        * Returns the name of the main component registered from JavaScript.
        * This is used to schedule rendering of the component.
        */
    @Override
    protected String getMainComponentName() {
        return "GUITAR_PROFICIENCY";
    }
    
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    

}
