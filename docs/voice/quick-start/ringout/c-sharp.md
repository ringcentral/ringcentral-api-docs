no_breadcrumb:true

# RingOut .NET Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you connect two people in a live phone call using our RingOut API, which dials two phone numbers, and then connects the two people when they answer. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingOut App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=RingOut+Quick+Start+App&desc=A+simple+app+to+demo+placing+a+call+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=RingOut&redirectUri=" class="btn btn-primary">Create RingOut App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server-only (No UI)' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>RingOut</li>
  </ul>
  </li>
  <li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
  </ol>
  </div>

  When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

  ## Place a Call

  <h3>Create a Visual Studio project</h3>
  <ul>
  <li>Choose Console Application .Net Core -> App</li>
  <li>Select Target Framework .NET Core 2.1</li>
  <li>Add NuGet package RingCentral.Client (3.0.0) SDK</li>
  <li>Enter project name "Call_Ringout"</li>
  </ul>

  <h3>Edit the file Program.cs</h3>

  <p>Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

  <pre><code>
  using System;
  using System.Threading.Tasks;
  using RingCentral;

  namespace Call_Ringout
  {
      class Program
      {
          const string RECIPIENT = "&lt;ENTER PHONE NUMBER>";
          const string RINGCENTRAL_CLIENTID = "&lt;ENTER CLIENT ID>";
          const string RINGCENTRAL_CLIENTSECRET = "&lt;ENTER CLIENT SECRET>";

          const string RINGCENTRAL_USERNAME = "&lt;YOUR ACCOUNT PHONE NUMBER>";
          const string RINGCENTRAL_PASSWORD = "&lt;YOUR ACCOUNT PASSWORD>";
          const string RINGCENTRAL_EXTENSION = "&lt;YOUR EXTENSION, PROBABLY ";

          static void Main(string[] args)
          {
              call_ringout().Wait();
          }
          static private async Task call_ringout()
          {
              RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
              await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
              if (rc.token.access_token.Length > 0)
              {
                  var parameters = new MakeRingOutRequest();
                  parameters.from = new MakeRingOutCallerInfoRequestFrom { phoneNumber = RINGCENTRAL_USERNAME };
                  parameters.to = new MakeRingOutCallerInfoRequestTo {  phoneNumber = RECIPIENT } ;
                  parameters.playPrompt = false;

                  await rc.Restapi().Account().Extension().RingOut().Post(parameters);
                  Console.WriteLine("Call Placed");
              }
          }
      }
  }

  </code></pre>

  <h3>Run Your App</h3>

  <p>You are almost done. Now run your app from Visual Studio.</p>

  ## Publish Your App

  Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
