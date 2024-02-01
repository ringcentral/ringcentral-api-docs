# Detecting State Changes to an Active Call

There are two primary ways in which a developer can detect a change in the status of an active call:

1. By monitoring the presence status of an extension on the network
2. By subscribing to a specific call (a.k.a. telephony session) on the network

What a developer subscribes to depends largely upon the use case. For example, subscribing to presence events provides a good way of establishing a call control policy that relates to a fixed extension on the network. However, perhaps call handling logic requires custom policies to be enforced on the fly depending upon the call itself. In which case subscribing to a specific call and waiting for the call to enter a specific state is probably best. 

## Creating a Subscription

Detailed instructions on [creating webhooks and subscriptions](../notifications/index.md) can be found elsewhere in the Developer Guide. As a convenience, here is how one would subscribe to receive both presence and telephony session events via a push notification.

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

## Subscribing to presence notifications

Presence events are triggered whenever a user's availability changes. This may or may not relate to the user being on a call or not. Therefore, it is important for developers to be able to disambiguate between these different availability state changes, and respond accordingly—ignoring some (e.g. a user changes their do not disturb status), and responding to others (e.g. a user answers their phone). 

### Example presence notification

```json
{
    "uuid": "1787755531108376563",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
      "uuid": "1787755531108376563",
      "event": "/restapi/..snip../presence?detailedTelephonyState=true&sipData=true",
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

!!! note "Limitations"
    Legacy BLF solutions might not support some complex PBX scenarios. In Release 10.2 we've added `activeCalls.telephonySessionId` and `activeCalls.partyId` to allow Customers to use Telephony API. You can also use a GET call on the Presence endpoint to get details on active calls for a current user.

## Subscribing to telephony sessions

Developers can receive notifications about telephony session state changes for a single user/extension, or for all users across an entire account. The following subscription event filters are used accordingly:

* **Account-level Event Filter**: `/restapi/v1.0/account/~/telephony/sessions`
* **Extension-level Event Filter**: `/restapi/v1.0/account/~/extension/~/telephony/sessions`

### Example Telephony Session Notification

```json
{
    "uuid": "837270960869181944",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
    "pn_apns": {
      "aps": {
        "content-available": 1
      },
      "uuid": "837270960869181944",
      "event": "/restapi/..snip../extension/40xxx08/telephony/sessions",
      "timestamp": "2018-06-05T00:14:50.181Z",
      "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
      "ownerId": "400144455008",
      "body": {
        "sequence": 5,
        "sessionId": "402936341008",
        "telephonySessionId": "Y3MxNzxxxxRAMTAuNjIuMjUuMTEx",
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

!!! note "Current limitations of telephony notifications"
    In our initial implementation, notifications won't be delivered in the following scenarios:
    
    * if a party doesn't belong to subscriber account/extension (another RC account, PSTN, intermediate parties, etc).
    * if a party belongs to another session (transferred call, conference, etc).
    * if a party does not belong to any accountId or mailboxId (some parties are created to represent intermediate "leg", e.g. to connect telephony session with RC Conference)



