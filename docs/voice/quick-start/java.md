no_breadcrumb:true

# RingOut Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you connect two people in a live phone call using our RingOut API, which dials two phone numbers, and then connects the two people when they answer. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingOut App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=RingOut+Quick+Start+App&desc=A+simple+app+to+demo+placing+a+call+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=RingOut&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create RingOut App</a>
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
    <li>RingOut</li>
  </ul>
</li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Place a Call

### Create a Java project (using Eclipse IDE)

* Create a new Java project
* Select the Gradle Project wizard
* Enter project name "Call_RingOut"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
}
```

* Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "Call_RingOut"

```java
package Call_RingOut;

public class Call_RingOut {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "Call_RingOut.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```java
package Call_RingOut;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;


public class Call_RingOut {
  	static String RECIPIENT_NUMBER = "<ENTER PHONE NUMBER>";

  	static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
  	static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
  	static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

  	static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
  	static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
  	static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Call_RingOut();
        try {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
          restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
          obj.call_ringout()();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }
  	public void call_ringout() throws RestException, IOException {
  		MakeRingOutRequest requestBody = new MakeRingOutRequest();
  		requestBody.from(new MakeRingOutCallerInfoRequestFrom().phoneNumber(RINGCENTRAL_USERNAME));
  		requestBody.to(new MakeRingOutCallerInfoRequestTo().phoneNumber(RECIPIENT_NUMBER));
  		requestBody.playPrompt = false;

  		var response = restClient.restapi().account().extension().ringout().post(requestBody);
  		System.out.println("Call Placed. Call status: " + response.status.callStatus);
  	}
}
```

### Run Your App

You are almost done. Now run your app from Eclipse.

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=voice">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. 

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>

