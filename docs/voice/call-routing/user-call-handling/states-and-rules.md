# State-based Call Handling

State-based call handling is a structured approach to managing incoming calls based on predefined user availability states within a RingCentral RingEX account. Each user extension has four primary conditional states, and each state can be customized with specific rules to automate call routing behaviors according to their schedule and presence.

The call handling hierarchy is described in the following diagram:

[Call handling hierarchy](../../../img/standard-states.png){ .mw-600 .img-fluid }

The 'after-hours' state is automatically created when the 'work-hours' state schedule is configured for specific days and times. And when the 'work-hours' state is rescheduled to 24/7, the system will automatically delete the 'after-hours' state.

Additionally, when a user extension is added to a call queue, the system automatically generates the ‘agent’ state, which manages how they receive calls from the queue based on their availability. By default, the agent state inherits the schedule conditions and the ring settings from the user’s ‘work-hours’ state.

[Agent state handling hierarchy](../../../img/agent-state.png){ .img-fluid .mw-600 }

To retrieve a user's state scheduling conditions, use the API below:

``` HTTP
GET /restapi/v2/accounts/~/extensions/~/comm-handling/states
```

## User Call Handling Rules

A call handling rule is a set of predefined configurations that determine how incoming calls are dispatched. User call handling rules are categorized into two main groups:

**Call Ringing Rules** - Applied when the user is available to answer incoming calls. This category includes the following settings:

  - `Welcome Greeting` – Defines how a caller is greeted when a call is received, while connecting and being connected.
  - `Ring Settings` – Defines how the call rings before being answered or redirected.

**Call Terminating Rules** - Applied when the user is unavailable, allowing the system to automatically dispatch the call. This category includes the following settings:

  - `Send to Voicemail` – Plays the voicemail greeting and routes the call to the user's voicemail box.
  - `Forward the Call` – Redirects the incoming call to a specified destination, which can be:
      - Any phone number.
      - Any user extension and call queue extension within the same account.
  - `Play Announcement` – Plays an announcement message and then disconnects the call.

There are two types of call terminating rules: immediate terminating rules and "no one answers" terminating rules. While the configuration options for both are the same, they must be set separately for each applicable scenario. The table below outlines which call handling states can be configured with the appropriate terminating rules:

|State|Ringing Rules|"No one Answers" Terminating Rules|Immediate Terminating Rules|
|-|-|-|-|
|`forward-all-calls`|N/A|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`dnd`|N/A|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`agent`|Ring settings|N/A|N/A|
|`work-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|N/A|
|`after-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|Send to Voicemail<br>Forward the Call<br>Play Announcement|

## Update State Call Handling Rules

Each state's call handling comes with a set of default rules. The most efficient way to configure state call handling rules is to retrieve the current settings from the system, modify the necessary values, and then use the [Update State Rules API](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule) to apply the changes.

All state call handling rules are defined within the "dispatching" object in the API response. When using the update API, the request body must include the complete set of default rule configurations, even if only a single value is being modified.

!!! note
    For call terminating actions, only the "Send to Voicemail" and "Play Announcement" targets are set by default, and their settings must be included in the API request body. The "Forward the Call" target is optional and can be omitted if not needed.

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
