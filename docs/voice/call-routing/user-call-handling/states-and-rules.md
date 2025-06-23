# State-based Call Handling

State-based call handling is a structured approach to managing incoming calls based on predefined user availability states within a RingCentral RingEX account. Each user extension has four primary conditional states, and each state can be customized with specific rules to automate call routing behaviors according to their schedule and presence.

The call handling hierarchy is described in the following diagram:

<img class="img-fluid" src="../../../../img/standard-states.png" style="max-width:600px;">
  User state-based call handling hierarchy

The 'after-hours' state is automatically created when the 'work-hours' state schedule is configured for specific days and times. And when the 'work-hours' state is rescheduled to 24/7, the system will automatically delete the 'after-hours' state.

Additionally, when a user extension is added to a call queue, the system automatically generates the ‘agent’ state, which manages how they receive calls from the queue based on their availability. By default, the agent state inherits the schedule conditions and the ring settings from the user’s ‘work-hours’ state.

<img class="img-fluid" src="../../../../img/agent-state.png" style="max-width:600px;">

To retrieve a user's state scheduling conditions, use the API below:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/states](https://developers.ringcentral.com/api-reference/States/listCicStates)

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
|||||
|`forward-all-calls`|N/A|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`dnd`|N/A|N/A|Send to Voicemail<br>Forward the Call<br>Play Announcement|
|`agent`|Ring settings|N/A|N/A|
|`work-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|N/A|
|`after-hours`|Welcome greeting<br>Ring settings|Send to Voicemail<br>Forward the Call<br>Play Announcement|Send to Voicemail<br>Forward the Call<br>Play Announcement|


### Forward-All-Calls State and Rules

The **‘Forward-All-Calls’** state is the top priority for handling incoming calls. This state is suitable for a user's long term unavailability such as when a user is on vacation or when a user knows in advance when he or she will be unavailable and when he or she will become available to handle incoming calls.

If a user’s ‘forward-all-calls’ state is active,

 - all direct incoming calls to the user will be dispatched according to the predefined dispatching rule of the state.
 - all call queue calls will not be routed to the user. Instead, the system will route the call to the next agent on the call queue.

The default state schedule condition is daily 24 hours.

```json
"state": {
    "id": "forward-all-calls",
    "displayName": "Forward all calls",
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

The schedule condition can be set for a specific time period, defined by the 'startDateTime' and 'endDateTime' values.

```json
"state" : {
    "id" : "forward-all-calls",
    "displayName" : "Forward all calls",
    "conditions" : [ {
      "schedule" : {
        "triggers" : [ {
          "triggerType" : "Range",
          "ranges" : [ {
            "startDateTime" : "2025-01-06T11:00:00",
            "endDateTime" : "2025-01-07T11:00:00"
          } ]
        } ]
      },
      "type" : "Schedule"
    } ]
  }
```

To read the ‘forward-all-calls’ state's schedule, call the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls](https://developers.ringcentral.com/api-reference/States/readCicState)

To set a schedule for the ‘forward-all-calls’ state, call the following API  with appropriate parameters

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls](https://developers.ringcentral.com/api-reference/States/updateCicState)

!!! notes
    - Only one schedule can be set at a time.
    - Only “Daily” or “Range” trigger types are allowed.
    - You must set the “enabled” flag to true when you schedule for a specific time period.
    - When the ‘range’ scheduled time expires, the ‘enabled’ flag will remain true. It’s the developer’s responsibility to check the schedule conditions to indicate to the user if the schedule is active or not. Do not just rely solely on the ‘enabled’ flag value.

To read the ‘forward-all-calls’ state's schedule and rule, call the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the 'forward-all-call' rule configurations, call the following API with appropriate parameters:

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

The "Forward-All-Calls" state can only be configured with a **terminating rule**, which determines how incoming calls are dispatched. The available dispatching methods include:

- Send to Voicemail
- Forward the Call
- Play Announcement

### Do-not-Disturb State and Rules

The "Do-Not-Disturb" (‘dnd’) state has the second-highest priority for handling incoming calls, following the "Forward All Calls" state. This call-handling state is linked to the user's presence statuses, `dndStatus` and `dndStatusPersonal`.

When the ‘dnd’ state is enabled, the system updates both `dndStatus` and `dndStatusPersonal` to "DoNotAcceptAnyCalls". When the ‘dnd’state is disabled, `dndStatusPersonal` reverts to "TakeAllCalls", while `dndStatus` reverts to either "TakeAllCalls" or "DoNotAcceptDepartmentCalls" if it was previously set to that status before the ‘dnd’ state was activated.

|User’s ‘dnd’ state | User’s ‘dnd’ presence|
|||
|`enabled` = true | `dndStatus` = 'DoNotAcceptAnyCalls' <br>`dndStatusPersonal` = 'DoNotAcceptAnyCalls'|
|`enabled` = false | `dndStatus` = 'DoNotAcceptDepartmentCalls’ **Or** 'TakeAllCalls' <br>`dndStatusPersonal` = 'TakeAllCalls'|

This state is ideal for situations where a user needs to be temporarily unavailable without a predetermined duration. It allows for flexibility in managing call availability without requiring a set time frame.

Example Use Case:

A customer support agent steps away from their desk unexpectedly to handle an urgent personal matter. Since they are unsure how long they will be unavailable, they activate the "Do not disturb" state. This ensures that incoming calls are automatically redirected according to predefined rules, preventing missed calls or disruptions while they are away.

When a user's 'dnd’ state is active:
  - All direct incoming calls to the user will be handled based on the state's predefined dispatching rules.
  - Calls from a call queue will not be routed to the user. Instead, the system will redirect the call to the next available agent in the queue.

The default state schedule condition is set to 24 hours a day, every day, and cannot be modified. This means that this state does not support the scheduling condition at all. It’s either on or off.

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

The ‘dnd’ state activeness is associated with the user’s “Do not Disturb” presence status. This means that the ‘dnd’ state can be controlled by either the [/presence](https://developers.ringcentral.com/guide/account/presence) or the API below:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/states/dnd](https://developers.ringcentral.com/api-reference/States/updateCicState)

For example:

``` json
PATCH /restapi/v2/accounts/~/extensions/~/comm-handling/states/dnd

body { "enabled": true }
```

The "Do Not Disturb" state can only be configured with a **terminating rule**, which determines how incoming calls are dispatched. The available dispatching methods include:

- Send to voicemail
- Forward the call
- Play announcement

The 'dnd' state's rules can be retrieved by calling the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/dnd](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the 'dnd' state rule configurations, call the following API with appropriate parameters:

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/dnd](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

### Work-hours State and Rules

The impact of the "work-hours" state is determined by predefined schedule conditions. By default, the schedule is set to 24/7, meaning the user is always available unless customized settings specify otherwise.

Example Use Case:

A sales representative works a standard 9 AM to 5 PM schedule. To ensure calls are only routed to them during working hours, they configure the "work-hours" state to align with their schedule. Outside these hours, the system automatically switches to the "after-hours" state, redirecting calls to voicemail or another designated contact.

Default ‘work-hours’ state schedule:

``` json
{
    "id" : "work-hours",
    "enabled": true,
    "displayName" : "Work Hours",
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
```

The schedule conditions can be configured to recur on specific weekdays and time periods, defined by the 'weekday', 'startTime', and 'endTime' values.

To read the ‘work-hours’ state's schedule, call the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/states/work-hours](https://developers.ringcentral.com/api-reference/States/readCicState)

To set a schedule for the ‘work-hours’ state, call the following API  with appropriate parameters

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/states/work-hours](https://developers.ringcentral.com/api-reference/States/updateCicState)

For example:

``` json
PATCH  /restapi/v2/accounts/~/extensions/~/comm-handling/states/work-hours

body {
  "conditions": [
    {
      "type": "Schedule",
      "schedule": {
        "triggers": [
          {
            "triggerType": "Weekly",
            "ranges": {
              "monday": [{
                 "startTime": "09:00:00",
                 "endTime": "16:00:00"
              }],
              "tuesday": [ {
                 "startTime": "12:00:00",
                 "endTime": "18:00:00"
              }],
              "wednesday": [{
                 "startTime": "08:00:00",
                 "endTime": "16:00:00"
              }],
              "thursday": [{
                 "startTime": "08:00:00",
                 "endTime": "16:00:00"
              }],
              "friday": [{
                  "startTime": "08:00:00",
                  "endTime": "12:00:00"
              }]
            }
          }
        ]
      }
    }
  ]
}
```

!!! notes
    - The "enabled" flag is always set to true by the system. Thus, it’s not necessary to be specified in the API body params.
    - The "triggerType" can only be either ‘Daily’ or ‘Weekly’ type.

The 'work-hours state can have the following call ringing rules:

- Welcome greeting
- Ring settings

The 'work-hours state can have one of the following terminating methods:

- Send to voicemail
- Forward the call
- Play announcement

The ‘work-hours’ state rule configurations can be retrieved by calling the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the rule configurations, call the following API:

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

### After-Hours State and Rules

The "after-hours" state is automatically created by the system when the "work-hours" state is not set to a 24/7 schedule.

The schedule for the "after-hours" state is the inverse of the "work-hours" schedule. For example, if work hours are set from Monday to Friday, 8 AM to 4 PM, then after-hours will be from 4 PM to 8 AM on weekdays and from 12:00 AM to 11:59 PM on weekends.

The ‘after-hours’ state schedule data:
```json
{
  "id": "after-hours",
  "enabled": true,
  "displayName": "After Hours",
  "conditions": []
}
```

!!! notes
    - The "enabled" flag is always set to true by the system.
    - The schedule "conditions" field is always an empty array and cannot be modified by users.
    - Thus, updating the 'After-Hours' state schedule is not necessary and so it's not supported!

The "After-Hours" state determines how incoming calls are managed outside of scheduled work hours. It includes the following ringing rules and terminating methods:

The 'after-hours state can have the following call ringing rules:

  - Ring Devices – The user remains available during after-hours and can receive calls.
    - Welcome greeting – A greeting played when a call is received.
    - Ring settings – Defines how the call rings before being answered or redirected.
    - "No one answer"

The 'after-hours state can have one of the following terminating methods:

  - Send to Voicemail
  - Forward the Call
  - Play Announcement

!!! important
    - The 'After-Hours' state has two distinct sets of call termination rules: one for immediate termination, and another for cases where no one answers—specifically when the 'Ring Devices' call handling option is selected. This means that when you update the call handling rules for the 'After-Hours' state, you will need to provide terminating settings for both situations.

The ‘after-hours’ state rule configurations can be retrieved by calling the following API;

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the rule configurations, call the following API:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

### Agent State and Rule

The ‘agent’ state is automatically created by the system when a user extension is added to a call queue.

This state is used to define the agent's availability for receiving incoming calls from call queues. By default, the ‘agent’ state inherits the schedule conditions and ring settings from the user’s ‘work-hours’ state. In this case, the type of the conditions is set to “State”, and the stateId references ‘work-hours’.

Typical ‘agent’ state schedule:

```json
{
  "id": "agent",
  "enabled": true,
  "displayName": "Agent",
  "conditions": [
    {
      "stateId": "work-hours",
      "type": "State",
      "state": {
        "id": "work-hours",
        "displayName": "Work Hours",
        "conditions": [
          {
            "schedule": {
              "triggers": [
                {
                  "triggerType": "Daily",
                  "startTime": "00:00:00",
                  "endTime": "23:59:59"
                }
              ]
            },
            "type": "Schedule"
          }
        ]
      }
    }
  ]
}
```

!!! important
    When the “Agent” state type is set to “State” any changes made to the “Work-Hours” state schedule and ring settings will automatically update the “Agent” state configurations.

To make the “Agent” state schedule independent of the “Work-Hours” state, you can change the Agent state type to “Schedule” and customize the schedule and the ring settings as needed.

```json
{
  "id": "agent",
  "enabled": true,
  "displayName": "Agent",
  "conditions": [
    {
      "type": "Schedule",
      "schedule": {
        "triggers": [{
          "triggerType": "Weekly",
          "ranges": {
            "thursday": [{
              "startTime": "18:00:00",
              "endTime": "23:59:59"
            }],
            "friday": [{
              "startTime": "00:00:00",
              "endTime": "06:00:00"
            }]
           }
         }]
       }
     }
   ]
}
```

To read the ‘agent’ state's schedule, call the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/states/agent](https://developers.ringcentral.com/api-reference/States/readCicState)

To set a schedule for the ‘agent’ state, call the following API  with appropriate schedule parameters

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/states/agent](https://developers.ringcentral.com/api-reference/States/updateCicState)

The ‘agent’ state rule configurations can be retrieved by calling the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the rule configurations, call the following API:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

The 'agent' state can have the following call handling rules:

  - Ring settings

!!! note
    The “Agent” state does not include the call terminating methods. If an agent is unavailable, the call is automatically routed to the next available agent according to the call queue's call handling settings.

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
