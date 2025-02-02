using System;
using System.Threading.Tasks;
using RingCentral;

namespace UserCustomAnsweringRule
{
  class Program {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
        Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
        Environment.GetEnvironmentVariable("RC_SERVER_URL"));
        
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));
      await create_user_custom_answering_rule();
    }
    static private async Task create_user_custom_answering_rule()
    {
      var parameters = new CreateAnsweringRuleRequest();
      parameters.enabled = true;
      parameters.type = "Custom";
      parameters.name = "My weekly meetings";
      var schedule = new ScheduleInfo();
      var weeklyRanges = new WeeklyScheduleInfo();
      TimeInterval meetingTime = new TimeInterval();
      meetingTime.from = "09:00";
      meetingTime.to = "10:00";
      weeklyRanges.monday = new TimeInterval[] { meetingTime };

      meetingTime = new TimeInterval();
      meetingTime.from = "10:00";
      meetingTime.to = "15:00";
      weeklyRanges.friday = new TimeInterval[] { meetingTime };

      schedule.weeklyRanges = weeklyRanges;
      parameters.schedule = schedule;
      parameters.callHandlingAction = "TakeMessagesOnly";

      var response = await restClient.Restapi().Account().Extension().AnsweringRule().Post(parameters);
      var jsonStr = JsonConvert.SerializeObject(response);
      Console.WriteLine(jsonStr);
    }
  }
}
