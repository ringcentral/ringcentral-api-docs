import com.messente.ApiClient;
import com.messente.ApiException;
import com.messente.api.*;
import com.messente.auth.HttpBasicAuth;

public class GetSyncDlr {
    public static void main(String[] args) {
        ApiClient apiClient = new ApiClient();
        DeliveryReportApi apiInstance = new DeliveryReportApi(apiClient);

        HttpBasicAuth basicAuth = (HttpBasicAuth) apiClient.getAuthentication("basicAuth");
        basicAuth.setUsername("YOUR_MESSENTE_API_USERNAME");
        basicAuth.setPassword("YOUR_MESSENTE_API_PASSWORD");

        try {
            Object result = apiInstance.retrieveDeliveryReport("<omnimessage_id>");
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when retrieving delivery report");
            System.err.println(e.getResponseBody());
        }
    }
}
