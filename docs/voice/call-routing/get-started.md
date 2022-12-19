# Get Started with Call Routing

To help you get started using the Call Routing API, the following code samples have been provided. These code samples perform the simple function of listing the call answering rules associated with the current user. This code sample is based on our [Voice quick start guides](../../quick-start). If you have not completed that guide, we recommend you do so first, as this is an abbreviated version of that guide.

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Call Routing App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Call+Routing+Quick+Start+App&desc=A+simple+app+to+demo+call+answering+rules+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadAccounts&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Call Routing App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read User Call Answering Rules

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-routing.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/call-routing.py !}
    ```
    
=== "PHP"

    ```php
    {!> code-samples/voice/call-routing.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/call-routing.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/ReadUserAnsweringRules.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/call-routing.rb !}
    ```
