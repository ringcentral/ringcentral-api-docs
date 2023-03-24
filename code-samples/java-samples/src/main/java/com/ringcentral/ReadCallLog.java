package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class ReadCallLog {
    static RestClient rc;
    
    public static void main(String[] args) {
        var obj = new ReadCallLog();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_JWT") );
	    obj.read_user_call_log();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public static void read_user_call_log() throws RestException, IOException {
	ReadUserCallLogParameters parameters = new ReadUserCallLogParameters();
	parameters.view = "Detailed";
	UserCallLogResponse response = rc.restapi().account().extension().callLog().list(parameters);
	for (UserCallLogRecord record : response.records) {
	    System.out.println("Call type: " + record.type);
	}
    }
}
