using System;
using System.Threading.Tasks;
using RingCentral;

namespace CreateMeeting
{

class Program {
    static RestClient restClient;
    
    static async Task Main(string[] args) {
        try {
            DotEnv.Load();
            // Instantiate the SDK
            restClient = new RestClient( Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                                         Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                                         Environment.GetEnvironmentVariable("RC_SERVER_URL") );
            // Authenticate a user using a personal JWT token
            await restClient.Authorize(Environment.GetEnvironmentVariable("RC_JWT"));
            await createMeeting();
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
        
    }

    /*
      Create a new meeting with specific parameters
    */
    private async Task createMeeting() {
        try {
            var requestBody = new {
                name = "Test Meeting",
                allowJoinBeforeHost = true,
                muteAudio = false,
                muteVideo = true
            };
            var response = await restClient.Restapi().Account().Extension().Bridges().Post(requestBody);
            var jsonResponse = response.Json();
            Console.WriteLine($"Start Your Meeting: {jsonResponse["discovery"]["web"]}");
        } catch (Exception e) {
            Console.WriteLine(e.Message);
        }
    }

}

}
