package Create_Meeting;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;


public class Create_Meeting {
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";
    static RestClient restClient;

    public static void main(String[] args) {
        var obj = new Create_Meeting();
        try {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
          restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
          obj.createMeeting();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }

    public void createMeeting() throws RestException, IOException{
        MeetingRequestResource parameters = new MeetingRequestResource();
        parameters.topic = "Instant Meeting";
        parameters.meetingType = "Instant";
        parameters.allowJoinBeforeHost = true;
        parameters.startHostVideo = true;
        parameters.startParticipantsVideo = false;

        var response = restClient.restapi().account().extension().meeting().post(parameters);
        System.out.println("Start Your Meeting: " + response.links.startUri);
        System.out.println("Join the Meeting: " + response.links.joinUri);
    }
}
