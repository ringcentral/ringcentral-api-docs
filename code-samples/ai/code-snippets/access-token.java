package ConvertSpeechToText;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class ConvertSpeechToText {
    static String NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static String WEBHOOK_URL = NGROK_ADDRESS + "/webhook";

    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new ConvertSpeechToText();
      try {
        // Instantiate the SDK
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("RC_USER_JWT");

        String accessToken = restClient.token.access_token;
        String contentUri = "https://media.ringcentral.com/restapi/.../recording/1662272004/content?access_token=" + accessToken;
        // ...
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
}
