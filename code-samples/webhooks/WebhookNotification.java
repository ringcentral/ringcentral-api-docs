package WebHookNotification;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class WebHookNotification {
    static RestClient restClient;
    static String DELIVERY_ADDRESS = "";
    public static void main(String[] args) {
      var obj = new WebHookNotification();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_CLIENT_ID"), System.getenv("RC_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_JWT"));

        // For the purpose of testing the code, we put the deliver address in the environment variable.
        // Feel free to set the delivery address directly.
        DELIVERY_ADDRESS = System.getenv("WEBHOOK_DELIVERY_ADDRESS") + "/webhook";

        obj.create_webhook_subscription();
        // obj.read_subscriptions;
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Create a Webhok notification and subscribe for instant SMS message notification
    */
    private void create_webhook_subscription() throws RestException, IOException {
      try {
        var bodyParams = new CreateSubscriptionRequest();
        bodyParams.eventFilters = new String[] { "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS" };
        bodyParams.deliveryMode = new NotificationDeliveryMode();
        bodyParams.deliveryMode.transportType = "WebHook";
        bodyParams.deliveryMode.address = DELIVERY_ADDRESS;

        bodyParams.expiresIn(3600L);

        var resp = restClient.restapi().subscription().post(bodyParams);
        System.out.println("Subscription Id: " + resp.id);
        System.out.println("Ready to receive incoming SMS via WebHook.");
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
    * Read all created subscriptions
    */
    private void read_subscriptions()  throws RestException, IOException {
      try {
        var resp = restClient.restapi().subscription().list();
        if (resp.records.length == 0) {
          System.out.println("No subscription.");
        } else {
          for (var record : resp.records) {
            String jsonStr = new Gson().toJson(record, new TypeToken<Object>(){}.getType());
            System.out.println(jsonStr);
            delete_subscription(record.id);
          }
        }

      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
    * Delete a subscription identified by the subscription id
    */
    private void delete_subscription(String subscriptionId)  throws RestException, IOException {
      try {
        var resp = restClient.restapi().subscription(subscriptionId).delete();
        System.out.println("Subscription Id: " + subscriptionId + " deleted.");
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
}
