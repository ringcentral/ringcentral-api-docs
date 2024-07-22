package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.text.SimpleDateFormat;

public class Export_MessageStore {
    static RestClient rc;

    public static void main(String[] args) {
	var obj = new Export_MessageStore();
	rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
			     System.getenv("RC_APP_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USER_JWT") );
	    obj.export_message_store();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public static void export_message_store() throws RestException, IOException {
	var parameters = new CreateMessageStoreReportRequest();
	parameters.dateFrom = "2019-01-01T00:00:00.000Z";
	parameters.dateTo = "2019-03-31T23:59:59.999Z";

	var response =  rc.restapi().account().messageStoreReport().post(parameters);
	var taskId = response.id;
	boolean polling = true;
	while (polling)
	    {
		System.out.println("check task creation status ...");
		try {
		    Thread.sleep(5000);
		    response = rc.restapi().account().messageStoreReport(taskId).get();
		    if (!response.status.equals("InProgress"))
			polling = false;
		} catch (InterruptedException e) {
		    e.printStackTrace();
		}
	    }
	if (response.status.equals("Completed")) {
	    SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd-HH_mm");
	    Date date = new Date(System.currentTimeMillis());
	    var dateStr = formatter.format(date);
	    var resp = rc.restapi().account().messageStoreReport(response.id).archive().list();
	    for (var i = 0; i < resp.records.length; i++) {
		var fileName = "./src/test/resources/message_store_content_"
		    + dateStr + "_" + i + ".zip";
		var contentUrl = resp.records[i].uri + "?access_token="
		    + rc.token.access_token;
		try (BufferedInputStream inputStream
		     = new BufferedInputStream(new URL(contentUrl).openStream());
		     FileOutputStream fileOS = new FileOutputStream(fileName)) {
		    byte data[] = new byte[1024];
		    int byteContent;
		    while ((byteContent = inputStream.read(data, 0, 1024)) != -1) {
			fileOS.write(data, 0, byteContent);
		    }
		} catch (IOException e) {
		    // handles IO exceptions
		}
	    }
	}
    }
}
