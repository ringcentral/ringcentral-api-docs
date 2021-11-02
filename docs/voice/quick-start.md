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
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>RingOut</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
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

    ### Download and edit a `.env` file
	
	Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
	1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
	2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above..

    ### Create and edit ringout.js

    Create a file called `ringout.js`. Be sure the values in your `.env` file have been set properly, including the `RINGOUT_RECIPIENT` variable. 

    ```javascript
    {!> code-samples/voice/quick-start.js !}
    ```

    ### Run your code

    You are almost done. Now, load your variables into your local environment, and run your script.

    ```bash
	$ source .env
    $ node ringout.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Download and edit a `.env` file
	
	Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
	1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
	2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above..

    ### Create and edit ringout.py

    Create a file called `ringout.py`. Be sure the values in your `.env` file have been set properly, including the `RINGOUT_RECIPIENT` variable. 

    ```python
    {!> code-samples/voice/quick-start.py !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python ringout.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Download and edit a `.env` file
	
	Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
	1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
	2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above..

    ### Create and edit ringout.php

    Create a file called `ringout.php`. Be sure the values in your `.env` file have been set properly, including the `RINGOUT_RECIPIENT` variable. 

    ```php
    {!> code-samples/voice/quick-start.php !}
    ```

    ### Run your code

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
    {!> code-samples/voice/quick-start.cs !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Call_RingOut"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
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
    {!> code-samples/voice/quick-start.java !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Download and edit a `.env` file
	
	Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
	1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
	2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above..

    ### Create and edit ringout.rb

    Create a file called `ringout.rb`. Be sure the values in your `.env` file have been set properly, including the `RINGOUT_RECIPIENT` variable. 

    ```ruby
    {!> code-samples/voice/quick-start.rb !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby ringout.rb
    ```

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=voice">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../basics/your-first-steps/">Take your next step &raquo;</a>
