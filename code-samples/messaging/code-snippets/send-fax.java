package Send_Fax;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_Fax {
    static String RECIPIENT = "RECIPIENT-PHONE-NUMBER";
    static RestClient restClient;

    public static void main(String[] args) {
      // Instantiate the SDK
      restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");
      var obj = new Send_Fax();
      try {
        // Authenticate a user using a personal JWT token
        restClient.authorize( "RC_USER_JWT" );
        obj.send_fax();
      } catch (RestException | IOException e) {
        e.printStackTrace();
      }
    }
    /*
     Send a high resolution fax message to a recipient number
    */
    public static void send_fax() throws RestException, IOException{
      try {
        CreateFaxMessageRequest bodyParams = new CreateFaxMessageRequest();
        bodyParams.to = new FaxReceiver[]{
          new FaxReceiver().phoneNumber(RECIPIENT)
        };
        // To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
        /*
        bodyParams.to = new FaxReceiver[] {
          new FaxReceiver().phoneNumber("Recipient1-Phone-Number"),
          new FaxReceiver().phoneNumber("Recipient2-Phone-Number")
        };
        */
        bodyParams.faxResolution = "High";
        bodyParams.coverPageText = "Send Fax from Java app.";

        // Make sure you have the test.pdf file saved under the specified location below.
        // Otherwise, change the location path and file name accordingly
        Attachment attachment = new Attachment()
		    		.filename("test.pdf")
		    		.contentType("application/pdf")
		    		.content(Files.readAllBytes(Paths.get("./src/test/resources/test.pdf")));

        Attachment[] attachments = new Attachment[] { attachment };
        bodyParams.attachments = attachments;

        var response = restClient.restapi().account().extension().fax().post(bodyParams);
        System.out.println("Fax sent. Message id: " + response.id.toString());
        check_fax_message_status(response.id.toString());
      } catch(RestException e) {
        System.out.println(e.getMessage());
      }
    }
    /*
      Check the sending message status until it's no longer in the queued status
    */
    private void check_fax_message_status(String messageId) throws IOException {
      try {
        var resp = restClient.restapi().account().extension().messageStore(messageId).get();
        System.out.println("Message status: " + resp.messageStatus);
        if (resp.messageStatus.equals("Queued")) {
          try {
            Thread.sleep(10000);
            check_fax_message_status(resp.id.toString());
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
