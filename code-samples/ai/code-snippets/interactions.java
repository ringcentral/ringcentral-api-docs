package AnalyzeInteraction;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class AnalyzeInteraction {
    String NGROK = "http://4bb8-69-181-201-33.ngrok-free.app";
    String WEBHOOK_URL = NGROK + "/webhook";
    String CONTENT_URI = "https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3";

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
                  .contentUri(CONTENT_URI1)
                  .encoding("Mpeg")
                  .languageCode("en-US")
                  .source("RingCentral")
                  .audioType("CallCenter")
                  .insights(new String[] {"All"})
                  .enableVoiceActivityDetection(true)
                  .separateSpeakerPerChannel(false);

    		var queryParams = new CaiAnalyzeInteractionParameters().webhook(WEBHOOK_URL);

    		var resp = restClient.ai().insights().v1().async().analyzeInteraction().post(bodyParams, queryParams);
    		@SuppressWarnings("serial")
    		String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
    		System.out.println(jsonStr);
    	} catch (Exception ex) {
    		System.out.println("Unable to analyze interaction. " + ex.getMessage());
    	}
    }
}
