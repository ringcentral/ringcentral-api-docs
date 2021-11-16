package SendSMSQuickStart;
import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SendSMSQuickStart {
    static String SMS_RECIPIENT = System.getenv("SMS_RECIPIENT");
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new SendSMSQuickStart();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USERNAME"),
			  System.getenv("RC_EXTENSION"),
			  System.getenv("RC_PASSWORD") );
	    obj.read_extension_phone_number();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public void read_extension_phone_number() throws RestException, IOException{
	var resp =  rc.restapi().account().extension().phoneNumber().get();
	OUTERMOST: for (var record : resp.records) {
	    for(var feature : record.features) {
		if (feature.equalsIgnoreCase("SmsSender")) {
		    send_sms(record.phoneNumber);
		    break OUTERMOST;
		}
	    }
	}
    }

    public void send_sms(String phoneNumber) throws RestException, IOException {
        CreateSMSMessage postParameters = new CreateSMSMessage();
        postParameters.from = new MessageStoreCallerInfoRequest().phoneNumber(phoneNumber);
        postParameters.to = new MessageStoreCallerInfoRequest[]{
	    new MessageStoreCallerInfoRequest().phoneNumber(SMS_RECIPIENT)
	};
        postParameters.text = "Hello World from Java";
	
        var response = rc.restapi().account().extension().sms().post(postParameters);
        System.out.println("SMS sent. Message status: " + response.messageStatus);
    }
}
