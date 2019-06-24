no_breadcrumb:true

# PubNub Notifications Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you subscribe for PubNub push notifications using our Push Notifications API, which allows your application receiving notifications on a selected events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Push+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS&redirectUri=" class="btn btn-primary">Create Notifications App</a>
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
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Subscribe for push notification

### Create a Java project (using Eclipse IDE)

* Create a new Java project
* Select the Gradle Project wizard
* Enter project name "PubNub_Notifications"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3 4",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
    compile 'com.ringcentral:ringcentral-pubnub:1.0.0-beta10'
}
```

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "PubNub_Notifications"

```java
package PubNub_Notifications;

public class PubNub_Notifications {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "PubNub_Notifications.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials.

```java
package PubNub_Notifications;

import java.io.IOException;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ringcentral.*;
import com.ringcentral.definitions.*;
import com.ringcentral.pubnub.Subscription;

public class PubNub_Notifications {
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

  	static RestClient restClient;

  	public static void main(String[] args) {
  		try {
  			PubNubNotifications();
  		} catch (RestException | IOException e) {
  			e.printStackTrace();
  		}
  	}

    public static void PubNubNotifications() throws RestException, IOException {
        restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
        restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

        var eventFilters = new String[] {
        	"/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
        };
        Subscription subscription = new Subscription(restClient, eventFilters, (message) -> {
        	JSONObject jObject = JSON.parseObject(message);
        	if (jObject.getString("event").contains("instant?type=SMS")) {
	        	InstantMessageEvent notification = JSON.parseObject( message, InstantMessageEvent.class);
	        	InstantMessageEventBody body = notification.body;
	        	System.out.println(body.subject);
        	}
        });

        subscription.subscribe();
        System.out.println("Ready to receive incoming SMS via PubNub.");

        try {
            while (true)
            {
                Thread.sleep(10000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### Run Your App

You are almost done. Now run your app from Eclipse and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
