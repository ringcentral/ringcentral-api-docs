using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace Create_Team
{
class Program
{
    const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    const bool RINGCENTRAL_PRODUCTION = false;

    const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

    static RestClient restClient;

    static void Main(string[] args)
    {
        restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
        restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
        create_team().Wait();
    }
    static private async Task create_team()
    {
        var parameters = new GlipPostTeamBody();
        parameters.@public = true;
        parameters.name = "Fun team";
        parameters.description = "Let chit chat here";

        var member1 = new CreateGlipMember();
        member1.email = "member.1@gmail.com";
        var member2 = new CreateGlipMember();
        member2.email = "member.2@gmail.com";
        parameters.members = new CreateGlipMember[] { member1, member2 };

        var response = await restClient.Restapi().Glip().Teams().Post(parameters);
        var jsonStr = JsonConvert.SerializeObject(response);
        Console.WriteLine(jsonStr);
    }
}
}
