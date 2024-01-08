package CallMonitoringGroup;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CallMonitoringGroup {
  static RestClient restClient;

  public static void main(String[] args) {
    var obj = new CallMonitoringGroup();
    try {
      // Instantiate the SDK
      restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");

      // Authenticate a user using a personal JWT token
      restClient.authorize("SANDBOX-JWT");

      obj.read_call_monitoring_groups();

    } catch (RestException e) {
      System.out.println(e.getMessage());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  /*
  * Read all call monitoring groups
  */
  public void read_call_monitoring_groups() throws RestException, IOException {
    try {
      var resp = restClient.restapi().account().callMonitoringGroups().get();
      for (var group : resp.records)
      {
        System.out.println("Call monitoring group name/id: " + group.name + "/" + group.id);
        read_call_monitoring_group_members(group.id);
      }
    } catch (RestException ex) {
      System.out.println("Unable to list call monitoring groups. " + ex.getMessage());
    }
  }
  /*
  * Read a call monitoring group members
  */
  public void read_call_monitoring_group_members(String groupId) throws RestException, IOException {
    try {
      var resp = restClient.restapi().account().callMonitoringGroups(groupId).members().get();
      System.out.println("Call monitoring group members:");
      for (var member : resp.records)
      {
        String jsonStr = new Gson().toJson(member, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }

    } catch (RestException ex) {
      System.out.println("Unable to read members of this call monitoring group. " + ex.getMessage());
    }
  }
}
