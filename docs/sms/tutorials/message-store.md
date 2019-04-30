# Working with the Message Store

The RingCentral Message Store is a centralized repository of all the messages sent and received within the system. There are many types of messages that can stored here, including:

* SMS ans MMS messages
* Faxes
* Voicemail

Messages within the Message Store can be managed in a variety of ways. One can:

* Delete messages
* Modify the read/unread status
* View the delivery status

[Learn more about modifying the Message Store &raquo;](../message-histories)

## Message Structure

Below is an example JSON representation of a message that would be returned by the API when fetching a list or single message. This particular message is a voicemail:

```json
{
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/4xxx8/extension/4xxx8/message-store/4xxx8",
    "id" : 402406984008,
    "type" : "VoiceMail",
    "to" : [ {
        "name" : "Jane Smith"
    } ],
    "from" : {
        "phoneNumber" : "+18442058517",
        "name" : "RingCentral"
    },
    "creationTime" : "2018-09-18T09:24:03.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
        "id" : 402406984008,
        "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/4xxx8/extension/4xxx8/message-store/4xxx8/content/4xxx8",
        "type" : "AudioRecording",
        "contentType" : "audio/x-wav",
        "vmDuration" : 25
    } ],
    "direction" : "Inbound",
    "availability" : "Alive",
    "messageStatus" : "Received",
    "lastModifiedTime" : "2018-09-18T09:24:03.531Z",
    "vmTranscriptionStatus" : "NotAvailable"
  }
```

The API Reference contains a [more detailed breakdown of the structure of a message](https://developers.ringcentral.com/api-reference#SMS-and-MMS-listMessages) within the Message Store. 

## Message Store Code Samples

The following code sample shows how to call the Message Store to display a list of messages within it. To read messages from the Message Store, apps will need the "Read Messages" permission. The button below will help you quickly create an application that can be used with the code samples provided. 

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Message+Store+Quick+Start+App&desc=A+simple+app+to+demo+downloading+user+message+content&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadMessages&redirectUri=" class="btn btn-primary">Create Message Store App</a>

```javascript tab="Javascript"
const RC = require('ringcentral')

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
        read_user_message_store()
    });

function read_user_message_store(){
    platform.get('/account/~/extension/~/message-store', {
          dateFrom: '2019-01-01T00:00:00.000Z',
          dateTo: '2019-03-31T23:59:59.999Z'
        })
        .then(function (resp) {
            var jsonObj = resp.json()
            for (var record of jsonObj.records){
              console.log(record.type)
            }
        })
        .catch(function(e){
            console.log(e.message)
        });
}
```

```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

try:
    resp = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
        {
            'dateFrom': '2019-01-01T00:00:00.000Z',
            'dateTo': '2019-03-31T23:59:59.999Z'
        })
    for record in resp.json().records:
        print ("message type: " + record.type)
except ApiException as e:
    print (e.getMessage())
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$resp = $platform->get('/account/~/extension/~/message-store',
    array(
      'dateFrom' => '2019-01-01T00:00:00.000Z',
      'dateTo' => '2019-03-31T23:59:59.999Z'
    ));
foreach ($resp->json()->records as $record)
    print_r ($record->type) . "\n");
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_User_Message_Store
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY "101">";

        static void Main(string[] args)
        {
            read_user_message_store().Wait();
        }
        static private async Task read_user_message_store()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new ListMessagesParameters();
                parameters.dateFrom = "2019-01-01T00:00:00.000Z";
                parameters.dateTo = "2019-03-31T23:59:59.999Z";
                var resp = await rc.Restapi().Account().Extension().MessageStore().List(parameters);
                foreach (var record in resp.records)
                {
                    Console.WriteLine(record.type);
                }

            }
        }
    }
}
```

## Relevant APIs for Further Reading

* [Get Message List](https://developers.ringcentral.com/api-reference#SMS-and-MMS-listMessages)
* [Get Message Attachment](https://developers.ringcentral.com/api-reference#SMS-and-MMS-getMessageAttachmentById)
* [Delete Message(s)](https://developers.ringcentral.com/api-reference#SMS-and-MMS-deleteMessage)
* [Sync Messages](https://developers.ringcentral.com/api-reference#SMS-and-MMS-syncMessages)
