package PubNub_Notifications;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import com.ringcentral.pubnub.Subscription;

public class PubNub_Notifications {
    static RestClient restClient;

    public static void main(String[] args) {
        try {
            PubNubNotifications();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }

    public static void PubNubNotifications() throws RestException, IOException {
	restClient = new RestClient(
	    Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
	    Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
	    Environment.GetEnvironmentVariable("RC_SERVER_URL"));
	restClient.Authorize(
	    Environment.GetEnvironmentVariable("RC_JWT")).Wait();

        var eventFilters = new String[] {
            "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
        };
        Subscription subscription = new Subscription(restClient, eventFilters, (message)->{
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
            while (true)
            {
                Thread.sleep(10000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
