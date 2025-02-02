using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace Create_Team
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args){
      {
        restClient = new RestClient(
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
        Environment.GetEnvironmentVariable("RC_SERVER_URL"));
        await restClient.Authorize(
        Environment.GetEnvironmentVariable("RC_USER_JWT"));
        await create_team().Wait();
      }
      static private async Task create_team()
      {
        var parameters = new GlipPostTeamBody();
        parameters.@public = true;
        parameters.name = "Fun team";
        parameters.description = "Let's chit chat here";

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
