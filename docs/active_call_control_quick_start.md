# Subscribe to Telephony Notifications
Currently RingCentral provides a few ways to detect new or in-progress call via Push Notification mechanism:
* *Presence*
* *telephony/sessions* aka **CSN**. Subscriptions per extension and per account are supported (NEW).

Subscribe using any suitable transport, e.g. PubNub:
```
POST /restapi/v1.0/subscription

{
    "eventFilters": [
      "/restapi/v1.0/account/~/telephony/sessions",
      "/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true"
    ],
    "deliveryMode": {
    "transportType": "PubNub"
    }
}
```

## Presence: added *telephonySessionId* & *partyId* (NEW)
**Limitations**: Legacy BLF solution, might not support some complex PBX scenarios. In Release 10.2 we've added *activeCalls.telephonySessionId* and *activeCalls.partyId* to allow Customers to use Telephony API. You can also use a GET call on the Presence endpoint to get details on active calls for a current user.
```
{
    "uuid": "1787755531108376563",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
      "uuid": "1787755531108376563",
      "event": "/restapi/v1.0/account/400144452008/extension/400144455008/presence?detailedTelephonyState=true&sipData=true",
      "timestamp": "2018-06-05T00:14:50.184Z",
      "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
      "ownerId": "400144455008",
      "body": {
        "extensionId": 400144455008,
        "telephonyStatus": "Ringing",
        "activeCalls": [
          {
            "id": "Y3MxNzE4NDE5MDM0MzQwMTgzODRAMTAuNjIuMjUuMTEx",
            "direction": "Inbound",
            "fromName": "TheCat Jerry",
            "from": "103",
            "toName": "Tom Sawyer",
            "to": "102",
            "telephonyStatus": "Ringing",
            "sipData": {
              "toTag": "blf",
              "fromTag": "cs171841903434018384-2",
              "remoteUri": "sip:103@ringcentral.com",
              "localUri": "sip:102@ringcentral.com"
            },
            "partyId":"cs171843418296416309-2",
            "telephonySessionId":"Y3MxNjk4ODA5MTYxMzUyOTU5OUAxMC4zMi40NS44NA",
            "sessionId": "402936341008",
            "startTime": "2018-06-05T00:14:50.149Z"
          }
        ],
        "sequence": 34470,
        "presenceStatus": "Available",
        "userStatus": "Available",
        "dndStatus": "TakeAllCalls",
        "allowSeeMyPresence": true,
        "ringOnMonitoredCall": false,
        "pickUpCallsOnHold": false,
        "totalActiveCalls": 1
      }
    }
  }
```

## Telephony/sessions aka CSN
**Limitations**: Alpha solution, which is going to be amended in Release 10.3. The main limitation is non-optimal subscription logic, i.e. notification won't be delivered in the following scenarios:
-   if a party doesn't belong to subscriber account/extension (another RC account, PSTN, intermediate parties, etc).
-   if a party belongs to another session (transferred call, conference, etc).
-   if a party does not belong to any accountId or mailboxId (some parties are created to represent intermediate "leg", e.g. to connect telephony session with RC Conference)

Push Notification Example:
```
{
    "uuid": "837270960869181944",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
    "pn_apns": {
      "aps": {
        "content-available": 1
      },
      "uuid": "837270960869181944",
      "event": "/restapi/v1.0/account/400144452008/extension/400144455008/telephony/sessions",
      "timestamp": "2018-06-05T00:14:50.181Z",
      "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
      "ownerId": "400144455008",
      "body": {
        "sequence": 5,
        "sessionId": "402936341008",
        "telephonySessionId": "Y3MxNzE4NDE5MDM0MzQwMTgzODRAMTAuNjIuMjUuMTEx",
        "serverId": "10.62.25.111.TAM",
        "eventTime": "2018-06-05T00:14:50.147Z",
        "accountId": "400144452008",
        "parties": [
          {
            "extensionId": "400144455008",
            "id": "cs171841903434018384-2",
            "direction": "Inbound",
            "to": {
              "phoneNumber": "102",
              "name": "Tom Sawyer",
              "extensionId": "400144455008"
            },
            "from": {
              "phoneNumber": "103",
              "name": "TheCat Jerry",
              "extensionId": "400144457008"
            },
            "status": {
              "code": "Proceeding",
              "mobilePickupData": {
                "ccMailboxes": [
                  "400144455008"
                ],
                "to": "#19008@sip-mesdevams.lab.nordigy.ru:5060",
                "sid": "402936472080",
                "srvLvl": "-149699523",
                "srvLvlExt": "390"
              }
            },
            "missedCall": false,
            "standAlone": false,
            "muted": false
          }
        ],
        "origin": {
          "type": "Call"
        },
        "extensionId": "400144455008"
      }
    }
  }
```

