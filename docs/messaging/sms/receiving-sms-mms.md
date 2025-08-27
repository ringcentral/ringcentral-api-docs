### Receiving SMS and MMS messages

Inbound SMS and MMS messages can be received instantly using the [RingCentral push notification](../../notifications/index.md) frameworks.

A user can subscribe to SMS event notifications to receive inbound messages sent to:

* Any of their direct phone numbers, or
* A company phone number or call queue number that the user is authorized to manage for SMS communication.

!!! hint "Phone Number Ownership and Feature Assignment "
    Refer to the [Understanding Phone Number Ownership and Feature Assignment in RingCentral](sms-requirements.md) section for details on SMS feature assignment.

When subscribing to instant SMS events, your application must:

  1. Authenticate the user extension that will receive inbound text messages on its assigned phone number(s).
  2. Subscribe to the instant SMS event notification using the following event filter:<br>[<br>"`/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS`"<br>]
  3. Implement a [Webhook server](../../notifications/webhooks/creating-webhooks.md) or a [WebSocket connection](../../notifications/websockets/subscribing.md) to handle and process inbound messages in real time.

!!! important "Receiving text messages on behalf of other users?"
    * A super admin user can subscribe to instant SMS events to receive inbound text messages on behalf of one or more user extensions. In this scenario, the application must be authenticated as the super admin user. The `eventFilters` list can include multiple entries, each corresponding to a specific user identified by their extension ID.<br>
    [<br> "`/restapi/v1.0/account/~/extension/[extension01Id]/message-store/instant?type=SMS`",<br> "`/restapi/v1.0/account/~/extension/[extension02Id]/message-store/instant?type=SMS`",<br> "`/restapi/v1.0/account/~/extension/[extensionNId]/message-store/instant?type=SMS`"<br>]

#### Sample of a typical event payload of an inbound text message

The following is a sample SMS event notification payload. The essential data fields `from.phoneNumber`, `to.phoneNumber`, and subject are highlighted, where `subject` contains the actual text message content.

```json hl_lines="11 18 40"
{
  "uuid": "6242343638330007102",
  "event": "/restapi/v1.0/account/80964XXXX/extension/629893XXXX/message-store/instant?type=SMS",
  "timestamp": "2025-07-30T18:12:45.034Z",
  "subscriptionId": "7e4a7486-8df9-4195-8aef-b8d81d3345f6",
  "ownerId": "629893XXXX",
  "body": {
    "id": "3062991514017",
    "to": [
      {
        "phoneNumber": "+1657390XXXX",
        "name": "VP Dan",
        "location": "Orange, CA",
        "target": true
      }
    ],
    "from": {
      "phoneNumber": "+1650224XXXX",
      "location": "Mountain View, CA",
      "phoneNumberInfo": {
        "countryCode": "1",
        "nationalDestinationCode": "650",
        "subscriberNumber": "224XXXX"
      }
    },
    "type": "SMS",
    "creationTime": "2025-07-30T18:12:45.028Z",
    "lastModifiedTime": "2025-07-30T18:12:45.028Z",
    "readStatus": "Unread",
    "priority": "Normal",
    "attachments": [
      {
        "id": "3062991514017",
        "type": "Text",
        "contentType": "text/plain"
      }
    ],
    "direction": "Inbound",
    "availability": "Alive",
    "subject": "Hi advisor, I'd like to ...",
    "messageStatus": "Received",
    "conversation": {
      "id": "1638233798595111162"
    },
    "eventType": "Create",
    "owner": {
      "extensionId": "629893XXXX",
      "extensionType": "User",
      "name": "VP Dan"
    }
  }
}
```

#### Use Case Example: Auto-Reply for Vacation Messages

A financial advisor wants to maintain personalized communication with clients through SMS using their assigned direct number (+1-555-987-XXXX). While on vacation, the advisor wants to automatically respond to any incoming text messages with an out-of-office notice indicating their unavailability and return date.

To accomplish this, the application will leverage the RingCentral REST API and Push Notification framework to:

1. Authenticate as the advisor’s user extension.
2. Subscribe to instant SMS event notifications for the advisor’s phone number.
3. Implement logic to send an automatic reply when a new message is received.

#### Sample code

=== "JavaScript"

    #### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk @ringcentral/subscriptions --save
    ```

    #### Create and edit a receive-reply-sms.js file

    Create a file named `receive-reply-sms.js`, then copy and paste the following code into the file.

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header-subscription.js !}
    {!> code-samples/messaging/code-snippets/receive-reply-sms.js [ln:10-] !}
    ```

=== "PHP"

    #### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    #### Create and edit a receive-reply-sms.php file

    Create a file named `receive-reply-sms.php`, then copy and paste the following code into the file.

    ```php
    {!> code-samples/messaging/code-snippets-headers/header-subscription.php [ln:1-17] !}
    {!> code-samples/messaging/code-snippets/receive-reply-sms.php [ln:2-] !}
    ```

=== "Python"

    #### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    #### Create and edit a receive-reply-sms.py file

    Create a file named `receive-reply-sms.py`, then copy and paste the following code into the file.

    ```python
    {!> code-samples/messaging/code-snippets/receive-reply-sms.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py [ln:1-5]!}
    ```

