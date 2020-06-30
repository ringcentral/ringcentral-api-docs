# Telephony Session Notification

A developer can use Telephony Session Notification to detect all changes in the status of a call effectively. 

## What is Telephony Session Notification?

A Telephony Session Notification (Telephony Session Notification) is a series of notifications or events a developer can use to track an end-to-end telephony call in RingCentral. The call can be from an external PSTN or any mobile number to a RingCentral extension, or it can be from a RingCentral Digital Line to an external PSTN number, or it can be between two RingCentral extensions. The Telephony Session Notification provides detailed end-to-end call sessions and party (endpoints/user) level information to enable developers to take specific actions or build custom reports based on that call information. The Telephony Session Notification events can be subscribed both at an Account level or at an Extension level.

Account Level Telephony Session Notification -  Will track and provide notifications for all the extensions within an account.

Extension Level Telephony Session Notification - Will track calls on a specific extension.

Detailed instructions on the [Notification types](https://developers.ringcentral.com/api-reference/Account-Presence-Event) are available in the API reference.

Detailed instructions on how to subscribe to [RingCentral events](https://developers.ringcentral.com/guide/notifications) or notifications are available in the API reference


## What are the use cases?

<h5>Call Analytics</h5> -  Developers can use the raw data from Telephony Session Notification events and build call analytics dashboards replicating live reports which use the same event streams. Some of the standard call analytics metrics and their corresponding formulas are:

    - Ring Time
    - Call Talk Time
    - Call Hold Time

!!! note "Development Considerations."
    The individual event streams needs to be stored in a persistent storage like MySql DB to peform the calculations.


### Ring Time - This is the amount of time the call was ringing before it was answered. It is the time duration between Proceeding and Answered state.


  Ring Time = Time difference between Proceeding and Answered
    
  Example:

  Step 1:  Get the `'eventTime': '2020-06-23T23:46:11.243Z'` for `'code': 'Proceeding'`


  Step 2:  Get the `'eventTime': '2020-06-23T23:46:23.451Z'` for `'code': 'Answered'`



  Step 3:  Ring Time =  Timestamp in Step 2 - Timestamp in Step 1 = `'eventTime': '2020-06-23T23:46:23.451Z'` - `'eventTime': '2020-06-23T23:46:11.243Z'` = 12 seconds

### Call Talk Time- Time duration between answered and disconnected.

  Call Talk Time = Time difference between Answered and Disconnected 
  (If the call is put on hold in between, you can include the hold time or subtract the total hold times based on business logic)
  
  Example

  Step 1 : Get the `'eventTime': '2020-06-23T23:46:23.451Z'` for `'code': 'Answered'`

  Step 2:  Get the `'eventTime': '2020-06-23T23:46:34.132Z'` for `'code': 'Disconnected'`


  Step 3 : Call Talk Time =   Timestamp in Step 2 - Timestamp in Step 1 =  `'eventTime': '2020-06-23T23:46:34.132Z'` - `'eventTime': '2020-06-23T23:46:23.451Z'` = 13 seconds

### Call Hold Time - Time duration between Hold and Answered state. If a call is held multiple times, it can be calculated based on the sum of total hold times.

  Call Hold Time = Time difference between Answered and Hold  

  Example


  
  Step 1: Get the `'eventTime': '2020-06-24T00:00:30.809Z'` for `'code': 'Hold'` 


  Step 2: Get the `'eventTime': '2020-06-24T00:00:45.710Z'` for `'code': 'Answered'`
  
  
  Step 3:  Hold Time =  Timestamp in Step 2 - Timestamp in Step 1 = `'eventTime': '2020-06-24T00:00:45.710Z'` - `'eventTime': '2020-06-24T00:00:30.809Z'` = 15 seconds



<h5>Call Monitoring</h5> - Telephony Session Notifications can be used to monitor calls at an Extension or an Account level to fulfill use cases like contact center agent assist using [Dual-Channel](https://developers.ringcentral.com/guide/voice/supervision) or [Single-Channel Call Monitoring](https://developers.ringcentral.com/guide/voice/supervision)

<h5>Incoming call routing</h5> - Telephony Session Notifications can be used to monitor and detect an incoming call and apply custom call routing logic to suit business-specific needs. For example, forwarding calls from an important customer to a call queue supervisor.

## What are the different states of a Call?

A call transitions through various states from the start of the call to the end. A Telephony Session Notification captures each of these states. States of a call are associated with the parties involved in the call, and it can be the "Outbound" party (party making the call) or the "Inbound" party (party receiving the call). The schema object "status.code" in the Telephony Session Notification captures the state of the call in regards to the party (Outbound or Inbound) involved in the call. The table below illustrates the different states that a party goes though in a call session.

| Call Session | Party Direction | State|Description
| ----------- | ----------- |----------- |-----------|
| Session Establishing| Outbound|Setup|RingCentral telephony platform receives the outbound call request.|
| Session Establishing| Outbound|Proceeding|RingCentral platform successfully sent an outbound SIP command and received a successful response from the other party.|
| Session Establishing| Outbound|Answered|RingCentral to RingCentral: RingCentral destination (Company/User/Call Queue) is reached and Call Handling Rules started to execute.|
| Session Establishing| Inbound|Setup (call to RingCentral only, this state will only show for RingCentral to RingCentral calls for Inbound party direction|Initial state for a call to RingCentral destination. It is reported when the call reached the target user/extension, and the Call Handling Rules started to execute|
| Session Establishing| Inbound|Proceeding|Initial state for a call to PSTN, 2-leg-RingOut (both legs), RingMe. The call is being forwarded to an endpoint.|
| Session Establishing| Inbound|FaxReceive|Fax receiving has started. Is applicable for a party with RingCentral owners only.|
| Session Establishing| Inbound|Answered|In general case the party is in "Answered" state when the call is answered on a target endpoint and media is established. But, if 'Prompt me before connecting' flag is 'on' the party remains in 'proceeding' state till the target user accepts the call.|
| Session Establishing| Inbound|Voicemail|The call is forwarded to VoiceMail. Is applicable for a party with RingCentral owners only.|
| Session Establishing| Inbound|VMScreening|The call is forwarded to VoiceMail and a callee is listening to the media from the caller. Is applicable for a party with RingCentral owners only.|
| Session Establishing| Inbound|Disconnected|The call is finished or a party leaves the session in another manner, disconnect reason should be set in "state" : "{ "reason" }. Examples: (a) Call to Call Queue, the call was answered/accepted by an agent. (b) Caller entered an extension while the call was being established ("Thank you for calling. If you know your party's extension you may dial it at any time. For the Operator press 0.") (c) BLF pick up.|
| Session Establishing| Inbound / Outbound|Hold|Party which put the call on hold is reported in "Hold" state.|
| Session Establishing| Inbound / Outbound|Parked|The call is parked. (a) Park Orbit (Park Location):"state" : "parkData" is empty (b) Park Extension (*8xx)"state" : "parkData" contains Park Extension number (*8xx).|
| Session Establishing| Inbound / Outbound|Disconnected|The call is finished or a party leaves the session in another manner, disconnect reason should be set in  "state" : "{ "reason" }.Examples: 1. Call Flip 2. BLF pick up 3. Blind transfer 4. transfer 5. Call is disconnected by the user or back end.|
| Session Establishing| Inbound / Outbound|Gone| (a) The party transferred the call and cross call is established (a) "state" : "peerId" should be set for the both ends of the cross call. A reason must  be set in the  "state" : "{ "reason" }. Examples: 1. Attended transfer 2.Call pick up from Park (not from Park Orbit) 3.Monitoring / Barge / Whisper|

## What are the key Schema Objects of a Telephony Session Notification ?

The two key elements for a Telephony Session Notification are 

Telephony Session Id ( `telephonySessionId`) - This entity uniquely identifies a specific call session. Developers can use telephonySessionId to fetch all the details of a telephony session using [Get Call Session Status API](https://developers.ringcentral.com/api-reference/Call-Control/readCallSessionStatus)

Party Id (`id`) - This entity uniquely identifies a specific party/endpoint  in the call session.

Once a developer has the telephonySessionId and the Party Id (`id`) she can control a call using [Call Control APIs](https://developers.ringcentral.com/api-reference/Call-Control)

### Some of the other important schema objects in Telephony Session Notification are 

`direction` - Outbound or Inbound depending on the party involved.

`ownerId` - The mailbox id incase of a RingCentral extension.

`extensionId` - RingCentral extension Id for a RingCentral party.

`eventTime` - Time of the event. Could be used to calculate various call time elements.

### Sample Telephony Session Notification Event

```json 
{
   "uuid":"1823485288313944239",
   "event":"/restapi/v1.0/account/809646016/extension/809646016/telephony/sessions",
   "timestamp":"2020-06-14T19:27:18.390Z",
   "subscriptionId":"53300e7c-5e69-42bf-ab4d-179aabc6e869",
   "ownerId":"809646016",
   "body":{
      "sequence":3,
      "sessionId":"425008160016",
      "telephonySessionId":"s-a6abd24ca6774373a8120a3390d3cbe8",
      "serverId":"10.13.22.28.TAM",
      "eventTime":"2020-06-14T19:27:18.340Z",
      "parties":[
         {
            "accountId":"809646016",
            "extensionId":"809646016",
            "id":"p-a6abd24ca6774373a8120a3390d3cbe8-2",
            "direction":"Inbound",
            "to":{
               "phoneNumber":"+19043014558",
               "name":"TESTER Babji",
               "extensionId":"809646016"
            },
            "from":{
               "phoneNumber":"+14083388064"
            },
            "status":{
               "code":"Setup",
               "rcc":False
            },
            "park":{

            },
            "missedCall":False,
            "standAlone":False,
            "muted":False
         }
      ],
      "origin":{
         "type":"Call"
      }
   }
```

### Example Telephony Session Notification for a Typical Call Flow (Inbound & Outbound with all States & Sequence) 



[PSTN to RingCentral](https://github.com/dibyenduroy/csn-data/blob/master/PSTN-RingCentral-DataStreams.txt)

[RingCentral to RingCentral](https://github.com/dibyenduroy/csn-data/blob/master/RingCentral-RingCentral.txt)

[RingCentral to PSTN](https://github.com/dibyenduroy/csn-data/blob/master/RingCentral-PSTN.txt)


## Error Codes

For Error Codes refer to [RingCentral Error Codes](https://developers.ringcentral.com/api-reference/Error-Codes) in API Reference


## What is the difference between Telephony Session Notifications and Telephony Presence Notifications

| Telephony Session Notifications | Telephony Presence Notification
| ----------- | ----------- |
| Telephony Session Notification provides detailed call session information for all the states of a call at an account level or an extension level.[Extension Level Notification](https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event)     [Account Level Notification](https://developers.ringcentral.com/api-reference/Account-Telephony-Sessions-Event)| Telephony Presence Notification provides information in case of changes in any presence information at an extension example DND, etc     [Extension Presence](https://developers.ringcentral.com/api-reference/Extension-Presence-Event)    [Account Presence](https://developers.ringcentral.com/api-reference/Account-Presence-Event)|
| It should be used to fetch detailed call information like Call State Changes,  call participants states, etc.| Mainly used to track user presence information. Only tracks an Extension, cannot track Call Queue, PSTN.|
| It can monitor all the calls/sessions in an account.| Its key purpose is to monitor the presence of a specific user/extension.|



## Summary

Telephony Session Notifications are detailed telephony event notifications that capture raw data of all the activity going on in a call session, including the details of the parties involved in the call. Developers can use this information to build a customized call analytics dashboard, custom call routing applications, call monitoring applications, and other applications that need detailed call session data. The Telephony Session Notifications also provides the detail call elements like telephonySessionId and id(party id) required to control an active call.

## FAQ

- Does the Telephony Session Notification emit the events in the same sequence as seen by the sequence number?</h6>

      It might be the case that sometimes later sequence numbers are emitted first for example an event with a sequence number of 5 can be received before sequence 2 or 3, this can happen due to delay or differences in timing by the Webhook or PubNub event delivery services.

- Can the Telephony Session Notification be used to subscribe for specific extensions?
  
     Yes Telephony Session Notification can be used to subscribe at an Extension or at an Account Level.


- What App permission is needed to access Telephony Session Notification?

    CallControl permission is needed.






!!! note "Current limitations of Telephony Session Notifications."
    In our initial implementation notification won't be delivered in the following scenarios:
    
    * if a party doesn't belong to subscriber account/extension (another RC account, PSTN, intermediate parties, etc).
    * if a party belongs to another session (transferred call, conference, etc).
    * if a party does not belong to any accountId or mailboxId (some parties are created to represent intermediate "leg", e.g. to connect telephony session with RC Conference)
