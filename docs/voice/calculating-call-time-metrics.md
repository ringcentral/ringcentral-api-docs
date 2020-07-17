# Calculating Call Time Metrics

A popular use case for RingCentral APIs is to calculate the amount of time spent in various states in a call, used in the RingCentral system, such as in the analytics dashboard. Popular call component times include:

1. Ring Time: this is the amount of time the call is ringing another party, so only one party is connected.
1. Talk Time: this is the amount of time when two or more parties are connected (not on hold). Calls with less than half a second of talk time are not recoreded in the RingCentral system.
1. Hold Time: this is the maoun tof time a party is on hold and listening to hold music.

## Using Telephony Session Events to Caclulate Metrics

When receiving a stream of events, it is ipmortant to note the following:

* All events for a particular call are grouped by the `telephonySessionId` which is unique per call.
* All events for a particular call are ordered by the `sequence` integer property. Events can come in different chronological order so it's important to sequence them properly.
* To calculate call metrics like ring, talk, and hold times, it is important to keep track of previous events to sequence them together so you should use a data store to collect events by `telephonySessionId` and order them by `sequence`. Then calculate the metrics using the time duration between call status changes using the `eventTime` and party `status.code` properties.

The `telephonySessionId`, `sequence` and `eventTime` properties are in the event's `body` property. The `status.code` property is in the body's `parties` array. All of these are shown below.

### Subscribing to Telephony Session Events

Here is some information to get started on using Telephony Session Events.

Use the standard subscription approach with either of the following event filters:

* [Account Telephony Sessions Event](https://developers.ringcentral.com/api-reference/Account-Telephony-Sessions-Event)
* [Extension Telephony Sessions Event](https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event)

Detailed information on the [Notification types](https://developers.ringcentral.com/api-reference/Account-Presence-Event) are available in the API reference.

Information [on subscribing to event notifications is available in the Developer Guide](../../notifications).

## Calculating Ring Time

The ring time is the amount of time a call is spent in the ringing phasse before the call parties are connected.

Ring time is calculated by adding the duration of the following event time periods:

* Begin with `Proceeding` status and end with first `Answered` status

## Calculating Talk Time

Talk time is the amount of time two or more parties are connected with each other and not on hold. When a user is put on hold, the person hears hold music and is thus not connected.

Talk time is calculated by adding the duration of the following event time periods

* Begin with `Answered` status and end with `Hold` or `Disconnected` status

Of note, the status code for "Unhold" is also `Answered`.

The first `Answered` status event is the same event in the "Calculating Ring Time" section above.

## Calculating Hold Time

Hold time is the amount of time a user is listening to put on hold and lisstening to hold music.

Hold time is calculated by adding the duration of the following event time periods:

* Start with `Hold` status and end with `Answered` or `Disconnected` status

These states are documented in the "Calculating Ring Time" section above.

## Example Events

The following are example eveents in a call to calculate call time metrics.

Note: these are partial events with most propertieses removed, to highight the properties needed to caculate various call talk time metrics.

### Ring Time - Proceeding Event

This is a partial event just highliighting the important properties:

```json
{
  "body":{
    "sequence":5,
    "telephonySessionId":"s-11112222333344445555666677778888",
    "eventTime":"2020-07-17T13:33:50.589Z",
    "parties":[
      {
        "status":{
          "code":"Proceeding"
        }
      }
    ]
  }
}
```

### Ring Time - First Answer Event

This is a partial event just highliighting the important properties:

```json
{
  "body":{
    "sequence":6,
    "telephonySessionId":"s-11112222333344445555666677778888",
    "eventTime":"2020-07-17T13:33:52.574Z",
    "parties":[
      {
        "status":{
          "code":"Answered"
        }
      }
    ]
  }
}
```
### Talk Time - Hold Event

This is a partial event just highliighting the important properties:

```json
{
  "body":{
    "sequence":7,
    "telephonySessionId":"s-11112222333344445555666677778888",
    "eventTime":"2020-07-17T13:33:58.510Z",
    "parties":[
      {
        "status":{
          "code":"Hold"
        }
      }
    ]
  }
}
```

### Talk Time - "Unhold" Event

This is a partial event just highliighting the important properties:

```json
{
  "body":{
    "sequence":8,
    "telephonySessionId":"s-11112222333344445555666677778888",
    "eventTime":"2020-07-17T13:34:00.443Z",
    "parties":[
      {
        "status":{
          "code":"Answered"
        }
      }
    ]
  }
}
```

### Talk Time - Disconnected Event

This is a partial event just highliighting the important properties:

```json
{
  "body":{
    "sequence":9,
    "telephonySessionId":"s-11112222333344445555666677778888",
    "eventTime":"2020-07-17T13:34:02.098Z",
    "parties":[
      {
        "status":{
          "code":"Disconnected"
        }
      }
    ]
  }
}
```

!!! note "Current limitations of Telephony Session Notifications."
    In our initial implementation notification won't be delivered in the following scenarios:
    
    * if a party doesn't belong to subscriber account/extension (another RC account, PSTN, intermediate parties, etc).
    * if a party belongs to another session (transferred call, conference, etc).
    * if a party does not belong to any accountId or mailboxId (some parties are created to represent intermediate "leg", e.g. to connect telephony session with RC Conference)
