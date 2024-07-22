using RingCentral;
using dotenv.net;
using RingCentral.Net.WebSocket;

DotEnv.Load();

namespace SubscriptionExample {
  class Program {
    static RestClient restClient;
    static WebSocketExtension webSocket;
    static async Task Main(string[] args) {
      restClient = new RestClient(
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
        Environment.GetEnvironmentVariable("RC_SERVER_URL"));

      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));

      webSocket = new WebSocketExtension(new WebSocketOptions { debugMode = true });
      await restClient.InstallExtension(webSocket);
      await subscribe_to_events();
    }
    static private async Task subscribe_to_events() {
      await webSocket.Subscribe(new string[] {
        "/restapi/v1.0/account/~/extension/~/message-store"
        }, message => { Console.WriteLine(message) });
      }
    }
  }

  await rc.Revoke();
