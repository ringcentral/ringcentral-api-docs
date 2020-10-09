import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Get_User_Call_Answering_Rules {
  static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
  static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
  static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

  static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
  static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
  static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";
  static RestClient restClient;

  public static void main(String[] args) {
    var obj = new Get_User_Call_Answering_Rules();
    try {
      restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
      restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
      obj.get_user_call_answering_rules();
    } catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  public void get_user_call_answering_rules() throws RestException, IOException {
    var parameters = new ListAnsweringRulesParameters();
    parameters.view = "Detailed";
    parameters.enabledOnly = "false";

    var response = restClient.restapi().account().extension().answeringrule().list(parameters);
    for (var record : response.records) {
      var rule = restClient.restapi().account().extension().answeringrule(record.id).get();
      System.out.println(JSON.toJSONString(rule));
    }
  }
}
