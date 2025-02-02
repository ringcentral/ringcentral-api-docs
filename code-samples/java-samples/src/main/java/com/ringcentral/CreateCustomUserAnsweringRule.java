package com.ringcentral;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.IOException;

public class CreateCustomUserAnsweringRule {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new CreateCustomUserAnsweringRule();
	rc = new RestClient( System.getenv("RC_APP_CLIENT_ID"),
			     System.getenv("RC_APP_CLIENT_SECRET"),
			     System.getenv("RC_SERVER_URL") );
	try {
	    rc.authorize( System.getenv("RC_USER_JWT") );
	    obj.create_user_custom_answering_rule();
	} catch (RestException | IOException e) {
	    e.printStackTrace();
	}
    }

    public void create_user_custom_answering_rule() throws RestException, IOException {
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

	var parameters                = new CreateAnsweringRuleRequest();
	parameters.enabled            = true;
	parameters.type               = "Custom";
	parameters.name               = "My weekly meetings";
	parameters.schedule           = schedule;
	parameters.callHandlingAction = "TakeMessagesOnly";

	CustomAnsweringRuleInfo response =  rc.restapi().account().extension().answeringRule().post(parameters);
	System.out.println("Rule created: " + response.id);

    }
}
