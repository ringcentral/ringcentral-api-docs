package Send_SMS;
import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Send_SMS {
    static String RECIPIENT_NUMBER = "<ENTER PHONE NUMBER>";

    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Send_SMS();
        try {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
          restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
          obj.read_extension_phone_number()();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }
    public void read_extension_phone_number() throws RestException, IOException{
      var resp =  restClient.restapi().account().extension().phonenumber().get();
      OUTERMOST: for (var record : resp.records) {
    	  if (record.usageType.equalsIgnoreCase("DirectNumber"))
          {
            for(var feature : record.features)
            {
              if (feature.equalsIgnoreCase("SmsSender"))
              {
                send_sms(record.phoneNumber);
                break OUTERMOST;
              }
            }
          }
        }
    }

    public void send_sms(String phoneNumber) throws RestException, IOException {
        CreateSMSMessage postParameters = new CreateSMSMessage();
        postParameters.from = new MessageStoreCallerInfoRequest().phoneNumber(phoneNumber);
        postParameters.to = new MessageStoreCallerInfoRequest[]{new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT_NUMBER)};
        postParameters.text = "Hello World from Java";

        var response = restClient.restapi().account().extension().sms().post(postParameters);
        System.out.println("SMS sent. Message status: " + response.messageStatus);
    }
}
