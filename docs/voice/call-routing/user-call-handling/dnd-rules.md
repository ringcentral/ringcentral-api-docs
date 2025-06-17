# Do-not-disturb call handling rules

The do-not-disturb, or "DnD" for short, rule second-highest priority for handling incoming calls, second only to the [forward-all-calls rule](forward-all-calls-rule.md). This call handling state is linked to the user's presence states, specifically their `dndStatus` and `dndStatusPersonal` states.

This rule is ideal for situations in which a user needs to make themselves temporarily unavailable for undetermined amount of time. It allows for flexibility in managing call availability without requiring a set time frame. It is a state that easily toggled on and off on an ad-hoc basis. As an example, consider the following scenario.

A customer support agent steps away from their desk unexpectedly to handle an urgent personal matter. Since they are unsure how long they will be unavailable, they activate the "Do not disturb" state. This ensures that incoming calls are automatically redirected according to predefined rules, preventing missed calls or disruptions while they are away.

When a user's 'dnd' state is active:
  - All direct incoming calls to the user will be handled based on the state's predefined dispatching rules.
  - Calls from a call queue will not be routed to the user. Instead, the system will redirect the call to the next available agent in the queue.

## What happens when the do-not-disturb rule is triggered

The do-not-disturb rule is a **terminating rule**, which means that it effectively ends the call for the current extension when executed. When executing this rule, calls are dispatched in one of the following ways:

* Forward call
* Play announcement
* Send to voicemail

## Example forward-all-calls rule

Below is an example of how a forward-all-calls rule is expressed in JSON when using the API:

``` json
"state": {
    "id": "dnd",
    "displayName": "Do not disturb",
    "enabled": false,
    "conditions": [ {
      "schedule": {
        "triggers": [ {
          "triggerType": "Daily",
          "startTime": "00:00:00",
          "endTime": "23:59:59"
        } ]
      },
      "type": "Schedule"
    } ]
  }
```

!!! warning "Do-not-disturb rules do not support schedules"
    You may notice that a fully-qualified do-not-disturb rule has default state schedule condition is set to 24 hours a day, every day. However, this rule's schedule cannot be modified. The rule is either enabled or it is not. 

## How the do-not-disturb rule impacts one's DnD status

When the do-not-disturb rule is enabled, the system updates both the user's `dndStatus` and `dndStatusPersonal` status to "DoNotAcceptAnyCalls". When the rule is disabled:

* `dndStatusPersonal` reverts to "TakeAllCalls"
* `dndStatus` reverts to its previous value before the do-not-disturb rule was actived (either "TakeAllCalls" or "DoNotAcceptDepartmentCalls")

The table below shows the state of this variables based on whether the DnD rule is enabled or not:

| DnD rule state | User's 'dnd' presence                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------|
| Enabled        | `dndStatus` = 'DoNotAcceptAnyCalls' <br>`dndStatusPersonal` = 'DoNotAcceptAnyCalls'                       |
| Disabled       | `dndStatus` = 'DoNotAcceptDepartmentCalls' **Or** 'TakeAllCalls' <br>`dndStatusPersonal` = 'TakeAllCalls' |

## Toggling the rule on and off

The 'dnd' rule enabled state is associated with the user's "Do not Disturb" presence status. This means that the 'dnd' rule can be controlled by both the [Presence API](https://developers.ringcentral.com/guide/account/presence) and the Call Handling API, by using the PATCH method on the corresponding endpoint:

```js
var resp = await platform.patch('/restapi/v2/accounts/~/extensions/~/comm-handling/states/dnd',
                                { "enabled": true })
```

## Related APIs

* [Get DnD rules for user](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)
* [Update DnD rules for user](https://developers.ringcentral.com.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

