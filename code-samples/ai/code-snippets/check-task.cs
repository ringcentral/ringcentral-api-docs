using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace ReadAsyncTask {
  class Program {
    static RestClient restClient;
    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");

        await check_task_status("JOBID");
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Check async task status
    */
    static private async Task check_task_status(String jobId)
    {
      try
      {
        var resp = await restClient.Ai().Status().V1().Jobs(jobId).Get();
        Console.WriteLine(JsonConvert.SerializeObject(resp));
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to read async task status. " + ex.Message);
      }
    }
  }
}
