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
        CreateBridgeRequest createBridgeRequest = new CreateBridgeRequest()
	    .name("Test Meeting")
	    .preferences(new BridgePreferences()
			 .joinBeforeHost(true)
			 .join(new BridgeJoinPreferences().audioMuted(false).videoMuted(true)));
        var res = restClient.rcvideo().v2().account("~").extension("~").bridges().post(createBridgeRequest);
        System.out.println("Start Your Meeting: " + res.discovery.web);
    }
    
}
