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
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("RC_USER_JWT");

        obj.read_enrollments();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    // Read speakers identification
    private void read_enrollments() throws RestException, IOException {
      try {
        var queryParams = new CaiEnrollmentsListParameters()
	            .partial(true)
              .perPage(100l)
              .page(1l);

        var resp = restClient.ai().audio().v1().enrollments().list(queryParams);
        @SuppressWarnings("serial")
        var jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println (jsonStr );
        for (var record : resp.records) {
          if (record.speakerId.equals("123456789")) {
            delete_enrollment(record.speakerId);
          }
        }
      } catch (RestException ex) {
        System.out.println("Unable to read speakers identification. " + ex.getMessage());
      }
    }
    // Delete a speaker identification
    private void delete_enrollment(String speakerId) throws RestException, IOException {
      try {
        var resp = restClient.ai().audio().v1().enrollments(speakerId).delete();
        System.out.println("Deleted");
      } catch (RestException ex) {
        System.out.println("Unable to delete a speaker identification. " + ex.getMessage());
      }
    }
}
