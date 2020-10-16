using System;
using System.Threading.Tasks;
using RingCentral;

namespace setup_webhook
{
class Program
{
    const string RINGCENTRAL_CLIENT_ID = "<RINGCENTRAL_CLIENT_ID>";
    const string RINGCENTRAL_CLIENT_SECRET = "<RINGCENTRAL_CLIENT_SECRET>";
    const bool RINGCENTRAL_PRODUCTION = false;

    const string RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";
    const string RINGCENTRAL_USERNAME = "<RINGCENTRAL_USERNAME>";
    const string RINGCENTRAL_EXTENSION = "<OPTIONAL>";
    const string RINGCENTRAL_PASSWORD = "<RINGCENTRAL_PASSWORD>";

    const string DELIVERY_ADDRESS = "<https://xxxxxxxx.ngrok.io/webhook>";

    static async Task Main(string[] args)
    {
        var rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_PRODUCTION);
        await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
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
