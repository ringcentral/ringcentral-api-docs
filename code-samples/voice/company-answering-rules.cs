using System;
using System.Threading.Tasks;
using RingCentral;

namespace CompanyCustomAnsweringRule
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));
      await create_company_custom_answering_rule();
    }
    static private async Task create_company_custom_answering_rule()
    {
      var parameters = new CompanyAnsweringRuleRequest();
      parameters.enabled = true;
      parameters.type = "Custom";
      parameters.name = "My weekly meetings";
      var schedule = new CompanyAnsweringRuleScheduleInfoRequest();
      var weeklyRanges = new CompanyAnsweringRuleWeeklyScheduleInfoRequest();
      var meetingTime = new CompanyAnsweringRuleTimeIntervalRequest();
      meetingTime.from = "09:00";
      meetingTime.to = "10:00";
      weeklyRanges.monday = new CompanyAnsweringRuleTimeIntervalRequest[] { meetingTime };

      meetingTime = new CompanyAnsweringRuleTimeIntervalRequest();
      meetingTime.from = "10:00";
      meetingTime.to = "15:00";
      weeklyRanges.friday = new CompanyAnsweringRuleTimeIntervalRequest[] { meetingTime };

      schedule.weeklyRanges = weeklyRanges;
      parameters.schedule = schedule;
      parameters.callHandlingAction = "TakeMessagesOnly";

      var response = await restClient.Restapi().Account().AnsweringRule().Post(parameters);
      var jsonStr = JsonConvert.SerializeObject(response);
      Console.WriteLine(jsonStr);
    }
  }
}
