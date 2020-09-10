no_breadcrumb:true
style: quick-start

# PubNub Notifications JavaScript Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you subscribe for PubNub push notifications using our Push Notifications API, which allows your application receiving notifications on a selected events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Push+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Notifications App</a>
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
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Subscribe to a push notification

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk @ringcentral/subscriptions --save
    ```

    ### Create and Edit pubnub-notification.js

    Create a file called <tt>pubnub-notification.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```javascript
    const SDK = require('@ringcentral/sdk').SDK
    const Subscriptions = require('@ringcentral/subscriptions').Subscriptions

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
    var subscriptions = new Subscriptions({
       sdk: rcsdk
    });
    var subscription = subscriptions.createSubscription({ pollInterval: 10 * 1000, renewHandicapMs: 2 * 60 * 1000 });

    platform.login({
        username: RINGCENTRAL_USERNAME,
        password: RINGCENTRAL_PASSWORD,
        extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        subscribe_for_SMS_notification()
    });

    function subscribe_for_SMS_notification(){
        subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'])
        .register()
        .then(function(subscriptionResponse) {
            console.log("Ready to receive incoming SMS via PubNub.")
        })
        .catch(function(e) {
            console.error(e);
            throw e;
        });
    }

    subscription.on(subscription.events.notification, function(msg) {
        console.log(msg.body);
    });
    ```

    ### Run Your Code

    You are almost done. Now run your script and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

    ```bash
    $ node pubnub-notification.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    ### Create and Edit pubnub_notification.py

    Create a file called <tt>pubnub_notification.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```python
    from multiprocessing import Process
    from time import sleep
    from ringcentral.subscription import Events
    from ringcentral import SDK

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    platform = rcsdk.platform()
    platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

    def on_message(msg):
        print (msg)

    def pubnub():
        try:
            s = rcsdk.create_subscription()
            s.add_events(['/account/~/extension/~/message-store/instant?type=SMS'])
            s.on(Events.notification, on_message)
            res = s.register()
            try:
                print("Wait for notification...")
            except Exception as e:
                print (e)
            while True:
                sleep(0.1)

        except KeyboardInterrupt:
            print("Pubnub listener stopped...")

    p = Process(target=pubnub)
    try:
        p.start()
    except KeyboardInterrupt:
        p.terminate()
        print("Stopped by User")
    ```

    ### Run Your Code

    You are almost done. Now run your script and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

    ```bash
    $ python pubnub_notification.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit pubnub-notification.php

    Create a file called <tt>pubnub-notification.php</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```
    <?php
    require('vendor/autoload.php');
    use RingCentral\SDK\Subscription\Events\NotificationEvent;
    use RingCentral\SDK\Subscription\Subscription;

    $RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    $RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    $RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    $RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    $RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    $RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    $rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

    $platform = $rcsdk->platform();
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

    $subscription = $rcsdk->createSubscription();
    $subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));
    $subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $e) {
        print_r($e->payload()['body']);
    });
    $subscription->setKeepPolling(true);
    $subscription->register();
    ```

    ### Run Your Code

    You are almost done. Now run your script and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

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

    ```dotnet
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace PubNub_Notifications
    {
        class Program
        {
            const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
            const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

            const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
            const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
            const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

            static RestClient rcsdk = null;

            static void Main(string[] args)
            {
                rcsdk = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
                rcsdk.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
                pubnub_notification().Wait();
            }
            static private async Task pubnub_notification()
            {
                try
                {
                    var eventFilters = new[]
                    {
                        "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
                    };
                    var subscription = new Subscription(rcsdk, eventFilters, message =>
                    {
                        var jsonObj = JObject.Parse(message);
                        if (jsonObj["event"].ToString().Contains("instant?type=SMS"))
                        {
                            Console.WriteLine(jsonObj["body"]["subject"]);
                        }
                    });
                    var subscriptionInfo = await subscription.Subscribe();
                    Console.WriteLine("Ready to receive incoming SMS via PubNub.");
                    while (true)
                    {
                        Thread.Sleep(5000);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
        }
    }
    ```

    ### Run Your App

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
    package PubNub_Notifications;

    import java.io.IOException;

    import com.ringcentral.*;
    import com.ringcentral.definitions.*;
    import com.ringcentral.pubnub.Subscription;

    public class PubNub_Notifications {
        static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

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
              	var gs = new Gson();
              	if (message.contains("instant?type=SMS")) {
      	        	InstantMessageEvent notification = gs.fromJson( message, InstantMessageEvent.class);
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

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and Edit pubnub_notification.rb

    Create a file called <tt>pubnub_notification.rb</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
    require 'ringcentral'
    require 'subscription'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    $rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    $rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

    def createSubscription(callback)
        events = [
            '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
        ]
        subscription = PubNub.new($rc, events, lambda { |message|
            callback.call(message)
        })
        subscription.subscribe()
        puts "Waiting for incoming SMS message ..."
        while 1
            sleep(5)
        end
    end

    createSubscription(lambda { |msg|
        puts msg
    })

    ```

    ### Run Your Code

    You are almost done. Now run your script and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

    ```bash
    $ ruby pubnub_notification.rb
    ```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
