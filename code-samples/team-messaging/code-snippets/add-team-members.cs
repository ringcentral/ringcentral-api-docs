using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace AddTeamMembers {
  class Program {
    static RestClient restClient;

    static async Task Main(string[] args){
      // Instantiate the SDK
      restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");
      // Authenticate a user using a personal JWT token
      await restClient.Authorize("SANDBOX-JWT");

      await find_team("", "C# Team");
    }
    /*
    * Find the team id of the team to be added new members
    */
    static private async Task find_team(String pageToken, String teamName)
    {
      try
      {
        var queryParams = new ListGlipTeamsNewParameters()
        {
          recordCount = 10,
          pageToken = pageToken
        };

        var resp = await restClient.TeamMessaging().V1().Teams().List(queryParams);
        // Search through the team list to find the team
        Console.WriteLine("Find the team id of the " + teamName);
        foreach (var record in resp.records)
        {
          if (record.name == teamName)
          {
            Console.WriteLine("Add new members to team \"" + teamName + "\"");
            await add_new_members(record.id);
            return;
          }
        }
        // To read the next page, check and use the previous page token in the navigation object.
        if (resp.navigation.prevPageToken != null)
        {
          Thread.Sleep(1200);
          Console.WriteLine("Read newer teams ...");
          await find_team(resp.navigation.prevPageToken, teamName);
        }
        else
        {
          Console.WriteLine("Cannot find team " + teamName);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to read teams. " + ex.Message);
      }
    }
    /*
    * Add new members to a team identified by the team id
    */
    static private async Task add_new_members(String teamId)
    {
      try
      {
        var bodyParams = new TMAddTeamMembersRequest();

        // Add internal members using their extension id
        bodyParams.members = new TMAddTeamMembersRequestMembers[] {
          // replace the email addresses below with valid internal or external new member email address
          new TMAddTeamMembersRequestMembers { email = "member.name@abc.com" },
          new TMAddTeamMembersRequestMembers { email = "guest.name@xyz.com" },
        };

        var resp = await restClient.TeamMessaging().V1().Teams(teamId).Add().Post(bodyParams);
        Console.WriteLine("New member(s) added.");
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to create a new team. " + ex.Message);
      }
    }
  }
}
