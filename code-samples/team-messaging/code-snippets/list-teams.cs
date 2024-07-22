using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace ListTeam {
  class Program {
    static RestClient restClient;

    static async Task Main(string[] args){
      // Instantiate the SDK
      restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");
      // Authenticate a user using a personal JWT token
      await restClient.Authorize("RC_USER_JWT");

      await list_teams("");
    }
    /*
    * List teams under an account. Read 10 teams at a time.
    */
    static private async Task list_teams(String pageToken)
    {
      try
      {
        var queryParams = new ListGlipTeamsNewParameters()
                              {
                                recordCount = 10,
                                pageToken = pageToken
                              };

        var resp = await restClient.TeamMessaging().V1().Teams().List(queryParams);
        // List teams API returns a list of teams in the ascending order based on team creation date and time.
        // I.e. from older team to newer team
        foreach (var record in resp.records)
        {
          Console.WriteLine("Team \"" + record.name + " was created on " + record.creationTime);
        }
        // To read the next page, check and use the previous page token in the navigation object.
        if (resp.navigation.prevPageToken != null)
        {
          // Make sure not to exceed the API rate limit of 40 API calls per minute
          Thread.Sleep(1200);
          Console.WriteLine("Read newer teams ...");
          await list_teams(resp.navigation.prevPageToken);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to read teams. " + ex.Message);
      }
    }
  }
}
