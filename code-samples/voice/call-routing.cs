using System;
using System.Threading.Tasks;
using RingCentral;
using Newtonsoft.Json;

namespace Get_User_Call_Answering_Rules
{
class Program
{
  const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
  const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
  const string RINGCENTRAL_PRODUCTION = false;

  const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
  const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
  const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

  static RestClient restClient;

  static void Main(string[] args)
  {
    restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
    restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
    get_user_call_answering_rules().Wait();
  }

  static private async Task get_user_call_answering_rules()
  {
    var parameters = new ListAnsweringRulesParameters();
    parameters.view = "Detailed";
    parameters.enabledOnly = "false";

    var resp = await restClient.Restapi().Account().Extension().AnsweringRule().List(parameters);
    foreach (var record in resp.records)
    {
      var rule = await restClient.Restapi().Account().Extension().AnsweringRule(record.id).Get();
      Console.WriteLine(JsonConvert.SerializeObject(rule));
    }
  }
}
}
