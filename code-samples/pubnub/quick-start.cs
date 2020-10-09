using System;
using System.Threading.Tasks;
using RingCentral;

namespace PubNub_Notifications
{
class Program
{
    const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

    const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

    static RestClient rcsdk = null;

    static void Main(string[] args)
    {
        rcsdk = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
        rcsdk.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
        pubnub_notification().Wait();
    }
    static private async Task pubnub_notification()
    {
        try
        {
            var eventFilters = new[]
            {
                "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
            };
            var subscription = new Subscription(rcsdk, eventFilters, message =>
                {
                    var jsonObj = JObject.Parse(message);
                    if (jsonObj["event"].ToString().Contains("instant?type=SMS"))
                    {
                        Console.WriteLine(jsonObj["body"]["subject"]);
                    }
                });
            var subscriptionInfo = await subscription.Subscribe();
            Console.WriteLine("Ready to receive incoming SMS via PubNub.");
            while (true)
            {
                Thread.Sleep(5000);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
    }
}
}
