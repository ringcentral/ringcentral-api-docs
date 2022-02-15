using System;
using System.Threading.Tasks;
using RingCentral;

namespace setup_webhook
{
    class Program
    {
        static RestClient restClient;
        const string DELIVERY_ADDRESS = "<https://xxxxxxxx.ngrok.io/webhook>";

        static async Task Main(string[] args)
        {
            restClient = new RestClient(
                Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            restClient.Authorize(
                Environment.GetEnvironmentVariable("RC_USERNAME"),
                Environment.GetEnvironmentVariable("RC_EXTENSION"),
                Environment.GetEnvironmentVariable("RC_PASSWORD")).Wait();
            await rc.Restapi().Subscription().Post(new CreateSubscriptionRequest
            {
                eventFilters = new[] {"/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"},
                deliveryMode = new NotificationDeliveryModeRequest
                {
                    transportType = "WebHook",
                    address = DELIVERY_ADDRESS
                }
            });
            Console.WriteLine("WebHook ready!");
        }
    }
}