=== "Ruby"

    #### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    #### Create and edit a receive-reply-sms.rb file

    Create a file named `receive-reply-sms.rb`, then copy and paste the following code into the file.

    ```ruby
    {!> code-samples/messaging/code-snippets/receive-reply-sms.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb [ln:1-4]!}
    ```
<br>
!!! note "Running the code"
    If you have tried the Send SMS quick start, you can just copy all the functions above and add them to the quick start project then call the `subscribe_for_instant_messages_notification()` function. Otherwise, edit the following variables in the code with your app's credentials and the user's JWT before running the code.<br><br>"RC_USER_JWT"<br>"RC_APP_CLIENT_ID"<br>"RC_APP_CLIENT_SECRET"

!!! Important
    The additional `refresh_token()` function is crucial for long-running processes that need to operate continuously for weeks or months. This is because the `access_token` is valid for only 1 hour, and the `refresh_token` expires after 7 days. If no API calls are made for more than a week, both tokens will expire. In such cases, the application must be reauthorized using the user’s JWT token.

    Alternatively, you can use a timer to periodically call the `platform.refresh()` method (for example, daily or every 6 days) to prevent the refresh_token from expiring.

**Other Key Considerations:**

* **Prevent Loops:** Do not auto-reply to messages from unknown senders. Only respond to messages from the advisor’s verified contacts.
* **Smart Responses:** Use AI or NLP to analyze inbound message content and provide context-appropriate replies.
* **One-Time Reply:** Optionally, store the client’s number in memory or a database to avoid sending multiple vacation replies to the same contact.
* **Webhook for Reliability:** Consider using [Webhook notifications](../../notifications/webhooks/quick-start.md) instead of WebSocket notifications for long-running processes for better stability.

### Parsing MMS Messages and Downloading Attachments

MMS message event notifications work the same way as SMS message notifications. The key difference lies in the event payload: MMS notifications include one or more `MmsAttachment` type attachments. To download an MMS attachment, use the `uri` value from the `attachment` object along with the user’s valid access_token.

#### Sample payload for a typical inbound MMS message event

Here is an example of a typical inbound MMS message event payload. The essential data fields `from.phoneNumber`, `to.phoneNumber`, and the MMS attachment object are highlighted. The `uri` field within any attachment object of type "**MmsAttachment**" provides the link to the actual binary content.

```json hl_lines="5 12 27-33"
{
  "id": "3064938607016",
  "to": [
    {
      "phoneNumber": "+1657390XXXX",
      "name": "VP Don",
      "location": "Orange, CA",
      "target": true
    }
  ],
  "from": {
    "phoneNumber": "+1650224XXXX",
    "location": "Mountain View, CA",
    "phoneNumberInfo": {
      "countryCode": "1",
      "nationalDestinationCode": "650",
      "subscriberNumber": "224XXXX"
    }
  },
  "type": "SMS",
  "creationTime": "2025-07-31T20:13:18.861Z",
  "lastModifiedTime": "2025-07-31T20:13:18.861Z",
  "readStatus": "Unread",
  "priority": "Normal",
  "attachments": [
    { "id": "3064938607016", "type": "Text", "contentType": "text/plain" },
    {
      "id": "675981076016",
      "type": "MmsAttachment",
      "uri": "https://media.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/629893XXXX/message-store/3064938607016/content/675981076016",
      "contentType": "image/jpeg",
      "size": 461020
    }
  ],
  "direction": "Inbound",
  "availability": "Alive",
  "subject": "Hi there",
  "messageStatus": "Received",
  "conversation": { "id": "1638233798595111162" },
  "eventType": "Create",
  "owner": { "extensionId": "629893XXXX", "extensionType": "User", "name": "VP Don" }
}
```

#### Sample code to download an MMS attachment

Let's edit the [example code above](#sample-code) to add a function to download an MMS message's attachments.

=== "JavaScript"

    #### Edit the receive-reply-sms.js file

    Edit the `receive-reply-sms.js` file by replacing the `subscription.on(subscription.events.notification, function(msg)` function and adding the `download_mms_attachments(attachments)` function below to the existing code.

    ```javascript
    {!> code-samples/messaging/code-snippets/download-mms-attachment.js !}
    ```

=== "PHP"

    #### Edit the receive-reply-sms.php file

    Edit the `receive-reply-sms.py` file by replacing the `subscribe_for_instant_messages_notification()` function and adding the `download_mms_attachment($attachments)` function below to the existing code.

    ```php
    {!> code-samples/messaging/code-snippets/download-mms-attachment.php !}
    ```

=== "Python"

    #### Edit the receive-reply-sms.py file

    Edit the `receive-reply-sms.py` file by replacing the `on_notification(message)` function and adding the `download_mms_attachments(attachments)` function below to the existing code.

    ```python
    {!> code-samples/messaging/code-snippets/download-mms-attachment.py !}
    ```

=== "Ruby"

    #### Edit the receive-reply-sms.rb file

    Edit the `receive-reply-sms.rb` file by replacing the `subscribe_for_instant_messages_notification()` function and adding the `download_mms_attachments(attachments)` function below to the existing code.

    ```ruby
    {!> code-samples/messaging/code-snippets/download-mms-attachment.rb !}
    ```
