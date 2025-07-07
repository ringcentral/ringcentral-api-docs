# User Interaction Call Handling Rules

Interaction user call handling rules are custom rules that allow users to define how incoming calls should be managed under specific conditions or scenarios. These rules offer flexibility beyond the state rules, enabling users to tailor call behavior to meet unique needs.

For example, a user might want to create a custom rule to handle calls during annual public holidays. Instead of following the default call handling flow, the rule could automatically route incoming calls to voicemail, play a holiday-specific greeting, or forward calls to an alternate number. This ensures that callers receive appropriate handling and information, even when the user is unavailable due to special circumstances.

If a user has a custom rule, incoming calls to the user will be routed using the following logic:

<img class="img-fluid" src="../../../../img/call-routing-with-interaction-rule.png">
<br>User call handling hierarchy with custom rule(s)

A user interaction rule can be set with one or more trigger conditions below:

- Caller Ids: An array of phone numbers that incoming calls are dialed from
- Called Numbers: An array of phone numbers that an incoming call is dialed to
- Schedule:
    - Range: A period of time specified by date and time range
    - Weekly: Repeatedly for certain week day
- State
    - Work-Hours: Match the work-hours schedule
    - After-Hours: Match the after-hours schedule

A custom rule is executed only in case all its conditions match the incoming call. This means that the condition evaluation is an AND operator.

!!! note
    When using the `State` trigger to match the `work-hours` or `after-hours` schedule, you must also include either a Caller ID or a Called Number condition, or both conditions to ensure proper rule evaluation.

If a user has multiple interaction rules, the interaction rules priority will be calculated based on the following logics:

|Schedule Condition|Caller ID Condition|Called Number Condition|Priority|
|||||
|Set up|Set up|Set up|10|
|Not Set|Set up|Set up|9|
|Set up|Set up|Not Set|8|
|Set up|Not Set|Set up|7|
|Not Set|Set up|Not Set|6|
|Not Set|Not Set|Set up|5|
|Set up|Not Set|Not Set|4|

An interaction rule can also be applied to incoming calls received through a call queue, provided the feature is enabled on the account and the `queueCallsIncluded` flag is set to true. In this case, calls received via the call queue are evaluated against the custom rule conditions. If none of the conditions are met, the call is routed to the "Agent" state.

## Example use case

The following example demonstrates how to implement an interaction rule to handle incoming calls from VIP customers during after-hours.
Alex works in customer support. His regular working hours are weekdays from 8:00 AM to 4:00 PM. He has an After-Hours rule configured to route all incoming calls to his voicemail outside of those hours. However, Alex is eligible for a performance bonus if he supports VIP customers during his off-hours. To take advantage of this, he decides to receive calls from VIP customers on his personal mobile number: +1 (408) 232-4343.
Let’s help Alex create a custom interaction rule to meet this requirement.

Assume that Alex has exported a list of 5 VIP customers from his company’s CRM into the following contact list:

```javascript
let vipCustomerContacts = [
		{
      phoneNumber: "+16501111111",
      name: "Kristina Grant"
		},{
      phoneNumber: "+16502222222",
      name: "Sandra Bell"
		},{
      phoneNumber: "+16503333333",
      name: "David Peterson"
		},{
      phoneNumber: "+16504444444",
      name: "Lena Shanon"
		},{
      phoneNumber: "+16505555555",
      name: "Christine Lee"
		}
	]
```

Now we specify the parameters for the custom rule as shown below:

```javascript
let bodyParams = {
      conditions: [
        {
          type: "Interaction",
          from: vipCustomerContacts, // Assigned with the list of VIP customer contacts
          to: []
        },
        {
          type: "State",
          state: { id: "after-hours" } // Match the after-hours schedule
        }
      ],
      dispatching: {
        actions: [
          {
            type: "RingGroupAction",
            enabled: true,
            targets: [
              {
                type: "AllMobileRingTarget",
                name: "My mobile apps"
              }
            ],
            duration: 40
          },
          {
            type: "RingGroupAction",
            enabled: true,
            targets: [
              {
                type: "AllDesktopRingTarget",
                name: "My desktop"
              }
            ],
            duration: 50
          },
          {
            type: "TerminatingAction",
            targets: [
              {
                type: "VoiceMailTerminatingTarget",
                name: "Voicemail",
                prompt: {
                  greeting: {
                    effectiveGreetingType: "Preset",
                    preset: {
                      id: "590080"
                    }
                  }
                }
              },
              {
                type: "PlayAnnouncementTerminatingTarget",
                name: "PlayAnnouncement",
                prompt: {
                  greeting: {
                    effectiveGreetingType: "Preset",
                    preset: {
                      id: "66816"
                    }
                  }
                },
                dispatchingType: "Ringing"
              },
              {
                type: "PhoneNumberTerminatingTarget",
                destination: {
                  phoneNumber: "+14082324343" // Incoming calls are routed to Alex's personal phone number
                },
                dispatchingType: "Terminating"
              }
            ],
            ringingTargetType: "PlayAnnouncementTerminatingTarget",
            terminatingTargetType: "PhoneNumberTerminatingTarget" // Indicating that incoming calls are terminated and forwarded to a phone number.
          }
        ],
        type: "Terminate"
      },
      enabled: true,
      displayName: "VIP Calls After-Hours"
}
```

With the `bodyParams` above, we can call the API to create a new custom rule for Alex

!!! note "Running the code"
    If you have tried the RingOut quick start, you can just copy all the functions below and add them to the quick start project then call the `create_user_interation_rule()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.

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
