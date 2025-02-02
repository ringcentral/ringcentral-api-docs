package com.ringcentral;

import com.ringcentral.RestClient;
import com.ringcentral.RestException;
import com.ringcentral.definitions.CreateInternalTextMessageRequest;
import com.ringcentral.definitions.PagerCallerInfoRequest;
import com.ringcentral.websocket.Subscription;
import java.io.IOException;
import com.google.gson.Gson;

public class SubscriptionExample {
  static RestClient rc;
  public static void main(String[] args)
  throws RestException, IOException, InterruptedException {
    RestClient rc = new RestClient(
            System.getenv("RC_APP_CLIENT_ID"),
            System.getenv("RC_APP_CLIENT_SECRET"),
            System.getenv("RC_SERVER_URL")
            );
    rc.authorize(
    System.getenv("RC_USER_JWT")
    );
    final String[] message = {null};
    Subscription subscription = new Subscription(rc,
    new String[]{"/restapi/v1.0/account/~/extension/~/message-store"},
      (jsonString) -> {
        message[0] = jsonString;
      }
    );

    subscription.subscribe();
    // sleep and wait for notifications
    Thread.sleep(60000);
  }
}
