package Read_User_ActiveCalls;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_User_ActiveCalls {
  public static void main(String[] args) {
    try {
      read_user_activecals();
    } catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  public static void read_user_activecals() throws RestException, IOException {
    RestClient rc = new RestClient("client_id", "client_secret", "server_url");
    rc.authorize("username", "extension_number", "password");

    var getParameters = new ListExtensionActiveCallsParameters();
    parameters.view = "Simple"

                      var response = rc.restapi().account().extension().activecalls().list(parameters);
    for (CallLogRecord record : response.records) {
      System.out.println("Call result: " + record.result);
    }
  }
}
