package Call_RingOut;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;


public class Call_RingOut {
    static String RECIPIENT_NUMBER = "<ENTER PHONE NUMBER>";

    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Call_RingOut();
        try {
            restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
            restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            obj.call_ringout()();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }
    public void call_ringout() throws RestException, IOException {
        MakeRingOutRequest requestBody = new MakeRingOutRequest();
        requestBody.from(new MakeRingOutCallerInfoRequestFrom().phoneNumber(RINGCENTRAL_USERNAME));
        requestBody.to(new MakeRingOutCallerInfoRequestTo().phoneNumber(RECIPIENT_NUMBER));
        requestBody.playPrompt = false;

        var response = restClient.restapi().account().extension().ringout().post(requestBody);
        System.out.println("Call Placed. Call status: " + response.status.callStatus);
    }
}
