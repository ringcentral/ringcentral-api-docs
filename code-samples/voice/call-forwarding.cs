using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_ForwardingNumber
{
class Program
{
    static void Main(string[] args)
    {
        create_forwarding_number().Wait();
    }
    static private async Task create_forwarding_number()
    {
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        await rc.Authorize("username", "extension_number", "password");

        var parameters = new CreateForwardingNumberRequest();
        parameters.phoneNumber = "11235557890";
        parameters.type = "Other";
        parameters.label = "My ATT number";

        var response = await rc.Restapi().Account().Extension().ForwardingNumber().Post(parameters);

        Console.WriteLine("Forwarding number created.");
        Console.WriteLine(response.id);
    }
}
}
