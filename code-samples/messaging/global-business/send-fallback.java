import com.messente.ApiClient;
import com.messente.ApiException;
import com.messente.api.*;
import com.messente.auth.HttpBasicAuth;

import java.util.Collections;

// repositories { mavenCentral() }
// dependencies { implementation 'com.messente.api:messente-api' }

public class Main {
    public static void main(String[] args) {
        ApiClient apiClient = new ApiClient();
        OmnimessageApi apiInstance = new OmnimessageApi(apiClient);

        HttpBasicAuth basicAuth = (HttpBasicAuth) apiClient.getAuthentication("basicAuth");
        basicAuth.setUsername("YOUR_MESSENTE_API_USERNAME");
        basicAuth.setPassword("YOUR_MESSENTE_API_PASSWORD");

        SMS sms = new SMS();
        sms.text("hello sms");
        sms.sender("<sender name (optional)>");
        OmnimessageMessagesInner smsOmnimessageInner = new OmnimessageMessagesInner(sms);
        smsOmnimessageInner.setActualInstance(sms);

        Omnimessage omnimessage = new Omnimessage();
        omnimessage.setMessages(Collections.singletonList(smsOmnimessageInner));
        omnimessage.setTo("<recipient_phone_number>");

        try {
            OmniMessageCreateSuccessResponse result = apiInstance.sendOmnimessage(omnimessage);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling sendOmnimessage");
            System.err.println(e.getResponseBody());
        }
    }
}
