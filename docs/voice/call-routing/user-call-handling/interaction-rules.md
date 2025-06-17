# Custom call handling rules

Every user has the ability to configure custom call handling rules that are evaluated after any [forward-all-calls](forward-all-calls-rules.md) and [do-not-disturb](dnd-rules.md). These rules allow users to define how incoming calls should be managed under specific conditions or scenarios unique to them. Custom rules offer greater flexibility beyond other state-based rules like [forward-all-calls](forward-all-calls-rules.md), [do not disturb](dnd-rules.md) and [work hour-based](work-hour-rules.md) rules with regards to the conditions that trigger them. 

Consider the following example in which a user wants to handle calls specially during annual public holidays. Instead of following the default call handling flow, the rule could automatically route incoming calls to voicemail, play a holiday-specific greeting, or forward calls to an alternate number. This ensures that callers receive appropriate handling and information, even when the user is unavailable due to special circumstances.

## Rule conditions

Each custom call handling rule must have associated with it one or more conditions, **all of which must evaluate to true** in order for the rule to be executed. Listed below are the current list of supported custom rule conditions. 

For a complete reference for all supported custom rule conditions, please visit our [API Reference](https://developers.ringcentral.com/api-reference/Interaction-Rules/createVoiceInteractionRule).

### Caller ID

An array of phone numbers that incoming calls are dialed from.

```js
{
  "conditions": [{
	  "type":"Interaction",
	  "from":[
	    { "phoneNumber":"+18005551212", "name":"John Doe" }
	  ]
  }]
}
```

### Called numbers

An array of phone numbers that an incoming call is dialed to.

```js
{
  "conditions": [{
      "type":"Interaction",
      "to":[
         { "phoneNumber":"+18005551212", "name":"John Doe" }
	  ]
  }]
}
```

### Schedule: date range

A period of time specified by date and time range.

```js
{
    "conditions": [{
        "type": "Schedule",
        "schedule": {
            "startDateTime": "2001-02-01T08:00:00.000Z",
            "endDateTime": "2001-02-01T08:00:00.000Z",
            "triggers": [{
                "triggerType": "Daily",
                "startTime": "09:00:00",
                "endTime": "10:00:00"
            }]
        }
    }]
}
```

### Schedule: weekly

Repeatedly for certain week day.

```js
{
    "conditions": [{
        "type": "Schedule",
        "schedule": {
            "triggers": [{
                "triggerType": "Weekly",
                "ranges": {
                    "tuesday": [{
                        "startTime": "9:00:00",
                        "endTime": "10:30:00"
                    }]
                }
            }]
        }
    }]
}
```

### State: work hours 

Match the work-hours schedule

```js
{
    "conditions": [{
        "type": "State",
        "state": {
            "id": "work-hours"
        }
    }]
}
```

### State: after-hours

Match the after-hours schedule

```js
{
    "conditions": [{
        "type": "State",
        "state": {
            "id": "after-hours"
        }
    }]
}
```

!!! warning "`State` trigger requires additional condition"
    When using the `State` trigger to match the `work-hours` or `after-hours` schedule, you must also include a caller ID and/or a called number condition to ensure proper rule evaluation.

### Condition priorties

If a user has multiple optional rules, the rule's priority will be calculated as follows (order of execution is from highest to lowest)::

| Priority | Schedule Condition? | Caller ID Condition? | Called Number Condition? |
|----------|---------------------|----------------------|--------------------------|
| 10       | Yes                 | Yes                  | Yes                      |
| 9        | No                  | Yes                  | Yes                      |
| 8        | Yes                 | Yes                  | No                       |
| 7        | Yes                 | No                   | Yes                      |
| 6        | No                  | Yes                  | No                       |
| 5        | No                  | No                   | Yes                      |
| 4        | Yes                 | No                   | No                       |

## Rule dispatching actions

| Action type                | Description                                                                                                        |
|----------------------------|--------------------------------------------------------------------------------------------------------------------|
| `Play Connecting Message`  | Plays a "you are connecting to" message to the caller                                                              |
| `Play Connection Prompt`   | Plays a "would you like to connect to" prompt to the caller                                                        |
| `Play Welcome Prompt`      | Plays either a custom or preset greeting to the caller                                                             |
| `Screening Action`         | This forces the call to first be screened by the recipient before answering.                                       |
| `Ring Group Action`        | This routes the call into an ad-hoc [ring group][1]                                                                |
| `Ring Always Group Action` |                                                                                                                    |
| `Terminating Action`       | This allows a user to forward the call to an extension, phone number, voicemail endpoint or announcement endpoint  |

Each dispatching action has its own unique inputs and parameters. Please consult the [API reference](https://developers.ringcentral.com/api-reference/Interaction-Rules/createVoiceInteractionRule) to explore the latest action types and their inputs.

[1]: https://support.ringcentral.com/article-v2/Set-up-Ring-Group.html?brand=RC_US&product=RingEX&language=en_US

## Receiving calls from call queues

An interaction rule can also be applied to incoming calls received through a call queue, provided the feature is enabled on the account and the `queueCallsIncluded` flag is set to true. In this case, calls received via the call queue are evaluated against the custom rule conditions. If none of the conditions are met, the call is passed on to the [Agent](agent-rules.md) rule.

## Example

The following example demonstrates how to implement an interaction rule to handle incoming calls from VIP customers during after-hours.
Alex works in customer support. His regular working hours are weekdays from 8:00 AM to 4:00 PM. He has an After-Hours rule configured to route all incoming calls to his voicemail outside of those hours. However, Alex is eligible for a performance bonus if he supports VIP customers during his off-hours. To take advantage of this, he decides to receive calls from VIP customers on his personal mobile number: +1 (408) 232-4343.
Let’s help Alex create a custom interaction rule to meet this requirement.

!!! info "In the following sample code, we populate a **static list** of VIP phone numbers. It is assumed that in a real-world implementation that list would be **populated dynamically**."

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/create-interaction-rule.js [ln:10-] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/create-interaction-rule.php [ln:2-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/create-interaction-rule.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/create-interaction-rule.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb !}
    ```
