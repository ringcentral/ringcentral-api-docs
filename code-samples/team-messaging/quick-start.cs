using System;
using System.Threading.Tasks;
using RingCentral;
using dotenv.net;

namespace Create_Team
{
    class Program
    {
        static RestClient restClient;
        static async Task Main(string[] args)
        {
          try
          {
            DotEnv.Load();
            // Instantiate the SDK
            restClient = new RestClient(
                Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                Environment.GetEnvironmentVariable("RC_SERVER_URL"));

            // Authenticate a user using a personal JWT token
            await restClient.Authorize( Environment.GetEnvironmentVariable("RC_JWT") );

            await create_team();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
        * Create a new public team in Team Messaging with 3 internal members including the team owner
        */
        static private async Task create_team()
        {
            try
            {
                var bodyParams = new TMCreateTeamRequest();
                bodyParams.@public = true;
                bodyParams.name = "C# Team";
                bodyParams.description = "Let's talk about C#";

                // Add internal members using their extension ids.
                // Get your user extension id by calling restClient.Restapi().Account().Extension().List() API!
                bodyParams.members = new TMCreateTeamRequestMembers[] {
                    new TMCreateTeamRequestMembers { id = "590490017" },
                    new TMCreateTeamRequestMembers { id = "595861017" },
                };
                // You can also add members using their email address, especially for guest members who are not under your account company.
                /*
                bodyParams.members = new TMCreateTeamRequestMembers[] {
                    new TMCreateTeamRequestMembers { email = "member.1@gmail.com" },
                    new TMCreateTeamRequestMembers { email = "member.2@gmail.com" },
                    new TMCreateTeamRequestMembers { id = "[extensionId]" },
                };
                */

                var resp = await restClient.TeamMessaging().V1().Teams().Post(bodyParams);
                var jsonStr = JsonConvert.SerializeObject(resp);
                Console.WriteLine(jsonStr);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
