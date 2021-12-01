package com.ringcentral.com;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class MeetingsQuickStart {
    static RestClient rc;

    public static void main(String[] args) {
        var obj = new MeetingsQuickStart();
	      rc = new RestClient(System.getenv("RC_CLIENT_ID"), System.getenv("RC_CLIENT_SECRET"), System.getenv("RC_SERVER_URL"));
        try {
            rc.authorize(System.getenv("RC_USERNAME"), System.getenv("RC_EXTENSION"), System.getenv("RC_PASSWORD"));
            obj.createMeeting();
        }
        catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }

    public void createMeeting() throws RestException, IOException {
        MeetingRequestResource parameters = new MeetingRequestResource();
        parameters.topic = "Instant Meeting";
        parameters.meetingType = "Instant";
        parameters.allowJoinBeforeHost = true;
        parameters.startHostVideo = true;
        parameters.startParticipantsVideo = false;

        var response = rc.restapi().account().extension().meeting().post(parameters);
        System.out.println("Start Your Meeting: " + response.links.startUri);
        System.out.println("Join the Meeting: " + response.links.joinUri);
    }
}
