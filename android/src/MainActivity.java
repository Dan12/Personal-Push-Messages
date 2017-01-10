package push.dantech.com.personalpushnotifications;

import android.animation.ArgbEvaluator;
import android.animation.ValueAnimator;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import com.google.firebase.iid.FirebaseInstanceId;

/**
 * Created by dantech on 1/9/17.
 */

public class MainActivity extends AppCompatActivity {

    private TextView tx;
    private RefreshBroadcastReciver mBroadCastReciver;
    private TextView tokentx;

    private static MainActivity mainActivity;

    @Override
    public void onCreate(Bundle savedInstance) {
        super.onCreate(savedInstance);

        setContentView(R.layout.main);

        System.out.println("Started App");

        tx = (TextView) findViewById(R.id.message_text);
        tokentx = (TextView) findViewById(R.id.device_token);

        mBroadCastReciver = new RefreshBroadcastReciver();
        registerReceiver(mBroadCastReciver, new IntentFilter("serviceData"));

        MainActivity.mainActivity = this;
    }

    @Override
    protected void onResume() {
        super.onResume();
        System.out.println("resume");

        String token = FirebaseInstanceId.getInstance().getToken();
        System.out.println(token);
        tokentx.setText(token);

        // load intent extras on resume as it is always called in app lifecycle
        if (getIntent().getExtras() != null) {
            for (String key : getIntent().getExtras().keySet()) {
                Object value = getIntent().getExtras().get(key);
                System.out.println("Key: " + key + " Value: " + value);
                if(key.equals("message")) {
                    tx.setText("Personal Message: " + value);
                }
            }
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        if(mBroadCastReciver!=null)
            unregisterReceiver(mBroadCastReciver);
    }

    // called when a message is received while in the app
    void receiveMessage(Intent intent) {
        String msg = intent.getStringExtra("message");

        System.out.println("received Intent: "+msg);

        if(msg == null) {
            tokentx.setText(intent.getStringExtra("token"));
        } else {
            tx.setText("Personal Message: " + msg);


            final View view = this.getWindow().getDecorView();

            ValueAnimator colorAnimation = ValueAnimator.ofObject(new ArgbEvaluator(), Color.YELLOW, Color.WHITE);
            colorAnimation.setDuration(2000); // milliseconds
            colorAnimation.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {

                @Override
                public void onAnimationUpdate(ValueAnimator animator) {
                    view.setBackgroundColor((int) animator.getAnimatedValue());
                }

            });
            colorAnimation.start();
        }
    }

    private class RefreshBroadcastReciver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            MainActivity.mainActivity.receiveMessage(intent);
        }
    }
}
