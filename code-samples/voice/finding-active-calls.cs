using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_User_ActiveCalls
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));
      await read_user_active_calls();
    }
    static private async Task read_user_active_calls()
    {
      var parameters = new ListExtensionActiveCallsParameters();
      parameters.view = "Simple";
      var resp = await restClient.Restapi().Account().Extension().ActiveCalls().Get(parameters);
      foreach (CallLogRecord record in resp.records)
      {
        Console.WriteLine("Call result: " + record.result);
      }
    }
  }
}
