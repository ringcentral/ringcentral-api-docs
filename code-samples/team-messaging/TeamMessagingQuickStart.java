package Create_Team;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class TeamMessagingQuickStart {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new TeamMessagingQuickStart();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USERNAME"),
			  System.getenv("RC_EXTENSION"),
			  System.getenv("RC_PASSWORD") );
	    obj.createTeam();
        } catch (RestException | IOException e) {
	    e.printStackTrace();
        }
    }

    public void createTeam() throws RestException, IOException{
        var member1 = new CreateGlipMember();
        member1.email = "member.1@gmail.com";
        var member2 = new CreateGlipMember();
        member2.email = "member.2@gmail.com";

        var parameters         = new GlipPostTeamBody();
        parameters._public     = true;
        parameters.name        = "Fun team";
        parameters.description = "Let's chit chat here";
        parameters.members     = new CreateGlipMember[] { member1, member2 };

        GlipTeamInfo response = rc.restapi().glip().teams().post(parameters);
        System.out.println("Team created: " + response.id);
    }
}
