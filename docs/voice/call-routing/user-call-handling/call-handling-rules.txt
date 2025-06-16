# User Call Handling State-based Rules

A call handling rule is a set of predefined configurations that determine how incoming calls are dispatched. User state call handling rules are categorized into two main groups:

**Call Handling Rules** - Applied when the user is available to answer incoming calls. This category includes the following settings:

  - `Welcome Greeting` – Defines how a caller is greeted when a call is received, while connecting and being connected.
  - `Ring Settings` – Defines how the call rings before being answered or redirected.

**Call Terminating Rules** - Applied when the user is unavailable, allowing the system to automatically dispatch the call. This category includes the following settings:

  - `Send to Voicemail` – Plays the voicemail greeting and routes the call to the user's voicemail box.
  - `Forward the Call` – Redirects the incoming call to a specified destination, which can be:
      - Any phone number.
      - Any user extension and call queue extension within the same account.
  - `Play Announcement` – Plays an announcement message and then disconnects the call.

Each state has its own preset of rules to handle incoming calls which fall under the state's conditions

## Forward-All-Calls State-based Rules

The ‘forward-all-calls’ state can have one of the following dispatching methods:

 - Send to voicemail
 - Forward the call
 - Play announcement

To read the ‘forward-all-calls’ state's rule, call the following API:

``` http
GET /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls
```

To change the rule configurations, call the following API with appropriate parameters:

``` http
PATCH  /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls
```

## Do-not-Disturb State-based Rules

The 'dnd’ state can have one of the following dispatching methods:

 - Send to voicemail
 - Forward the call
 - Play announcement

The 'dnd' state's rules can be retrieved by calling the API

``` http
GET /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/dnd
```

To change the rule configurations, call the following API:

``` http
PATCH  /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/dnd
```

## Work-hours State-based Rules

The 'work-hours state can have the following call handling rules:

  - Welcome greeting
  - Ring settings

The 'work-hours state can have one of the following terminating methods:

  - Send to voicemail
  - Forward the call
  - Play announcement

The ‘work-hours’ state rule configurations can be retrieved by calling the API

[GET /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRulesV2)

To change the rule configurations, call the following API:

[PATCH  /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRulesV2)

## After-Hours State-based Rules

The 'after-hours state can have the following call handling rules:

  - Ring Devices – The user remains available during after-hours and can receive calls.
    - Welcome greeting – A greeting played when a call is received.
    - Ring settings – Defines how the call rings before being answered or redirected.

The 'after-hours state can have one of the following terminating methods:

  - Send to Voicemail
  - Forward the Call
  - Play Announcement

!!! important
    - The 'After-Hours' state has two distinct sets of call termination rules: one for immediate termination, and another for cases where no one answers—specifically when the 'Ring Devices' call handling option is selected. This means that when you update the call handling rules for the 'After-Hours' state, you will need to provide terminating settings for both situations.

The ‘after-hours’ state rule configurations can be retrieved by calling the API

[GET /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/listVoiceStateBasedRules)


To change the rule configurations, call the following API:

[PATCH /restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

## Agent State-based Rules

The 'agent' state can have the following call handling rules:

  - Ring settings

!!! note
    The “Agent” state does not include call termination or dispatching methods. If an agent is unavailable, the call is automatically routed to the next available agent according to the call queue's handling settings.

### Update State-based Rules

Each state's call handling comes with a set of default rules. The most efficient way to configure state call handling rules is to retrieve the current settings from the system, modify the necessary values, and then use the [Update State Rules API](https://developers.ringcentral.com/apireference) to apply the changes.

All state call handling rules are defined within the "dispatching" object in the API response. When using the update API, the request body must include the complete set of default rule configurations, even if only a single value is being modified.

!!! note
    For call terminating rules, only the "Send to Voicemail" and "Play Announcement" rules are set by default, and their settings must be included in the API request body. The "Forward the Call" rule is optional and can be omitted if not needed.

The following example code demonstrates how to change the call termination method from "Send to Voicemail" to "Play Announcement" for the 'Forward-All-Calls' state.

!!! note "Running the code"
    If you have tried the RingOut quick start, you can just copy all the functions below and add them to the quick start project then call the read_user_fac_state_rules() function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/change-fac-state-call-terminating-rules.js [ln:10-] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/change-fac-state-call-terminating-rules.php [ln:2-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/change-fac-state-call-terminating-rules.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/change-fac-state-call-terminating-rules.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb !}
    ```

### Sample response

```json
{
  "id" : "forward-all-calls",
  "displayName" : "Forward all calls",
  "dispatching" : {
    "actions" : [ {
      "type" : "TerminatingAction",
      "targets" : [ {
        "type" : "VoiceMailTerminatingTarget",
        "name" : "Voicemail",
        "prompt" : {
          "greeting" : {
            "effectiveGreetingType" : "Preset",
            "preset" : {
              "id" : "590080"
            }
          }
        }
      }, {
        "type" : "PlayAnnouncementTerminatingTarget",
        "name" : "PlayAnnouncement",
        "prompt" : {
          "greeting" : {
            "effectiveGreetingType" : "Preset",
            "preset" : {
              "id" : "66560"
            }
          }
        },
        "dispatchingType" : "Terminating"
      }],
      "terminatingTargetType" : "PlayAnnouncementTerminatingTarget"
    } ],
    "type" : "Terminate"
  },
  "state" : {
    "id" : "forward-all-calls",
    "enabled" : true,
    "displayName" : "Forward all calls",
    "conditions" : [ {
      "type" : "Schedule",
      "schedule" : {
        "triggers" : [ {
          "triggerType" : "Daily",
          "startTime" : "00:00:00",
          "endTime" : "23:59:59"
        } ]
      }
    } ]
  }
}
```

## Maps

|State|Condition type|Trigger type|
||||
|`forward-all-calls`|Schedule|Daily/Range|
|`dnd`|Schedule (no effect)|Daily (no effect)|
|`agent`|Schedule / State|Daily / Weekly|
|`work-hours`|Schedule|Daily / Weekly|
|`after-hours`|N/A|N/A|


|State|Call Handling Rules|Call Terminating Rules|
||||
|`forward-all-calls`|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`dnd`|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`agent`|Ring settings|N/A|
|`work-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`after-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|
