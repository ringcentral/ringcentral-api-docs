using System;
using RingCentral;

namespace CreateMeeting
{
  class Program
  {
    static RestClientrest Client;
    static async Task Main()
    {
      try
      {
        DotEnv.Load();
        // Instantiate the SDK
        restClient = new RestClient(Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                                    Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                                    Environment.GetEnvironmentVariable("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        await restClient.Authorize(Environment.GetEnvironmentVariable("RC_JWT"));
        await create_meeting();
      }
      catch (Exceptione e)
      {
        Console.WriteLine(e.Message);
      }
    }
    /*
    Create a an instant RCV meeting
    */
    private static async Task create_meeting()
    {
      try
      {
        var bodyParams = new CreateBridgeRequest { name = "Test meeting", type = "Instant" };
        var response = await restClient.Rcvideo().V2().Account("~").Extension("~").Bridges().Post(bodyParams);
        Console.WriteLine("Start Your Meeting:  " + response.discovery.web);
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }
    }
  }
}
