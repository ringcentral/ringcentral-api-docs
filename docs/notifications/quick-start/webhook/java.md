no_breadcrumb:true

# Webhook Notifications Java Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a Webhook push notifications app using our Push Notifications API, which allows your application receiving notifications on instant SMS message events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Webhook+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,SMS&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Notifications App</a>
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
    <li>WebhookSubscriptions, SMS</li>
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
* Enter project name "WebHook"
* Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

```json hl_lines="3",linenums="1"
dependencies {
    // ...
    compile 'com.ringcentral:ringcentral:1.0.0-beta10'
}
```

### Create a new Java Class

Select "File -> New -> Class" to create a new Java class named "SubscribeForWebHookNotification"

```java
package SubscribeForWebHookNotification;

public class SubscribeForWebHookNotification {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
}
```

### Edit the file "SubscribeForWebHookNotification.java".

Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

Run ngrok to create a localhost tunnel

```bash
$ ngrok http 5000
```

Copy the forwarding address e.g. https://54a0541a.ngrok.io and paste it into the DELIVERY_ADDRESS variable in the code below.

```java
package com.ringcentral;

import java.io.IOException;

import com.ringcentral.RestException;
import com.ringcentral.definitions.CreateSubscriptionRequest;
import com.ringcentral.definitions.NotificationDeliveryModeRequest;

public class SubscribeForWebHookNotification
{
    public static void main(String[] args) throws IOException, RestException
    {
        String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

        String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION";

        String DELIVERY_ADDRESS = "<https://xxxxxxxxx.ngrok.io>";

        RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER_URL);
        rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
        var eventFilters = new String[]{"/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"}
        CreateSubscriptionRequest createSubscriptionRequest = new CreateSubscriptionRequest()
            .eventFilters(eventFilters)
            .deliveryMode( new NotificationDeliveryModeRequest()
                .transportType("WebHook")
                .address(DELIVERY_ADDRESS)
                );
        var result = rc.restapi().subscription().post(createSubscriptionRequest);
        System.out.println(result.id);
        System.out.println("WebHook Ready");
        rc.revoke();
    }
}
```

### Create a WebHookServer

We use Jetty embedded for our server. You can get it [here](https://www.eclipse.org/jetty/documentation/current/advanced-embedding.html).

Browse to the `WebHook` project folder and create a WebHookServer project

```
$ cd WebHook
$ curl -o jetty-all-uber.jar https://repo1.maven.org/maven2/org/eclipse/jetty/aggregate/jetty-all/9.4.19.v20190610/jetty-all-9.4.19.v20190610-uber.jar
$ touch WebhookServer.java
$ open WebhookServer.java
```

Edit the `WebhookServer.java` with code below:

```Java
package com.ringcentral;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;

public class WebhookServer extends AbstractHandler
{
    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException
    {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader("Validation-Token", request.getHeader("Validation-Token"));
        if(request.getMethod() == "POST")
        {
            String body = request.getReader().lines().collect(java.util.stream.Collectors.joining(System.lineSeparator()));
            System.out.println(body);
        }
        response.getWriter().println("OK");
        baseRequest.setHandled(true);
    }

    public static void main( String[] args ) throws Exception
    {
        Server server = new Server(5000);
        server.setHandler(new WebHookServer());
        server.start();
        server.join();
    }
}
```

### Build and run the WebHook Server

```bash
$ mkdir classes
$ javac -d classes -cp jetty-all-uber.jar WebHookServer.java
$ java -cp classes:jetty-all-uber.jar com.ringcentral.WebHookServer
```

Now run the SubscribeForWebHookNotification app from Eclipse.

Send an sms to `RINGCENTRAL_USERNAME` phone number, and watch the output on the WebHookServer terminal window.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
