import com.ringcentral.*;
import com.ringcentral.definitions.*;

class Read_MessageStore {
	public static void main(String[] args) {
		try {
			read_user_message_store();
		} catch (RestException | IOException e) {
			e.printStackTrace();
		}
	}

	public static void read_user_message_store() throws RestException, IOException {
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		rc.authorize("username", "extension_number", "password");

		ListMessagesParameters parameters = new ListMessagesParameters();
		parameters.messageType = new String[] {"SMS"};

		var response = rc.restapi().account().extension().messagestore().list(parameters);

		String jsonStr = JSON.toJSONString(response);
		System.out.println(jsonStr);
	}
}
