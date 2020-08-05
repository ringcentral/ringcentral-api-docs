# Active-call Control

There are two phases within the life-cycle of a call on the network when the call can be intercepted and contolled in someway. You can intercept a call while it is in-flight and being routed on the network (a.k.a. "pre-call control") and when the call has been connected with a destination (a.k.a. "active-call control").

When call is in progress, a developer can:

* mute/unmute participants
* hold/unhold participants
* start and pause recording
* transfer the call
* park the call
* flip the call
* end the call

## Muting and unmuting a participant

One can mute or unmute a participant if you know the participant's `partyId` and by using the `muted` parameter in the Call Control API.

**Request**

```http
PATCH /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>

{
  "muted" : true
}
```

!!! alert "Limitations"
    There is a known limitation relating to muting participants - muting via the REST API doesn't work with mute placed via RingCentral apps or hard phone. Therefore, if you muted a participant via the Call Control API and the call was already muted via the Ringcentral Desktop app then you need to unmute both endpoints to bring media back.

## Placing a call on hold

Use the Hold or Unhold APIs to put the participant on hold, or to unhold them accordingly. 

**Request**

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/hold
```

!!! tip "Custom Hold Music"
    You can configure what music or content is played for users on hold via [custom user greetings APIs](https://developers.ringcentral.com/api-reference/Rule-Management/createCustomUserGreeting). Keep callers informed and entertained with messages and music when they are on hold.

!!! note "Limitations"
    The same limitations for mute/unmute exist for holding/unholding: hold/unhold via REST API doesn't work with Hold/Unhold placed via RingCentral apps or HardPhone.

## Transfer a call

The Transfer API works similar to the Forward API, except that the party must first accept the call. You can then transfer the call to another phone number, to voicemail or to a park location (see Park Orbit feature).

#### Transfer to a phone number

Specify the target phone number for a party transfer:

```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
  "phoneNumber":"+12055550601"
}
```

!!! tip "Transferring to specific extension"
    There is an option to transfer the call via Main Company Number + extension number, e.g. `"phoneNumber":"+18885551932*104"`. In the future we're planning to remove this option, but provide an ability to transfer and forward the call using `extensionNumber`.

#### Transfer to voicemail

To forward the call to voicemail specify `voicemail` in request body, similar to above example. The call will go straight to specified mailbox for the caller to leave a message.

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
  "voicemail":"400415048004"
}
```

## Parking a call

If you are a member of any Park Location Group you could park the call via **Transfer** API. The call will be parked to specified mailbox.

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/transfer

{
  "parkOrbit":"400416048004"
}
```

Setting up and Using Park Locations via [Service Site](https://support.ringcentral.com/s/article/8355) or via [Ringcentral API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefParkLocationUsers.html).

## Recording a call

To start recording use **Recordings** API. You will hear a notification that the call is being recorded.

**Request**

```http
POST /restapi/v1.0/account/~/telephony/sessions/:telephonySessionId/parties/:partyId/recordings

{
    "active": true,
    "id": "<recordingId>"
}
```

Once recording is started you can pause and unpause recording as follows:

```
PATCH /restapi/v1.0/account/~/telephony/sessions/:telephonySessionId/parties/:partyId/recordings/:recordingId

{
  "active": false
}
```

## Flipping a call 

Call flipping is useful if you rely on a number of different phones (e.g., desk phone, cell phone, the RingCentral softphone) and enables you to transfer calls between any two phones. Flip a call from a desk phone to a mobile phone or a mobile phone to a home phone... you get the idea. See [How Call Flip works](https://www.ringcentral.com/office/features/call-flip/overview.html).

[Configure your Call Flip Settings](https://support.ringcentral.com/s/article/Calling-Features-How-to-use-Call-Flip-for-instant-call-forwarding) via Service Site or via [Ringcentral Forwarding Number List API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html).

```
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/flip

{
  "callFlipId": "*2"
}
```

## Ending a call

Drop the call for all participants:

```
DELETE /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>
```
