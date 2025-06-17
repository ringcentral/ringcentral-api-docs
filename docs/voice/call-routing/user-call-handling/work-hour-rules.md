# Work-hours call handling rules

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

To set a schedule for the ‘work-hours’’ state, call the following API with appropriate body parameters. E.g.

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

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

To change the rule configurations, call the following API:

PATCH  [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

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

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)


To change the rule configurations, call the following API:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)

