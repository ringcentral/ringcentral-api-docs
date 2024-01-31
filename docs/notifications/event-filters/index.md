# Selecting the events you want to subscribe to

For any given account, RingCentral can generate literally hundreds, if not thousands of events. Such a flood of events could easily overwhelm a server. Developers therefore should specify an event filter to determine which specific events they would like to be notified of. Below is a list of the event filters we currently support. 

## Event payload structure

Every event transmitted to a client contains a common set of data elements, regardless of how the event was transmitted. These event properties help you to identify the source of the event, the owner, etc. In the `body` of the event payload you will find the event-specific details for that event. 

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2018-03-10T18:07:52.534Z* |
| `body` | | Notification payload body |

## Event filter index

### SMS Events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/instant?type=SMS` | [Inbound SMS Event](./instant-message/) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/batches` | [Message Batch Event](./message-batch/) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/batches/{batchId}` | [Specific Message Batch Event](./specific-message-batch/) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/messages` | [Batch Messages Event](./batch-messages/) |
| `/restapi/v1.0/account/~/a2p-sms/opt-outs` | [Batch Message Opt-Out Event](./batch-message-optout/) |

### Fax, voicemail and other message events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax?direction=Inbound` | [Inbound Fax Event](./fax-message/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store` | [Message Event](./message/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/voicemail` | [Voicemail Message Event](./voicemail-message/) |

### Contact Center events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/phone-number?usageType=ContactCenterNumber` | [Contact Center Phone Number Event](./contact-center-phone-number/) |

### Telephony events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/telephony/sessions` | [Account Telephony Sessions Event](./account-telephony-sessions/) |

### Presence events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/presence` | [Account Presence Event](./account-presence/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/telephony/sessions` | [Extension Telephony Sessions Event](./extension-telephony-sessions/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/dnd` | [Extension DND Status Event](./extension-dnd-status/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence` | [Extension Presence Event](./extension-presence/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence` | [Extension Presence Line Event](./extension-presence-line/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line` | [Extension Presence Line Event](./extension-presence-line/) |

### Team messaging and chat events

| Filter | Description |
|--------|-------------|
| `/team-messaging/v1/posts`  | [Team Messaging Post Event](./post/) |
| `/team-messaging/v1/groups` | [Team Messaging Groups Event](./chat/) |

### Account events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/directory/entries` | [Company Directory Event](./company-directory/) |
| `/restapi/v1.0/account/{accountId}/device/{deviceId}/emergency-address` | [Emergency Address Event](./emergency-address/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite` | [Extension Favorites Event](./extension-favorites/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant` | [Extension Grant List Event](./extension-grant-list/) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId} ` | [Extension Info Event](./extension-info/) |
| `/restapi/v1.0/account/{accountId}/extension` | [Extension List Event](./extension-list/) |

### Webinar events

!!! hint "Webinar events are subscribed to using a similar, but distinct API endpoint. See [our webinar documentation](../../webinar/events/) to learn more."

| Filter                                                  | Description                                                                            |
|---------------------------------------------------------|----------------------------------------------------------------------------------------|
| `/webinar/configuration/v1/company/sessions`            | Fired when a session is created or modified in any way.                                |
| `/webinar/runtime/v1/company/sessions/state`            | Fired when a webinar session has changed its state, e.g. when it starts and ends.      |
| `/webinar/registration/v1/company/sessions/state`       | Fired when a webinar session's registration setting has been modified.                 |
| `/webinar/registration/v1/company/sessions/registrants` | Fired when a registrant for a webinar session has been created or modified in any way. |
