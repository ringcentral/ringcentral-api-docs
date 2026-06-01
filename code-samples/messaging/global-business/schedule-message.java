import com.messente.ApiClient;
import com.messente.ApiException;
import com.messente.api.*;
import com.messente.auth.HttpBasicAuth;

import java.util.Collections;

public class ScheduleMessage {
    public static void main(String[] args) {
        ApiClient apiClient = new ApiClient();
        OmnimessageApi apiInstance = new OmnimessageApi(apiClient);

        HttpBasicAuth basicAuth = (HttpBasicAuth) apiClient.getAuthentication("basicAuth");
        basicAuth.setUsername("YOUR_MESSENTE_API_USERNAME");
        basicAuth.setPassword("YOUR_MESSENTE_API_PASSWORD");

        SMS sms = new SMS();
        sms.text("hello sms");
        sms.sender("<sender name (optional)>");
        OmnimessageMessagesInner smsInner = new OmnimessageMessagesInner(sms);
        smsInner.setActualInstance(sms);

        Omnimessage omnimessage = new Omnimessage();
        omnimessage.setMessages(Collections.singletonList(smsInner));
        omnimessage.setTo("<recipient_phone_number>");
        omnimessage.setTimeToSend("2019-06-22T09:05:07+04:00");

        try {
            OmniMessageCreateSuccessResponse result = apiInstance.sendOmnimessage(omnimessage);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when scheduling an omnimessage");
            System.err.println(e.getResponseBody());
        }
    }
}
