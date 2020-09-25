# Making Calls Using RingOut

The RingOut option enables the users to make a call from any other outside number (not RingCentral number) by means of the RingCentral account, when it is not convenient for them to use the RingCentral number. This feature is available for softphone, web service and mobile applications.

The user specifies a certain number under the forwarding number list, starts RingOut and enters the required called number. RingCentral makes a call to the specified forwarding number and connects the user with the called number.

The API treats a two-legged RingOut call as a resource that can be created, retrieved, or deleted via the `POST`, `GET` and `DELETE` methods correspondingly.

## Sample Code to Get Started with RingOut

The two-legged RingOut call can be created via the following request:

=== "HTTP"
	```http
	POST /restapi/v1.0/account/~/extension/~/ringout
	Content-Type: application/json
	Authorization: Bearer <access-token>

	{
	    "from": {"phoneNumber": "13445554444"}, /* from parameter is optional if there is a default number in user's forwarding numbers */
	    "to": {"phoneNumber": "13455553434"}, /* to parameter is required */
	    "playPrompt": true /* optional field */
	}
	```

=== "Javascript"
	```javascript
	const RingCentral = require('@ringcentral/sdk').SDK

	var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"} )

	platform.on(platform.events.loginSuccess, async function(response){
		try{
			var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
					'from' : { 'phoneNumber': "13445554444" },
					'to'   : {'phoneNumber': "13455553434"},
					'playPrompt' : true
				})
			var jsonObj = await resp.json()
			console.log("Call placed. Call status: " + jsonObj.status.callStatus)
		}catch(e){
			console.log(e.message)
		}
	})
	```

=== "Python"
	```python
	from ringcentral import SDK

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	resp = platform.post('/restapi/v1.0/account/~/extension/~/ring-out',
	    {
	      'from' : { 'phoneNumber': "13445554444" },
	      'to'   : { 'phoneNumber': "13455553434" },
	      'playPrompt' : True
	    })
	print "Call placed. Call status: " + resp.json().status.callStatus
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

	$platform = $rcsdk->platform();
	$platform->login( "username", "extension_number", "password" );

	$resp = $platform->post('/account/~/extension/~/ring-out',
	    array(
	      'from' => array( 'phoneNumber' => "13445554444" ),
	      'to' => array( 'phoneNumber' => "13455553434" ),
	      'playPrompt' => true
	    ));

	print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
	?>
	```

=== "C#"
	```c#
	using System;
	using System.Threading.Tasks;
	using RingCentral;

	namespace Call_RingOut
	{
	    class Program
	    {
				static void Main(string[] args)
				{
					call_ringout().Wait();
				}
				static private async Task call_ringout()
				{
					RestClient rc = new RestClient("client_id", "client_secret", false);
					await rc.Authorize("username", "extension_number", "password");
					var parameters = new MakeRingOutRequest();
		    	parameters.from = new MakeRingOutCallerInfoRequestFrom { phoneNumber = "13445554444" };
		    	parameters.to = new MakeRingOutCallerInfoRequestTo { phoneNumber = "13455553434" };
		    	parameters.playPrompt = true;

		    	var resp = await rc.Restapi().Account().Extension().RingOut().Post(parameters);
		    	Console.WriteLine("Call Placed. Call status: " + resp.status.callStatus);
				}
			}
	}
	```

=== "Java"
	```java
	package Call_RingOut;

	import java.io.IOException;
	import com.ringcentral.*;
	import com.ringcentral.definitions.*;

	public class Call_RingOut {
	  public static void main(String[] args) {
			try {
				call_ringout();
			} catch (RestException | IOException e) {
				e.printStackTrace();
			}
	  }

		public static void call_ringout() throws RestException, IOException{
			RestClient rc = new RestClient("client_id", "client_secret", "server_url");
			rc.authorize("username", "extension_number", "password");

			MakeRingOutRequest requestBody = new MakeRingOutRequest();
			parameters.from(new MakeRingOutCallerInfoRequestFrom().phoneNumber( "13445554444" ));
			parameters.to(new MakeRingOutCallerInfoRequestTo().phoneNumber( "13455553434" ));
			parameters.playPrompt = true;

			var response = rc.restapi().account().extension().ringout().post(requestBody);
			System.out.println("Call Placed. Call status: " + response.status.callStatus);
		}
	}
	```

=== "Ruby"
	```ruby
	require 'ringcentral'

	rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

	resp = rc.post('/restapi/v1.0/account/~/extension/~/ring-out', payload: {
	    from: { phoneNumber: "13445554444" },
	    to: { phoneNumber: "13455553434" },
	    playPrompt: true
	})

	puts "Call placed. Call status: " + resp.body['status']['callStatus']
	```

Where:

