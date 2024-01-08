using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace CallMonitoringGroup {
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

        await read_call_monitoring_groups();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Read all call monitoring groups
    */
    static private async Task read_call_monitoring_groups()
    {
      try
      {
        var resp = await restClient.Restapi().Account().CallMonitoringGroups().Get();
        foreach (var group in resp.records)
        {
          Console.WriteLine($"Call monitoring group name/id: {group.name}/{group.id}");
          await read_call_monitoring_group_members(group.id);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to list call monitoring groups. {ex.Message}");
      }
    }
    /*
    * Read a call monitoring group members
    */
    static private async Task read_call_monitoring_group_members(String groupId)
    {
      try
      {
        var resp = await restClient.Restapi().Account().CallMonitoringGroups(groupId).Members().Get();
        Console.WriteLine("Call monitoring group members:");
        foreach (var member in resp.records)
        {
          Console.WriteLine(JsonConvert.SerializeObject(member));
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to read members of this call monitoring group. {ex.Message}");
      }
    }
  }
}
