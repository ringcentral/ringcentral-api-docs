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
      try
      {
        // Instantiate the SDK
        restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");
        await create_compliance_export_task();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    /*
    * Create a task to export the Team Messaging store for a period of time.
    */
    static private async Task create_compliance_export_task()
    {
        var bodyParams = new CreateDataExportTaskRequest();
        bodyParams.timeFrom = "2023-01-01T00:00:00.000Z";
        bodyParams.timeTo = "2023-01-31T23:59:59.999Z";

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
                // Check the status of the task using the taskId.
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
            /*
            * Download the task compressed file and save to a local storage.
            */
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
