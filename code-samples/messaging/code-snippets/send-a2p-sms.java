package Send_HighVolume_SMS;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_HighVolume_SMS {
    // For the purpose of testing the code, we put the recipient number in the variable.
    // Feel free to set the recipient number directly.
    static String RECIPIENT = "RECIPIENT-PHONE-NUMBER";
    static RestClient restClient;

    public static void main(String[] args) {
      // Instantiate the SDK
      restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");
      var obj = new Send_HighVolume_SMS();
      try {
        // Authenticate a user using a personal JWT token
        restClient.authorize( "RC_USER_JWT" );
        obj.read_extension_phone_number_detect_a2psms_feature();
      } catch (RestException | IOException e) {
        e.printStackTrace();
      }
    }
    /*
    Read phone number(s) that belongs to the authenticated user and detect if a phone number
    has the A2P SMS capability
    */
    public void read_extension_phone_number_detect_a2psms_feature() throws IOException{
      try {
        var resp =  restClient.restapi().account().extension().phoneNumber().get();
        for (var record : resp.records) {
          if (record.usageType.equalsIgnoreCase("DirectNumber")) {
            for(var feature : record.features) {
              if (feature.equalsIgnoreCase("A2PSmsSender")) {
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending SMS message.
                send_batch_sms(record.phoneNumber);
                return;
              }
            }
          }
        }
        if (resp.records.length == 0) {
          System.out.println("This user does not own a phone number!");
        } else {
          System.out.println("None of this user's phone number(s) has the A2P SMS capability!");
        }
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
     Broadcast a text message from a user own phone number to multiple recipients
    */
    public void send_batch_sms(String fromNumber) throws RestException, IOException{
      try {
        var bodyParams = new MessageBatchCreateRequest();
        bodyParams.from = fromNumber;
        bodyParams.text = "Hello Team";
        bodyParams.messages = new MessageCreateRequest[] {
          new MessageCreateRequest().to ( new String[] { RECIPIENT } ),
          // Adding more recipients
          /*
          new MessageCreateRequest().to ( new String[] { "Recipient-2-Phone-Number" } ),
          new MessageCreateRequest().to ( new String[] { "Recipient-N-Phone-Number" } ),
          */
        };

        var resp = restClient.restapi().account().a2pSms().batches().post(bodyParams);
        System.out.println("Batch sent. Batch id: " + resp.id);
        check_batch_status(resp.id);
      } catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
     Send a batch from a user own phone number to multiple recipient with personalized message
    */
    public void send_personalized_sms(String fromNumber) throws RestException, IOException{
      try {
        var bodyParams = new MessageBatchCreateRequest();
        bodyParams.from = fromNumber;
        bodyParams.messages = new MessageCreateRequest[] {
          new MessageCreateRequest().to ( new String[] { RECIPIENT } ).text ("Hello Alice") ,
	        // Adding more recipients
	        /*
  			  new MessageCreateRequest().to ( new String[] { "Recipient-2-Phone-Number" } ).text ("Hello Bob"),
  			  new MessageCreateRequest().to ( new String[] { "Recipient-N-Phone-Number" } ).text ("Hola Maria"),
	        */
        };
        // This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
        bodyParams.text = "Hello Team";

        var resp = restClient.restapi().account().a2pSms().batches().post(bodyParams);
        System.out.println("Batch sent. Batch id: " + resp.id);
        check_batch_status(resp.id);
      } catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
     Check the batch status until it's completed.
     Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
    */
    private void check_batch_status(String batchId) throws IOException {
      try {
        var resp = restClient.restapi().account().a2pSms().batches(batchId).get();
        System.out.println("Batch status: " + resp.status);
        if (!resp.status.equals("Completed")) {
          try {
            Thread.sleep(5000);
            check_batch_status(resp.id);
          } catch (InterruptedException e) {
            e.printStackTrace();
            System.out.println(e);
          }
        }else{
          String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
          System.out.println(jsonStr);
        }
      } catch (RestException e) {
        System.out.println(e.getMessage());
      }
    }
}
