import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class RingoutQuickStart {
    static String RINGOUT_CALLER    = System.getenv("RINGOUT_CALLER");
    static String RINGOUT_RECIPIENT = System.getenv("RINGOUT_RECIPIENT");
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new RingoutQuickStart();
        rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
                             System.getenv("RC_APP_CLIENT_SECRET"),
                             System.getenv("RC_SERVER_URL") );
        try {
	    rc.authorize(System.getenv("RC_USER_JWT"));
            obj.call_ringout();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }
    public void call_ringout() throws RestException, IOException {
        MakeRingOutRequest requestBody = new MakeRingOutRequest();
        requestBody.from(new MakeRingOutCallerInfoRequestFrom().phoneNumber(
              RINGOUT_CALLER ));
        requestBody.to(new MakeRingOutCallerInfoRequestTo().phoneNumber(
	      RINGOUT_RECIPIENT));
        requestBody.playPrompt = false;

        var response = rc.restapi().account().extension().ringOut().post(requestBody);
        System.out.println("Call Placed. Call status: " + response.status.callStatus);
    }
}
