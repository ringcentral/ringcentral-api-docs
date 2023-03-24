package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class ReadUserAnsweringRules {
    static RestClient rc;
    
    public static void main(String[] args) {
        var obj = new ReadUserAnsweringRules();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_JWT") );
	    obj.get_user_call_answering_rules();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public void get_user_call_answering_rules() throws RestException, IOException {
	var parameters         = new ListAnsweringRulesParameters();
	parameters.view        = "Detailed";
	parameters.enabledOnly = false;
	
	UserAnsweringRuleList response = rc.restapi().account().extension().answeringRule().list(parameters);
	for (var record : response.records) {
	    var rule = rc.restapi().account().extension().answeringRule(record.id).get();
	    System.out.println("Name: " + rule.name);
	    System.out.println("Type: " + rule.type);
	    System.out.println("---");
	}
    }
}
