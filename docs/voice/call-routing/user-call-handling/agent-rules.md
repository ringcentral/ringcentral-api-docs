# Agent presence call handling rules

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

The 'agent' state can have the following call handling rules:

  - Ring settings

!!! note
    The “Agent” state does not include the call terminating methods. If an agent is unavailable, the call is automatically routed to the next available agent according to the call queue's call handling settings.

The ‘agent’ state rule configurations can be retrieved by calling the following API:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com.com/api-reference/State-based-Rules/readVoiceStateBasedRule)


To change the rule configurations, call the following API:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com.com/api-reference/State-based-Rules/updateVoiceStateBasedRule)
