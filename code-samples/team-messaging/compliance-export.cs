using System;
using System.Threading.Tasks;
using RingCentral;

namespace Export_Compliance_Data
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient( Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                                   Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                                   Environment.GetEnvironmentVariable("RC_SERVER_URL"));

      try
      {
        await restClient.Authorize(Environment.GetEnvironmentVariable("RC_JWT"));
        await create_compliance_export_task();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    static private async Task create_compliance_export_task()
    {
        var bodyParams = new CreateDataExportTaskRequest();
        bodyParams.timeFrom = "2019-08-01T00:00:00.000Z";
        bodyParams.timeTo = "2019-08-26T23:59:59.999Z";

        var resp = await restClient.TeamMessaging().V1().DataExport().Post(bodyParams);
        Console.WriteLine("Create export task");
        var taskId = resp.id;
        Boolean polling = true;
        while (polling)
        {
            Console.WriteLine("Check export task status ...");
            try
            {
                Thread.Sleep(5000);
                resp = await restClient.TeamMessaging().V1().DataExport(taskId).Get();
                if (resp.status != "InProgress" ||  resp.status != "Accepted")
                {
                    polling = false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
        if (resp.status == "Completed")
        {
            for (var i = 0; i < resp.datasets.Length; i++)
            {
                var fileName = "glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
                var contentUrl = resp.datasets[i].uri + "?access_token=" + restClient.token.access_token;
                WebClient webClient = new WebClient();
                webClient.DownloadFile(contentUrl, fileName);
                Console.WriteLine("Save report zip file to the local machine.");
            }
        }
    }
  }
}
