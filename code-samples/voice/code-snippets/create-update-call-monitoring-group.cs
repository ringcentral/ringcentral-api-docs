using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace CreateAndManageCallMonitoringGroup {
  class Program {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("SANDBOX-JWT");

        await create_call_monitoring_group("Demo Group - C#");
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Create a call monitoring group
    */
    static private async Task create_call_monitoring_group(String groupName)
    {
      try
      {
        var bodyParams = new CreateCallMonitoringGroupRequest();
        bodyParams.name = groupName;
        var resp = await restClient.Restapi().Account().CallMonitoringGroups().Post(bodyParams);
        Console.WriteLine($"Call monitoring group created. Group id/name: {resp.id} / {resp.name}");
        await add_call_monitoring_group_members(resp.id);
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to list call monitoring groups. {ex.Message}");
      }
    }
    /*
    * Add members to a call monitoring group
    */
    static private async Task add_call_monitoring_group_members(String groupId)
    {
      try
      {
        var newMembersList = await read_account_extensions();
        var bodyParams = new CallMonitoringBulkAssign();
        bodyParams.addedExtensions = newMembersList;
        var resp = await restClient.Restapi().Account().CallMonitoringGroups(groupId).BulkAssign().Post(bodyParams);
        Console.WriteLine("Members added.");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to add mumbers to this call monitoring group. {ex.Message}");
      }
    }
    /*
    * Read the account user extensions and create a list of supervisors and agents based on their role.
    */
    static private async Task<CallMonitoringExtensionInfo[]> read_account_extensions()
    {
      List<CallMonitoringExtensionInfo> extensionList = new List<CallMonitoringExtensionInfo>();
      var queryParams = new ListExtensionsParameters();
      queryParams.type = new String[] { "User" };
      queryParams.status = new String[] { "Enabled" };
      try
      {
        var resp = await restClient.Restapi().Account().Extension().List(queryParams);
        foreach (var record in resp.records)
        {
          CallMonitoringExtensionInfo ext = new CallMonitoringExtensionInfo();
          ext.id = record.id.ToString();
          if (record.permissions.admin.enabled == true)
          {
            ext.permissions = new String[] { "Monitoring" };
          }
          else
          {
            ext.permissions = new String[] { "Monitored" };
          }
          extensionList.Add (ext);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to read account extensions. {ex.Message}");
      }
      return extensionList.ToArray();
    }
    /*
    * Delete call monitoring group
    */
    static private async Task delete_call_monitoring_group(String groupId)
    {
      try
      {
        var resp = await restClient.Restapi().Account().CallMonitoringGroups(groupId).Delete();
        Console.WriteLine("Call monitoring group deleted.");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to delete this call monitoring group. {ex.Message}");
      }
    }
  }
}
