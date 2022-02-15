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
            restClient = new RestClient(
		Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
		Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
		Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            restClient.Authorize(
		Environment.GetEnvironmentVariable("RC_USERNAME"),
		Environment.GetEnvironmentVariable("RC_EXTENSION"),
		Environment.GetEnvironmentVariable("RC_PASSWORD")).Wait();
	    read_user_message_store().Wait();
	}
	static private async Task read_user_message_store()
	{
	    var parameters = new ListMessagesParameters();
	    parameters.messageType = string[] ("SMS");
	    var response = await restClient.Restapi().Account().Extension().MessageStore().List(parameters);
	    
	    var jsonStr = JsonConvert.SerializeObject(response);
	    Console.WriteLine(jsonStr);
	}
    }
}
