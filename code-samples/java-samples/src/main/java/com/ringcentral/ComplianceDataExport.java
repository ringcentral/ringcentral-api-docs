package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

public class ComplianceDataExport {
    static RestClient rc;

    public static void main(String[] args) {
	var obj = new ComplianceDataExport();
	rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
			     System.getenv("RC_APP_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USER_JWT") );
	    obj.create_compliance_export_task();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }
    public void create_compliance_export_task() throws RestException, IOException {
	var parameters = new CreateDataExportTaskRequest();
	parameters.timeFrom = "2019-08-01T00:00:00.000Z";
	parameters.timeTo = "2019-08-26T23:59:59.999Z";

	var resp = rc.restapi().glip().dataExport().post(parameters);
	var taskId = resp.id;
	System.out.println("Created export task. Task ID: " + taskId);

	boolean polling = true;
	while (polling) {
	    System.out.println("Check export task status ...");
	    try {
		Thread.sleep(5000);
		resp = rc.restapi().glip().dataExport(taskId).get();
		if (!resp.status.equals("InProgress"))
		    polling = false;
	    } catch (InterruptedException e) {
		e.printStackTrace();
	    }
	}
	if (resp.status.equals("Completed")) {
	    for (var i = 0; i < resp.datasets.length; i++) {
		var fileName = "./src/test/resources/export-reports_"
		    + resp.creationTime + "_" + i + ".zip";
		var contentUrl = resp.datasets[i].uri
		    + "?access_token=" + rc.token.access_token;
		try (BufferedInputStream inputStream =
		     new BufferedInputStream(new URL(contentUrl).openStream());
		     FileOutputStream fileOS = new FileOutputStream(fileName)) {
		    byte data[] = new byte[1024];
		    int byteContent;
		    while ((byteContent = inputStream.read(data, 0, 1024)) != -1) {
			fileOS.write(data, 0, byteContent);
		    }
		    System.out.println("Save report zip file to the local machine.");
		} catch (IOException e) {
		    // handles IO exceptions
		    System.out.println("Error!");
		}
	    }
	}
    }
}
