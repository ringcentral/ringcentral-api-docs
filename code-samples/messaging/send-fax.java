package Send_Fax;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_Fax {
    static String RECIPIENT = System.getenv("FAX_RECIPIENT");
    static RestClient restClient;
  
    public static void main(String[] args) {
        var obj = new Send_Fax();
	restClient = new RestClient( System.getenv("RC_CLIENT_ID"),
				     System.getenv("RC_CLIENT_SECRET"),
				     System.getenv("RC_SERVER_URL") );
	try {
	    restClient.authorize( System.getenv("RC_JWT") );
            obj.sendFax();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }
    
    public static void sendFax() throws RestException, IOException{
        CreateFaxMessageRequest postParameters = new CreateFaxMessageRequest();
        postParameters.to = new MessageStoreCallerInfoRequest[]{new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT)};
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
