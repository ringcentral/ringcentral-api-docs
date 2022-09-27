import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CreateMeeting {
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";
    static RestClient restClient;

  	public static void main(String[] args) {
        var obj = new CreateMeeting();
    	   try {
              restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
              restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
              obj.createMeeting();
           } 
           catch (RestException | IOException e) {
    	      e.printStackTrace();
           }
  	}

  	public void createMeeting() throws RestException, IOException{
        MeetingRequestResource parameters = new MeetingRequestResource();
        parameters.name = "Test Meeting";
        parameters.allowJoinBeforeHost = true;
        parameters.muteAudio = false;
        parameters.muteVideo = true;

        var response = restClient.restapi().account().extension().meeting().post(parameters);
        System.out.println("Start Your Meeting: " + response.joinUri);
    }
}
