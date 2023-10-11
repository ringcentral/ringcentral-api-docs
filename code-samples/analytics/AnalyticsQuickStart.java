package AnalyticsQuickStart;

import java.io.IOException;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class AnalyticsQuickStart {
    static RestClient restClient;

    public static void main(String[] args) {
      var obj = new AnalyticsQuickStart();
      try {
        // Instantiate the SDK
        restClient = new RestClient(System.getenv("RC_CLIENT_ID"), System.getenv("RC_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        restClient.authorize(System.getenv("RC_JWT"));

        obj.read_analytics_aggregate_data();

      } catch (RestException e) {
        System.out.println(e.getMessage());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    /*
      Read aggregate analytics data for a period of time and grouped by users
    */
    public void read_analytics_aggregate_data() throws RestException, IOException{
      try {
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
        queryParams.perPage = 100l;

        var resp = restClient.analytics().calls().v1().accounts("~").aggregation().fetch().post(bodyParams, queryParams);
        String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }catch (RestException e){
        System.out.println(e.getMessage());
      }
    }
}
