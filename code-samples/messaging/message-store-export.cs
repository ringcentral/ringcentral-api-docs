using System;
using System.Threading.Tasks;
using RingCentral;

namespace Export_MessageStore
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
	    export_message_store().Wait();
	}
	static private async Task export_message_store()
	{
	    var parameters = new CreateMessageStoreReportRequest();
	    parameters.dateFrom = "2019-01-01T00:00:00.000Z";
	    parameters.dateTo = "2019-03-31T23:59:59.999Z";
	    
	    var response = await restClient.Restapi().Account().MessageStoreReport().Post(parameters);
	    var jsonStr = JsonConvert.SerializeObject(response);
	    Console.WriteLine(jsonStr);
	    bool polling = true;
	    while (polling)
	    {
		Console.WriteLine("check task creation status ...");
		Thread.Sleep(5000);
		response = await restClient.Restapi().Account().MessageStoreReport(response.id).Get();
		if (response.status != "InProgress")
		{
		    polling = false;
		}
	    }
	    if (response.status == "Completed")
	    {
		var resp = await restClient.Restapi().Account().MessageStoreReport(response.id).Archive().List();
		DateTime value = DateTime.Now;
		var dateStr = value.ToString("yyyy-MM-dd-HH_mm");
		for (var i = 0; i < resp.records.Length; i++)
		{
		    var fileName = "message_store_content_" + dateStr + "_" + i + ".zip";
		    var contentUrl = resp.records[i].uri + "?access_token=" + restClient.token.access_token;
		    WebClient webClient = new WebClient();
		    webClient.DownloadFile(contentUrl, fileName);
		}
	    }
	}
    }
}
