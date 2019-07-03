no_breadcrumb:true

# Meetings Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you creating a meeting on the platform in just a few minutes. Let's get started.

!!! warning "Meetings Permission Required"
     In order to use this API, developers must have a paid RingCentral account. This API is not available to free developer accounts.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Meetings App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=" class="btn btn-primary">Create Meetings App</a>
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
    <li>Meetings</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Meeting

### Create a Java project (using Eclipse IDE)

* Create a new Java project
* Select the Gradle Project wizard
* Enter project name "Create_Meeting"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
}
```

* Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "Create_Meeting"

```java
package Create_Meeting;

public class Create_Meeting {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "Create_Meeting.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials.

```java
package Create_Meeting;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;


public class Create_Meeting {
    String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

    String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

  	public static void main(String[] args) {
        var obj = new Create_Meeting();
    		try {
          obj.createMeeting();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

  	public void createMeeting() throws RestException, IOException{
        RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
        rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

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
```

### Run Your App

You are almost done. Now run your app from Eclipse.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.

## Troubleshooting

> I got the error: "Error: In order to call this API endpoint, user needs to have [Meetings] permission." What is going wrong?

The Meetings API is not available to free developer accounts. In order to use this API, please sign-up for a paid RingCentral account, which can be made available on a free trial basis.
