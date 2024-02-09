package CreateMeeting;
import com.ringcentral.*;
import java.io.IOException;

public class CreateMeeting {
    static RestClient restClient;

    public static void main(String[] args) {
        try {
            // Instantiate the SDK
            restClient = new RestClient(System.getenv("RC_CLIENT_ID"),
                                        System.getenv("RC_CLIENT_SECRET"),
                                        System.getenv("RC_SERVER_URL"));
            
            // Authenticate a user using a personal JWT token
            restClient.authorize(System.getenv("RC_JWT"));
        } catch (RestException restException) {
            System.out.println(restException.getMessage());
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
    }
    
    public void createMeeting() throws IOException, RestException {
        CreateMeetingRequest createMeetingRequest = new CreateMeetingRequest()
            .name("Test Meeting")
            .allowJoinBeforeHost(true)
            .muteAudio(false)
            .muteVideo(true);
        CreateMeetingResponse createMeetingResponse =
            restClient.post("/rcvideo/v2/account//extension//bridges",createMeetingRequest);
        String meetingUrl = createMeetingResponse.getDiscovery().getWeb();
        System.out.println("Start Your Meeting: " + meetingUrl);
    }
    
}
