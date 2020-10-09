package Read_CallLog;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_CallLog {
	public static void main(String[] args) {
		try {
			readUserCallLog();
		} catch (RestException | IOException e) {
			e.printStackTrace();
		}
	}

	public static void readUserCallLog() throws RestException, IOException {
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		rc.authorize("username", "extension_number", "password");

		ReadUserCallLogParameters getParameters = new ReadUserCallLogParameters();
		parameters.view = "Detailed"

		                  var response = rc.restapi().account().extension().calllog().list(parameters);
		for (CallLogRecord record : response.records) {
			System.out.println("Call type: " + record.type);
		}
	}
}
