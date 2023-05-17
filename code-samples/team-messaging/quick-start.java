package CreateTeam;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CreateTeam {
    static RestClient restClient;
    public static void main(String[] args) {
      var obj = new CreateTeam();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_CLIENT_ID"), System.getenv("RC_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_JWT"));

        obj.create_team();
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    /*
    Create a new public team in Team Messaging with 3 internal members including the team owner
    */
    public void create_team() throws RestException, IOException{
  		try {
  			var bodyParams = new TMCreateTeamRequest();
  		    bodyParams._public = true;
  		    bodyParams.name = "Java Team";
  		    bodyParams.description = "Let's talk about Java";

  		    // Add internal members using their extension id
  		    // Get your user extension id by calling restClient.restapi().account().extension().list() API!
  		    bodyParams.members = new TMCreateTeamRequestMembers[] {
  		        new TMCreateTeamRequestMembers().id("590490017"),
  		        new TMCreateTeamRequestMembers().id("595861017")
  		    };
  		    // You can also add members using their email address, especially for guest members who are not under your account company.
  		    /*
  		    bodyParams.members = new TMCreateTeamRequestMembers[] {
  		        new TMCreateTeamRequestMembers().email("member.1@gmail.com"),
  		        new TMCreateTeamRequestMembers().email("member.2@gmail.com"),
  		        new TMCreateTeamRequestMembers().id("extensionId"),
  		    };
  		    */

  		    var resp = restClient.teamMessaging().v1().teams().post(bodyParams);
  		    String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
              System.out.println(jsonStr);
  		} catch (RestException e) {
  			System.out.println(e.getMessage());
  		}

    }
}