-   **from**

    Refers to the number of the calling party. Required field only if there is no default number in the user's forwarding number list. The phoneNumber attribute should comply with the E.164 standard. As a result of validation of the phoneNumber attribute the server may return the error code: 400 Bad Request - phoneNumber specified in the field is empty or invalid.

-   **to**

    Refers to the called party number. Required field. If this field is missing from the request, the 400 Bad Request error is returned. The phoneNumber attribute should comply with the E.164 standard. As a result of validation of the phoneNumber attribute the server may return the error code: 400 Bad Request - phoneNumber specified in the field is empty or invalid.

-   **playPrompt**

    The audio prompt that the calling party hears when the call is connected. Optional field. It corresponds to the setting in the RingCentral application "Prompt me to dial 1 before connecting" (When selected, the system will ask you to press "1" on your phone's key pad before connecting to the destination number).

The response can be as follows:

```
200 OK
Content-Type: application/json

{
    "id": 234343434,
    "uri": "/restapi/v1.0/account/~/extension/~/ringout/234343434",
    "status": {  
        "callStatus": "Success",  
        "callerStatus": "Success",  
        "calleeStatus": "Success"   
    }
}
```

Where:

-   **callStatus** can take the following values:

    | Value              | Description                                                               |
    | ------------------ | ------------------------------------------------------------------------- |
    | `InProgress`         | Connection is being established                                           |
    | `Success`            | Both legs connected (Answered)                                            |
    | `CannotReach`        | Failure state (one or both legs are in invalid state for call connection) |
    | `NoAnsweringMachine` | Internal server failure                                                   |

-   **callerStatus**, **calleeStatus** can take the following values:

    | Value                 | Description                                                                                    |
    | --------------------- | ---------------------------------------------------------------------------------------------- |
    | `InProgress`            | Connection to the target leg is being established                                              |
    | `Busy`                  | Target device is busy                                                                          |
    | `NoAnswer`              | The call has been dropped because of timeout                                                  |
    | `Rejected`              | <ul><li>RingOut command was canceled by user *or*</li><li>RingOut initiated, 1st leg answered, 2nd is ringing, user drops call on the 1st leg - 2nd leg gets 'Rejected'</li></ul> |
    | `Success`               | Call party has answered the call                                                               |
    | `Finished`              | The call was terminated (In Progress > Success > Finished)                                |
    | `GenericError`          | <ul><li>Error code received from PSTN *or*</li><li>Internal server error</li></ul>             |
    | `InternationalDisabled` | <ul><li>International calling disabled (Call to International number) *or*</li><li>Domestic calling disabled (Call with local Country code) *or*</li><li>Internal calling disabled (Call within one account)</li></ul>|
    | `NoSessionFound`        | RingOut status was requested for RingOut session which does not exist (e.g was already Closed) |
    | `Invalid`               | RingOut session state is unknown due to internal failure                                       |


Call status is generated as a combination of both call legs statuses (caller and callee):

<img src="../../img/ringout_flow_call.png" class="img-fluid">

Caller or Callee statuses are separately generated for the target call party:

<img src="../../img/ringout_flow_callee.png" class="img-fluid">

## RingOut Flow

See how the statuses are changing during successful call on the flowchart below:

<img src="../../img/ringout_flow_success.png" class="img-fluid">

Failed call:

<img src="../../img/ringout_flow_fail.png" class="img-fluid">

## Polling Call Status

Use polling to get the status of an ongoing outbound call.

    GET/restapi/v1.0/account/~/extension/~/ringout/234343434

The response will be as follows:

```
200 OK
Content-Type: application/json

{  
    "id": 234343434,
    "uri": "/restapi/v1.0/account/~/extension/~/ringout/234343434",
    "status": {  
        "callStatus": "Success",  
        "callerStatus": "Success",  
        "calleeStatus": "Success"   
    }
}
```

## How to cancel a RingOut in progress

RingCentral does not currently support call control for outbound calls. However, you can cancel a RingOut call while the callee's party status is `InProgress`by making a `DELETE` request to the RingOut endpoint as shown below:

```
DELETE /restapi/v1.0/account/~/extension/~/ringout/234343434  
```

If successful, the platform will respond with a 204.

Deleting the RingOut is only available when the RingOut has been initiated and the call has not been connected. For example:

If you initiate a RingOut and immediately call the DELETE RingOut endpoint, the call would get terminated as long as the RingOut between the two parties is not connected (first leg has not been established). If the first leg of the call has been initiated, then the DELETE API will not terminate the call.

## Caller ID

RingCentral allows users to select which number to use for their Caller Id Name (`CNAM`) value when making calls. To set the CallerId for the RingOut API, set the "RingOut from Web" value as available in the Online Account Portal. More information on this can be found in [KB Article #3471](https://support.ringcentral.com/s/article/Outbound-Caller-ID-Overview).

## RingOut API Permissions

Apps requesting to make a ring-out call require the `RingOut` permission.
