package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class FindActiveUserCalls {
    static RestClient rc;

    public static void main(String[] args) {
	var obj = new FindActiveUserCalls();
	rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
			     System.getenv("RC_APP_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USER_JWT") );
	    obj.read_user_active_calls();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public void read_user_active_calls() throws RestException, IOException {
	var parameters = new ListExtensionActiveCallsParameters();
	parameters.view = "Simple";
	UserActiveCallsResponse response = rc.restapi().account().extension()
	    .activeCalls().get(parameters);
	for (UserCallLogRecord record : response.records) {
	    System.out.println("Call result: " + record.result);
	}
    }
}
