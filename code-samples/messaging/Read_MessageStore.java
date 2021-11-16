import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.*;

public class Read_MessageStore {
    public static void main(String[] args) {
	try {
	    read_user_message_store();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }
    
    public static void read_user_message_store() throws RestException, IOException {
	RestClient rc = new RestClient( System.getenv("RC_CLIENT_ID"),
				        System.getenv("RC_CLIENT_SECRET"),
				        System.getenv("RC_SERVER_URL") );
	rc.authorize( System.getenv("RC_USERNAME"),
		      System.getenv("RC_EXTENSION"),
		      System.getenv("RC_PASSWORD") );
	
	ListMessagesParameters parameters = new ListMessagesParameters();
	parameters.messageType = new String[] {"SMS"};
	
	GetMessageList response = rc.restapi().account().extension()
	    .messageStore().list(parameters);
	for (int i = 0; i < response.records.length; i++) {
	    System.out.println( response.records[i].id );
	}
    }
}
