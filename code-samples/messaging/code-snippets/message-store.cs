using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_MessageStore
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

            await read_extension_message_store();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
         Read the current authenticated user's message store.
        */
        static private async Task read_extension_message_store()
        {
          try
          {
            var queryParams = new ListMessagesParameters();
            queryParams.dateFrom = "2023-01-01T00:00:00.000Z";
            queryParams.dateTo = "2023-01-31T23:59:59.999Z";
            queryParams.messageType = new string[] { "SMS", "Fax" };
            queryParams.perPage = 1000;

            var resp = await restClient.Restapi().Account().Extension().MessageStore().List(queryParams);
            foreach (var record in resp.records)
            {
              var recordStr = JsonConvert.SerializeObject(record);
              Console.WriteLine(recordStr);
            }
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }
    }
}
