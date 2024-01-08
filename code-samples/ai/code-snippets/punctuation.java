package Punctuation;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Punctuation {
    static String NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static String WEBHOOK_URL = NGROK_ADDRESS + "/webhook";

    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new Punctuation();
      try {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("PRODUCTION-JWT");

        obj.punctuation();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    /*
    * Add punctuation to text paragraphs
    */
    static private void punctuation() throws RestException, IOException {
        try {
            var bodyParams = new PunctuateInput();
            bodyParams.texts = new String[] {
                "so its more fluid than it is and you know its not the best kind of feedback right",
                "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
                "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
            	};

            var queryParams = new CaiPunctuateParameters().webhook(WEBHOOK_URL);
            var resp = restClient.ai().text().v1().async().punctuate().post(bodyParams, queryParams);
            System.out.println("Job ID: " + resp.jobId);
            System.out.println("Ready to receive response at: " + WEBHOOK_URL);
        } catch (RestException ex) {
            System.out.println("Unable to call punctuate API. " + ex.getMessage());
        }
    }
}
