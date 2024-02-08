package ListTeams;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class ListTeams {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new ListTeams();
      try {
        // Instantiate the SDK
        restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("SANDBOX-JWT");
        obj.list_teams();
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
  	* List teams under an account. Read 10 teams at a time.
  	*/
  	public void list_teams(String pageToken) throws RestException, IOException {
  		try {
  			var queryParams = new ListGlipTeamsNewParameters()
  					.recordCount(10l)
  					.pageToken(pageToken);

  			var resp = restClient.teamMessaging().v1().teams().list(queryParams);
  			// List teams API returns a list of teams in the ascending order based on team creation date and time.
  			// I.e. from older team to newer team
  			for (var record : resp.records) {
  				System.out.println("Team \"" + record.name + " was created on " + record.creationTime);
  			}
  			// To read the next page, check and use the previous page token in the navigation object.
  			if (resp.navigation.prevPageToken != null) {
  				try {
  					Thread.sleep(1200);
  					System.out.println("Read newer teams ...");
  					list_teams(resp.navigation.prevPageToken);
  				} catch (InterruptedException e) {
  					e.printStackTrace();
  				}
  			}
  		}catch (RestException e){
  			System.out.println(e.getMessage());
  		}
  	}
}
