package ReadAsyncTask;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class ReadAsyncTask {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new ReadAsyncTask();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        obj.check_task_status("JOBID");

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Check task status
    */
    private void check_task_status(String jobId)
    {
      try {
        var resp = restClient.ai().status().v1().jobs(jobId).get();
        @SuppressWarnings("serial")
        String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      } catch (Exception ex) {
        System.out.println("Unable to read async task status. " + ex.getMessage());
      }
    }
}
