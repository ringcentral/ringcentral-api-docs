using System;
using System.Threading.Tasks;
using RingCentral;

namespace Call_Ringout
{
  class Program
  {
    const string RECIPIENT = "<ENTER PHONE NUMBER>";

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
        call_ringout().Wait();
    }

    static private async Task call_ringout()
    {
      var parameters = new MakeRingOutRequest();
      parameters.from = new MakeRingOutCallerInfoRequestFrom { phoneNumber = RINGCENTRAL_USERNAME };
      parameters.to = new MakeRingOutCallerInfoRequestTo {  phoneNumber = RECIPIENT } ;
      parameters.playPrompt = false;

      var resp = await restClient.Restapi().Account().Extension().RingOut().Post(parameters);
      Console.WriteLine("Call Placed. Call status" + resp.status.callStatus);
    }
  }
}
