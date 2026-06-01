import com.messente.ApiClient;
import com.messente.ApiException;
import com.messente.api.*;
import com.messente.auth.HttpBasicAuth;

public class CancelMessage {
    public static void main(String[] args) {
        ApiClient apiClient = new ApiClient();
        OmnimessageApi apiInstance = new OmnimessageApi(apiClient);

        HttpBasicAuth basicAuth = (HttpBasicAuth) apiClient.getAuthentication("basicAuth");
        basicAuth.setUsername("YOUR_MESSENTE_API_USERNAME");
        basicAuth.setPassword("YOUR_MESSENTE_API_PASSWORD");

        try {
            apiInstance.cancelScheduledMessage("<omnimessage_id>");
            System.out.println("Scheduled omnimessage cancelled");
        } catch (ApiException e) {
            System.err.println("Exception when cancelling an omnimessage");
            System.err.println(e.getResponseBody());
        }
    }
}
