# Fax Message Event

*Since 1.0.37 (Release 10.3)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax?direction=Inbound` enables notifications in case of new inbound fax message:

The updated message info is accessible by calling the Get Message List method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadMessages` | Viewing user messages |

## Fax Message Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message |
| `to` | Collection of Recipient Info | Message receiver(s) information |
| `from` | Sender Info | Message sender information |
| `type` | string |  Type of a message. The value is 'Fax' |
| `creationTime` | date-time | Message creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `lastModifiedTime` | date-time | Datetime when the message was modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `readStatus` | string | Status of a message. The default value is 'Unread' |
| `priority` | string |  The default value is 'Normal' |
| `attachments` | Collection of Instant Message Attachment Info | Message attachment data |
| `direction` | string | Message direction. The default value is 'Inbound' |
| `availability` | string | Message availability status. The default value is 'Alive' |
| `subject` | string | Message subject. It replicates message text which is also returned as an attachment |
| `messageStatus` | string | Status of a message. The default value is 'Received' |
| `conversationId` | string | Internal identifier of a conversation this message belongs to |
| `faxResolution` | string | Resolution of a fax message. ('High' for black and white image scanned at 200 dpi, 'Low' for black and white image scanned at 100 dpi)|
| `faxPageCount`  | integer | Page count of a fax message |


### Recipient Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `target` | boolean | 'True' specifies that message is sent exactly to this recipient. Returned in to field for group MMS. Useful if one extension has several phone numbers |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

### Sender Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

### Fax Message Attachment Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message attachment |
| `uri` | string | Link to an attachment resource |
| `size` | integer | Attachment size in bytes |
| `type` | 'AudioRecording' or 'AudioTranscription'| Type of a message attachment |
| `contentType` | string | Content type of an attachment, see also MIME Types |

## Example

```json
{
  "uuid":"ed1cf00c-0420-4bf5-a0ae-e659bb9f77e0",
  "event": "/restapi/v1.0/account/~/extension/823476228762/fax?direction=Inbound",
  "subscriptionId": "dc853541-66ac-45d8-a289-1a239fd72888",
  "ownerId": "823476228762",
  "timestamp": "2018-02-28T10:06:15.000Z",
  "body": {
            "id": "404068973008",
            "from": {
                "phoneNumber": "+14029997777"
            },
            "type": "Fax",
            "creationTime": "2018-02-28T05:11:37.000Z",
            "readStatus": "Unread",
            "priority": "Normal",
            "attachments": [
                {
                    "id": "404068973008",
                    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/404161512008/extension/404161514008/message-store/404068973008/content/404068973008",
                    "type": "RenderedDocument",
                    "contentType": "application/pdf"
                }
            ],
            "direction": "Inbound",
            "availability": "Alive",
            "subject": "+17015402626",
            "messageStatus": "Received",
            "faxResolution": "High",
            "faxPageCount": 2,
            "lastModifiedTime": "2018-02-28T05:11:37.673Z"
        }
}
```
