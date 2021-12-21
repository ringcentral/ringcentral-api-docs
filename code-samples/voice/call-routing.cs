using System;
using System.Threading.Tasks;
using RingCentral;
using Newtonsoft.Json;

namespace Get_User_Call_Answering_Rules
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
	get_user_call_answering_rules().Wait();
    }

    static private async Task get_user_call_answering_rules()
    {
	var parameters = new ListAnsweringRulesParameters();
	parameters.view = "Detailed";
	parameters.enabledOnly = "false";
	
	var resp = await restClient.Restapi().Account().Extension().AnsweringRule().List(parameters);
	foreach (var record in resp.records)
	{
	    var rule = await restClient.Restapi().Account().Extension().AnsweringRule(record.id).Get();
	    Console.WriteLine(JsonConvert.SerializeObject(rule));
	}
    }
}
}
