const RC = require('@ringcentral/sdk').SDK

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    server: 'https://platform.ringcentral.com',
    clientId: 'RC_APP_CLIENT_ID',
    clientSecret: 'RC_APP_CLIENT_SECRET'
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ jwt: 'RC_USER_JWT' })

platform.on(platform.events.loginSuccess, () => {
    set_forward_all_call_rules()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

async function set_forward_all_call_rules() {
  try {
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
    var resp = await platform.post(endpoint, {
	"state": {
	    "id": "forward-all-calls",
	    "displayName": "Forward all calls",
	    "conditions": [ {
		"schedule": {
		    "triggers": [ {
			"triggerType": "Daily",
			"startTime": "00:00:00",
			"endTime": "23:59:59"
		    } ]
		},
		  "type": "Schedule"
	    } ]
	}
    })
  } catch (e) {
      console.log("Unable to read user FAC state rules. ", e.message);
  }
}
