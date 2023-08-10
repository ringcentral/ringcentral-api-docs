package Read_MessageStore;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

public class Read_MessageStore {
    static RestClient restClient;

    public static void main(String[] args) {
      // Instantiate the SDK
      restClient = new RestClient( "SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com");
      var obj = new Read_MessageStore();
      try {
        // Authenticate a user using a personal JWT token
        restClient.authorize( "SANDBOX_JWT" );
        obj.read_extension_message_store();
      } catch (RestException | IOException e) {
        e.printStackTrace();
      }
    }
    /*
    Read the current authenticated user's message store.
    */
    public void read_extension_message_store() throws RestException, IOException{
      try {
        ListMessagesParameters queryParams = new ListMessagesParameters();
        queryParams.dateFrom = "2023-01-01T00:00:00.000Z";
        queryParams.dateTo = "2023-01-31T23:59:59.999Z";
        queryParams.messageType = new String[] { "SMS", "Fax" };
        queryParams.perPage = 1000L;

        var response = restClient.restapi().account().extension().messageStore().list(queryParams);
        for (var record : response.records) {
          String jsonStr = new Gson().toJson(record, new TypeToken<Object>(){}.getType());
          System.out.println(jsonStr);
        }
      } catch (RestException e) {
        System.out.println(e.getMessage());
      }
    }
}
