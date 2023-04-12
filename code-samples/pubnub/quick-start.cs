using System;
using System.Threading.Tasks;
using RingCentral;
using dotenv.net;

DotEnv.Load();

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
	    var pubNubExtension = new PubNubExtension();
	    await rc.InstallExtension(pubNubExtension);
            var eventFilters = new[]
            {
                "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
            };
	    var subscription = await pubNubExtension.Subscribe(eventFilters, message =>
	    {
		Console.WriteLine("I got a notification:");
		Console.WriteLine(message);
	    });
	    // Wait for 60 seconds before the app exits
	    // In the mean time, send SMS to trigger a notification for testing purpose
	    await Task.Delay(60000);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
    }
}
}
