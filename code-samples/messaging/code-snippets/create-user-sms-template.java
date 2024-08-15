package User_SMS_Templates;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class User_SMS_Templates {
  static RestClient restClient;

  public static void main(String[] args) {
    // Instantiate the SDK
    restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");
    var obj = new User_SMS_Templates();
    try {
      // Authenticate a user using a personal JWT token
      restClient.authorize( "RC_USER_JWT" );
      obj.create_user_sms_template();
    } catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  /*
  Create a personal reusable SMS template
  */
  private void create_user_sms_template()  throws RestException, IOException {
    try {
      var bodyParams = new MessageTemplateRequest();
      bodyParams.displayName = "Weekly meeting reminder";
      bodyParams.body = new TemplateInfo();
      bodyParams.body.text = "Please update your slides before the meeting.";
      var resp = restClient.restapi().account().extension().messageStoreTemplates().post(bodyParams);
      String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
      System.out.println(jsonStr);
    }catch(RestException e) {
      System.out.println(e.getMessage());
    }
  }

  /*
  * List personal reusable SMS templates
  */
  private void list_user_sms_templates()  throws RestException, IOException {
    try {
      var queryParams = new ListUserMessageTemplatesParameters();
      queryParams.scope = "Personal";
      var resp = restClient.restapi().account().extension().messageStoreTemplates().list(queryParams);
      for (var record : resp.records) {
        String jsonStr = new Gson().toJson(record, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }
    }catch(RestException e) {
      System.out.println(e.getMessage());
    }
  }
}
