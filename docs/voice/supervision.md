# Call Supervision and Monitoring

[RingCentral Call Monitoring](https://www.ringcentral.com/office/features/call-monitoring/overview.html) allows a person to receive a real-time audio stream so they can listen in on a call. The primary use case is a supervisor wishing to monitor and provide feedback on an agent's performance.

The Call Monitoring API allows a developer to connect to an active phone call and subscribe to an audio stream programatically. Some use cases for this API include:

* To provide a real-time transcription of a call.
* To use NLP and AI to assist agents in helping resolve cases faster.

Partners today have used this API to provide RingCentral customers with call assistants that provide their agents with real-time suggestions to help provide customers with rapid and accurate recommendations. This scenario is visualized below. Once the call is established, the Supervision API can be used to connect an app to a call by providing:

* Call's `sessionId`
* Agent's `extensionNumber`
* Supervisor's `deviceId`.
 
<img class="img-fluid" src="../../img/supervisionapi_v3.png">
  
## Prerequisites

Before you begin, please verify these prerequesites are met:

1. Your RingCentral Account has the "Call Monitoring Group" feature enabled as described in this [Knowledgebase article](
https://support.ringcentral.com/s/article/8050?language=en_US).

2. You have set up a "Call Monitoring Group" with Agents and Supervisors in the [Online Account Portal](https://service.ringcentral.com), or via the [RingCentral API](https://developers.ringcentral.com/api-reference#Account-Provisioning-createCallMonitoringGroup).

3. The supervisor has been configured with a SIP device, such as VoIP phone or a SIP server, that is configured to auto-answer/respond to a SIP INVITE request.

!!! important "No sandbox support"
    This feature is only available in a production enviornment and not supported in a sandbox enviornment.

## Call Monitoring Groups

Due to the sensitive nature of Call Monitoring, authorization to be monitored and to monitor others must be specifically given to extensions within an account. To manage these permissions, a developer first creates a Call Monitoring Group, and then adds users/extensions to that group designating:

* What extensions/individuals can be monitored
* What extensions/individuals can monitor others

Once a Call Monitoring group has been configured, developers can use the Supervise Call API below to actively listen in on a call. 

* [View Call Monitoring Groups documentation in the API Reference](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/createCallMonitoringGroup)
* [Learn how to setup call monitoring in the Admin Console](https://support.ringcentral.com/s/article/8050?language=en_US)

## Supervise Call API

The Supervise Call API is used to have RingCentral initiate a call out to a registered device such as a VoIP phone or SIP server as follows.

### Request

The following is an example request showing the required parameters to add a supervisor to an existing call session.

```HTTP tab="Raw"
POST /restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/supervise HTTP/1.1
Content-Type: application/json
Content-Length: ACTUAL_CONTENT_LENGTH_HERE
Authorization: <YOUR_ACCESS_TOKEN>

{  
   "mode": "Listen",
   "extensionNumber": "108",
   "deviceId": "60727004"
}
```

```Ruby tab="Ruby"
require 'ringcentral'

rc = RingCentral.new(
  'client_id',
  'client_secret',
  'https://platform.ringcentral.com')
  
rc.authorize username: '+16505550100',
  extension: '',
  password:  'my_password')

res = rc.post '/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/supervise', payload: {  
   "mode": "Listen",
   "extensionNumber": "108",
   "deviceId": "60727004"
}
```

#### Parameters

| Parameter | Location | Required? | Description |
|-|-|-|-|
| `accountId` | path | required | This is the unique identifier for the account associated with the request. This can be the actual id or `~` for the current `accountId`. The default `~` value is acceptable in all uses for this API. |
| `telephonySessionId` | path | required | This is the unique identifier for the call, including all parties. See the next section on how to get a list of current telephony sessions. |
| `deviceId` | body | required | This is the `deviceId` of the Supervisor's SIP device. You can get the supervisor's deviceId using the Extension device info API `/restapi/v1.0/account/~/extension/~/device` | 
| `extensionNumber` | body | required | The extension number of the agent whose call you want to monitor. Note: In future we shall also support `extensionId`. |
| `mode` | body (required) | Currently, the only method supported is `Listen`. |

#### How to find the Session ID and Extension Number

The `telephonySessionId` and `extensionNumber` properties can be retrieved from any of the following:

* Call Session Notification events
* Account-level Presence API
* Extension-level Presence API.

The following example shows how to retrieve the `telephonySessionId` uses the account-level presence API. The agent extension is in the `extension.extensionNumber` property and the `telephonySessionId` is in the `activeCalls[0].telephonySessionId` property.

```json tab="Response" hl_lines="6 34"
{
   "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/62226587016/presence",
   "extension":{
      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/62226587016",
      "id":62226587016,
      "extensionNumber":"108"
   },
   "presenceStatus":"Busy",
   "telephonyStatus":"CallConnected",
   "userStatus":"Available",
   "dndStatus":"TakeAllCalls",
   "meetingStatus":"Disconnected",
   "allowSeeMyPresence":true,
   "ringOnMonitoredCall":false,
   "pickUpCallsOnHold":false,
   "activeCalls":[
      {
         "id":"8bd930cab325416aa054238237eb8832",
         "direction":"Inbound",
         "fromName":"ROY,DIBYENDU",
         "from":"+14083388064",
         "toName":"Dibyendu Roy",
         "to":"+12053788673",
         "telephonyStatus":"CallConnected",
         "sipData":{
            "toTag":"qf-7.p-XGI9-o3D7bA3j7ihdOqfT0Z9D",
            "fromTag":"10.13.22.25-5070-742e2a888ab14be",
            "remoteUri":"do-not-use-me-I-am-useless",
            "localUri":"do-not-use-me-I-am-useless"
         },
         "sessionId":"183851523016",
         "startTime":"2019-03-26T22:16:29.629+0000",
         "partyId":"cs168629785304410134536-2",
         "telephonySessionId":"XXXXXXXXXX"
      }
   ]
}
```

```http tab="Request"
GET /restapi/v1.0/account/{accountId}/presence/detailedTelephonyState=true&sipData=true
```

#### How to find the Device ID

To retrieve the `deviceId` required by this API, call the `extension/device` endpoint on the supervisor's extension as follows:

```json tab="Response"
{
   "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646016/device/60727004",
   "id":"60727004",
   "type":"SoftPhone",
   "sku":"DV-1",
   "name":"Softphone - Digital Line",
   "serial":"LMRC8531",
   "computerName":"LMRC8531",
   "status":"Online",
   "extension":{
      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016",
      "id":809646016,
      "extensionNumber":"101"
   }
}
```

```http tab="Request"
GET /restapi/v1.0/account/~/extension/{supervisorExtensionId}/device
```

### Response

If the request is success, two things will happen.

1. First, the API will send a response to reflect that the supervisor has joined the agent extension with a seperate party `id`, e.g. `party-4` in this example.
2. Next, RingCentral will then send a SIP INVITE request to the supervisor's device which will signal the device to join the existing customer-agent call session automatically with auto answer.

Once those two operations are complete, the human or app supervisor will be allowed to stream the audio. Let's look at these samples below. 

#### JSON Response from API

```json
{
    "direction": "Outbound",
    "from": {
        "deviceId": "60727004",
        "extensionId": "809646016",
        "name": "Supervisor ABC",
        "phoneNumber": "101"
    },
    "id": "party-4",
    "muted": false,
    "owner": {
        "accountId": "809646016",
        "extensionId": "809646016"
    },
    "standAlone": false,
    "status": {
        "code": "Answered",
        "reason": "Supervising"
    },
    "to": {
        "extensionId": "62226587016",
        "name": "Dibyendu Roy",
        "phoneNumber": "108"
    }
}
```

#### Sample SIP Invite sent to the Supervising Device

Below is a sample SIP Invite which is delivered to the supervising device. You will notice in the lines 10 and 26highlighted below the following:

* Line 10: `p-rc-api-ids` contains the supervisor's `party-id` and `session-id`
* Line 26: `i` contains the PSTN's (customer) `party-id` and the agent `party-id`

```http hl_lines="10 26" linenums="1"
|||INVITE sip:18002097562*102@192.168.42.15:62931;transport=TCP;ob SIP/2.0
||||Via: SIP/2.0/TCP 10.62.192.70:5091;branch=z9hG4bK2fh25j30couuhqiscdi0.1
||||Max-Forwards: 69
||||User-Agent: RC_SIPWRP_25.111
||||From: <sip:+16508370072@10.62.192.70>;tag=10.62.25.111-5070-6ce1264681244a
||||To: <sip:18002097562*102-c4giuv3vhjebe@192.168.12.3;ob>
||||Contact: <sip:+16508370072@10.62.192.70:5091;transport=tcp>
||||Call-ID: 198dd3ed335a4cc7832979c3065bb2a7
||||CSeq: 31268 INVITE
||||p-rc-api-ids: party-id=cs171841903350030962-6;session-id=Y3MxNzE4NDE5MDMzNTAwMzA5NjJAMTAuNjIuMjUuMTEx
||||Alert-Info: Auto Answer
||||Call-Info: <KyOAG0RTd5fP1WkxMAuXNw..>;purpose=info;Answer-After=0
||||Allow: SUBSCRIBE, NOTIFY, REFER, INVITE, ACK, BYE, CANCEL, UPDATE, INFO
||||Supported: replaces, timer, diversion
||||Session-Expires: 14400;refresher=uac
||||Min-SE: 90
||||Content-Type: application/sdp
||||Content-Length: 510
||||P-Acme-VSA: 200:KyOAG0RTd5fP1WkxMAuXNw..
||||v=0
||||o=- 137800156 2016517757 IN IP4 10.62.192.70
||||s=SmcSip
||||c=IN IP4 10.62.192.70
||||t=0 0
||||m=audio 50400 RTP/AVP 111 9 0 18 96 8 109 101
||||i=Y3MxNzE4NDE5MDMzNTAwMzA5NjJAMTAuNjIuMjUuMTEx party-id=cs171841903350030962-7
||||a=rtpmap:111 OPUS/48000/2
||||a=fmtp:111 useinbandfec=1
||||a=rtcp-fb:111 ccm tmmbr
||||m=audio 50402 RTP/AVP 111 9 0 18 96 8 109 101
||||i=Y3MxNzE4NDE5MDMzNTAwMzA5NjJAMTAuNjIuMjUuMTEx party-id=cs171841903350030962-8
||||a=rtpmap:111 OPUS/48000/2
||||a=fmtp:111 useinbandfec=1
||||a=rtcp-fb:111 ccm tmmbr
||||a=sendrecv
```

#### How to verify the Supervisor has joined the session

To verify that the supervisor has joined the call use the account-level Presence API to see that an additional party has been added to the existing session. Then verify that the supervisor's party is in the `activeCalls` property. For example:

```json tab="Response" hl_lines="19"
{
   "activeCalls":[
      {
         "id":"aa97ce30b90441158a421ca0e9c0a233",
         "direction":"Outbound",
         "fromName":"Supervisor ABC",
         "from":"101",
         "toName":"Agent",
         "to":"108",
         "telephonyStatus":"CallConnected",
         "sipData":{
            "toTag":"I2rPJdYwDjuEeOFJpT2pDszuCrepqQsL",
            "fromTag":"10.14.23.50-5070-a272ac7ba84b4a7",
            "remoteUri":"do-not-use-me-I-am-useless",
            "localUri":"do-not-use-me-I-am-useless"
         },
         "sessionId":"590506730017",
         "startTime":"2019-03-27T19:14:22.564+0000",
         "partyId":"party-4",
         "telephonySessionId":"XXXXXXXXXX"
      }
   ]
   ...
}
```

```http tab="Request"
GET /restapi/v1.0/account/{accountId}/presence?detailedTelephonyState=true&sipData=true
```

!!! note "FCC Compliance"
    If you intend to save the audio stream, please make sure you comply with the FCC guidelines by letting the customer know that the calls will be monitored. The following [video](https://vimeo.com/326948521) demonstrates a working example of the Supervision API using the concepts described here.

#### Building a sample Call Monitoring application 

!!! We now show you, how to build a sample application using the Call Monitoring API

Note: In this case the deviceID of the supervisor will change every time the supervisor logs out or re-registers from the SoftPhone, so you need to make sure you have the correct and latest deviceID that can be used. We would cover a separate section on how to make a static deviceID.This example uses Node.js as a development language. You can use the language of your choice. 

### Steps using the Call Monitoring API with Supervisor Device as SoftPhone (Dynamic  deviceId)

(a) Make sure you have installed/imported the below libraries

```        
        import RingCentral from '@ringcentral/sdk'
        import Subscriptions from '@ringcentral/subscriptions'
        import Speaker from 'speaker'
        import { nonstandard } from 'wrtc'
        import Softphone from 'ringcentral-softphone'
        import fs from 'fs'
```

(b) Get the deviceID of the Supervisor device - This can be done in following ways

  
(i) Getting the devices attached to an Extension using [Get Devices API](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices) 

(ii) Use the SIP Registration API to get the deviceID at the time of SIP registration. We have used the SDK that already incorporates this API call, so you don’t need to handle the request/response separately. The piece of code that does this for you is below

If you want to build your own softphone SDK in other languages, please refer to this 
[Blog](https://medium.com/@tylerlong/2281edd661ec) for reference.

Code for Softphone Registration using RingCentral SDK
     
```
            (async () => {
            await rc.login({
            username: process.env.RINGCENTRAL_USERNAME,
            extension: process.env.RINGCENTRAL_EXTENSION,
            password: process.env.RINGCENTRAL_PASSWORD
            })
            const softphone = new Softphone(rc)
            await softphone.register()
```

(c) Setup the Agent Extension/s to be monitored: You would have a predefined list of Agent Extension numbers that you want to be monitored. The below code takes the Agent Extension numbers from a file and sets up Subscriptions on them using PubNub. This will allow your App to be notified when Agent goes into a Live Call, so that you can initiate a Call Monitoring.

```
        const r = await rc.get('/restapi/v1.0/account/~/extension')
       const json = await r.json()
       const agentExt = json.records.filter(ext => ext.extensionNumber === process.env.RINGCENTRAL_AGENT_EXT)[0]
       const subscriptions = new Subscriptions({
       sdk: rc
       })
       const subscription = subscriptions.createSubscription({
       pollInterval: 10 * 1000,
       renewHandicapMs: 2 * 60 * 1000
       })
      subscription.setEventFilters([`/restapi/v1.0/account/~/extension/${agentExt.id}/telephony/sessions`])
```

(d) Now, when a customer calls the monitored Agent, you detect the call using your previously set up subscription (on the agent extension) and then trigger your Monitoring API Call to start streaming the LIVE audio call between the agent and the customer. The below code does the same.

```
      subscription.on(subscription.events.notification, async function (message) {
      if (message.body.parties.some(p => p.status.code === 'Answered' && p.direction === 'Inbound')) {
      await rc.post(`/restapi/v1.0/account/~/telephony/sessions/${message.body.telephonySessionId}/supervise`, {
      mode: 'Listen',
      supervisorDeviceId: softphone.device.id,
      agentExtensionNumber: agentExt.extensionNumber
      })
      }
      })
      
```

(e) Once the call monitoring API is triggered , the Supervisor device (SoftPhone) accepts the SIP INVITE automatically (It was pre-configured to do that) and the agent-customer call audio is live streamed to the Supervisor device. In this sample app , we have generated an audio track and saved the audio file as call.raw into local filesystem from where the app is run.

```
     softphone.on('INVITE', sipMessage => {
    softphone.answer(sipMessage)
    softphone.once('track', e => {
      const audioSink = new nonstandard.RTCAudioSink(e.track)
      let speaker = null
      let prevSampleRate = null
      const audioFilePath = 'call.raw'
      if (fs.existsSync(audioFilePath)) {
        fs.unlinkSync(audioFilePath)
      }
      const writeStream = fs.createWriteStream(audioFilePath, { flags: 'a' })
      audioSink.ondata = data => {
        console.log('live audio data receivedlive audio data received, sample rate is', data.sampleRate)
        if (speaker === null) {
          if (data.sampleRate === prevSampleRate) { // wait until sample rate stable
            speaker = new Speaker({ channels: data.channelCount, bitDepth: data.bitsPerSample, sampleRate: data.sampleRate, signed: true })
          }
          prevSampleRate = data.sampleRate
        } else {
          speaker.write(Buffer.from(data.samples.buffer))
          writeStream.write(Buffer.from(data.samples.buffer))
        }
      }
      
```

With the [Demo](https://github.com/tylerlong/ringcentral-call-supervise-demo) App you can listen to the Audio Talk. It also saves the audio in a file called call.raw on your local machine (the directory where your app runs from). You can play the file using the command play -e signed -b 16 -r 8000 -c 1 call.raw 

You can also refer to this [Blog](https://medium.com/ringcentral-developers/automatically-supervise-your-call-agents-78c0cd7caf7f) 

### Steps (with a fixed deviceID)


All the steps here would be the same as above, except how to configure a BYOD device with a Fixed Device ID.

[Steps](https://support.ringcentral.com/s/article/4966?language=en_US) for Configuring a BYOD Device with a Fixed Device ID
