import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Create_ForwardingNumber {
    public static void main(String[] args) {
        try {
            create_forwarding_number();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }

    public static void create_forwarding_number() throws RestException, IOException {
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        var parameters = new CreateForwardingNumberRequest();
        parameters.phoneNumber = "11235557890";
        parameters.type = "Other";
        parameters.label = "My ATT number";

        var response =  rc.restapi().account().extension().forwardingnumber().post(parameters);

        System.out.println("Forwarding number created.");
        System.out.println(response.id);
    }
}
