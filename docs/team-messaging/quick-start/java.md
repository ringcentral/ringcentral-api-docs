no_breadcrumb:true

# Create Glip Team Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new Glip team in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Glip+Team+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Glip+team&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Glip&redirectUri=" class="btn btn-primary">Create Glip Team App</a>
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
    <li>Glip</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Glip team

### Create a Java project (using Eclipse IDE)

* Create a new Java project
* Select the Gradle Project wizard
* Enter project name "Create_Glip_Team"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
}
```

* Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "Create_Glip_Team"

```java
package Create_Glip_Team;

public class Create_Glip_Team {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "Create_Glip_Team.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```java
package Create_Glip_Team;

import java.io.IOException;

import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.util.HashMap;

public class Create_Glip_Team {
    static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
    static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
    static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

    static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
    static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
    static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

  	public static void main(String[] args) {
    		try {
          create_glip_team();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

  	public static void create_glip_team() throws RestException, IOException{
        RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
        rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

        var parameters = new GlipPostTeamBody();
        parameters._public = true;
        parameters.name = "Fun team";
        parameters.description = "Let chit chat here";

        HashMap<String, String> members = new HashMap<String, String>();
        members.put("email", "member.1@gmail.com");
        members.put("email", "member.2@gmail.com");

        parameters.members = new HashMap[] { members };

        var response = rc.restapi().glip().teams().post(parameters);
        String jsonStr = JSON.toJSONString(response);
        System.out.println(jsonStr);
    }
}
```

### Run Your Code

You are almost done.  Now run your app from Eclipse. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
