# Working with the Message Store

The RingCentral Message Store is a centralized repository of all the messages sent and received within the system. There are many types of messages that can be stored here, including:

* SMS and MMS messages
* Faxes
* Voicemail

Messages within the Message Store can be managed in a variety of ways. One can:

* Delete messages
* Modify the read/unread status
* View the delivery status

[Learn more about modifying the Message Store &raquo;](message-histories.md)

## Message Data Structure

Below is an example JSON representation of a message that would be returned by the API when fetching a list or single message. This particular message is a voicemail:

```json
{
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/4xxx8/extension/4xxx8/message-store/4xxx8",
    "id" : 402406985008,
    "type" : "VoiceMail",
    "to" : [ {
        "name" : "Jane Smith"
    } ],
    "from" : {
        "phoneNumber" : "+18445558517",
        "name" : "RingCentral"
    },
    "creationTime" : "2018-09-18T09:24:03.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
        "id" : 402406985008,
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

## Getting a list of messages

The following code sample shows how to call the Message Store to display a list of messages within it. To read messages from the Message Store, apps will need the "Read Messages" permission.

!!! note "Running the code"
    * If you have tried the [SMS quick start](../quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `read_extension_message_store()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/messaging/code-snippets/message-store.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/code-snippets/message-store.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php [ln:1-15] !}
    {!> code-samples/messaging/code-snippets/message-store.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/code-snippets/message-store.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb [ln:1-4] !}
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/code-snippets/message-store.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/code-snippets/message-store.java !}
    ```

This example response shows the `to`, `from`, `type`, `readStatus`, `direction` and `subject` amongst other properties of an SMS message record from the message store:

```json hl_lines="6 7 8 9 10 11 12 13 15 23 25"
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?messageType=SMS&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100",
  "records" : [ {
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store/6424569004",
    "id" : 6424569004,
    "to" : [ {
      "phoneNumber" : "+13125559821"
    } ],
    "from" : {
      "phoneNumber" : "+16505558379",
      "location" : "San Mateo, CA"
    },
    "type" : "SMS",
    "creationTime" : "2019-05-22T17:07:28.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
      "id" : 6424569004,
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store/6424569004/content/6424569004",
      "type" : "Text",
      "contentType" : "text/plain"
    } ],
    "direction" : "Inbound",
    "availability" : "Alive",
    "subject" : "Test SMS using a RingCentral Developer account - Hello World",
    "messageStatus" : "Received",
    "conversationId" : 8031152018338945839,
    "conversation" : {
      "id" : "8031152018338945839",
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/conversation/8031152018338945839"
    },
    "lastModifiedTime" : "2019-05-22T17:07:28.091Z"
  } ],
  "paging" : {
    "page" : 1,
    "totalPages" : 1,
    "perPage" : 100,
    "totalElements" : 1,
    "pageStart" : 0,
    "pageEnd" : 0
  },
  "navigation" : {
    "firstPage" : {
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?readStatus=Unread&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100"
    },
    "lastPage" : {
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?readStatus=Unread&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100"
    }
  }
}
```

## Relevant APIs for Further Reading

* [Get Message List](https://developers.ringcentral.com/api-reference/Message-Store/listMessages)
* [Get Message Attachment](https://developers.ringcentral.com/api-reference/Message-Store/readMessageContent)
* [Delete Message(s)](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage)
* [Sync Messages](https://developers.ringcentral.com/api-reference/Message-Store/syncMessages)
