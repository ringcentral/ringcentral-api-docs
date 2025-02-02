using System;
using System.Threading.Tasks;
using RingCentral;

namespace Export_MessageStore
{
    class Program
    {
      	static RestClient restClient;
      	static async Tast Main(string[] args)
      	{
            try
            {
              // Instantiate the SDK
              restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");
              // Authenticate a user using a personal JWT token
              await restClient.Authorize("RC_USER_JWT");

              await create_message_store_report();
            }
            catch (Exception ex)
            {
              Console.WriteLine(ex.Message);
            }
      	}
        /*
        * Create a task to export the account messages within March 2023
        */
        static private async Task create_message_store_report()
        {
            var bodyParams = new CreateMessageStoreReportRequest();
            bodyParams.dateFrom = "2023-03-01T00:00:00.000Z";
            bodyParams.dateTo = "2023-03-31T23:59:59.999Z";

            var response = await restClient.Restapi().Account().MessageStoreReport().Post(bodyParams);
            await get_message_store_report_task(response.id);
        }
        /*
        * Check the task completion status
        */
        static private async Task get_message_store_report_task(String taskId)
        {
            var response = await restClient.Restapi().Account().MessageStoreReport(taskId).Get();
            Console.WriteLine("Task creation status: " + response.status);
            if (response.status == "Completed")
            {
                await get_message_store_report_archive(taskId);
            }
            else if ( response.status == "AttemptFailed" ||
                      response.status == "Failed" ||
                      response.status == "Cancelled")
            {
                Console.WriteLine("Export message store failed.");
            }
            else
            {
                Thread.Sleep(10000);
                await get_message_store_report_task(taskId);
            }
        }
        /*
        * When the task is completed, use the task id to get the uri of the report file
        */
        static private async Task get_message_store_report_archive(String taskId)
        {
            Console.WriteLine("Getting report uri ...");
            var resp = await restClient.Restapi().Account().MessageStoreReport(taskId).Archive().Get();
            DateTime value = DateTime.Now;
            var dateStr = value.ToString("yyyy-MM-dd-HH_mm");
            for (var i = 0; i < resp.records.Length; i++)
            {
                var fileName = "message_store_content_" + dateStr + "_" + i + ".zip";
                var contentUrl = resp.records[i].uri + "?access_token=" + restClient.token.access_token;
                WebClient webClient = new WebClient();
                webClient.DownloadFile(contentUrl, fileName);
                Console.WriteLine(fileName + " file is saved to the local machine.");
            }
        }
    }
}
