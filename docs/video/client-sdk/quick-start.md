style: quick-start

# RingCentral Video Client SDK Quick Start

{! mdx_includes/video-beta-notice.md !}

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system, developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and video.

In this Quick Start, we are going to help you create your first application powered by a RingCentral Video Client SDK in just a few minutes. Let's get started.

## Create an application and obtain app credentials

The first thing you need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Video App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Video+SDK+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+video+application+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Video&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Video App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Video</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the application's Client ID and Client Secret. We will be using those momentarily.

### Obtain a JWT credential

Your application will need to be able to call the RingCentral API. The sample application you will be using in this quick start, will authenticate via JWT. [Create a JWT credential](../../getting-started/create-credential.md), and copy it to your clipboard. 

!!! info "Using JWT credentials"
    JWT credentials are associated with an individual and are created in the [Developer Console](https://developers.ringcentral.com/) in your Credetials area. The individual with whom the credential is associated will be the host for all the meetings initiated by this quick start guide. In real life, you would want to either prompt users to login using the OAuth auth code flow to obtain an access token for each of your users, or [schedule your meetings on behalf of others](../api/meeting-delegates.md) so that they are assigned as the host of the meetings being initiated. 

## Graduate your application to production

!!! info "RingCentral Video does not have a developer sandbox"
    RingCentral Video is not currently available within the [RingCentral Developer Sandbox](../../getting-started/using-sandbox.md). As a result, all development will need to be done in production, which requires you to request the application you created above to be graduated manually. This can be done by [submitting a help ticket to our Developer Support team](https://developers.ringcentral.com/support/create-case).

## Create a meeting bridge

This quick start will allow you to join a meeting. Therefore, you will need to first create a meeting bridge in which a meeting will be hosted. You can think of a "meeting bridge" as a virtual room in which meetings occur. One can create a meeting bridge in one of two ways:

* **RingCentral App** (recommended). The [RingCentral App](https://www.ringcentral.com/apps/rc-app) is our unified communications client, and provides a way for anyone to create a bridge using a simple user interface. 
* **REST API**. Using the REST API, developers can [create a bridge](../api/create-meetings.md) in which a meeting will be hosted using a few lines of code.

To join a meeting you will need to know the meeting's "web PIN." The bridge's pin is a numeric code often found at the end of the bridge's join URL. For example, if the bridge's join URL is:

    https://v.ringcentral.com/join/0123456789
	
Then the web PIN is `0123456789`. Make note of this pin, as you will use it later to start/join a meeting.

## Run the sample application

!!! danger "Have you graduated your application yet?"
    If you have not yet obtained a client ID and secret for our production environment, please [submit a help ticket to our Developer Support team](https://developers.ringcentral.com/support/create-case) requesting your RingCentral Video app to be graduated. 

=== "Javascript"
   
    {!> mdx_includes/rcv-sdk-quick-start-js.md !} 

=== "iOS"
   
    {!> mdx_includes/rcv-sdk-quick-start-ios.md !} 

=== "Android"
   
    {!> mdx_includes/rcv-sdk-quick-start-android.md !} 

