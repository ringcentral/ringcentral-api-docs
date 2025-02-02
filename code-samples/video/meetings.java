package CreateMeeting;
import com.ringcentral.*;
import java.io.IOException;

public class CreateMeeting {
  static RestClient restClient;

  public static void main(String[] args) {
    var obj = new CreateMeeting();
    try {
      // Instantiate the SDK
      restClient = new RestClient(System.getenv("RC_APP_CLIENT_ID"), System.getenv("RC_APP_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

      // Authenticate a user using a personal JWT token
      restClient.authorize(System.getenv("RC_USER_JWT"));

      obj.create_meeting();
    } catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  /*
  * Create an instant RCV meeting
  */
  public void create_meeting() throws RestException, IOException{
    var bodyParams = new CreateBridgeRequest();
    bodyParams.name = "Test Meeting";
    bodyParams.type = "Instant";
    var response = restClient.rcvideo().v2().account("~").extension("~").bridges().post(bodyParams);
    System.out.println("Start Your Meeting: " + response.discovery.web);
  }
}
