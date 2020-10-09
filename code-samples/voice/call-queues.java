import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Update_CallQueue_Members {
	static RestClient rcsdk;
	public static void main(String[] args) {
		var obj = new Update_CallQueue_Members();
		rcsdk = new RestClient("client_id", "client_secret", "server_url");
		try {
			rcsdk.authorize("username", "extension_number", "password");
			obj.add_callqueue_members();
		} catch (RestException | IOException e) {
			e.printStackTrace();
		}
	}
	public void add_callqueue_members() throws RestException, IOException {
		var resp = restClient.restapi().account().callqueues().get();
		for (var group : resp.records) {
			if (group.name.equals("Sales team")) {
				var parameters = new CallQueueBulkAssignResource();
				parameters.addedExtensionIds = new String[] {"888888888", "999999999"};
				restClient.restapi().account().callqueues(group.id).bulkassign().post(parameters);
				System.out.println("Members added.");
				break;
			}
		}
	}
}
