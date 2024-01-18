package AnalyzeInteraction;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class AnalyzeInteraction {
    static String NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static String WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    static String CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new AnalyzeInteraction();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        obj.analyze_interaction();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Transcribe a call recording and analyze interaction
    */
    private void analyze_interaction()
    {
      try {
    		var bodyParams = new InteractionInput()
                  .contentUri(CONTENT_URI)
                  .encoding("Mpeg")
                  .languageCode("en-US")
                  .source("RingCentral")
                  .audioType("CallCenter")
                  .insights(new String[] {"All"})
                  .enableVoiceActivityDetection(true)
                  .separateSpeakerPerChannel(true);

    		var queryParams = new CaiAnalyzeInteractionParameters().webhook(WEBHOOK_URL);
    		var resp = restClient.ai().insights().v1().async().analyzeInteraction().post(bodyParams, queryParams);
        System.out.println("Job ID: " + resp.jobId);
        System.out.println("Ready to receive response at: " + WEBHOOK_URL);
    	} catch (Exception ex) {
    		System.out.println("Unable to analyze interaction. " + ex.getMessage());
    	}
    }
}
