import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_Presence {
    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Read_Presence();
        try {
            restClient = new RestClient("client_id", "client_secret", "server_url");
            restClient.authorize("username", "extension_number", "password");
            obj.read_users_presence();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }
    
    public static void read_users_presence() throws RestException, IOException{
        var parameters = new ReadAccountPresenceParameters();
        parameters.detailedTelephonyState = true;
        
        var response = rc.restapi().account().presence().get(parameters);
        for (var record : response.records)
            System.out.println(record.userStatus);
    }
}
