using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_ForwardingNumber
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));

      await create_forwarding_number();
    }
    static private async Task create_forwarding_number()
    {
      var parameters = new CreateForwardingNumberRequest();
      parameters.phoneNumber = "11235557890";
      parameters.type = "Other";
      parameters.label = "My ATT number";

      var response = await restClient.Restapi().Account().Extension().ForwardingNumber().Post(parameters);

      Console.WriteLine("Forwarding number created.");
      Console.WriteLine(response.id);
    }
  }
}
