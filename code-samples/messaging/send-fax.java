package Send_Fax;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_Fax {
    static String RECIPIENT_NUMBER = "<ENTER PHONE NUMBER>";
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";
    
    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";
    
    static RestClient restClient;
    
    public static void main(String[] args) {
        var obj = new Send_Fax();
        try {
            restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
            restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            obj.send_fax()();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void sendFax() throws RestException, IOException{
        CreateFaxMessageRequest postParameters = new CreateFaxMessageRequest();
        postParameters.to = new MessageStoreCallerInfoRequest[]{new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT_NUMBER)};
        postParameters.faxResolution = "High";
        postParameters.coverPageText = "This is a demo Fax page from Java";
        Attachment attachment = new Attachment();
        attachment.fileName = "test.jpg";
        attachment.contentType = "image/jpeg";
        attachment.bytes = Files.readAllBytes(Paths.get("./src/test/resources/test.jpg"));
        Attachment[] attachments = new Attachment[] { attachment };
        postParameters.attachments = attachments;
        
        var response = rc.restapi().account().extension().fax().post(postParameters);
        System.out.println("Fax sent. Delivery status: " + response.messageStatus);
    }
}
