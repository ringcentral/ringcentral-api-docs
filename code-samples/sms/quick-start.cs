using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_SMS
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
      read_extension_phone_number().Wait();
    }
    static private async Task read_extension_phone_number()
    {
      if (rcsdk.token.access_token.Length > 0)
      {
        var resp = await rcsdk.Restapi().Account().Extension().PhoneNumber().Get();
        foreach (var record in resp.records)
        {
          if (record.usageType == "DirectNumber")
          {
            foreach(var feature in record.features)
            {
              if (feature == "SmsSender")
              {
                send_sms(record.phoneNumber).Wait();
                goto LoopEnd;
              }
            }
          }
        }
      }
      LoopEnd:
        Console.WriteLine("\nDone.");
    }

    static private async Task send_sms(string fromNumber)
    {
      var parameters = new CreateSMSMessage();
      parameters.from = new MessageStoreCallerInfoRequest { phoneNumber = fromNumber };
      parameters.to = new MessageStoreCallerInfoRequest[] { new MessageStoreCallerInfoRequest { phoneNumber = RECIPIENT } };
      parameters.text = "Hello World from C#";

      var resp = await restClient.Restapi().Account().Extension().Sms().Post(parameters);
      Console.WriteLine("SMS sent. Message status: " + resp.messageStatus);
    }
  }
}
