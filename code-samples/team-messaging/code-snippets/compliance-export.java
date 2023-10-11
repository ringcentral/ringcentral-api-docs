package ComplianceExport;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class ComplianceExport {
    static RestClient restClient;

    public static void main(String[] args) {
        var obj = new ComplianceExport();
        try {
          // Instantiate the SDK
          restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");

          // Authenticate a user using a personal JWT token
          restClient.authorize("SANDBOX-JWT");
          obj.create_compliance_export_task();
        } catch (RestException e) {
          System.out.println(e.getMessage());
        } catch (IOException e) {
          e.printStackTrace();
        }
    }
    /*
    * Create a task to export the Team Messaging store for a period of time.
    */
    public void create_compliance_export_task() throws RestException, IOException {
        var bodyParams = new CreateDataExportTaskRequest();
        bodyParams.timeFrom = "2023-01-01T00:00:00.000Z";
        bodyParams.timeTo = "2023-01-31T23:59:59.999Z";

        var resp = restClient.teamMessaging().v1().dataExport().post(bodyParams);
        System.out.println("Create export task");

        var taskId = resp.id;
        boolean polling = true;
        while (polling)
        {
            System.out.println("Check export task status ...");
            try {
              Thread.sleep(5000);
              resp = restClient.teamMessaging().v1().dataExport(taskId).get();
              if (!resp.status.equals("InProgress") || !resp.status.equals("Accepted"))
                polling = false;
            } catch (InterruptedException e) {
              e.printStackTrace();
            }
        }
        if (resp.status.equals("Completed")) {
            /*
            * Download the task compressed file and save to a local storage.
            */
            for (var i = 0; i < resp.datasets.length; i++) {
              var fileName = "./src/test/resources/glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
              var contentUrl = resp.datasets[i].uri + "?access_token=" + restClient.token.access_token;
              try (BufferedInputStream inputStream = new BufferedInputStream(new URL(contentUrl).openStream());
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
