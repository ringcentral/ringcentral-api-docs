package com.ringcentral;

import java.io.IOException;

import com.ringcentral.RestException;
import com.ringcentral.definitions.CreateSubscriptionRequest;
import com.ringcentral.definitions.NotificationDeliveryModeRequest;

public class SubscribeForWebHookNotification
{
    public static void main(String[] args) throws IOException, RestException
    {
        String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

        String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION";

        String DELIVERY_ADDRESS = "<https://xxxxxxxxx.ngrok.io>";

        RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER_URL);
        rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
        var eventFilters = new String[] {"/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"}
        CreateSubscriptionRequest createSubscriptionRequest = new CreateSubscriptionRequest()
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
