package SpeakersDiarization;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SpeakersDiarization {
    String NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    String WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    String CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new SpeakersDiarization();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        obj.speakers_detection();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Detect speakers from a conversation
    */
    static private void speakers_detection() throws RestException, IOException {
      try {
        var bodyParams = new DiarizeInput()
        .contentUri(CONTENT_URI)
        .encoding("Mpeg")
        .languageCode("en-US")
        .source("RingCentral")
        .audioType("CallCenter");

        var callbackAddress = System.getenv("WEBHOOK_URL") + "/webhook";
        var queryParams = new CaiSpeakerDiarizeParameters().webhook(callbackAddress);
        var resp = restClient.ai().audio().v1().async().speakerDiarize().post(bodyParams, queryParams);
        System.out.println("Job ID: " + resp.jobId);
        System.out.println("Ready to receive response at: " + callbackAddress);
      }catch (RestException ex) {
        System.out.println("Unable to call speaker diarization API. " + ex.getMessage());
      }
    }
}
