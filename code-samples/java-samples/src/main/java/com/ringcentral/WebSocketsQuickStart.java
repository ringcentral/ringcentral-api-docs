package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import com.ringcentral.pubnub.Subscription;
import java.io.IOException;
import com.google.gson.Gson;

public class PubNubQuickStart {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new PubNubQuickStart();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_JWT") );
	    obj.pubnub_notifications();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public void pubnub_notifications() throws RestException, IOException {
        var eventFilters = new String[] {
            "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
        };
        Subscription subscription = new Subscription(rc, eventFilters, (message) -> {
		var gs = new Gson();
		if (message.contains("instant?type=SMS")) {
		    InstantMessageEvent notification = gs.fromJson( message, InstantMessageEvent.class);
		    InstantMessageEventBody body = notification.body;
		    System.out.println(body.subject);
		}
        });
	
        subscription.subscribe();
        System.out.println("Ready to receive incoming SMS via PubNub.");
	
        try {
            while (true) {
		Thread.sleep(10000);
	    }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
