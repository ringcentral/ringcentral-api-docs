import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class CreateCompanyAnsweringRule {
    static RestClient rc;
    
    public static void main(String[] args) {
        var obj = new CreateCompanyAnsweringRule();
	rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			     System.getenv("RC_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USERNAME"),
			  System.getenv("RC_EXTENSION"),
			  System.getenv("RC_PASSWORD") );
	    obj.create_company_custom_answering_rule();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public static void create_company_custom_answering_rule() throws RestException, IOException {
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

	var parameters                = new CompanyAnsweringRuleRequest();
	parameters.enabled            = true;
	parameters.type               = "Custom";
	parameters.name               = "My weekly meetings";
	parameters.schedule           = schedule;
	parameters.callHandlingAction = "TakeMessagesOnly";

	CompanyAnsweringRuleInfo response = rc.restapi().account().answeringRule().post(parameters);
	System.out.println( "Rule created. ID: " + response.id );
    }
}
