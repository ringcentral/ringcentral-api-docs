no_breadcrumb:true

# Password Auth .NET Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you send a fax message using our Fax API, which sends a cover page and a high resolution attachment to a recipient. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Fax App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Fax+Quick+Start+App&desc=A+simple+app+to+demo+sending+a+Fax+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Faxes&redirectUri=" class="btn btn-primary">Create SMS App</a>
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
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Send a Fax message

### Create a Visual Studio project

* Choose Console Application .Net Core -> App
* Select Target Framework .NET Core 2.1
* Add NuGet package RingCentral.Client (3.0.0) SDK
* Enter project name "Send_SMS"

### Edit the file Program.cs

Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```dotnet
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_Fax
{
    class Program
    {
        const string RECIPIENT = "<ENTER PHONE NUMBER>";
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            send_fax().Wait();
        }
        static private async Task send_fax()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var attachment = new Attachment { fileName = "test.jpg", contentType = "image/jpeg", bytes = System.IO.File.ReadAllBytes("test.jpg") };
                var attachments = new Attachment[] { attachment };

                var body = new {
                        to = new CallerInfo[] { new CallerInfo { phoneNumber = RECIPIENT } },
                        faxResolution = "High",
                        coverPageText = "This is a demo Fax page from C Sharp"
                    };
                var resp = await rc.Restapi().Account().Extension().Fax().Post(body, attachments);
                Console.WriteLine("Fax sent. Message status: " + resp.messageStatus);
            }
        }
    }
}
```

### Run Your App

You are almost done. Now run your app from Visual Studio.

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
