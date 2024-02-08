style: quick-start

# PubNub notifications Quick Start

{! mdx_includes/pubnub-deprecation.md !}

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you subscribe for PubNub push notifications using our Push Notifications API, which allows your application receiving notifications on a selected events. Let's get started.

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Push+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&grantType=JWT&&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Notifications App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>WebhookSubscriptions</li>
    <li>SMS</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples.md). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../getting-started/create-credential.md) for yourself

## Subscribe to a push notification

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
	$ npm install @ringcentral/subscriptions-deprecated --save
	$ npm install dotenv --save
    ```

    ### Create and edit pubnub-notification.js

    Create a file called <tt>pubnub-notification.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```javascript
    {!> code-samples/pubnub/quick-start.js !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node pubnub-notification.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Create and Edit pubnub_notification.py

    Create a file called <tt>pubnub_notification.py</tt> using the contents below.

    ```python
    {!> code-samples/pubnub/quick-start.py !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python pubnub_notification.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit pubnub-notification.php

    Create a file called <tt>pubnub-notification.php</tt> using the contents below.

    ```php
    {!> code-samples/pubnub/quick-start.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bask
    $ php pubnub-notification.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "PubNub_Notifications"
    * Add NuGet package RingCentral.Net (4.1.0) SDK
    * Add NuGet package RingCentral.Net.PubNubPCL (1.3.1) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```c#
    {!> code-samples/pubnub/quick-start.cs !} 
    ```

    ### Run your app

    You are almost done. Now run your app from Visual Studio and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "PubNub_Notifications"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json hl_lines="3 4",linenums="1"
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
        compile 'com.ringcentral:ringcentral-pubnub:1.0.0'
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
    {!> code-samples/java-samples/src/main/java/com/ringcentral/PubNubQuickStart.java !} 
    ```

    ### Run your app

    You are almost done. Now run your app from Eclipse.

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit pubnub_notification.rb

    Create a file called <tt>pubnub_notification.rb</tt> using the contents below.

    ```ruby
    {!> code-samples/pubnub/quick-start.rb !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby pubnub_notification.rb
    ```

