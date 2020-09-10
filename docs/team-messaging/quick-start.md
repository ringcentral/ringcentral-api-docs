no_breadcrumb:true
style: quick-start

# Create Glip Team Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new Glip team in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Glip+Team+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Glip+team&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Glip&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Glip Team App</a>
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
    <li>Glip</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Glip team

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
    ```

    ### Create and Edit create-glip-team.js

    Create a file called `create-glip-team.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```JavaScript
    const SDK = require('@ringcentral/sdk').SDK

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
    platform.login({
        username: RINGCENTRAL_USERNAME,
        password: RINGCENTRAL_PASSWORD,
        extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        create_glip_team()
    });

    function create_glip_team(){
        var endpoint = "/restapi/v1.0/glip/teams"
        var params = {
            public: true,
            name: "Fun team",
            members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
            description: "Let chit chat here"
          }
        platform.post(endpoint, params)
          .then(function(resp) {
            return resp.json()
          })
          .then(function(json){
              console.log(JSON.stringify(json))
          })
          .catch(function(e){
              console.log(e)
          })
    }
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ node create-glip-team.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    ### Create and Edit create-glip-team.py

    Create a file called `create-glip-team.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
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

    endpoint = "/restapi/v1.0/glip/teams"
    params = {
        "public": True,
        "name": "Fun team",
        "members": [{ "email": "member.1@gmail.com"}, {"email":"member.2@gmail.com"}],
        "description": "Let chit chat here"
    }
    resp = platform.post(endpoint, params)
    print(resp.text())
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ python create-glip-team.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit create-glip-team.php

    Create a file called `create-glip-team.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```PHP
    <?php
    require(__DIR__ . 'vendor/autoload.php');

    $RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
    $RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
    $RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

    $RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
    $RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
    $RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

    $rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

    $platform = $rcsdk->platform();
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

    $endpoint = "/restapi/v1.0/glip/teams";
    $params = array(
          "public" => true,
          "name" => "Fun team",
          "members" => array(array("email" => "member.1@gmail.com"),
                              array("email" => "member.2@gmail.com")),
          "description" => "Let chit chat here"
    );

    $resp = $platform->post($endpoint, $params);
    print($resp->text());
    ?>
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ php create-glip-team.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "Create_Glip_Team"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ``` c#
    using System;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using RingCentral;
    using Newtonsoft.Json;

    namespace Create_Glip_Team
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
                create_glip_team().Wait();
            }
            static private async Task create_glip_team()
            {
                var parameters = new GlipPostTeamBody();
                parameters.@public = true;
                parameters.name = "Fun team";
                parameters.description = "Let chit chat here";

                var member1 = new CreateGlipMember();
                member1.email = "member.1@gmail.com";
                var member2 = new CreateGlipMember();
                member2.email = "member.2@gmail.com";
                parameters.members = new CreateGlipMember[] { member1, member2 };

                var response = await restClient.Restapi().Glip().Teams().Post(parameters);
                var jsonStr = JsonConvert.SerializeObject(response);
                Console.WriteLine(jsonStr);
            }
        }
    }
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Create_Glip_Team"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json hl_lines="3",linenums="1"
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
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

    public class Create_Glip_Team {
        static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

        static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

        static RestClient restClient;
        public static void main(String[] args) {
            var obj = new Create_Glip_Team();
            try {
              restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
              restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
              obj.create_glip_team()();
            } catch (RestException | IOException e) {
              e.printStackTrace();
            }
        }
        public void create_glip_team() throws RestException, IOException{
            var parameters = new GlipPostTeamBody();
            parameters._public = true;
            parameters.name = "Fun team";
            parameters.description = "Let chit chat here";

            var member1 = new CreateGlipMember();
            member1.email = "member.1@gmail.com";
            var member2 = new CreateGlipMember();
            member2.email = "member.2@gmail.com";
            parameters.members = new CreateGlipMember[] { member1, member2 };

            var response = restClient.restapi().glip().teams().post(parameters);
            Gson gson = new Gson();
            String jsonStr = gson.toJson(response);
            System.out.println(jsonStr);
        }
    }
    ```

    ### Run Your Code

    You are almost done.  Now run your app from Eclipse. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

=== "Ruby"

    ### Install RingCentral SDK gem

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and Edit create-glip-team.rb

    Create a file called `create-glip-team.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
    require 'ringcentral'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

    resp = rc.post('/restapi/v1.0/glip/teams', payload: {
        public: true,
        name: "Fun team",
        members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
        description: "Let chit chat here"
    })

    puts resp.body
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ ruby create-glip-team.rb
    ```


## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=glip">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>
