import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_Phone_Number {
    public static void main(String[] args) {
		try {
		    detect_phone_number_feature();
		} catch (RestException | IOException e) {
	    	e.printStackTrace();
		}
    }
    
    public static void detect_phone_number_feature() throws RestException, IOException{
		RestClient restClient = new RestClient("client_id", "client_secret", "server_url");
		restClient.authorize("username", "extension_number", "password");
	
		var response = restClient.restapi().account().extension().phonenumber().get();
		for (var record : response.records) {
	    	for (var feature : record.features) {
				if (feature == "A2PSmsSender"){
		    		if (record.paymentType == "TollFree") {
						System.out.println("This phone number " + record.phoneNumber + " is a toll-free number and provisioned for using to send high volume SMS" );
		    		}else{
						System.out.println("This phone number " + record.phoneNumber + " is a 10-DLC local number and provisioned for using to send high volume SMS" );
		    		}
				}
	    	}
		}
    }
}