# How to Use Call Control API
RC User is able to initiate a call via RC app:
-   RC Phone
-   Glip
-   RingOut via Service Site
etc

*NOTE*: In Release 10.3 we're planning to provide **Call Out** API to initiate a call.

Once the call is initiated User can get Session details either from telephony/session Push Notification or from API response if call was started via RingOut or CallOut REST API.

Session status can be retrieved via the following request:
```
GET /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>
Content-Type: application/json
Authorization: Bearer <access-token>

{
    "creationTime": "2018-08-01T13:36:09Z",
    "id": "Y3MxNzE4MzU2NzgxNTM2MTY1NDhAMTAuNjIuMS4zMA",
    "origin": {
        "type": "Call"
    },
    "parties": [
        {
            "direction": "Outbound",
            "from": {
                "extensionId": "400415045004",
                "name": "TheCat Jerry",
                "phoneNumber": "+18882101932"
            },
            "id": "cs171835678153616548-1",
            "muted": false,
            "owner": {
                "accountId": "400415035004",
                "extensionId": "400415045004"
            },
            "standAlone": false,
            "status": {
                "code": "Answered"
            },
            "to": {
                "extensionId": "400415042004",
                "name": "Tom Sawyer",
                "phoneNumber": "102"
            }
        },
        {
            "direction": "Inbound",
            "from": {
                "extensionId": "400415045004",
                "name": "TheCat Jerry",
                "phoneNumber": "103"
            },
            "id": "cs171835678153616548-2",
            "muted": false,
            "owner": {
                "accountId": "400415035004",
                "extensionId": "400415042004"
            },
            "standAlone": false,
            "status": {
                "code": "Answered"
            },
            "to": {
                "extensionId": "400415042004",
                "name": "Tom Sawyer",
                "phoneNumber": "102"
            }
        }
    ]
}
```
*NOTE*: There are specific scenarios when the call became splitted to multiple Sessions.

# Pre-Call Control based on Call Control API
Pre-Call Controls are soft keys that allow you to choose an action for an incoming call. In Beta version of **Call Control** API you'll be able to use the following distribution options:
## Forward
You can use the **Forward** API if you want to transfer the incoming call to another phone number or to voicemail, without answering the call. **Forward** API works for parties in Setup and Proceeding states only (this is the main differece with Transfer API, which works with already accepted calls). For now Forward to phone number and Vociemail are available, see below.

#### Forward to phone number
To forward the incoming call to another phone number take *telephonySessionId* and *partyId* from telephony/sessions notification and use them in endpoint path, see example below.

```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/forward

{
"phoneNumber":"+12059690601"
}
```
*NOTE*: phoneNumber in request body should be in e164 format.

**Tips**:
-   You can configure the pre-set numbers on the list via [Forwarding Number List API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html) to have pre-configured Forwarding.
-   You can forward calls to another extension in your RingCentral account by specifying that extension's Direct Phone Number.

#### Forward to Voicemail
To forward the incoming call to Voicemail specify **voicemail** in request body, similar to above example. The call will go straight to specified mailbox for the caller to leave a message.
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/forward

