package CreateAndManageCallMonitoringGroup;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CreateAndManageCallMonitoringGroup {
  static RestClient restClient;

  public static void main(String[] args) {
    var obj = new CreateAndManageCallMonitoringGroup();
    try {
      // Instantiate the SDK
      restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

      // Authenticate a user using a personal JWT token
      restClient.authorize("RC_USER_JWT");

      obj.create_call_monitoring_group("Demo Group - Java");

    } catch (RestException e) {
      System.out.println(e.getMessage());
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
  /*
  * Create a call monitoring group
  */
  public void create_call_monitoring_group(String groupName) throws RestException, IOException {
    try {
      var bodyParams = new CreateCallMonitoringGroupRequest();
      bodyParams.name = groupName;
      var resp = restClient.restapi().account().callMonitoringGroups().post(bodyParams);
      System.out.println("Call monitoring group created. Group id/name:" + resp.id + "/" + resp.name);
      add_call_monitoring_group_members(resp.id);
    } catch (RestException ex) {
      System.out.println("Unable to list call monitoring groups. " + ex.getMessage());
    }
  }
  /*
  * Add members to a call monitoring group
  */
  public void add_call_monitoring_group_members(String groupId) throws RestException, IOException {
    try {
      var newMembersList = read_account_extensions();
      var bodyParams = new CallMonitoringBulkAssign();
      bodyParams.addedExtensions = newMembersList;
      restClient.restapi().account().callMonitoringGroups(groupId).bulkAssign().post(bodyParams);
      System.out.println("Members added.");
    } catch (RestException ex) {
      System.out.println("Unable to add mumbers to this call monitoring group. " + ex.getMessage());
    }
  }
  /*
  * Read the account user extensions and create a list of supervisors and agents based on their role.
  */
  public CallMonitoringExtensionInfo[] read_account_extensions() throws RestException, IOException {
    ArrayList<CallMonitoringExtensionInfo> extensionList = new ArrayList<>();
    try {
      var queryParams = new ListExtensionsParameters();
      queryParams.type = new String[] { "User" };
      queryParams.status = new String[] { "Enabled" };
      var resp = restClient.restapi().account().extension().list(queryParams);
      for (var record : resp.records) {
        CallMonitoringExtensionInfo ext = new CallMonitoringExtensionInfo();
        ext.id = record.id.toString();
        if (record.permissions.admin.enabled == true)
        {
          ext.permissions = new String[] { "Monitoring" };
        }
        else
        {
          ext.permissions = new String[] { "Monitored" };
        }

        extensionList.add (ext);
      }
    } catch (RestException ex) {
      System.out.println("Unable to read account extensions. " + ex.getMessage());
    }
    CallMonitoringExtensionInfo members[]= extensionList.toArray(new CallMonitoringExtensionInfo[extensionList.size()]);
    return members;
  }
  /*
  * Delete call monitoring group
  */
  public void delete_call_monitoring_group(String groupId) throws RestException, IOException {
    try {
      restClient.restapi().account().callMonitoringGroups(groupId).delete();
      System.out.println("Call monitoring group deleted.");
    } catch (RestException ex) {
      System.out.println("Unable to delete this call monitoring group. " + ex.getMessage());
    }
  }
}
