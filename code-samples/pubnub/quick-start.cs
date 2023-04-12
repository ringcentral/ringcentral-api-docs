using System;
using System.Threading.Tasks;
using RingCentral;

namespace PubNub_Notifications
{
class Program
{
    static RestClient restClient;
    static void Main(string[] args)
    {
	restClient = new RestClient(
	    Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
	    Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
	    Environment.GetEnvironmentVariable("RC_SERVER_URL"));
	restClient.Authorize(
	    Environment.GetEnvironmentVariable("RC_JWT")).Wait();
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
