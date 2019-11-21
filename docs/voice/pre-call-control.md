# Pre-call Control

There are two phases within the life-cycle of a call on the network when the call can be intercepted and contolled in someway. You can intercept a call while it is in-flight and being routed on the network (a.k.a. "pre-call control") and when the call has been connected with a destination (a.k.a. "active-call control"). 

The actions a developer can take on a call prior to it being connected or answered are:

* Forward the call
* Send to voicemail
* Reject the call

## Forwarding Calls

You can use the Forward API to transfer the incoming call to another phone number or to voicemail, without answering the call. The Forward API works for parties in the `Setup` and `Proceeding` states only (this is the main differece with the Transfer API, which works with already accepted calls). 

### Forwarding a call to a phone number

To forward the incoming call to another phone number utilize the `telephonySessionId` and `partyId` in the endpoint's path as shown below.

**Request**

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/forward

{
  "phoneNumber":"+12059690601"
}
```

!!! note "The `phoneNumber` field in the request body should be in e164 format"

!!! tip "Tips"
    
    * You can configure the pre-set numbers on the list via [Forwarding Number List API](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html) to have pre-configured Forwarding.
    * You can forward calls to another extension in your RingCentral account by specifying that extension's Direct Phone Number.

### Forwarding a call to voicemail

To forward the incoming call to voicemail, specify `voicemail` in request body, similar to the above example. The call will then be routing straight to the specified mailbox for the caller to leave a message.

**Request**

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/forward

{
  "voicemail": "400415048004"
}
```

### Rejecting a call

The Reject API will stop the ringing on your device/app. It is equivalent to the "Ignore" option on Ringcenrtral Desktop app, i.e. the caller will still hear ringing sounds, until picked up on another Forwarding Number, or until the caller is routed to your extension's voicemail.

**Request**

```http
POST /restapi/v1.0/account/~/telephony/sessions/<telephonySessionId>/parties/<partyId>/reject
```

!!! info "Future features"
    In upcoming releases we're planning to support much more features, such as:
    
    * **Answer (Replace)** - accept the incoming call.
    * **Reply** - with this option you can send a Text-to-speech reply to the caller. It could be either pre-set message or custom own message. After you press Send, your message is announced to the Caller.
    * **Voicemail Screening** - you can listen and have the option to Pick up the call while your caller leaves you a voicemail.

