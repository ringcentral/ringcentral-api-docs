no_breadcrumb:true

# Call Answering Rules Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to read preset call answering rules of a user, so that you can see the rule's details and update the rule with new values if you want to. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Management App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Call+Management+Quick+Start+App&desc=A+simple+app+to+demo+call+answering+rules+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadAccounts&redirectUri=" class="btn btn-primary">Create Call Management App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server-only (No UI)' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read User Call Answering Rules

### Create a Java project (using Eclipse IDE)

* Create a new Java project
* Select the Gradle Project wizard
* Enter project name "Get_User_Call_Answering_Rules"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
}
```

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "Get_User_Call_Answering_Rules"

```java
package Get_User_Call_Answering_Rules;

public class Get_User_Call_Answering_Rules {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "Get_User_Call_Answering_Rules.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials.

```java
package Get_User_Call_Answering_Rules;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;


public class Get_User_Call_Answering_Rules {
    String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

    String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

  	public static void main(String[] args) {
        var obj = new Get_User_Call_Answering_Rules();
    		try {
          obj.get_user_call_answering_rules();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

    public void get_user_call_answering_rules() throws RestException, IOException{
    		RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
    		rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

    		var parameters = new ListAnsweringRulesParameters();
    		parameters.view = "Detailed";
    		parameters.enabledOnly = "false";

    		var response = rc.restapi().account().extension().answeringrule().list(parameters);
    		for (var record : response.records) {
            var rule = rc.restapi().account().extension().answeringrule(record.id).get();
            System.out.println(JSON.toJSONString(rule));
    		}
    }
}
```

### Run Your App

You are almost done. Now run your app from Eclipse.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
