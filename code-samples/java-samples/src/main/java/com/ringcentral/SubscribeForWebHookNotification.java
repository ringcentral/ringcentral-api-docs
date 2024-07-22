package com.ringcentral;

import java.io.IOException;

import com.ringcentral.RestException;
import com.ringcentral.definitions.CreateSubscriptionRequest;
import com.ringcentral.definitions.NotificationDeliveryModeRequest;

public class SubscribeForWebHookNotification
{
    static RestClient rc;
    public static void main(String[] args) throws IOException, RestException
    {
        String DELIVERY_ADDRESS = "<https://xxxxxxxxx.ngrok.io>";
	rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
			     System.getenv("RC_APP_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USER_JWT") );
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
        var eventFilters = new String[] {
	    "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
	};
        CreateSubscriptionRequest createSubscriptionRequest
	    = new CreateSubscriptionRequest()
	    .eventFilters(eventFilters)
	    .deliveryMode( new NotificationDeliveryModeRequest()
			   .transportType("WebHook")
			   .address(DELIVERY_ADDRESS)
			   );
        var result = rc.restapi().subscription().post(createSubscriptionRequest);
        System.out.println(result.id);
        System.out.println("WebHook Ready");
        rc.revoke();
    }
}
