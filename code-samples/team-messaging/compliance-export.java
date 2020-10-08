import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

public class Export_Compliance_Data {
static RestClient rcsdk;
  public static void main(String[] args) {
	  var obj = new Export_Compliance_Data();
	  rcsdk = new RestClient("client_id", "client_secret", "server_url");
	  try {
	      rcsdk.authorize("username", "extension_number", "password");
	      obj.create_compliance_export_task();
	  } catch (RestException | IOException e) {
	      e.printStackTrace();
	  }
  }
  public void create_compliance_export_task() throws RestException, IOException {
  var parameters = new CreateDataExportTaskRequest();
	  parameters.timeFrom = "2019-08-01T00:00:00.000Z";
	  parameters.timeTo = "2019-08-26T23:59:59.999Z";

	  var resp = rcsdk.restapi().glip().dataexport().post(parameters);
	  System.out.println("Create export task.");
	  var taskId = resp.id;
	  boolean polling = true;
	  while (polling)
	  {
	    System.out.println("Check export task status ...");
	    try {
		    Thread.sleep(5000);
		    resp = rcsdk.restapi().glip().dataexport(taskId).get();
		    if (!resp.status.equals("InProgress"))
		      polling = false;
	    } catch (InterruptedException e) {
		    e.printStackTrace();
	    }
	  }
	  if (resp.status.equals("Completed")) {
	    for (var i = 0; i < resp.datasets.length; i++)
	    {
			var fileName = "./src/test/resources/export-reports_" + resp.creationTime + "_" + i + ".zip";
			var contentUrl = resp.datasets[i].uri + "?access_token=" + rcsdk.token.access_token;
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
