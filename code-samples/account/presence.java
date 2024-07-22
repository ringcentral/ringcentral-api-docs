import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_Presence {
  static RestClient restClient;
  public static void main(String[] args) {
    var obj = new Read_Presence();
    rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
    System.getenv("RC_APP_CLIENT_SECRET"),
    System.getenv("RC_SERVER_URL") );
    try {
      rc.authorize(System.getenv("RC_USER_JWT"));
      obj.read_users_presence();
    } catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  public static void read_users_presence() throws RestException, IOException{
    var parameters = new ReadAccountPresenceParameters();
    parameters.detailedTelephonyState = true;

    var response = rc.restapi().account().presence().get(parameters);
    for (var record : response.records)
    System.out.println(record.userStatus);
  }
}
