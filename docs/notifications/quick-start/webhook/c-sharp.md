no_breadcrumb:true

# Webhook Notifications C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a Webhook push notifications app using our Push Notifications API, which allows your application receiving notifications on instant SMS message events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Webhook+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,SMS&redirectUri=" class="btn btn-primary">Create Notifications App</a>
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
    <li>WebhookSubscriptions, SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Subscribe for push notification

We use .NET core which is cross-platform. You can get it [here](https://dotnet.microsoft.com/download).

### Create a solution

```bash
mkdir webhook-demo
cd my-solution
dotnet new sln
```

### Create WebHook Server project

```
cd webhook-demo
mkdir webhook-server
cd webhook-server
dotnet new web
cd ..
dotnet sln add ./webhook-server/webhook-server.csproj
cd webhook-server
```

Edit `Startup.cs` and override its content with code below:

```c#
using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;

namespace webhook_server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.Run( async (context) =>
            {
                context.Request.Headers.TryGetValue("Validation-Token", out StringValues validationToken);
                context.Response.Headers.Add("Validation-Token", validationToken);
                if (context.Request.Path == "/webhook" && context.Request.Method == "POST")
                {
                    using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8))
                    {
                        var str = reader.ReadToEnd();
                        Console.WriteLine(str);
                    }
                }
            });
        }
    }
}
```

### Run ngrok to create a localhost tunnel

```bash
$ ngrok http 5000
```

Copy the forwarding address e.g. https://54a0541a.ngrok.io and append the path "/webhook" to the address then paste it into the `DELIVERY_ADDRESS` variable in the code below.

### Create Setup WebHook project

```
cd my-solution
mkdir setup-webhook
cd setup-webhook
dotnet new console
cd ..
dotnet sln add ./setup-webhook/setup-webhook.csproj
cd setup-webhook
dotnet add package RingCentral.Net
```

Edit `setup-webhook.csproj` file and add `<LangVersion>latest</LangVersion>` to `<PropertyGroup>`.

Edit `Program.cs` file and override its content with code below. Be sure to edit the variables in <ALL CAPS> with your app credentials.


```c#
using System;
using System.Threading.Tasks;
using RingCentral;

namespace setup_webhook
{
    class Program
    {
        private const string RINGCENTRAL_CLIENT_ID = "<RINGCENTRAL_CLIENT_ID>";
        private const string RINGCENTRAL_CLIENT_SECRET = "<RINGCENTRAL_CLIENT_SECRET>";
        private const string RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";
        private const string RINGCENTRAL_USERNAME = "<RINGCENTRAL_USERNAME>";
        private const string RINGCENTRAL_EXTENSION = "<OPTIONAL>";
        private const string RINGCENTRAL_PASSWORD = "<RINGCENTRAL_PASSWORD>";

        private const string DELIVERY_ADDRESS = "<https://xxxxxxxx.ngrok.io/webhook>"";

        static async Task Main(string[] args)
        {
            var rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            await rc.Restapi().Subscription().Post(new CreateSubscriptionRequest
            {
                eventFilters = new[] {"/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"},
                deliveryMode = new NotificationDeliveryModeRequest
                {
                    transportType = "WebHook",
                    address = DELIVERY_ADDRESS
                }
            });
            Console.WriteLine("WebHook ready!");
        }
    }
}
```

### Run Your Code

You are almost done. Now run your script.

```bash
cd my-solution
cd webhook-server
dotnet run
```

Open a new terminal and run:

```bash
cd my-solution
cd setup-webhook
dotnet run
```


### Test the app

Send an sms to `RINGCENTRAL_USERNAME` phone number, and watch the output of my-solution/webhook-server project.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
