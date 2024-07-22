using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;
using dotenv.net;

namespace Read_User_CallLog
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      try
      {
        DotEnv.Load();
        // Instantiate the SDK
        restClient = new RestClient(
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
        Environment.GetEnvironmentVariable("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        await restClient.Authorize( Environment.GetEnvironmentVariable("RC_USER_JWT") );

        await read_user_calllog();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    /*
    * Read user call log between a period of time
    */
    static private async Task read_user_calllog()
    {
      try
      {
        var queryParams = new ReadUserCallLogParameters();
        queryParams.dateFrom = "2024-01-01T00:00:00.000Z";
        queryParams.dateTo = "2024-01-31T23:59:59.009Z";
        queryParams.view = "Detailed";

        var resp = await restClient.Restapi().Account().Extension().CallLog().List(queryParams);
        foreach (CallLogRecord record in resp.records)
        {
          Console.WriteLine(JsonConvert.SerializeObject(record, Formatting.Indented));
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Cannot read user call log data. " + ex.Message);
      }
    }
  }
}
