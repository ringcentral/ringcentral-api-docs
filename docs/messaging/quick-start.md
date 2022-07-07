no_breadcrumb:true
style: quick-start

# SMS Quick Start

!!! info "Things to know before you begin"
    
    * SMS prices [changed in 2022](https://support.ringcentral.com/article/Enhanced-Business-SMS-new-Price-Changes.html).
	* Our [SMS content and messaging policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html) will help you stay compliant.
	* When you are finished with this quick start, checkout our [SMS Best Practices Guide](../sms/best-practices/).

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you send your first SMS on the platform in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadAccounts&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create SMS App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>SMS</li>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above..

## Send an SMS

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk dotenv --save
    ```

    ### Create and edit sms.js

    Create a file called `sms.js`. Be sure the values in your `.env` file have been set properly, including the `SMS_RECIPIENT` variable. 

    ```javascript
    {!> code-samples/messaging/quick-start.js !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node sms.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Create and edit sms.py

    Create a file called `sms.py`. Be sure the values in your `.env` file have been set properly, including the `SMS_RECIPIENT` variable. 

    ```python
    {!> code-samples/messaging/quick-start.py !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python sms.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit sms.php

    Create a file called `sms.php`. Be sure the values in your `.env` file have been set properly, including the `SMS_RECIPIENT` variable. 

    ```php
    {!> code-samples/messaging/quick-start.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php sms.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 5.x or 6.x
    * Enter project name "Send_SMS"
    * Add NuGet package [RingCentral.Net SDK](https://www.nuget.org/packages/RingCentral.Net)

    ### Edit the file "Program.cs"

    Be sure to have all the enviornment variables set in your OS as shown in ALL CAPS for your app, user credentials and recipeint phone number.

    ```C#
    {!> code-samples/messaging/quick-start.cs !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Visual Studio.


=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Send_SMS"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

        ```json
        dependencies {
            // ...
            implementation 'com.ringcentral:ringcentral:2.8.6'
        }
        ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "Send_SMS"

    ```java
    package SendSMSQuickStart;

    public class SendSMSQuickStart {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "SendSMSQuickStart.java".

    Be sure to have all the enviornment variables set in your OS as shown in ALL CAPS for your app, user credentials and recipeint phone number.

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/SendSMSQuickStart.java !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.


=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit sms.rb

    Create a file called `sms.rb`. Be sure the values in your `.env` file have been set properly, including the `SMS_RECIPIENT` variable. 

    ```ruby
    {!> code-samples/messaging/quick-start.rb !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby sms.rb
    ```

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://community.ringcentral.com/search.html?c=8&includeChildren=false&f=&type=question&redirect=search%2Fsearch&sort=relevance&q=sms">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../basics/your-first-steps/">Take your next step &raquo;</a>
