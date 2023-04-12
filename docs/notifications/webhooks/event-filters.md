# Selecting the events you want to be receive as webhooks

For any given account, RingCentral can generate literally hundreds if not thousands of events. Such a flood of events could easily overwhelm a server. Developers therefore should specify an event filter to determine which specific events they would like to be notified of. A [complete and authoritative list of event filters](https://developers.ringcentral.com/api-reference/Account-Presence-Event) can be found in our API Reference. The list below shows some of the more common events developers subscribe to.

### SMS Events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/instant?type=SMS` | [Inbound SMS Event](https://developers.ringcentral.com/api-reference/Instant-Message-Event) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/batches` | [Message Batch Event](https://developers.ringcentral.com/api-reference/Message-Batch-Event) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/batches/{batchId}` | [Specific Message Batch Event](https://developers.ringcentral.com/api-reference/Specific-Message-Batch-Event) |
| `/restapi/v1.0/account/{accountId}/a2p-sms/messages` | [Batch Messages Event](https://developers.ringcentral.com/api-reference/Batch-Messages-Event) |
| `/restapi/v1.0/account/~/a2p-sms/opt-outs` | [Batch Message Opt-Out Event](https://developers.ringcentral.com/api-reference/Batch-Message-Opt-Out-Event) |

### Fax, voicemail and other message events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax?direction=Inbound` | [Inbound Fax Event](https://developers.ringcentral.com/api-reference/Inbound-Fax-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store` | [Message Event](https://developers.ringcentral.com/api-reference/Message-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/voicemail` | [Voicemail Message Event](https://developers.ringcentral.com/api-reference/Voicemail-Message-Event) |

### Contact Center events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/phone-number?usageType=ContactCenterNumber` | [Contact Center Phone Number Event](https://developers.ringcentral.com/api-reference/Contact-Center-Phone-Number-Event) |

### Telephony events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/telephony/sessions` | [Account Telephony Sessions Event](https://developers.ringcentral.com/api-reference/Account-Telephony-Sessions-Event) |

### Presence events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/presence` | [Account Presence Event](https://developers.ringcentral.com/api-reference/Account-Presence-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/telephony/sessions` | [Extension Telephony Sessions Event](https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/dnd` | [Extension DND Status Event](https://developers.ringcentral.com/api-reference/Extension-DND-Status-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence` | [Extension Presence Event](https://developers.ringcentral.com/api-reference/Extension-Presence-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence` | [Extension Presence Event](https://developers.ringcentral.com/api-reference/Extension-Presence-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence` | [Extension Presence Event](https://developers.ringcentral.com/api-reference/Extension-Presence-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line` | [Extension Presence Line Event](https://developers.ringcentral.com/api-reference/Extension-Presence-Line-Event) |

### Team messaging and chat events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/glip/posts` | [Team Messaging Post Event](https://developers.ringcentral.com/api-reference/Team-Messaging-Post-Event) |
| `/restapi/v1.0/glip/groups` | [Team Messaging Groups Event](https://developers.ringcentral.com/api-reference/Team-Messaging-Groups-Event) |

### Account events

| Filter | Description |
|--------|-------------|
| `/restapi/v1.0/account/{accountId}/directory/entries` | [Company Directory Event](https://developers.ringcentral.com/api-reference/Company-Directory-Event) |
| `/restapi/v1.0/account/{accountId}/device/{deviceId}/emergency-address` | [Emergency Address Event](https://developers.ringcentral.com/api-reference/Emergency-Address-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite` | [Extension Favorites Event](https://developers.ringcentral.com/api-reference/Extension-Favorites-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant` | [Extension Grant List Event](https://developers.ringcentral.com/api-reference/Extension-Grant-List-Event) |
| `/restapi/v1.0/account/{accountId}/extension/{extensionId} ` | [Extension Info Event](https://developers.ringcentral.com/api-reference/Extension-Info-Event) |
| `/restapi/v1.0/account/{accountId}/extension` | [Extension List Event](https://developers.ringcentral.com/api-reference/Extension-List-Event) |

### Webinar events

!!! hint "Webinar events are subscribed to using a similar, but distinct API endpoint. See [our webinar documentation](../../../webinar/events/) to learn more."

| Filter                                                  | Description                                                                            |
|---------------------------------------------------------|----------------------------------------------------------------------------------------|
| `/webinar/configuration/v1/company/sessions`            | Fired when a session is created or modified in any way.                                |
| `/webinar/runtime/v1/company/sessions/state`            | Fired when a webinar session has changed its state, e.g. when it starts and ends.      |
| `/webinar/registration/v1/company/sessions/state`       | Fired when a webinar session's registration setting has been modified.                 |
| `/webinar/registration/v1/company/sessions/registrants` | Fired when a registrant for a webinar session has been created or modified in any way. |