{
"voicemail":"400415048004"
}
```

## Reject
Using Reject API will stop the ringing on your app. It works as Ignore option on Ringcenrtral Desktop app, i.e. the caller will still hear ringing sounds, until picked up on another Forwarding Number, or until the caller is routed to your extension's voicemail.

```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/reject

```

*NOTE*: In upcoming releases we're planning to support much more features, like
-   **Answer (Replace)** - accept the incoming call.
-   **Reply** - with this option you can send a Text-to-speech reply to the caller. It could be either pre-set message or custom own message. After you press Send, your message is announced to the Caller.
-   **Voicemail Screening** - you can listen and have the option to Pick up the call while your caller leaves you a voicemail.

... and other features, based on your feedback!

# Active Call Control using API
When call is in progress you can manage participants, start and pause recording, transfer or park the call and much more.. And all this available via Ringcentral API now!

### Mute and Unmute participant
Mute or Unmute the participant based on the boolean parameter you provide:

```
PATCH /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>

{
"muted" : true
}
```
*NOTE*: There is a known limitation for this API - mute via REST API doesn't work with mute placed via RingCentral apps or HardPhone. It means that if you muted participant via **Call Control** API and Ringcentral Desktop app you need to unmute both endpoints to bring media back.

## Hold and UnHold Call
Use **Hold** API to put the participant on hold. Use **Unhold** API otherwise:
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/hold

```

**Tips**:
-   You can configure the your [Music on Hold via API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefUserCustomGreetingList.html).
Keep callers informed and entertained with messages and music on hold.

*NOTE*: The same limitation as for Mute/Unmute  - Hold/Unhold via REST API doesn't work with Hold/Unhold placed via RingCentral apps or HardPhone.

## Call Transfer
**Transfer** API works similar to **Forward** API, except that party should accept the call. You can transfer the call to another phone number, to voicemail or to Park Location (Park Orbit feature).

#### Transfer to phone number
Specify the target phone number for a party transfer:
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
"phoneNumber":"+12059690601"
}
```
**Tips**:
-   There is an option to transfer the call via Main Company Number + extension number, e.g. "phoneNumber":"+18882101932*104". In future releases we're planning to remove this option, but provide an ability to Transfer and Forward the call using **extensionNumber**.

#### Transfer to Voicemail
To forward the call to Voicemail specify **voicemail** in request body, similar to above example. The call will go straight to specified mailbox for the caller to leave a message.
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
"voicemail":"400415048004"
}
```

#### Call Park
If you are a member of any Park Location Group you could park the call via **Transfer** API. The call will be parked to specified mailbox.
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
"parkOrbit":"400416048004"
}
```
Setting up and Using Park Locations via [Service Site](https://success.ringcentral.com/articles/RC_Knowledge_Article/8355) or via [Ringcentral API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefParkLocationUsers.html).

## Recording
To start recording use **Recordings** API. You will hear a notification that the call is being recorded.
```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/recordings
```
The response can be as follows:
```
{
    "active": true,
    "id": "<recordingId>"
}
```
Once recording is started you can pause and unpause recording as follows:
```
PATCH /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/recordings/<recordingId>

{
"active": false
}
```
**Tips**:
-   [How to Obtain Call Recording Metadata and Content](https://ringcentral-api-docs.readthedocs.io/en/latest/calllog_call-recordings/)

## Call Flip
Call Flip if you rely on a number of different phones (e.g., desk phone, cell phone, the RingCentral softphone), Call Flip could become something you use quite often. This nifty feature enables you to transfer calls between any two phones. Flip a call from a desk phone to a mobile phone or a mobile phone to a home phone …you get the idea. See [How Call Flip works](https://www.ringcentral.com/office/features/call-flip/overview.html).

[Configure your Call Flip Settings](https://success.ringcentral.com/articles/RC_Knowledge_Article/Calling-Features-How-to-use-Call-Flip-for-instant-call-forwarding) via Service Site or via [Ringcentral Forwarding Number List API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html).

```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/flip

{
  "callFlipId": "*2"
}
```

## End Call
Drop the call for all participants:
```
DELETE /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>

```
