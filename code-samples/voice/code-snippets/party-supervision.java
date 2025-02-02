package CallSupervision;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CallSupervision {
  static RestClient restClient;

  public static void main(String[] args) {
    var obj = new AnalyzeInteraction();
    try {
      // Instantiate the SDK
      restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

      // Authenticate a user using a personal JWT token
      restClient.authorize("RC_USER_JWT");

      var supervisorDeviceId = "Test-Supervisor-DeviceId";
      var agentExtensionId = "Test-Agent-ExtensionId";
      obj.read_agent_active_calls(agentExtensionId, supervisorDeviceId);
    } catch (RestException e) {
      System.out.println(e.getMessage());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  /*
  * Read agent active calls
  */
  public void read_agent_active_calls(String agentExtensionId, String supervisorDeviceId) throws RestException, IOException {
    try {
      var resp = restClient.restapi().account().extension(agentExtensionId).activeCalls().get();
      for (var record : resp.records)
      {
        if (record.result.equals("In Progress")) {
          submit_call_supervise_request(record.telephonySessionId, agentExtensionId, supervisorDeviceId);
          break;
        }
      }
    } catch (RestException ex) {
      System.out.println("Unable to read agent's active calls. " + ex.getMessage());
    }
  }
  /*
  * Supervise an active call session
  */
  public void submit_call_supervise_request(String telephonySessionId, String agentExtensionId, String supervisorDeviceId)  throws RestException, IOException {
    try {
      var bodyParams = new SuperviseCallSessionRequest();
      bodyParams.mode = "Listen";
      bodyParams.supervisorDeviceId = supervisorDeviceId;
      bodyParams.agentExtensionId = agentExtensionId;
      var resp = restClient.restapi().account().telephony().sessions(telephonySessionId).supervise().post(bodyParams);
      String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
      System.out.println(jsonStr);
    } catch (RestException ex) {
      System.out.println("Unable to supervise this call. " + ex.getMessage());
    }
  }
}
