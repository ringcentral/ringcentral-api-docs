package TimeLineByQueues;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class TimeLineByQueues {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new TimeLineByQueues();
      try {
        // Instantiate the SDK
        restClient = new RestClient("SANDBOX-APP-CLIENT-ID", "SANDBOX-APP-CLIENT-SECRET", "https://platform.devtest.ringcentral.com");

        // Authenticate a user using a personal JWT token
        restClient.authorize("SANDBOX-JWT");
        obj.read_analytics_timeline_grouped_by_queues();
      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
      Read timeline analytics data from a period of time, broken down by day time frames and grouped by call queues
    */
    public void read_analytics_timeline_grouped_by_queues() throws RestException, IOException {
      try {
        var bodyParams = new TimelineRequest();
        bodyParams.grouping = new Grouping();
        bodyParams.grouping.groupBy = "Queues";
        bodyParams.grouping.keys = read_call_queues();

        bodyParams.timeSettings = new TimeSettings();
        bodyParams.timeSettings.timeZone = "America/Los_Angeles";
        bodyParams.timeSettings.advancedTimeSettings = new AdvancedTimeSettings();
        bodyParams.timeSettings.advancedTimeSettings.includeDays = new String[] { "Sunday" };
        var hrInterval = new HoursInterval();
        hrInterval.from = "00:00";
        hrInterval.to = "23:59";

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
        queryParams.perPage = 10l;
        queryParams.interval = "Day";

        var resp = restClient.analytics().calls().v1().accounts("~").timeline().fetch().post(bodyParams, queryParams);
        String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }catch (RestException e){
        System.out.println(e.getMessage());
      }
    }
    /*
    	Read call queues and create a list of call queue id
  	*/
  	private String [] read_call_queues() throws RestException, IOException {
      List<String> list = new ArrayList<>();
      try {
        var queryParams = new ListExtensionsParameters();
        queryParams.type = new String [] { "Department" };
        var resp =  restClient.restapi().account().extension().list(queryParams);
        for (var record : resp.records) {
          // You can filter out any call queue you don't want to read analytics data!
          list.add(record.id.toString());
        }
      }catch(RestException e) {
        System.out.println(e.getMessage());
      }
      var callQueueIds = (String[]) list.toArray(new String[list.size()]);
      return callQueueIds;
  	}
}
