no_breadcrumb:true

# PubNub Notifications C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you subscribe for PubNub push notifications using our Push Notifications API, which allows your application receiving notifications on a selected events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Push+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS&redirectUri=" class="btn btn-primary">Create Notifications App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "Office Integration App" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Subscribe for push notification

### Create a Visual Studio project

* Choose Console Application .Net Core -> App
* Select Target Framework .NET Core 2.1
* Enter project name "PubNub_Notifications"
* Add NuGet package RingCentral.Net (1.2.1) SDK
* Add NuGet package RingCentral.Net.PubNubPCL SDK

### Edit the file Program.cs

Be sure to edit the variables in ALL CAPS with your app and user credentials.

```dotnet
using System;
using System.Threading.Tasks;
using RingCentral;

namespace PubNub_Notifications
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static RestClient rcsdk = null;

        static void Main(string[] args)
        {
            rcsdk = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
            rcsdk.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
            pubnub_notification().Wait();
        }
        static private async Task pubnub_notification()
        {
            try
            {
                var eventFilters = new[]
                {
                    "/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"
                };
                var subscription = new Subscription(rcsdk, eventFilters, message =>
                {
                    var jsonObj = JObject.Parse(message);
                    if (jsonObj["event"].ToString().Contains("instant?type=SMS"))
                    {
                        Console.WriteLine(jsonObj["body"]["subject"]);
                    }
                });
                var subscriptionInfo = await subscription.Subscribe();
                Console.WriteLine("Ready to receive incoming SMS via PubNub.");
                while (true)
                {
                    Thread.Sleep(5000);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
```

### Run Your App

You are almost done. Now run your app from Visual Studio and send an SMS message to the phone number specified in the <RINGCENTRAL_USERNAME>.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
