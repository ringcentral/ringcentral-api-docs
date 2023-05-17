package Send_MMS;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_MMS {
    static String RECIPIENT = "RECIPIENT-PHONE-NUMBER";
    static RestClient restClient;

    public static void main(String[] args) {
      // Instantiate the SDK
      restClient = new RestClient( "SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com");
      var obj = new Send_MMS();
      try {
        // Authenticate a user using a personal JWT token
        restClient.authorize( "SANDBOX_JWT" );
        obj.read_extension_phone_number_detect_mms_feature();
      } catch (RestException | IOException e) {
        e.printStackTrace();
      }
    }
    /*
    Read phone number(s) that belongs to the authenticated user and detect if a phone number
    has the MMS capability
    */
    public void read_extension_phone_number_detect_mms_feature() throws IOException{
      try {
        var resp =  restClient.restapi().account().extension().phoneNumber().get();
        for (var record : resp.records) {
          if (record.usageType.equalsIgnoreCase("DirectNumber")) {
            for(var feature : record.features) {
              if (feature.equalsIgnoreCase("MmsSender")) {
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending MMS message.
                send_mms(record.phoneNumber);
                return;
              }
            }
          }
        }
        if (resp.records.length == 0) {
          System.out.println("This user does not own a phone number!");
        } else {
          System.out.println("None of this user's phone number(s) has the MMS capability!");
        }
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
    Send a multi-media message from a user own phone number to a recipient number
    */
    public void send_mms(String fromNumber) throws RestException, IOException{
      try {
        CreateMMSMessage bodyParams = new CreateMMSMessage();
        bodyParams.from = new MessageStoreCallerInfoRequest().phoneNumber(fromNumber);

        bodyParams.to = new MessageStoreCallerInfoRequest[]{
          new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT)
        };
        // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
        /*
        requestBody.to = new MessageStoreCallerInfoRequest[] {
          new MessageStoreCallerInfoRequest().phoneNumber("12092520012"),
          new MessageStoreCallerInfoRequest().phoneNumber("16505130930")
        };
        */

        Attachment attachment = new Attachment()
            .filename("test.jpg")
            .content(Files.readAllBytes(Paths.get("./src/test/resources/test.jpg")));
        Attachment[] attachments = new Attachment[] { attachment };
        bodyParams.attachments = attachments;

        var response = restClient.restapi().account().extension().mms().post(bodyParams);
        System.out.println("MMS sent. Message id: " + response.id.toString());
        check_mms_message_status(response.id.toString());
      } catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
    Check the sending message status until it's no longer in the queued status
    */
    private void check_mms_message_status(String messageId) throws IOException {
      try {
        var resp = restClient.restapi().account().extension().messageStore(messageId).get();
        System.out.println("Message status: " + resp.messageStatus);
        if (resp.messageStatus.equals("Queued")) {
          try {
            Thread.sleep(5000);
            check_mms_message_status(resp.id.toString());
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
