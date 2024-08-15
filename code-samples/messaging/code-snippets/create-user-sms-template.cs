using System;
using System.Threading.Tasks;
using RingCentral;

namespace User_SMS_Templates
{
  class Program
  {
    static RestClient restClient;

    static async Task Main(string[] args)
    {
      try
      {
        // Instantiate the SDK
        restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");
        await create_user_sms_template();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    /*
    Create a personal reusable SMS template
    */
    static private async Task create_user_sms_template()
    {
      try
      {
        var bodyParams = new MessageTemplateRequest();
        bodyParams.displayName = "Weekly meeting reminder";
        bodyParams.body = new TemplateInfo() { text = "Please update your slides before the meeting." };
        var resp = await restClient.Restapi().Account().Extension().MessageStoreTemplates().Post(bodyParams);
        Console.WriteLine(JsonConvert.SerializeObject(resp));
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to create a user SMS template. " + ex.Message);
      }
    }
    /*
    List personal reusable SMS templates
    */
    static private async Task list_user_sms_template()
    {
      try
      {
        var queryParams = new ListUserMessageTemplatesParameters();
        queryParams.scope = "Personal";
        var resp = await restClient.Restapi().Account().Extension().MessageStoreTemplates().List(queryParams);
        foreach (var record in resp.records)
        {
          Console.WriteLine(JsonConvert.SerializeObject(record));
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to list user SMS templates. " + ex.Message);
      }
    }
  }
}
