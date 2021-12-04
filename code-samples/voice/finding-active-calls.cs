using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_User_ActiveCalls
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
		Environment.GetEnvironmentVariable("RC_USERNAME"),
		Environment.GetEnvironmentVariable("RC_EXTENSION"),
		Environment.GetEnvironmentVariable("RC_PASSWORD")).Wait();
	    read_user_active_calls().Wait();
	}
	static private async Task read_user_active_calls()
	{
	    var parameters = new ListExtensionActiveCallsParameters();
	    parameters.view = "Simple";
	    var resp = await restClient.Restapi().Account().Extension().ActiveCalls().Get(parameters);
	    foreach (CallLogRecord record in resp.records)
	    {
		Console.WriteLine("Call result: " + record.result);
	    }
	}
    }
}
