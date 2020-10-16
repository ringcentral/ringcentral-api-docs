no_breadcrumb:true
style: quick-start
contributors: ylecuyer

# Create Team Messaging Team Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new RingCentral team in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Glip+Team+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Glip+team&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Glip&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Team App</a>
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

## Create a Team

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
    ```

    ### Create and Edit create-team.js

    Create a file called `create-team.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```JavaScript
    {!> code-samples/team-messaging/quick-start.js !}
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ node create-team.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    ### Create and Edit create-team.py

    Create a file called `create-team.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
    {!> code-samples/team-messaging/quick-start.py !}
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ python create-team.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit create-team.php

    Create a file called `create-team.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```PHP
    {!> code-samples/team-messaging/quick-start.php !}
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ php create-team.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "Create_Team"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```c#
    {!> code-samples/team-messaging/quick-start.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Create_Team"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
    }
    ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "Create_Team"

    ```java
    package Create_Team;

    public class Create_Team {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "Create_Team.java".

    Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```java
    {!> code-samples/team-messaging/quick-start.java !}
    ```

    ### Run Your Code

    You are almost done.  Now run your app from Eclipse. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

=== "Ruby"

    ### Install RingCentral SDK gem

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and Edit create-team.rb

    Create a file called `create-team.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
    {!> code-samples/team-messaging/quick-start.rb !}
    ```

    ### Run Your Code

    You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

    ```bash
    $ ruby create-team.rb
    ```

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=glip">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>
