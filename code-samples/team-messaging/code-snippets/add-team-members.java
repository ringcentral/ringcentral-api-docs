package AddTeamMembers;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class AddTeamMembers {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new AddTeamMembers();
      try {
        // Instantiate the SDK
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("RC_USER_JWT");
        obj.find_team("", "Java Team");
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Find the team id of the team to be added new members
    */
  	public void find_team(String pageToken, String teamName) throws RestException, IOException {
  		try {
  			var queryParams = new ListGlipTeamsNewParameters()
  					.recordCount(10l)
  					.pageToken(pageToken);

  			var resp = restClient.teamMessaging().v1().teams().list(queryParams);
  			// Search through the team list to find the team
  	    System.out.println("Find the team id of the " + teamName);
  			for (var record : resp.records) {
  				if (record.name.equals(teamName)){
  		            System.out.println("Add new members to team \"" + teamName + "\"");
  		            add_new_members(record.id);
  		            return;
  		        }
  			}
  			// To read the next page, check and use the previous page token in the navigation object.
  			if (resp.navigation.prevPageToken != null) {
  				try {
  					Thread.sleep(1200);
  					System.out.println("Read newer teams ...");
  					find_team(resp.navigation.prevPageToken, teamName);
  				} catch (InterruptedException e) {
  					e.printStackTrace();
  				}
  			}else {
  				System.out.println("Cannot find team " + teamName);
  			}
  		}catch (RestException e){
  			System.out.println(e.getMessage());
  		}
  	}
  	/*
    * Add new members to a team identified by the team id
    */
  	public void add_new_members(String teamId) throws RestException, IOException{
  		try {
  			var bodyParams = new TMAddTeamMembersRequest();
  	        // Add internal members using their extension id
  	    bodyParams.members = new TMAddTeamMembersRequestMembers[] {
  	          // replace the email addresses below with valid internal or external new member email address
  	          new TMAddTeamMembersRequestMembers().email("member.name@abc.com"),
  	          new TMAddTeamMembersRequestMembers().email("guest.name@xyz.com")
  	    };

  	    restClient.teamMessaging().v1().teams(teamId).add().post(bodyParams);
  	    System.out.println("New member(s) added.");
  		} catch (RestException e) {
  			System.out.println(e.getMessage());
  		}

  	}
}
