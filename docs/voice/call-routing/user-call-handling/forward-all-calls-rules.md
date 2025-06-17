# Forward-all-calls call handling rules

Every user has a system managed "state" that they can toggle on and off that determines if calls being routed to them should be forwarded to another party. This rule is most often used when a user might be on PTO or away for an extended period and ensures thqt the risk of a call being answered is minimized. 

For this reason, this call handling rule has the highest degree of precedence, and is thus evaluated before all other rules. If a user’s "forward-all-calls" state is active, then:

 - all direct incoming calls to the user will be dispatched according to the predefined dispatching rule of the state.
 - all call queue calls will not be routed to the user, and instead be routed to the next agent on the call queue.

## What happens when the forward-all-calls rule is triggered

The forward-all-calls rule is a **terminating rule**, which means that it effectively ends the call for the current extension when executed. When executing this rule, calls are forwarded to another phone number or extension, including:

* A voicemail-only extension
* An announcement-only extension

## Example forward-all-calls rule

Below is an example of how a forward-all-calls rule is expressed in JSON when using the API:

```json
"state": {
  "id": "forward-all-calls",
  "displayName": "Forward all calls",
  "conditions": [ {
    "type": "Schedule",
    "schedule": {
      "triggers": [ {
        "triggerType": "Daily",
        "startTime": "00:00:00",
        "endTime": "23:59:59"
      } ]
    }
  } ]
}
```

## Forward-all-call schedules

The default time period for a forward-all-calls rule is 24/7, or "Daily" using a `startTime` of `00:00:00` and an `endTime` of `23:59:59`. This shows that this call handling rule type can be bounded by a condition, specifically a scheduling condition. However, any given rule is limited to a single schedule. 

RingCentral currently supports two scheduling types: `Daily` and `Range`. A ranged schedule is useful when you need to bound a rule by a specific start and end date. Here is an example of a rule that is active for a single 24-hour period:

```json
"state" : {
  "id" : "forward-all-calls",
  "displayName" : "Forward all calls",
  "conditions" : [ {
    "type" : "Schedule",
    "schedule" : {
      "triggers" : [ {
        "triggerType" : "Range",
        "ranges" : [ {
          "startDateTime" : "2025-01-06T11:00:00",
          "endDateTime" : "2025-01-07T11:00:00"
        } ]
      } ]
    }
  } ]
}
```

### Enablement states

It is important to remember that in order for a forward-all-calls rule to be respected and obeyed, it must be enabled. That may seem like an obvious statemnt, but given the scheduled nature of a forward-all-calls rule, some may make the mistake in thinking that the rule is disabled while outside the rule's scheduling window. That is not the case. 

For a forward-all-calls rules bound by a `Range` schedule, the rule will remain active even after the stated date range has lapsed. 

It is the developer's responsibility to check the schedule conditions to indicate to the user if the schedule is active or not. Do not just rely solely on the "enabled" flag value.

## Related APIs

* [Get forward-all-calls rule for user](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)
* [Set the schedule of a forward-all-calls rule for user](https://developers.ringcentral.com.com/api-reference/States/updateCicState)
* [Update a forward-call-calls rule for user](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

## Code sample

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-handling/forward-all-calls.js !}
    ```
