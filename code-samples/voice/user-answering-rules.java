import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class UserCustomAnsweringRule {
	public static void main(String[] args) {
		try {
			create_user_custom_answering_rule();
		} catch (RestException | IOException e) {
			e.printStackTrace();
		}
	}

	public static void create_user_custom_answering_rule() throws RestException, IOException {
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		rc.authorize("username", "extension_number", "password");

		var parameters = new CreateUserAnsweringRuleRequest();
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

		var response =  rc.restapi().account().extension().answeringrule().post(parameters);
		System.out.println(JSON.toJSONString(response));
	}
}
