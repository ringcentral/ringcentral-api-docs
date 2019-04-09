no_breadcrumb:true

# Message Store Node.js Quick Start

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

### Install RingCentral Node JS SDK

```bash
$ npm install ringcentral --save
```

### Create and Edit message-store.js

Create a file called `message-store.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

``` javascript tab="SMS-MMS"
const RC = require('ringcentral')
var fs = require('fs')
var async = require('async')

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        read_message_store_sms_mms()
    });

function read_message_store_sms_mms(){
    platform.get('/account/~/extension/~/message-store', {
         dateFrom: '2018-01-01T00:00:00.000Z',
         dateTo: '2018-12-31T23:59:59.999Z',
         messageType: 'SMS'
    })
    .then(function (resp) {
        var jsonObj = resp.json()
        var count = jsonObj.records.length
        var index = 0
        var dir = "sms_mms_content/"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        dir = "./" + dir
        // Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
        var interval = setInterval(function() {
            var record = jsonObj.records[index]
            if (record.hasOwnProperty('attachments')){
                async.each(record.attachments,
                    function(attachment, callback){
                        var fileName = record.attachments[0].id
                        if (attachment.type == "MmsAttachment"){
                            var fileNameExt = attachment.contentType.split("/")
                            fileName += "_mms_attachment." + fileNameExt[1]
                        }else{
                            fileName += "_mms_text.txt"
                        }
                        platform.get(attachment.uri)
                            .then(function(res) {
                                return res.response().buffer();
                            })
                            .then(function(buffer) {
                                fs.writeFile(dir + fileName, buffer, function(){
                                    callback()
                                })
                            })
                            .catch(function(e){
                                console.log(e)
                                callback()
                            })
                    })
            }
            index++
            if (index >= count){
                clearInterval(interval);
            }
        }, 2100);
    });
}
```

``` javascript tab="Fax"
const RC = require('ringcentral')
var fs = require('fs')
var async = require('async')

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        read_message_store_fax()
    });

function read_message_store_fax(){
    platform.get('/account/~/extension/~/message-store', {
        dateFrom: '2018-01-01T00:00:00.000Z',
        dateTo: '2018-12-31T23:59:59.999Z',
        messageType: 'Fax'
    })
    .then(function (resp) {
          var jsonObj = resp.json()
          var count = jsonObj.records.length
          var index = 0
          var dir = "fax_content/"
          if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
          }
          dir = "./" + dir
          // Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
          var interval = setInterval(function() {
            var record = jsonObj.records[index]
              if (record.hasOwnProperty('attachments')){
                async.each(record.attachments,
                  function(attachment, callback){
                    var fileName = attachment.id + "_fax_attachment"
                    var fileNameExt = attachment.contentType.split("/")
                    fileName += "." + fileNameExt[1]
                    platform.get(attachment.uri)
                        .then(function(res) {
                            return res.response().buffer();
                        })
                        .then(function(buffer) {
                            fs.writeFile(dir + fileName, buffer, function(){
                                callback()
                            })
                        })
                        .catch(function(e){
                            console.log(e)
                            callback()
                        })
                  })
              }
          index++
          if (index >= count){
              clearInterval(interval);
          }
        }, 2100);
    });
}
```

``` javascript tab="Voicemail"
const RC = require('ringcentral')
var fs = require('fs')
var async = require('async')

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        read_message_store_voicemail()
    });

function read_message_store_voicemail(){
    platform.get('/account/~/extension/~/message-store', {
           dateFrom: '2018-01-01T00:00:00.000Z',
           dateTo: '2018-12-31T23:59:59.999Z',
           messageType: 'VoiceMail'
    })
    .then(function (resp) {
        var jsonObj = resp.json()
        var count = jsonObj.records.length
        var index = 0
        var dir = "voicemail_content/"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        dir = "./" + dir
        // Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
        var interval = setInterval(function() {
          var record = jsonObj.records[index]
          if (record.hasOwnProperty('attachments')){
            async.each(record.attachments,
              function(attachment, callback){
                var fileName = record.attachments[0].id + "_voicemail"
                if (attachment.type == "AudioRecording"){
                    if (attachment.contentType == "audio/mpeg")
                        fileName += ".mp3"
                    else
                        fileName += ".wav"
                }else if (attachment.type == "AudioTranscription" &&
                          record.vmTranscriptionStatus == "Completed"){
                    fileName += ".txt"
                }
                platform.get(attachment.uri)
                    .then(function(res) {
                        return res.response().buffer();
                    })
                    .then(function(buffer) {
                        fs.writeFile(dir + fileName, buffer, function(){
                            callback()
                        })
                    })
                    .catch(function(e){
                        console.log(e)
                        callback()
                    })
              })

          }
          index++
          if (index >= count){
              clearInterval(interval);
          }
        }, 2100);
    });
}
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node message-store.js
```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
