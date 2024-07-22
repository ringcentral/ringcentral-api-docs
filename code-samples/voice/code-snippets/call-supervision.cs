using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace CallSupervision {
  class Program {
    static RestClient restClient;
    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");

        var supervisorDeviceId = "TEST-SUPERVISOR-DEVICEID";
        var agentExtensionId = "TEST-AGENT-EXTENSIONID";
        await read_agent_active_calls(agentExtensionId, supervisorDeviceId);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Read agent active calls
    */
    static private async Task read_agent_active_calls(String agentExtensionId, String supervisorDeviceId)
    {
      try
      {
        var resp = await restClient.Restapi().Account().Extension(agentExtensionId).ActiveCalls().Get();
        foreach (var record in resp.records)
        {
          if (record.result == "In Progress")
          {
            await submit_call_supervise_request(record.telephonySessionId, agentExtensionId, supervisorDeviceId);
            break;
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to read agent's active calls. {ex.Message}");
      }
    }
    /*
    * Supervise an active call session
    */
    static private async Task submit_call_supervise_request(String telephonySessionId, String agentExtensionId, String supervisorDeviceId)
    {
      try
      {
        var bodyParams = new SuperviseCallSessionRequest();
        bodyParams.mode = "Listen";
        bodyParams.supervisorDeviceId = supervisorDeviceId;
        bodyParams.agentExtensionId = agentExtensionId;
        var resp = await restClient.Restapi().Account().Telephony().Sessions(telephonySessionId).Supervise().Post(bodyParams);
        Console.WriteLine(JsonConvert.SerializeObject(resp));
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Unable to supervise this call. {ex.Message}");
      }
    }
  }
}
