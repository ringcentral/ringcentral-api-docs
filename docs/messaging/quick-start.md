style: quick-start

# SMS Quick Start

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](../getting-started/index.md)."

!!! hint "Enabling the phone numbers in your account for SMS"
    As a participating [TCR CSP](https://www.campaignregistry.com/), RingCentral is dedicated to providing the highest quality of service, while working to eliminate spam, phishing, and fraudulent messages. To help ensure these goals are met, RingCentral requires customers to follow the [TCR process](https://support.ringcentral.com/article-v2/Setting-up-TCR-registration-assigning-numbers-to-SMS-campaigns.html?brand=RingCentral&product=MVP&language=en_US&pills-nav=brand) to enable their account to send SMS. To learn more, read our [TCR FAQ](https://support.ringcentral.com/article-v2/TCR-business-registration-FAQ.html?brand=RingCentral&product=MVP&language=en_US).

    In addition, reading our [SMS content and messaging policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html) may also help you in staying compliant.

In this Quick Start, we are going to help you send your first SMS on the platform in just a few minutes. Let's get started.

## Create app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadAccounts&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create SMS App</a>
<a class="btn-link btn-collapse" data-bs-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow"
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

Follow the instructions found in our guide to [running Developer Guide code samples](../basics/code-samples.md). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../getting-started/create-credential.md) for yourself
     * `SMS_RECIPIENT` - for code testing purpose, we set the recipient's phone number to this environment variable. You can set the phone number via this variable, or you can set it directly on your code.

## Send an SMS

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk dotenv --save
    ```

    ### Create and edit sms.js

    Create a file called `sms.js`.

    ```javascript
    {!> code-samples/messaging/quick-start.js [ln:1-109] !}
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

    Create a file called `sms.py`.

    ```python
    {!> code-samples/messaging/quick-start.py [ln:1-80]!}
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

    Create a file called `sms.php`.

    ```php
    {!> code-samples/messaging/quick-start.php [ln:1-96] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php sms.php
    ```

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit sms.rb

    Create a file called `sms.rb`.

    ```ruby
    {!> code-samples/messaging/quick-start.rb [ln:1-86]!}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby sms.rb
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1 or higher version
    * Enter project name "Send_SMS"
    * Add NuGet package RingCentral.Net (6.0.0) SDK
    * Save the .env file under your project folder. E.g. /Send_SMS/bin/Debug/netcoreapp2.2/.env

    ### Edit the file Program.cs

    ```c#
    {!> code-samples/messaging/quick-start.cs !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Visual Studio.


=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "SendSMS"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

        ```json
        dependencies {
            // ...
            compile 'com.ringcentral:ringcentral:3.0.0'
        }
        ```

    * On Eclipse menu, select "Run" and choose the "Run Configurations" and in the dialog, select your project and select the "Environments" tab then enter the following variables:
        - RC_CLIENT_ID
        - RC_CLIENT_SECRET
        - RC_SERVER_URL
        - RC_JWT
        - SMS-RECIPIENT

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "SendSMS"

    ```java
    package SendSMS;

    public class SendSMS {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "SendSMS.java".

    ```java
    {!> code-samples/messaging/quick-start.java !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://community.ringcentral.com/search.html?c=8&includeChildren=false&f=&type=question&redirect=search%2Fsearch&sort=relevance&q=sms">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../basics/your-first-steps/">Take your next step &raquo;</a>
