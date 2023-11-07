# Voicemail Message Event

The voicemail message event is triggered when an extension receives a new voicemail message. 

* Filter:  `/restapi/v1.0/account/{accountId}/extension/{extensionId}/voicemail` 
* Required permission: `ReadMessages`
* Available since: 1.0.36 (Release 10.2) 

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message |
| `to` | Collection of Recipient Info | Message receiver(s) information |
| `from` | Sender Info | Message sender information |
| `type` | string |  Type of a message. The value is 'Voicemail' |
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
| `vmTranscriptionStatus`| string | Specifies if a voicemail message transcription is already completed or not |

### Recipient Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `target` | boolean | 'True' specifies that message is sent exactly to this recipient. Returned in to field for group MMS. Useful if one extension has several phone numbers  |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

### Sender Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

### Voicemail Message Attachment Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message attachment |
| `uri` | string | Link to an attachment resource |
| `size` | integer | Attachment size in bytes |
| `type` | 'AudioRecording' or 'AudioTranscription'| Type of a message attachment |
| `contentType` | string | Content type of an attachment, see also MIME Types |
| `vmDuration` | integer | Duration of a voicemail in seconds |

## Example

```json
{!> code-samples/events/voicemail-message.json !}
```
