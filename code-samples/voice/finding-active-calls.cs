using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_User_ActiveCalls
{
class Program
{
  static void Main(string[] args)
  {
    read_user_active_calls().Wait();
  }
  static private async Task read_user_active_calls()
  {
    RestClient rc = new RestClient("client_id", "client_secret", false);
    await rc.Authorize("username", "extension_number", "password");
    var parameters = new ListExtensionActiveCallsParameters();
    parameters.view = "Simple";
    var resp = await rc.Restapi().Account().Extension().ActiveCalls().Get(parameters);
    foreach (CallLogRecord record in resp.records)
    {
      Console.WriteLine("Call result: " + record.result);
    }
  }
}
}
