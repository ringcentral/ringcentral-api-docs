using System;
using Newtonsoft.Json;
using System.Threading.Tasks;
using RingCentral;

namespace Read_MessageStore
{
class Program
{
	static void Main(string[] args)
	{
		read_user_message_store().Wait();
	}
	static private async Task read_user_message_store()
	{
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		await rc.Authorize("username", "extension_number", "password");

		var parameters = new ListMessagesParameters();
		parameters.messageType = string[] ("SMS");
		var response = await rc.Restapi().Account().Extension().MessageStore().List(parameters);

		var jsonStr = JsonConvert.SerializeObject(response);
		Console.WriteLine(jsonStr);
	}
}
}
