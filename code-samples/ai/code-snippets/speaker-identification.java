package SpeakersIdentification;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SpeakersIdentification {
    String NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    String WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    String CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new AnalyzeInteraction();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        obj.speakers_identification();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Identify speakers from a conversation
    */
    static private void speakers_identification() throws RestException, IOException {
        var enrolledSpeakerIds = read_enrolled_speakers();
        if (enrolledSpeakerIds.length > 0) {
            try
            {
                var bodyParams = new IdentifyInput()
                    .contentUri(CONTENT_URI)
                    .encoding("Wav")
                    .languageCode("en-US")
                    .source("RingCentral")
                    .audioType("CallCenter")
                    .enableVoiceActivityDetection(true)
                    .speakerIds(enrolledSpeakerIds);

                var queryParams = new CaiSpeakerIdentifyParameters().webhook(WEBHOOK_URL);
                var resp = restClient.ai().audio().v1().async().speakerIdentify().post(bodyParams, queryParams);
                System.out.println("Job ID: " + resp.jobId);
                System.out.println("Ready to receive response at: " + WEBHOOK_URL);
            }catch (RestException ex) {
            	System.out.println("Unable to call speaker identify API. " + ex.getMessage());
            }
        } else {
        	System.out.println("No enrolled speakers. Please enroll a few speaker ids and try again.");
        }
    }

    /*
    * Read the account enrolled speakers
    */
    static private String[] read_enrolled_speakers() throws RestException, IOException {
        ArrayList<String> speakerIdList = new ArrayList<>();
        try {
            var queryParams = new CaiEnrollmentsListParameters()
	            .partial(true)
                .perPage(100l)
                .page(1l);

            var resp = restClient.ai().audio().v1().enrollments().list(queryParams);
            for (var enrollment : resp.records) {
            	speakerIdList.add(enrollment.speakerId);
            }
        } catch (RestException ex) {
            System.out.println("Unable to find enrolled speakers. " + ex.getMessage());
        }
        String[] enrolledSpeakerIds = speakerIdList.toArray(new String[speakerIdList.size()]);
        return enrolledSpeakerIds;
    }
}
