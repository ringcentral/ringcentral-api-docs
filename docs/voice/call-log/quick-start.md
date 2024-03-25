style: quick-start

# Call Log Quick Start

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](../../getting-started/index.md)."

In this quick start, we are going to help you access your company's call log, or a detailed audit of all the calls that have been routed through your account. Let's get started.

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Call Log App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Call+Log+Quick+Start+App&desc=A+simple+app+to+demo+loading+your+accounts+call+log&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadCallLog&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Call Log App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Read Call Log</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file

Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples.md). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above, paying close attention to the following:
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../getting-started/create-credential.md) for yourself

## Access your company's call log

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-log.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/call-log.py [ln:1-38] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/call-log.php [ln:1-42] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/call-log.rb [ln:1-40] !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/call-log.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/voice/ReadUserCallLog.java !}
    ```
