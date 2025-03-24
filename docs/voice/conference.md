# Managing Conference Calls
Multi-way conference calling enables multiple people on multiple phones to connect to the same call. A user with a RingCentral account can start a conference and bring in parties to the conference, without the need to set up a Conference Bridge. Each party brought into the conference, whether using a RingCentral number or their own phone, can speak to others who are on the same conference. Each account has it's own conferencing line where up to 10 parties can join a call.

<img class="img-fluid" src="../../img/conference-call.png">

The Conference Call API allows a developer to automatically:

* Start a conference call
* Bring-in a call party to a conference call
* Remove a call party from a conference call

## Starting a conference call
The Conference API is used to initiate a conference call on the specified account. No request body is needed to start a conference call session on the account.  If the account is the user's current account, a `~` can be used instead of the account ID.

=== "Request"
    ```
    POST /restapi/v1.0/account/~/telephony/conference
    Content-Type: application/json
    Authorization: <YOUR_ACCESS_TOKEN>
    ```

=== "Response"
    ```
    {
      "session": {
        "creationTime": "2020-09-10T00:25:21Z",
        "id": "s-46d25a881853422c9f61497c6f76a327",
        "origin": {
          "type": "Conference"
        },
        "parties": [],
        "voiceCallToken": "conf_732d34366432356138383138353334323263396636313439376336663736613332374031302e31332e3132332e3235303a35303730"
      }
    }
    ```

This will return a `voiceCallToken` which is the call token for entering the conference call.
You'll also receive a telephony session ID (`id`) that will be used in the following calls to add and remove parties from the call.

To bring in the first caller to the conference call, you need to send a Session Initiation Protocol (SIP) INVITE using the SIP WebRTC implementation being used by the client.

!!! Important
    A SIP INVITE is required to bring in parties to the conference call, otherwise you will receive a 403 error.  The conference call will wait 38 seconds for the SIP INVITE to complete or else the conference will be terminated.

```
INVITE sip:conf_732d34366432356138383138353334323263396636313439376336663736613332374031302e31332e3132332e3235303a35303730@sip.ringcentral.com SIP/2.0
Via: SIP/2.0/WSS
To: <sip:conf_732d34366432356138383138353334323263396636313439376336663736613332374031302e31332e3132332e3235303a35303730@sip.ringcentral.com>
From: <sip:17203861294*11101@sip.ringcentral.com>
```

If you are using the [RingCentral WebPhone SDK](https://github.com/ringcentral/ringcentral-web-phone), you can add the first user to the conference call (as the logged in user) using the code below. The code will send a SIP INVITE as stated above. Refer to the [RingCentral WebPhone SDK](https://github.com/ringcentral/ringcentral-web-phone) docs for more details

```
const webPhoneConfig = {...}
const webPhone = new WebPhoneSdk(registrationData, webPhoneConfig)
const session = webPhone.userAgent.invite(voiceCallToken, {
  fromNumber: 'xxxxxxxx'
});
```

The same can be tried using the RingCentral WebPhone Online Demo by logging into https://ringcentral.github.io/ringcentral-web-phone/ and making a phone call to the `webPhoneConfig` using the UI

!!! Important
    A SIP INVITE takes time to complete, during which time a bring-in command or presence command will not operate properly.  Please make sure to include a timeout to delay bring-in or presence commands before the SIP INVITE is ready. Or listen instead for the presence event when the conference call is connected.

## Bring-in a call party to a conference call

Now that a conference has started, and you have established a Session Initiation Protocol, you can add parties to the call using the telephony session ID of the conference call (`id`). The `telephonySessionId` found in the path is the conference session ID (`id`).  The `telephonySessionId` in the body is the initial call from the outside party to the agent (host). A maximum of 10 parties can be added to a conference call with only 1 call party allowed to join a conference per request.  

=== "Request"
    ```
    POST /restapi/v1.0/account/~/telephony/sessions/{telephonySessionId}/parties/bring-in
    Content-Type: application/json
    Authorization: <YOUR_ACCESS_TOKEN>

    {
      "telephonySessionId" : //Session id of the call you want to bring in to the conference
      "partyId" : //Identifier of the participant from that call
    }
    ```

Two sets of parameters can be used to bring a party into a conference call.

### Parameters

| Parameter | Location | Required? | Description |
|-|-|-|-|
| `accountId` | path | required | This is the unique identifier for the account associated with the request. This can be the actual id or `~` for the current `accountId`. The default `~` value is acceptable in all uses for this API. |
| `telephonySessionId` | path | required | This is the unique identifier for the **conference** call. |
| `sessionId` | body | required | The telephony session ID in which the party you want to bring in is already on a call. |
| `partyId` | body | required | This is the unique identifier for the call party to add to this conference call. |

### Finding Call Parties
You find call parties by looking for active calls. The `presence` APIs allow you to see near real-time details of existing calls. Find the active call you want to join to the conference from the list of active calls.

=== "Request"
    ``` http
    POST /restapi/v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true HTTP/1.1
    Content-Type: application/json
    Content-Length: ACTUAL_CONTENT_LENGTH_HERE
    Authorization: <YOUR_ACCESS_TOKEN>
    ```

=== "Response"
    ``` json
    {
      "activeCalls": [
        {
          "direction": "Outbound",
          "from": "+19295550100",
          "id": "3sv13tj6e4ohgq4kak5j",
          "partyId": "p-854662029bf6411d8e216786ca373674-1",
          "sessionId": "10675785005",
          "startTime": "2020-09-24T19:51:19.020Z",
          "telephonySessionId": "s-854662029bf6411d8e216786ca373674",
          "telephonyStatus": "CallConnected",
          "to": "+15105550101"
        }
        {
          "direction": "Outbound",
          "from": "+19295550100",
          "id": "3sv13spmbukc2ku0dln7",
          "partyId": "p-19a6e4906d8d4c799781760b03fbb014-1",
          "sessionId": "0",
          "startTime": "2020-09-24T19:51:29.235Z",
          "telephonySessionId": "s-19a6e4906d8d4c799781760b03fbb014",
          "telephonyStatus": "CallConnected",
          "to": "conference",
          "toName": "Conference"
        }
      ],
      "allowSeeMyPresence": true,
      "dndStatus": "TakeAllCalls",
      "extension": {
        "extensionNumber": "102",
        "id": 684351005,
        "uri": "https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}"
      },
      "meetingStatus": "Disconnected",
      "pickUpCallsOnHold": false,
      "presenceStatus": "Busy",
      "ringOnMonitoredCall": false,
      "telephonyStatus": "CallConnected",
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence",
      "userStatus": "Available"
    }
    ```

## Remove a call party from a conference call

You can remove a party from a conference call by specifying the party ID you wish to delete from the call. You may delete only one conference participant from a call at a time.

=== "Request"
    ```
    DELETE /restapi/v1.0/account/~/telephony/sessions/{telephonySessionId}/parties/{partyId}
    Content-Type: application/json
    Authorization: <YOUR_ACCESS_TOKEN>
    ```

### Parameters

| Parameter | Location | Required? | Description |
|-|-|-|-|
| `accountId` | path | required | This is the unique identifier for the account associated with the request. This can be the actual id or `~` for the current `accountId`. The default `~` value is acceptable in all uses for this API. |
| `telephonySessionId` | path | required | This is the unique identifier for the call, including all parties. See the next section on how to get a list of current telephony sessions. |
| `partyId` | path | required | This is the internal identifier for the call party to remove. |
