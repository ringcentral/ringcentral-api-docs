using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_Presence
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
                Environment.GetEnvironmentVariable("RC_JWT")).Wait();
	    read_users_presence().Wait();
	}
	
	static private async Task read_users_presence()
	{
	    var parameters = new AccountPresenceParameters();
	    parameters.detailedTelephonyState = true;
	    
	    var resp = await rc.Restapi().Account().Presence().Get(parameters);
	    foreach (var record in resp.records)
	    {
		Console.WriteLine(record.userStatus);
	    }
	}
    }
}
