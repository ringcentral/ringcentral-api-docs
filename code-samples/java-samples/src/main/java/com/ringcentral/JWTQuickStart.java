import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class JWTQuickStart {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new JWTQuickStart();
        rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
                             System.getenv("RC_APP_CLIENT_SECRET"),
                             System.getenv("RC_SERVER_URL") );
        try {
	    rc.authorize(System.getenv("RC_USER_JWT"));
            obj.call_ringout();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
        System.out.println("Successfully authed.");
    }
}
