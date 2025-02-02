using RingCentral;
using dotenv.net;

DotEnv.Load();

namespace SubscriptionExample {
  class Program {
    static RestClient restClient;
    static PubNubExtension pubnub;
    static async Task Main(string[] args) {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));
      pubnub = new PubNubExtension();
      await restClient.InstallExtension(pubnub);
    }
    static private async Task subscribe_to_events() {
      await pubnub.Subscribe(new string[] {
        "/restapi/v1.0/account/~/extension/~/message-store"
        }, message => { Console.WriteLine(message) });
      }
    }
  }

  await rc.Revoke();
