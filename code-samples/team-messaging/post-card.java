package Create_Team;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Create_Team {
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Create_Team();
        try {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
          restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
          obj.create_team()();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }
    public void create_team() throws RestException, IOException{
        var parameters = new GlipPostTeamBody();
        parameters._public = true;
        parameters.name = "Fun team";
        parameters.description = "Let's chit chat here";

        var member1 = new CreateGlipMember();
        member1.email = "member.1@gmail.com";
        var member2 = new CreateGlipMember();
        member2.email = "member.2@gmail.com";
        parameters.members = new CreateGlipMember[] { member1, member2 };

        var response = restClient.restapi().glip().teams().post(parameters);
        Gson gson = new Gson();
        String jsonStr = gson.toJson(response);
        System.out.println(jsonStr);
    }
}
