package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class UpdateCallQueueMembers {
    static RestClient rc;
    
    public static void main(String[] args) {
        var obj = new UpdateCallQueueMembers();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_JWT") );
	    obj.add_callqueue_members();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }
    
    public void add_callqueue_members() throws RestException, IOException {
	ListCallQueuesParameters cqParameters = new ListCallQueuesParameters();
	CallQueues resp = rc.restapi().account().callQueues().list( cqParameters );
	for (var group : resp.records) {
	    if (group.name.equals("Sales team")) {
		var parameters = new CallQueueBulkAssignResource();
		parameters.addedExtensionIds = new String[] {"888888888", "999999999"};
		rc.restapi().account().callQueues(group.id).bulkAssign().post(parameters);
		System.out.println("Members added.");
		break;
	    }
	}
    }
}
