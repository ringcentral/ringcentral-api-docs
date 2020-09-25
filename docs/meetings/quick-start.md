no_breadcrumb:true
style: quick-start

# Meetings Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you creating a meeting on the platform in just a few minutes. Let's get started.

!!! warning "This is for RingCentral Meetings. Looking for the RingCentral Video API?"
     This guide to creating meetings is designed for **RingCentral Meetings**. If you are looking to get started using our built-from-the-ground-up RingCentral Video API, [request access today](https://forms.gle/Pk7pNMwky8di5LCR8)!

??? check "Meetings Permission Required"
     In order to use this API, developers must have a paid RingCentral account. This API is not available to free developer accounts.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Meetings App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Meetings App</a>
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
    <li>Meetings</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Meeting

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
    ```

    ### Create and Edit meetings.js

    Create a file called `meetings.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```javascript
    const SDK = require('@ringcentral/sdk').SDK

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    var rcsdk = new SDK( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
    var platform = rcsdk.platform();
    platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )

    platform.on(platform.events.loginSuccess, () => {
          start_meeting()
    });

    async function start_meeting(){
      try{
        var endpoint = "/restapi/v1.0/account/~/extension/~/meeting"
        var resp = await platform.post(endpoint, {
                  topic: 'Test Meeting',
                  meetingType: 'Instant',
                  allowJoinBeforeHost: true,
                  startHostVideo: true,
                  startParticipantsVideo: false

            })
        var jsonObj = await resp.json()
        console.log( 'Start Your Meeting: ' + jsonObj.links.startUri )
        console.log( 'Meeting id: ' + jsonObj.id )
      }catch(e){
        console.log(e.message)
      }
    }
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ node meetings.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    ### Create and Edit meetings.py

    Create a file called `meetings.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
    from ringcentral import SDK

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    platform = rcsdk.platform()
    platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

    params = {
        'topic': 'Test Meeting 1',
        'meetingType': 'Instant',
        'allowJoinBeforeHost': True,
        'startHostVideo': True,
        'startParticipantsVideo' : False
    }
    try:
        resp = platform.post('/restapi/v1.0/account/~/extension/~/meeting', params)
        print "Start Your Meeting: " + resp.json().links.startUri
        print "Join the Meeting: " + resp.json().links.joinUri
    except Exception as err:
        print("Exception: " + err.message)
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ python meetings.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit meetings.php

    Create a file called `meeting.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```PHP
    <?php
    require('vendor/autoload.php');

    $RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
    $RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
    $RINGCENTRAL_SERVER = 'https://platform.ringcentral.com';

    $RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
    $RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
    $RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

    $rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

    $platform = $rcsdk->platform();
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

    $params = array(
        'topic' => 'Test Meeting',
        'meetingType' => 'Instant',
        'allowJoinBeforeHost' => true,
        'startHostVideo' => true,
        'startParticipantsVideo' => false
        );
    try {
      $resp = $platform->post('/account/~/extension/~/meeting', $params);
      print_r ('Start Your Meeting: ' . $resp->json()->links->startUri . "\n");
      print_r ('Join the Meeting: ' . $resp->json()->links->joinUri . "\n");
    } catch (Exception $e) {
      print_r ("An error occurred: " . $e->getMessage() . "\n");
    }
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ php meetings.php
    ```


=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "Create_Meeting"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ``` c#
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace Create_Meeting
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
                create_meeting().Wait();
            }
            static private async Task create_meeting()
            {
                var parameters = new MeetingRequestResource();
                parameters.topic = "Test Meeting";
                parameters.meetingType = "Instant";
                parameters.allowJoinBeforeHost = true;
                parameters.startHostVideo = true;
                parameters.startParticipantsVideo = false;

                var resp = await restClient.Restapi().Account().Extension().Meeting().Post(parameters);
                Console.WriteLine("Start Your Meeting: " + resp.links.startUri);
                Console.WriteLine("join the Meeting: " + resp.links.joinUri);
            }
        }
    }
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Create_Meeting"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json hl_lines="3",linenums="1"
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
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
        static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

        static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";
        static RestClient restClient;

        public static void main(String[] args) {
            var obj = new Create_Meeting();
            try {
              restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
              restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
              obj.createMeeting();
            } catch (RestException | IOException e) {
              e.printStackTrace();
            }
        }

        public void createMeeting() throws RestException, IOException{
            MeetingRequestResource parameters = new MeetingRequestResource();
            parameters.topic = "Instant Meeting";
            parameters.meetingType = "Instant";
            parameters.allowJoinBeforeHost = true;
            parameters.startHostVideo = true;
            parameters.startParticipantsVideo = false;

            var response = restClient.restapi().account().extension().meeting().post(parameters);
            System.out.println("Start Your Meeting: " + response.links.startUri);
            System.out.println("Join the Meeting: " + response.links.joinUri);
        }
    }
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ rem install ringcentral-sdk
    ```

    ### Create and Edit meetings.rb

    Create a file called `meetings.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
    require 'ringcentral'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

    resp = rc.post('/restapi/v1.0/account/~/extension/~/meeting', payload: {
        topic: 'Ruby Meeting 1',
        meetingType: 'Instant',
        allowJoinBeforeHost: true,
        startHostVideo: true,
        startParticipantsVideo: false
    })

    puts "Start Your Meeting: " + resp.body['links']['startUri']
    puts "Join the Meeting: " + resp.body['links']['joinUri']
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ ruby meetings.rb
    ```


## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=meetings">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>
