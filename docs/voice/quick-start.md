no_breadcrumb:true
style: quick-start

# RingOut Quick Start

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

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
    ```

    ### Create and Edit ringout.js

    Create a file called <tt>ringout.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    RECIPIENT = '<ENTER PHONE NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    var rcsdk = new RingCentral( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
    var platform = rcsdk.platform();
    platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )
    
    platform.on(platform.events.loginSuccess, function(response){
      call_ringout()
    })

    async function call_ringout() {
      try{
        var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
            'from' : { 'phoneNumber': RINGCENTRAL_USERNAME },
            'to'   : {'phoneNumber': RECIPIENT},
            'playPrompt' : false
          })
        var jsonObj = await resp.json()
        console.log("Call placed. Call status: " + jsonObj.status.callStatus)
      }catch(e){
        console.log(e.message)
      }
    }
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ node ringout.js
    ```

=== "Python"

    from ringcentral import SDK

    RECIPIENT = '<ENTER PHONE NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    platform = rcsdk.platform()
    platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

    resp = platform.post('/restapi/v1.0/account/~/extension/~/ring-out',
                  {
                      'from' : { 'phoneNumber': RINGCENTRAL_USERNAME },
                      'to'   : {'phoneNumber': RECIPIENT},
                      'playPrompt' : False
                  })
    print "Call placed. Call status: " + resp.json().status.callStatus              
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ python ringout.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit ringout.php

    Create a file called <tt>ringout.php</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```php
    <?php
    require('vendor/autoload.php');

    $RECIPIENT = '<ENTER PHONE NUMBER>';

    $RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
    $RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
    $RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

    $RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
    $RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
    $RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

    $rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

    $platform = $rcsdk->platform();
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

    $resp = $platform->post('/account/~/extension/~/ring-out',
        array(
          'from' => array('phoneNumber' => $RINGCENTRAL_USERNAME),
          'to' => array('phoneNumber' => $RECIPIENT),
          'playPrompt' => false
        ));

    print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
    ?>
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ php ringout.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "Call_Ringout"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ``` c#
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace Call_Ringout
    {
      class Program
      {
        const string RECIPIENT = "<ENTER PHONE NUMBER>";

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
            call_ringout().Wait();
        }

        static private async Task call_ringout()
        {
          var parameters = new MakeRingOutRequest();
          parameters.from = new MakeRingOutCallerInfoRequestFrom { phoneNumber = RINGCENTRAL_USERNAME };
          parameters.to = new MakeRingOutCallerInfoRequestTo {  phoneNumber = RECIPIENT } ;
          parameters.playPrompt = false;

          var resp = await restClient.Restapi().Account().Extension().RingOut().Post(parameters);
          Console.WriteLine("Call Placed. Call status" + resp.status.callStatus);
        }
      }
    }
    ```

    ### Run Your App

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Call_RingOut"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json hl_lines="3",linenums="1"
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
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

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and Edit ringout.rb

    Create a file called <tt>ringout.rb</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```ruby
    require 'ringcentral'

    RECIPIENT = '<ENTER PHONE NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

    resp = rc.post('/restapi/v1.0/account/~/extension/~/ring-out', payload: {
        from: { phoneNumber: RINGCENTRAL_USERNAME },
        to: { phoneNumber: RECIPIENT },
        playPrompt: false
    })

    puts "Call placed. Call status: " + resp.body['status']['callStatus']
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ ruby ringout.rb
    ```


## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=voice">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>
