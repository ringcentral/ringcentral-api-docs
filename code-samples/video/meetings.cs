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
                restClient = new RestClient(Environment.GetEnvironmentVariable("RC_CLIENT_ID"), Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"), Environment.GetEnvironmentVariable("RC_SERVER_URL"));
                // Authenticate a user using a personal JWT token
                await restClient.Authorize(Environment.GetEnvironmentVariable("RC_JWT"));
                await createMeeting();
            }

            catch (Exceptione e)
            {
                Console.WriteLine(e.Message);
            }

        }
        /*
        Create a new meeting with specific parameters
        */
        private static async Task createMeeting()
        {
            try
            {
                var createBridgeRequest = new CreateBridgeRequest { name = "MyMeeting", type = "Scheduled", };
                BridgeResponse bridgeResponse = await restClient.Rcvideo().V2().Account("~").Extension("~").Bridges().Post(createBridgeRequest);
                Console.WriteLine("Meeting Created Id "bridgeResponse.id" Name "bridgeResponse.name" type " + bridgeResponse.type);
            }
            catch (Exceptione e)
            {
                Console.WriteLine(e.Message);
            }

        }
    }
}