using System;
using System.Threading.Tasks;
using RingCentral;

namespace Call_Ringout
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
      await call_ringout();
    }

    static private async Task call_ringout()
    {
      var parameters = new MakeRingOutRequest();
      parameters.from = new MakeRingOutCallerInfoRequestFrom {
        phoneNumber = Environment.GetEnvironmentVariable("RINGOUT_CALLER")
      };
      parameters.to = new MakeRingOutCallerInfoRequestTo {
        phoneNumber = Environment.GetEnvironmentVariable("RINGOUT_RECIPIENT")
      };
      parameters.playPrompt = false;

      var resp = await restClient.Restapi().Account().Extension().RingOut().Post(parameters);
      Console.WriteLine("Call Placed. Call status" + resp.status.callStatus);
    }
  }
}
