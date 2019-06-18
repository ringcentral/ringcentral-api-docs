# Working with the Message Attachments

RingCentral message metadata and attachments are stored under the Message Store database. A message attachment can be accessed via the attachment's URI returned by the message-store endpoint.

[Learn more about reading the Message Store &raquo;](../message-store)

## Message Data Structure

Below is an example JSON representation of a voicemail message metadata that would be returned by the message-store API.

```json hl_lines="15 16 17 18 19 20 21",linenums="1"
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

## Access the Message Attachments

The following code sample shows how to call the Message Store to read voicemail message metadata, download the voicemail binary content and save it to a local file. To read messages from the Message Store, apps will need the "Read Messages" permission.

```javascript tab="Node JS"
const RC = require('ringcentral')
var fs = require('fs')

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();
platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        platform.get('/account/~/extension/~/message-store', {
             messageType: ['VoiceMail']
        })
        .then(function (response) {
            var jsonObj = response.json()
            for (var record of jsonObj.records){
                if (record.hasOwnProperty('attachments')){
                    async.each(record.attachments, function(attachment, callback){
                        var fileName = record.attachments[0].id + "_voicemail"
                        if (attachment.type == "AudioRecording"){
                            if (attachment.contentType == "audio/mpeg")
                                fileName += ".mp3"
                            else
                                fileName += ".wav"

                            platform.get(attachment.uri)
                                .then(function(res) {
                                    return res.response().buffer();
                                })
                                .then(function(buffer) {
                                    fs.writeFileSync(fileName, buffer)
                                    callback()
                                })
                                .catch(function(e){
                                    console.log(e)
                                    callback()
                                })
                        }

                    })
                }
            }
        })
    });
}
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

response = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
        {
            'messageType': 'Voicemail'
        })

for record in response.json().records:
    if record.attachments != None:
        for attachment in record.attachments:
            fileName = ("%s_voicemail" % str(record.attachments[0].id))
            if attachment.type == "AudioRecording":
                if attachment.contentType == "audio/mpeg":
                    fileName = ("%s.mp3" % fileName)
                else:
                    fileName = ("%s.wav" % fileName)
                try:
                    res = platform.get(attachment.uri)
                    file = open(fileName,'w')
                    file.write(res.body())
                    file.close()
                except ApiException as e:
                    print (e.getMessage())
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$response = $platform->get('/account/~/extension/~/message-store',
    array(
      'messageType' => 'VoiceMail'
    ));

foreach ($response->json()->records as $record){
    if (isset($record->attachments)){
        foreach($record->attachments as $attachment){
            $fileName = $record->attachments[0]->id . "_voicemail";
            if ($attachment->type == "AudioRecording"){
                if ($attachment->contentType == "audio/mpeg")
                    $fileName .= ".mp3";
                else
                    $fileName .= ".wav";

                try {
                  $res = $platform->get($attachment->uri);
                  file_put_contents($fileName, $res->raw());
                }catch (ApiException $e) {
                  $message = $e->getMessage();
                  print 'Expected HTTP Error: ' . $message . PHP_EOL;
                }
            }
        }
    }
}
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace DownLoad_Message_Attachment
{
    class Program
    {
        static void Main(string[] args)
        {
            download_message_attachment().Wait();
        }
        static private async Task download_message_attachment()
        {
            RestClient rc = new RestClient("client_id", "client_secret", "server_url");
            await rc.Authorize("username", "extension_number", "password");

            var parameters = new ListMessagesParameters();
            parameters.messageType = string[] ("Voicemail");
            var response = await rc.Restapi().Account().Extension().MessageStore().List(parameters);

            foreach (var record in response.records)
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
                            var res = await rc.Restapi().Account().Extension().MessageStore(record.id).Content(attachment.id).Get();
                            using (BinaryWriter writer = new BinaryWriter(System.IO.File.Open(fileName, FileMode.Create)))
                            {
                                writer.Write(res);
                                writer.Flush();
                                writer.Close();
                            }
                        }
                    }
                }
            }
        }
    }
}    
```

```java tab="Java"
import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class DownLoad_Message_Attachment {
	  public static void main(String[] args) {
    		try {
    			download_message_attachment();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

    public static void download_message_attachment() throws RestException, IOException{
        restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
        restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);

        ListMessagesParameters parameters = new ListMessagesParameters();
        parameters.messageType = new String[] {"VoiceMail"};

        var response = restClient.restapi().account().extension().messagestore().list(parameters);
        for (GetMessageInfoResponse record : response.records)
        {
            if (record.attachments != null)
            {
                for (var attachment : record.attachments)
                {
                    var fileName = "./src/test/resources/" + record.attachments[0].id + "_voicemail";
                    if (attachment.type.equals("AudioRecording"))
                    {
                        if (attachment.contentType.equals("audio/mpeg"))
                            fileName += ".mp3";
                        else
                            fileName += ".wav";
        	              var res = restClient.restapi().account().extension().messagestore(record.id).content(attachment.id).get();
        	              Path path = Paths.get(fileName);
        	              Files.write(path, res);
                    }
                }
            }
        }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
response = rc.get('/restapi/v1.0/account/~/extension/~/message-store',
    {
        messageType: 'VoiceMail'
    })

for record in response.body['records'] do
    if record['attachments'] != nil
        for attachment in record['attachments']
            fileName = ("%s_voicemail" % record['attachments'][0]['id'])
            if attachment['type'] == "AudioRecording"
                if attachment['contentType'] == "audio/mpeg"
                    fileName = ("%s.mp3" % fileName)
                else
                    fileName = ("%s.wav" % fileName)
                end
                begin
                    res = rc.get(attachment['uri'])
                    file = File.open(fileName, "w")
                    file.write(res.body)
                rescue IOError => e
                    puts e.getMessage()
                end
            end
        end
    end
end
```

## Relevant APIs for Further Reading

* [Get Message List](https://developers.ringcentral.com/api-reference#SMS-and-MMS-listMessages)
* [Get Message Attachment](https://developers.ringcentral.com/api-reference#SMS-and-MMS-getMessageAttachmentById)
* [Delete Message(s)](https://developers.ringcentral.com/api-reference#SMS-and-MMS-deleteMessage)
* [Sync Messages](https://developers.ringcentral.com/api-reference#SMS-and-MMS-syncMessages)
