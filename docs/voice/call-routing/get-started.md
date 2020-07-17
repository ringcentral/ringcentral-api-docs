# Get Started with Call Routing

To help you get started using the Call Routing API, the following code samples have been provided. These code samples perform the simple function of listing the call answering rules associated with the current user. This code sample is based on our [Voice quick start guides](../../quick-start). If you have not completed that guide, we recommend you do so first, as this is an abbreviated version of that guide. 

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Routing App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Call+Routing+Quick+Start+App&desc=A+simple+app+to+demo+call+answering+rules+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadAccounts&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Call Routing App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read User Call Answering Rules

=== "JavaScript"
	```javascript
	const SDK = require('@ringcentral/sdk').SDK

	RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
	RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
	RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

	RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
	RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
	RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

	var rcsdk = new SDK({
	      server: RINGCENTRAL_SERVER,
	      clientId: RINGCENTRAL_CLIENTID,
	      clientSecret: RINGCENTRAL_CLIENTSECRET
	  });
	var platform = rcsdk.platform();
	platform.login({
	      username: RINGCENTRAL_USERNAME,
	      password: RINGCENTRAL_PASSWORD,
	      extension: RINGCENTRAL_EXTENSION
	      })
	      .then(function(resp) {
		  get_user_call_answering_rules()
	      });

	function get_user_call_answering_rules() {
	    platform.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
		'view': "Detailed",
		'enabledOnly': false
	      })
	      .then(function(resp){
		  return resp.json()
	      }).then(function(jsonObj) {
		for (var record of jsonObj.records){
		  // use the record.id to read rule details
		  get_user_call_answering_rule(record.id)
		}
	      })
	      .catch(function(e){
		  console.log(e.message)
	      })
	}

	function get_user_call_answering_rule(id) {
	    platform.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + id )
		.then(function(resp){
		  return resp.text()
		})
		.then(function(text) {
		  console.log(text)
		})
		.catch(function(e){
		    console.log(e.message)
		})
	}
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
	$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
	$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

	$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
	$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
	$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

	$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

	$platform = $rcsdk->platform();
	$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

	try {
	    $resp = $platform->get('/account/~/extension/~/answering-rule',
		array(
		    'view' => "Detailed",
		    'enabledOnly' => False
		));
	    $jsonObj = $resp->json();
	    foreach ($jsonObj->records as $record){
		// use the $record->id to read rule details
		$resp = $platform->get('/account/~/extension/~/answering-rule/' . $record->id );
		print_r($resp->text()."\n");
	    }
	} catch (Exception $e) {
	    echo $e->getMessage()."\n";
	}
	?>
	```

=== "Python"
	```python
	from ringcentral import SDK

	RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
	RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
	RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

	RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
	RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
	RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

	rcsdk = SDK(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
	platform = rcsdk.platform()
	platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

	params = {
	    'view': "Detailed",
	    'enabledOnly': False
	}

	try:
	    resp = platform.get('/account/~/extension/~/answering-rule', params)
	    for record in resp.json().records:
		rule = platform.get('/account/~/extension/~/answering-rule/' + record.id)
		print (rule.text())
	except Exception as e:
	    print(e)
	```

=== "Java"
	```java
	package Get_User_Call_Answering_Rules;

	public class Get_User_Call_Answering_Rules {

		public static void main(String[] args) {
			// TODO Auto-generated method stub

		}
	}

	package Get_User_Call_Answering_Rules;

	import java.io.IOException;

	import com.ringcentral.*;
	import com.ringcentral.definitions.*;


	public class Get_User_Call_Answering_Rules {
	    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
	    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
	    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

	    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
	    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
	    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";
	    static RestClient restClient;
		public static void main(String[] args) {
		var obj = new Get_User_Call_Answering_Rules();
			try {
		  restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
			restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
		  obj.get_user_call_answering_rules();
			} catch (RestException | IOException e) {
				e.printStackTrace();
			}
		}
	    public void get_user_call_answering_rules() throws RestException, IOException{
			var parameters = new ListAnsweringRulesParameters();
			parameters.view = "Detailed";
			parameters.enabledOnly = "false";

			var response = restClient.restapi().account().extension().answeringrule().list(parameters);
			for (var record : response.records) {
		    var rule = restClient.restapi().account().extension().answeringrule(record.id).get();
		    System.out.println(JSON.toJSONString(rule));
			}
	    }
	}
	```

=== "C#"
	```c#
	using System;
	using System.Threading.Tasks;
	using RingCentral;
	using Newtonsoft.Json;

	namespace Get_User_Call_Answering_Rules
	{
	    class Program
	    {
		const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
		const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
		const string RINGCENTRAL_PRODUCTION = false;
		const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
		const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
		const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

		static RestClient restClient;

		static void Main(string[] args)
		{
		    restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
		    restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
		    get_user_call_answering_rules().Wait();
		}
		static private async Task get_user_call_answering_rules()
		{
		    var parameters = new ListAnsweringRulesParameters();
		    parameters.view = "Detailed";
		    parameters.enabledOnly = "false";

		    var resp = await restClient.Restapi().Account().Extension().AnsweringRule().List(parameters);
		    foreach (var record in resp.records)
		    {
			var rule = await restClient.Restapi().Account().Extension().AnsweringRule(record.id).Get();
			Console.WriteLine(JsonConvert.SerializeObject(rule));
		    }
		}
	    }
	}
	```

=== "Ruby"
	```ruby
	require 'ringcentral'

	RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
	RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
	RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

	RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
	RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
	RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

	rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
	rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

	resp = rc.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
	    view: "Detailed",
	    enabledOnly: false
	})
	for record in resp.body['records'] do
	    rule = rc.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + record['id'])
	    puts rule.body
	end
	```
