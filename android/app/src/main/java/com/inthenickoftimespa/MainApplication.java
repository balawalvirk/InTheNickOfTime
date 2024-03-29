package com.inthenickoftimespa;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import io.invertase.firebase.RNFirebasePackage;
// import com.rnfs.RNFSPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;
import cl.json.RNSharePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImageResizerPackage(),
            new RNFetchBlobPackage(),
            new RNDateTimePickerPackage(),
            
            // new RNFSPackage(),
            new SketchCanvasPackage(),
            new RNSharePackage(),
            new AsyncStoragePackage(),
           
            new ImagePickerPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
