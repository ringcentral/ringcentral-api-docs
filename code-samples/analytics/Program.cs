using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;
using dotenv.net;

namespace AnalyticsQuickStart {
  class Program {
    static RestClient restClient;

    static async Task Main(string[] args){
      try
      {
        DotEnv.Load();
        // Instantiate the SDK
        restClient = new RestClient(
            Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
            Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
            Environment.GetEnvironmentVariable("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        await restClient.Authorize( Environment.GetEnvironmentVariable("RC_JWT") );

        await read_analytics_aggregate_data();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    /*
      Read aggregate analytics data for a period of time and grouped by users
    */
    static private async Task read_analytics_aggregate_data()
    {
      try
      {
        var bodyParams = new AggregationRequest();
        bodyParams.grouping = new Grouping();
        bodyParams.grouping.groupBy = "Users";
        bodyParams.timeSettings = new TimeSettings();
        bodyParams.timeSettings.timeZone = "America/Los_Angeles";
        bodyParams.timeSettings.timeRange = new TimeRange();
        // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
        // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
        // your local time to UTC time!
        bodyParams.timeSettings.timeRange.timeFrom = "2023-01-01T00:00:00.000Z";
        bodyParams.timeSettings.timeRange.timeTo = "2023-02-15T23:59:59.999Z";
        bodyParams.responseOptions = new AggregationResponseOptions();
        bodyParams.responseOptions.counters = new AggregationResponseOptionsCounters();
        bodyParams.responseOptions.counters.allCalls = new AggregationResponseOptionsCountersAllCalls();
        bodyParams.responseOptions.counters.allCalls.aggregationType = "Sum";

        var queryParams = new AnalyticsCallsAggregationFetchParameters();
        queryParams.perPage = 100;
        var response = await restClient.Analytics().Calls().V1().Accounts("~").Aggregation().Fetch().Post(bodyParams, queryParams);
        Console.WriteLine(JsonConvert.SerializeObject(response, Formatting.Indented));
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
  }
}
