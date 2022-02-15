using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_CallLog
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
		read_user_calllog().Wait();
	}
	static private async Task read_user_calllog()
	{
		var parameters = new ReadUserCallLogParameters();
		parameters.view = "Detailed";

		var resp = await restClient.Restapi().Account().Extension().CallLog().List(parameters);
		foreach (CallLogRecord record in resp.records)
		{
			Console.WriteLine("Call type: " + record.type);
		}
	}
}
}
