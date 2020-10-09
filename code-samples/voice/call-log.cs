using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_CallLog
{
class Program
{
	static void Main(string[] args)
	{
		read_user_calllog().Wait();
	}
	static private async Task read_user_calllog()
	{
		RestClient rc = new RestClient("client_id", "client_secret", false);
		await rc.Authorize("username", "extension_number", "password");
		var parameters = new ReadUserCallLogParameters();
		parameters.view = "Detailed";

		var resp = await rc.Restapi().Account().Extension().CallLog().List(parameters);
		foreach (CallLogRecord record in resp.records)
		{
			Console.WriteLine("Call type: " + record.type);
		}
	}
}
}
