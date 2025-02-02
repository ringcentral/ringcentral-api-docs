package SpeechToTextQuickStart;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SpeechToTextQuickStart {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new SpeechToTextQuickStart();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_APP_CLIENT_ID"), System.getenv("RC_APP_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_USER_JWT"));

        obj.speech_to_text();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Convert speech to text
    */
    private void speech_to_text()
    {
      try {
        var bodyParams = new AsrInput()
                 .contentUri(System.getenv("CONTENT_URI"))
                 .encoding("Mpeg")
                 .languageCode("en-US")
                 .source("RingCentral")
                 .audioType("CallCenter")
                 .enablePunctuation(true)
                 .enableSpeakerDiarization(true);

        var callbackAddress = System.getenv("NGROK_URL") + "/webhook";
        var queryParams = new CaiSpeechToTextParameters().webhook(callbackAddress);

        var resp = restClient.ai().audio().v1().async().speechToText().post(bodyParams, queryParams);
        System.out.println("Job ID: " + resp.jobId);
        System.out.println("Ready to receive response at: " + callbackAddress);
      } catch (Exception ex) {
        System.out.println("Unable to convert speech to text. " + ex.getMessage());
      }
    }
}
