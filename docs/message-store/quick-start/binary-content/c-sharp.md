no_breadcrumb:true

# Message Store C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you download message binary content from your RingCentral message store. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Message Store App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Message+ Store+Quick+Start+App&desc=A+simple+app+to+demo+downloading+user+message+content&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadMessages&redirectUri=" class="btn btn-primary">Create Message Store App</a>
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
    <li>ReadMessages</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read user's message attachments

### Create a Visual Studio project

* Choose Console Application .Net Core -> App
* Select Target Framework .NET Core 2.1
* Enter project name "Read_MessageContent"
* Add NuGet package RingCentral.Net (1.1.1) SDK

### Edit the file Program.cs

Be sure to edit the variables in ALL CAPS with your app and user credentials.

``` c# tab="SMS-MMS"
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using RingCentral;

namespace Read_MessageContent
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            read_message_store_sms_mms().Wait();
        }
        static private async Task read_message_store_sms_mms()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new ListMessagesParameters();
                parameters.dateFrom = "2018-01-01T00:00:00.000Z";
                parameters.dateTo = "2018-12-31T23:59:59.999Z";
                parameters.messageType = new string[] { "SMS" };
                var path = "sms_mms_content/";
                System.IO.Directory.CreateDirectory(path);
                long timePerApiCall = 2100;
                var resp = await rc.Restapi().Account().Extension().MessageStore().List(parameters);
                foreach (var record in resp.records)
                {
                    if (record.attachments != null)
                    {
                        foreach (var attachment in record.attachments)
                        {
                            var fileName = record.attachments[0].id;
                            if (attachment.type == "MmsAttachment")
                            {
                                var fileNameExt = attachment.contentType.Split('/');
                                fileName = String.Format("{0}_mms_attachment.{1}", fileName, fileNameExt[1]);
                            }
                            else
                            {
                                fileName += "_mms_text.txt";
                            }
                            var start = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var res = await rc.Restapi().Account().Extension().MessageStore(record.id).Content(attachment.id).Get();
                            using (BinaryWriter writer = new BinaryWriter(System.IO.File.Open(path + fileName, FileMode.Create)))
                            {
                                writer.Write(res);
                                writer.Flush();
                                writer.Close();
                            }
                            var end = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var delay = (end - start) * 1000;
                            if (delay < timePerApiCall)
                            {
                                Thread.Sleep((int)(timePerApiCall - delay));
                            }
                        }
                    }
                }
            }
        }
    }
}
```

``` c# tab="Fax"
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using RingCentral;

namespace Read_MessageContent
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            read_message_store_fax().Wait();
        }
        static private async Task read_message_store_fax()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new ListMessagesParameters();
                parameters.dateFrom = "2018-01-01T00:00:00.000Z";
                parameters.dateTo = "2018-12-31T23:59:59.999Z";
                parameters.messageType = new string[] { "Fax" };
                var path = "fax_content/";
                System.IO.Directory.CreateDirectory(path);
                long timePerApiCall = 2100;
                var resp = await rc.Restapi().Account().Extension().MessageStore().List(parameters);
                foreach (var record in resp.records)
                {
                    if (record.attachments != null)
                    {
                        foreach (var attachment in record.attachments)
                        {
                            var fileName = record.attachments[0].id + "_fax_attachment";
                            var fileNameExt = attachment.contentType.Split('/');
                            fileName = String.Format("{0}.{1}", fileName, fileNameExt[1]);
                            var start = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var res = await rc.Restapi().Account().Extension().MessageStore(record.id).Content(attachment.id).Get();
                            using (BinaryWriter writer = new BinaryWriter(System.IO.File.Open(path + fileName, FileMode.Create)))
                            {
                                writer.Write(res);
                                writer.Flush();
                                writer.Close();
                            }
                            var end = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var delay = (end - start) * 1000;
                            if (delay < timePerApiCall)
                            {
                                Thread.Sleep((int)(timePerApiCall - delay));
                            }
                        }
                    }
                }
            }
        }
    }
}
```

``` c# tab="Voicemail"
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using RingCentral;

namespace Read_MessageContent
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            read_message_store_voicemail().Wait();
        }
        static private async Task read_message_store_voicemail()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new ListMessagesParameters();
                parameters.dateFrom = "2018-01-01T00:00:00.000Z";
                parameters.dateTo = "2018-12-31T23:59:59.999Z";
                parameters.messageType = new string[] { "VoiceMail" };

                var path = "voicemail_content/";
                System.IO.Directory.CreateDirectory(path);
                long timePerApiCall = 2100;
                var resp = await rc.Restapi().Account().Extension().MessageStore().List(parameters);
                foreach (var record in resp.records)
                {
                    if (record.attachments != null)
                    {
                        foreach (var attachment in record.attachments)
                        {
                            var fileName = record.attachments[0].id + "_voicemail";
                            if (attachment.type == "AudioRecording")
                            {
                                if (attachment.contentType == "audio/mpeg")
                                {
                                    fileName += ".mp3";
                                }
                                else
                                {
                                    fileName += ".wav";
                                }
                            }
                            else if (attachment.type == "AudioTranscription" &&
                                     record.vmTranscriptionStatus == "Completed")
                            {
                                fileName += ".txt";
                            }
                            var start = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var res = await rc.Restapi().Account().Extension().MessageStore(record.id).Content(attachment.id).Get();
                            using (BinaryWriter writer = new BinaryWriter(System.IO.File.Open(path + fileName, FileMode.Create)))
                            {
                                writer.Write(res);
                                writer.Flush();
                                writer.Close();
                            }
                            var end = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
                            var delay = (end - start) * 1000;
                            if (delay < timePerApiCall) {
                                Thread.Sleep((int)(timePerApiCall - delay));
                            }
                        }
                    }
                }
            }
        }
    }
}
```

### Run Your App

You are almost done. Now run your app from Visual Studio.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
