using System;
using System.Threading.Tasks;
using RingCentral;

namespace Export_Compliance_Data
{
    class Program
    {
	static RestClient rcsdk;
	static void Main(string[] args)
	{
	    rcsdk = new RestClient("client_id", "client_secret", "server_url");
	    await rcsdk.Authorize("username", "extension_number", "password");
	    create_compliance_export_task().Wait();
	}
	static private async Task create_compliance_export_task()
	{
	    var parameters = new CreateDataExportTaskRequest();
	    parameters.timeFrom = "2019-08-01T00:00:00.000Z";
	    parameters.timeTo = "2019-08-26T23:59:59.999Z";

	    var resp = await rcsdk.Restapi().Glip().DataExport().Post(parameters);
	    Console.WriteLine("Create export task");
	    var taskId = resp.id;
	    Boolean polling = true;
	    while (polling)
	    {
		Console.WriteLine("Check export task status ...");
		Thread.Sleep(5000);
		resp = await rcsdk.Restapi().Glip().DataExport(taskId).Get();
		if (resp.status != "InProgress")
		{
		    polling = false;
		}
	    }
	    if (resp.status == "Completed")
	    {
		for (var i = 0; i < resp.datasets.Length; i++)
		{
		    var fileName = "rc-export-reports_" + resp.creationTime + "_" + i + ".zip";
		    var contentUrl = resp.datasets[i].uri + "?access_token=" + rcsdk.token.access_token;
		    WebClient webClient = new WebClient();
		    webClient.DownloadFile(contentUrl, fileName);
		    Console.WriteLine("Save report zip file to the local machine.");
		}
	    }
	    else
	    {
		Console.WriteLine("Error!");
	    }
	}
    }
}
