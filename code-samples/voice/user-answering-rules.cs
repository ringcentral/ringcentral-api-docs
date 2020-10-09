using System;
using System.Threading.Tasks;
using RingCentral;

namespace UserCustomAnsweringRule
{
class Program {
	static void Main(string[] args)
	{
		create_user_custom_answering_rule().Wait();
	}
	static private async Task create_user_custom_answering_rule()
	{
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		await rc.Authorize("username", "extension_number", "password");

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

		var response = await rc.Restapi().Account().Extension().AnsweringRule().Post(parameters);
		var jsonStr = JsonConvert.SerializeObject(response);
		Console.WriteLine(jsonStr);
	}
}
}
