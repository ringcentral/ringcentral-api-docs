package UserCallLogQuickStart;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class UserCallLogQuickStart {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new UserCallLogQuickStart();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_CLIENT_ID"), System.getenv("RC_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_JWT"));

        obj.read_user_calllog();

      } catch (RestException e) {
        System.out.println("Unable to authenticate to platform. Check error: " + e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Read user call log between a period of time
    */
    public void read_user_calllog() throws RestException, IOException{
      try {
        var queryParams = new ReadUserCallLogParameters();

        queryParams.dateFrom = "2024-01-01T00:00:00.000Z";
        queryParams.dateTo = "2024-01-31T23:59:59.009Z";
        queryParams.view = "Detailed";

        var response = restClient.restapi().account().extension().callLog().list(queryParams);
        
  	    for (var record : response.records) {
          String jsonStr = new Gson().toJson(record, new TypeToken<Object>(){}.getType());
          System.out.println(jsonStr);
        }
      }catch (RestException e){
        System.out.println("Unable to read user call log data. " + ex.getMessage());
      }
    }
}
