using System;
using System.Threading.Tasks;
using RingCentral;

namespace CompanyCustomAnsweringRule
{
class Program
{
    static void Main(string[] args)
    {
        create_company_custom_answering_rule().Wait();
    }
    static private async Task create_company_custom_answering_rule()
    {
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        await rc.Authorize("username", "extension_number", "password");

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

        var response = await rc.Restapi().Account().AnsweringRule().Post(parameters);
        var jsonStr = JsonConvert.SerializeObject(response);
        Console.WriteLine(jsonStr);
    }
}
}
