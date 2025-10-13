package SendSMS;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SendSMS {
    static RestClient restClient;
    static String RECIPIENT = "";
    public static void main(String[] args) {
      var obj = new SendSMS();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_APP_CLIENT_ID"), System.getenv("RC_APP_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_USER_JWT"));

        // For the purpose of testing the code, we put the SMS recipient number in the environment variable.
        // Feel free to set the SMS recipient directly.
        RECIPIENT = System.getenv("SMS_RECIPIENT");

        obj.read_extension_phone_number_detect_sms_feature();
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
     Read phone number(s) that belongs to the authenticated user and detect if a phone number
     has the SMS capability
    */
    public void read_extension_phone_number_detect_sms_feature() throws IOException {
      try {
        var resp =  restClient.restapi().account().extension().phoneNumber().get();
        for (var record : resp.records) {
          if (record.usageType.equalsIgnoreCase("DirectNumber")) {
            for(var feature : record.features) {
              if (feature.equalsIgnoreCase("SmsSender")) {
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending SMS message. For simplicity, we pick the first one we find.
                send_sms(record.phoneNumber);
                return;
              }
            }
          }
        }
        if (resp.records.length == 0) {
          System.out.println("This user does not own a phone number!");
        } else {
          System.out.println("None of this user's phone number(s) has the SMS capability!");
        }
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
     Send a text message from a user own phone number to a recipient number
    */
    public void send_sms(String fromNumber) throws IOException {
      try {
        CreateSMSMessage requestBody = new CreateSMSMessage();
        requestBody.from = new MessageStoreCallerInfoRequest().phoneNumber(fromNumber);

        requestBody.to = new MessageStoreCallerInfoRequest[] {
          new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT)
        };

        // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
        /*
        requestBody.to = new MessageStoreCallerInfoRequest[] {
          new MessageStoreCallerInfoRequest().phoneNumber("Recipient_1_Number"),
          new MessageStoreCallerInfoRequest().phoneNumber("Recipient_2_Number")
        };
        */
        requestBody.text = "Hello World";

        var resp = restClient.restapi().account().extension().sms().post(requestBody);
        System.out.println("SMS sent. Message id: " + resp.id.toString());
        check_sms_message_status(resp.id.toString());
      } catch(RestException e) {
        System.out.println(e.getMessage());
      }
  }
  /*
    Check the sending message status until it's no longer in the queued status
  */
  private void check_sms_message_status(String messageId) throws IOException {
    try {
      var resp = restClient.restapi().account().extension().messageStore(messageId).get();
      System.out.println("SMS message status: " + resp.messageStatus);
      if (resp.messageStatus.equals("Queued")) {
        try {
          Thread.sleep(2000);
          check_sms_message_status(resp.id.toString());
        } catch (InterruptedException e) {
          e.printStackTrace();
          System.out.println(e);
        }
      }
    } catch (RestException e) {
      System.out.println(e.getMessage());
    }
  }
}
