using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace TimeLineByUsers {
  class Program {
    static RestClient restClient;

    static async Task Main(string[] args){
      restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");
      await restClient.Authorize("SANDBOX-JWT");

      await read_analytics_timeline_grouped_by_queues();
    }
    /*
      Read timeline analytics data from a period of time, broken down by day time frames and grouped by call queues
    */
    static private async Task read_analytics_timeline_grouped_by_queues()
    {
      try
      {
        var bodyParams = new TimelineRequest();
        bodyParams.grouping = new Grouping();
        bodyParams.grouping.groupBy = "Queues";
        bodyParams.grouping.keys = await read_call_queues();

        bodyParams.timeSettings = new TimeSettings();
        bodyParams.timeSettings.timeZone = "America/Los_Angeles";
        bodyParams.timeSettings.advancedTimeSettings = new AdvancedTimeSettings();
        bodyParams.timeSettings.advancedTimeSettings.includeDays = new String[] { "Monday", "Tuesday", "Wednesday" };
        var hrInterval = new HoursInterval { from = "00:00", to = "23:59" };
        bodyParams.timeSettings.advancedTimeSettings.includeHours = new HoursInterval[] { hrInterval };
        bodyParams.timeSettings.timeRange = new TimeRange();
        // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
        // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
        // your local time to UTC time!
        bodyParams.timeSettings.timeRange.timeFrom = "2023-01-01T00:00:00.000Z";
        bodyParams.timeSettings.timeRange.timeTo = "2023-02-15T23:59:59.999Z";

        bodyParams.responseOptions = new TimelineResponseOptions();
        bodyParams.responseOptions.counters = new TimelineResponseOptionsCounters();
        bodyParams.responseOptions.counters.allCalls = true;
        bodyParams.responseOptions.counters.callsByDirection = true;
        bodyParams.responseOptions.counters.callsByOrigin = true;

        var queryParams = new AnalyticsCallsTimelineFetchParameters();
        queryParams.perPage = 10;
        queryParams.interval = "Day";

        var response = await restClient.Analytics().Calls().V1().Accounts("~").Timeline().Fetch().Post(bodyParams, queryParams);
        Console.WriteLine(JsonConvert.SerializeObject(response));
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
    /*
      Read call queues and create a list of call queue id
    */
    static private async Task<String[]> read_call_queues()
    {
      List<String> list = new List<String>();
      try
      {
        var queryParams = new ListExtensionsParameters();
        queryParams.type = new String[] { "Department" };
        var resp = await restClient.Restapi().Account().Extension().List(queryParams);
        foreach (var record in resp.records)
        {
          // You can filter out any call queue you don't want to read analytics data!
          list.Add(record.id.ToString());
        }
      }catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
      var callQueueIds = (String[])list.ToArray();
      return callQueueIds;
    }
  }
}
