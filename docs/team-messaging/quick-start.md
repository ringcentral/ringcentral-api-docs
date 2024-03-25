no_breadcrumb:true
style: quick-start
contributors: ylecuyer

# Create Team Messaging Team Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new RingCentral team in just a few minutes. Let's get started.

## Create app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Team App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Team+Messaging+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Team+messaging+team&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Team+Messaging&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Team App</a>
<a class="btn-link btn-collapse" data-bs-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Team Messaging</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file

Follow the instructions found in our guide to [running Developer Guide code samples](../basics/code-samples.md). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../getting-started/create-credential.md) for yourself

## Create a Team

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk dotenv --save
    ```

    ### Create and edit create-team.js

    Create a file called `create-team.js` using the contents below.

    ```JavaScript
    {!> code-samples/team-messaging/quick-start.js [ln:1-48] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node create-team.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Create and Edit create-team.py

    Create a file called `create-team.py` using the contents below.

    ```python
    {!> code-samples/team-messaging/quick-start.py [ln:1-43] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python create-team.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit create-team.php

    Create a file called `create-team.php` using the contents below.

    ```PHP
    {!> code-samples/team-messaging/quick-start.php [ln:1-48] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php create-team.php
    ```

=== "Ruby"

    ### Install RingCentral SDK gem

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and Edit create-team.rb

    Create a file called `create-team.rb` using the contents below.

    ```ruby
    {!> code-samples/team-messaging/quick-start.rb [ln:1-42] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby create-team.rb
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1 or higher version
    * Enter project name "Create_Team"
    * Add NuGet package RingCentral.Net (6.0.0) SDK
    * Save the .env file under your project folder. E.g. /Create_Team/bin/Debug/netcoreapp2.2/.env

    ### Edit the file Program.cs

    ```c#
    {!> code-samples/team-messaging/quick-start.cs !}
    ```

    ### Run your code

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "CreateTeam"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
    dependencies {
        // ...
        implementation 'com.ringcentral:ringcentral:3.0.0'
    }
    ```

    * On Eclipse menu, select "Run" and choose the "Run Configurations" and in the dialog, select your project and select the "Environments" tab then enter the following variables:
        - RC_CLIENT_ID
        - RC_CLIENT_SECRET
        - RC_SERVER_URL
        - RC_JWT

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Edit the file 'CreateTeam.java'

    ```java
    {!> code-samples/team-messaging/quick-start.java !}
    ```

    ### Build & Run Your Code

    You are almost done. Now run your app from Eclipse.


### Check the newly created team

Login to your account at https://app.devtest.ringcentral.com (use https://app.ringcentral.com if you test on your production) to see the newly created team.


## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://community.ringcentral.com/search.html?c=8&includeChildren=false&f=&type=question&redirect=search%2Fsearch&sort=relevance&q=posting+messages">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../basics/your-first-steps/">Take your next step &raquo;</a>
