no_breadcrumb:true

# Meetings C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you creating a meeting on the platform in just a few minutes. Let's get started.

!!! warning "Meetings Permission Required"
     In order to use this API, developers must have a paid RingCentral account. This API is not available to free developer accounts.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Meetings App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=" class="btn btn-primary">Create Meetings App</a>
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
    <li>Meetings</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Meeting

### Create a Visual Studio project

* Choose Console Application .Net Core -> App
* Select Target Framework .NET Core 2.1
* Enter project name "Create_Meeting"
* Add NuGet package RingCentral.Net (1.2.1) SDK

### Edit the file Program.cs

Be sure to edit the variables in ALL CAPS with your app and user credentials.

``` c#
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_Meeting
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

        static void Main(string[] args)
        {
            create_meeting().Wait();
        }
        static private async Task create_meeting()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, true);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

            var parameters = new MeetingRequestResource();
            parameters.topic = "Test Meeting";
            parameters.meetingType = "Instant";
            parameters.allowJoinBeforeHost = true;
            parameters.startHostVideo = true;
            parameters.startParticipantsVideo = false;

            var resp = await rc.Restapi().Account().Extension().Meeting().Post(parameters);
            Console.WriteLine("Start Your Meeting: " + resp.links.startUri);
            Console.WriteLine("join the Meeting: " + resp.links.joinUri);
        }
    }
}
```

### Run Your Code

You are almost done. Now run your app from Visual Studio.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.

## Troubleshooting

> I got the error: "Error: In order to call this API endpoint, user needs to have [Meetings] permission." What is going wrong?

The Meetings API is not available to free developer accounts. In order to use this API, please sign-up for a paid RingCentral account, which can be made available on a free trial basis.
