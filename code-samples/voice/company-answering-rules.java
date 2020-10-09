import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class CompanyCustomAnsweringRule {
	public static void main(String[] args) {
		try {
			create_company_custom_answering_rule();
		} catch (RestException | IOException e) {
			e.printStackTrace();
		}
	}

	public static void create_company_custom_answering_rule() throws RestException, IOException {
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		rc.authorize("username", "extension_number", "password");

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

		var response =  rc.restapi().account().answeringrule().post(parameters);
		System.out.println(JSON.toJSONString(response));
	}
}
