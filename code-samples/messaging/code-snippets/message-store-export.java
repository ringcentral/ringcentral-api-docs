package Export_MessageStore;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.text.SimpleDateFormat;

public class Export_MessageStore {
    static RestClient restClient;

    public static void main(String[] args) {
        // Instantiate the SDK
        restClient = new RestClient( "SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com");
        var obj = new Export_MessageStore();
        try {
          // Authenticate a user using a personal JWT token
          restClient.authorize( "SANDBOX_JWT" );
          obj.create_message_store_report();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }

    /*
    * Create a task to export the account messages within March 2023
    */
  	public void create_message_store_report() throws RestException, IOException{
        var bodyParams = new CreateMessageStoreReportRequest();
        bodyParams.dateFrom = "2023-03-01T00:00:00.000Z";
        bodyParams.dateTo = "2023-03-31T23:59:59.999Z";

        var response =  restClient.restapi().account().messageStoreReport().post(bodyParams);
        get_message_store_report_task(response.id);
    }
  	/*
    * Check the task completion status
    */
    private void get_message_store_report_task(String taskId) throws RestException, IOException {
        var response = restClient.restapi().account().messageStoreReport(taskId).get();
        System.out.println("Task creation status: " + response.status);
        if (response.status.equals("Completed")) {
            get_message_store_report_archive(taskId);
        } else if ( response.status.equals("AttemptFailed") ||
                     response.status.equals("Failed") ||
                     response.status.equals("Cancelled") ) {
            System.out.println("Export message store failed.");
        } else {
            try {
                Thread.sleep(5000);
                get_message_store_report_task(taskId);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    /*
    * When the task is completed, use the task id to get the uri of the report file
    */
    private void  get_message_store_report_archive(String taskId) throws RestException, IOException {
        System.out.println("Getting report uri ...");
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd-HH_mm");
        Date date = new Date(System.currentTimeMillis());
        var dateStr = formatter.format(date);
        var resp = restClient.restapi().account().messageStoreReport(taskId).archive().list();
        for (var i = 0; i < resp.records.length; i++) {
            var fileName = "./src/test/resources/message_store_content_" + dateStr + "_" + i + ".zip";
            var contentUrl = resp.records[i].uri + "?access_token=" + restClient.token.access_token;
            try (BufferedInputStream inputStream = new BufferedInputStream(new URL(contentUrl).openStream());
                  FileOutputStream fileOS = new FileOutputStream(fileName)) {
                     byte data[] = new byte[1024];
                     int byteContent;
                     while ((byteContent = inputStream.read(data, 0, 1024)) != -1) {
                       fileOS.write(data, 0, byteContent);
                     }
                     System.out.println(fileName + " file is saved to the local machine.");
            } catch (IOException e) {
                 // handles IO exceptions
            }
        }
    }
}
