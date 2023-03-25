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
	    restClient = new RestClient("client_id", "client_secret", "server_url");
	    await restClient.Authorize("username", "extension_number", "password");
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
