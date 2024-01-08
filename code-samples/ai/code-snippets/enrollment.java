package SpeakserIdentificationEnrollment;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class SpeakserIdentificationEnrollment {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new SpeakserIdentificationEnrollment();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        // set your valid audio content file name and path
        var contentFile = "VALID_AUDIO_CONTENT_FILE";
        obj.create_speaker_enrollment(contentFile);

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
    * Enroll speaker identification
    */
    private void create_speaker_enrollment(String contenFile)
    {
      try {
        // use own extension id as a unique enrollment id
        var enrollmentId = restClient.token.owner_id.toString();

        var content_bytes = Files.readAllBytes(Paths.get(contenFile));
        var based64_data =  Base64.getEncoder().encodeToString(content_bytes);

        // check if this speaker id exists
        var enrollmentObj = read_enrollment(enrollmentId);
        EnrollmentStatus resp = null;

        if (enrollmentObj != null) {
          // speaker id exists => update it
          System.out.println("Existing enrollment");
          String jsonStr = new Gson().toJson(enrollmentObj, new TypeToken<Object>(){}.getType());
          System.out.println(jsonStr);
          var bodyParams = new EnrollmentPatchInput()
                .content(based64_data)
                .encoding( "Mpeg")
                .languageCode( "en-US");
          resp =  restClient.ai().audio().v1().enrollments(enrollmentId).patch(bodyParams);
        } else {
          // speaker id does not exist => enroll a new one
          var bodyParams = new EnrollmentInput()
                .content(based64_data)
                .encoding("Mpeg")
                .languageCode("en-US")
                .enrollmentId(enrollmentId);
          resp = restClient.ai().audio().v1().enrollments().post(bodyParams);
        }

        System.out.println("New enrollment");
        @SuppressWarnings("serial")
        var jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println (jsonStr );
      } catch (RestException e) {
        System.out.println("Unable to enroll a speaker identification. " + e.getMessage());
      }
    }
    // Read a speaker identification
    private EnrollmentStatus read_enrollment(String enrollmentId) throws RestException, IOException {
      try {
        var resp = restClient.ai().audio().v1().enrollments(enrollmentId).get();
        return resp;
      } catch (RestException e){
      	System.out.println("Unable to read a speaker identification. " + e.getMessage());
        return null;
      }
    }
}
