no_breadcrumb:true

# Authorization Flow Authentication C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.


## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server/Web' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>ReadAccounts,ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.


## Authorization Flow

### Initiate the project

We use .NET core which is cross-platform. You can get it [here](https://dotnet.microsoft.com/download).

```bash
mkdir authorization-demo
cd authorization-demo
dotnet new sln
mkdir my-project
cd my-project
dotnet new web
cd ..
dotnet sln add ./my-project/my-project.csproj
cd my-project
dotnet add package RingCentral.Net
dotnet add package Newtonsoft.Json
```


### Edit Startup.cs

Override `Startup.cs` with content below. Be sure to edit the variables in <ALL CAPS> with your app credentials.

```cs
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using RingCentral;
using Newtonsoft.Json;

namespace my_project
{
    public class Startup
    {
        private const string RINGCENTRAL_CLIENT_ID = "<RINGCENTRAL_CLIENT_ID>";
        private const string RINGCENTRAL_CLIENT_SECRET = "<RINGCENTRAL_CLIENT_SECRET>";
        private const string RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";
        private const string RINGCENTRAL_REDIRECT_URL = "http://localhost:5000/oauth2callback";
        private const string SESSION_TOKEN_KEY = "rc-token";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddSessionStateTempDataProvider();
            services.AddSession();
        }

        private static string Html(string body)
        {
            return $@"<!doctype html><html><body>{body}</body></html>";
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
            app.UseSession();
            app.Run(async (context) =>
            {
                var rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);
                var tokenString = context.Session.GetString(SESSION_TOKEN_KEY);
                if (tokenString != null)
                {
                    rc.token = JsonConvert.DeserializeObject<TokenInfo>(tokenString);
                }
                else if (context.Request.Path != "/oauth2callback")
                {
                    var oauthUri = rc.AuthorizeUri(RINGCENTRAL_REDIRECT_URL);
                    await context.Response.WriteAsync(
                        Html($"<a href=\"{oauthUri}\">Login RingCentral Account</a>"));
                    return;
                }

                switch (context.Request.Path)
                {
                    case "/":
                        await context.Response.WriteAsync(Html(@"<ul>
                                <li><a href=""/test?api=extension"" target=""_blank"">Read Extension Info</a></li>
                                <li><a href=""/test?api=extension-call-log"" target=""_blank"">Read Extension Call Log</a></li>
                                <li><a href=""/test?api=account-call-log"" target=""_blank"">Read Account Call Log</a></li>
                                <li><a href=""/logout"">Logout</a></li>
                            </ul>"));
                        break;
                    case "/oauth2callback":
                        context.Request.Query.TryGetValue("code", out var codes);
                        var code = codes.First();
                        await rc.Authorize(code, RINGCENTRAL_REDIRECT_URL);
                        context.Session.SetString(SESSION_TOKEN_KEY, JsonConvert.SerializeObject(rc.token));
                        context.Response.Redirect("/");
                        break;
                    case "/test":
                        context.Request.Query.TryGetValue("api", out var apis);
                        var api = apis.First();
                        var result = "";
                        switch (api)
                        {
                            case "extension":
                                result = await rc.Get<string>("/restapi/v1.0/account/~/extension");
                                break;
                            case "extension-call-log":
                                result = await rc.Get<string>("/restapi/v1.0/account/~/extension/~/call-log");
                                break;
                            case "account-call-log":
                                result = await rc.Get<string>("/restapi/v1.0/account/~/call-log");
                                break;
                        }

                        await context.Response.WriteAsync(Html($"<pre>{result}</pre>"));
                        break;
                    case "/logout":
                        await rc.Revoke();
                        context.Session.Remove(SESSION_TOKEN_KEY);
                        context.Response.Redirect("/");
                        break;
                    default:
                        context.Response.StatusCode = 404;
                        break;
                }
            });
        }
    }
}
```

### Run Your Code

You are almost done. Now run your app.

```bash
$ dotnet run
```

Open a Web browser and load localhost:5000

If you meet "Unable to configure HTTPS endpoint" issue, please read [this article](http://www.waynethompson.com.au/blog/dotnet-dev-certs-https/).


## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
