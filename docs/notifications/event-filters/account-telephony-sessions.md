# Account Telephony Sessions Event

*Since 1.0.36 (Release 10.2)*

Event filter `/restapi/v1.0/account/{accountId}/telephony/sessions` enables notifications in case of change of session information for any extension assigned to the current account.

The client receives the detailed call notification payload as a JSON object.

**Required Permissions**

| Permission     | Description          |
|----------------|-----------------------|
| `CallControl` | Creating and managing telephony sessions |

## Query Parameters

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction`   | 'Outbound' or 'Inbound' | Allows to send notifications only on call(s) with a specified direction |
| `missedCall`  | boolean | Allows to send notifications only on missed call(s) event |
| `phoneNumber` | string | Allows to send notifications only on call(s) to/from a certain phone number; e.164 format with '+' sign is supported |
| `sipData`     | boolean | Enables detailed notifications with SIP information |
| `statusCode`  | 'Setup' or  'Proceeding' or 'Answered' or 'Disconnected' or 'Gone' or 'Parked' or 'Hold' or 'VoiceMail' or 'FaxReceive' or 'VoiceMailScreening' | Enables notifications on call sessions with a particular status. It is possible to subscribe to multiple statuses via different event filters |
| `withRecordings` | boolean | Allows to filter and return telephony sessions with recordings only |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `sequence` | integer  | Order number of a notification to state the chronology |
| `sessionId` | string  | Legacy identifier of a call session |
| `telephonySessionId` | string  | Call session identifier, required for Telephony API |
| `serverId` | string  | Identifier of a server |
| `eventTime` | string  | The call start datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `origin` | Session Origin Details  | Session Origin Details |
| `parties` | Session Parties Details | Call participants details |

### Session Origin Details

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | The reason of Session creation. Could be 'Call' or 'RingOut' or 'RingMe' or 'Conference' or 'GreetingsRecording' or 'VerificationCall' or 'TestCall' |

### Session Parties Details

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountId` | string  | Internal identifier of an account |
| `extensionId` | string  | Internal identifier of an extension |
| `id` | string  | Internal identifier of a party, globaly unique |
| `direction` | 'Inbound' or 'Outbound' | Technical call direction. 'Inbound' direction often means the call in the party context is initiated from RC to Customer endpoint. 'Outbound' is vice versa, e.g. User make outbound call from any of RC application.    |
| `to` | Callee Info  | Callee Info |
| `from` | Caller Info  | Caller Info |
| `status` | Session Status Info | Session Status Info |
| `missedCall` | boolean  | If 'True' means the call was missed by the party |
| `standAlone` | boolean  | Indicates whether the call party is standalone or not |
| `muted` | boolean  | If 'True' means the party is muted |
| `conferenceRole` | 'Host' or 'Participant'| Defines party role in Server Side Conference |
| `sipData` | SIP Info | SIP (Session Initiation Protocol) information. Returned if query parameter `sipData` is set to 'True' |

### Callee Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Callee Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `name` | string  | Callee Name |
| `extensionId` | string  | Internal identifier of a Callee extension |
| `deviceId` | string  | Internal identifier of a device |

### Caller Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Caller Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `name` | string  | Caller Name |
| `extensionId` | string  | Internal identifier of a Caller extension |
| `deviceId` | string  | Internal identifier of a device |

### Session Status Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string  | State Code for the party |
| `reason` | 'Pickup' or 'Supervising' or 'TakeOver' or 'Timeout' or 'BlindTransfer' or 'RccTransfer' or 'AttendedTransfer' or 'CallerInputRedirect' or 'CallFlip' or 'ParkLocation' or 'DtmfTransfer' or 'AgentAnswered' or 'AgentDropped' or 'Rejected' or 'Cancelled' or 'InternalError' or 'NoAnswer' or 'TargetBusy' or 'InvalidNumber' or 'InternationalDisabled' or 'DestinationBlocked' or 'NotEnoughFunds' or 'NoSuchUser' or 'CallRedirected' or 'CallReplied' or 'CallFinished' or 'CallDropped' or 'Voicemail'| Reason for a call status, might be specified for some codes |
| `parkData` | string  | Appears in 'Parked' state. |
| `peerId` | Linked Session Details | Contains details of the 'linked' session. Appears in 'Gone' state code  |
| `mobilePickupData` | Mobile Pickup Data | Appears if the user configured to answer the call via Desktop/Mobile application |

### SIP Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `toTag` | string  | Recipient data |
| `fromTag` | string  | Sender data|
| `callId` | string  | SIP call identifier |

### Linked Session Details

| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | string  | Legacy identifier of a linked call session |
| `telephonySessionId` | string  | Call session identifier, required for Telephony API|
| `partyId` | string  | Party identifier of a linked call session |


### Mobile Pickup Data

| Parameter | Type | Description |
|-----------|------|-------------|
| `ccMailboxes` | string  | List of extension IDs, configured to pick a call from Desktop/Mobile applications |
| `to` | string  | SIP proxy registration name |
| `sid` | string  | User data |
| `srvLvl` | string  | User data |
| `srvLvlExt` | string  | User data |


## Example

```json
{!> code-samples/events/account-telephony-sessions.json !}
```
