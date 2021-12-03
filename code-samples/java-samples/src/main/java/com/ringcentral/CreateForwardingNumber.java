package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class CreateForwardingNumber {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new CreateForwardingNumber();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USERNAME"),
			  System.getenv("RC_EXTENSION"),
			  System.getenv("RC_PASSWORD") );
	    obj.create_forwarding_number();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public static void create_forwarding_number() throws RestException, IOException {
        var parameters         = new CreateForwardingNumberRequest();
        parameters.phoneNumber = "11235557890";
        parameters.type        = "Other";
        parameters.label       = "My ATT number";

        var response =  rc.restapi().account().extension().forwardingNumber().post(parameters);
        System.out.println("Forwarding number created. ID: " + response.id);
    }
}
