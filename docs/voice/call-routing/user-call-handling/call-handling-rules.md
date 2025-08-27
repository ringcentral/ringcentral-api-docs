# Call Handling Configurations

A call handling rule is a set of predefined configurations that control how incoming calls are managed and dispatched. Each rule consists of two main components: triggering conditions and dispatching action settings. Details about these triggering conditions and basic dispatching configurations are provided in the following documents:

- [State-based rules](states-and-rules.md)
- [Interaction rules](interaction-rules.md)

This developer guide provides detailed information on configuring dispatching actions for all state-based and interaction rules.

Dispatching actions are categorized into two main groups:

**Greeting and Ringing Configurations** - Applied when the user is available to receive incoming calls. These settings control how the call is presented to the user and what the caller hears during the ringing phase. This category includes the following settings:

  - `Welcome Greeting` – Defines how a caller is greeted when a call is received, while connecting and being connected.
  - `Ring Settings` – Defines how the call rings before being answered or redirected.

**Forwarding Configurations** - Applied when the user is unavailable or cannot answer the call within a defined period. These settings allow the system to automatically route the call to a predefined destination. This category includes the following settings:

  - `Send to Voicemail` – Plays the voicemail greeting and routes the call to the user's voicemail box.
  - `Play Announcement` – Plays an announcement message and then disconnects the call.
  - `Forward the Call` – Redirects the incoming call to a specified destination, which can be:
      - Any phone number.
      - Any type of extension (user, call queue, IVR, site extension etc.) within the same account.

Developers can programmatically create or update a call handling rule’s dispatching configurations. These configurations are defined within the `dispatching` object of the API request body. The dispatching object includes the `type` and a list of `actions` that define greeting, ringing, and forwarding behaviors.

|Dispatching Type|Description|
|||
|`dispatching.type`="RingAtOnce"|Ring all the user specified devices and numbers at once.|
|`dispatching.type`="RingInOrder"|Ring the user specified devices and numbers in the specified order.|
|`dispatching.type`="Terminate"|Forward the calls to a specified destination and terminate the call.|

```javascript hl_lines="4-9"
let bodyParams = {
    ...
    dispatching: {
        actions: [
          { //... },
          { //... },
          ...
        ],
        type: "RingAtOnce"
    }
  }
```
<br>
The dispatching type can be applied to a rule as shown in the table below:

|Rule|Supported Dispatching Type|
|||
|Forward-All-Calls|"Terminate"|
|DoNotDisturb|"Terminate"|
|Agent|"RingAtOnce"<br>"RingInOrder"|
|Bususiness Hours|"RingAtOnce"<br>"RingInOrder"|
|After Hours|"RingAtOnce"<br>"RingInOrder"<br>"Terminate"|
|Interaction|"RingAtOnce"<br>"RingInOrder"<br>"Terminate"|

!!! notes
    - State-based rules are created and removed by the system automatically. You can only update the rules using [this API](https://developers.ringcentral.com/api-reference/State-based-Rules/updateVoiceStateBasedRule).
    - Interaction rules can be created, updated or deleted by developers using these APIs. [create rule](https://developers.ringcentral.com/api-reference/Interaction-Rules/createVoiceInteractionRule), [update rule](https://developers.ringcentral.com/api-reference/Interaction-Rules/updateVoiceInteractionRule) or [delete rule](https://developers.ringcentral.com/api-reference/Interaction-Rules/deleteVoiceInteractionRule).

## Greeting and Ringing Configurations

Greeting and ringing settings can be configured for rules where the dispatching type is set to either "RingAtOnce" or "RingInOrder".

### Greeting settings

Greeting configurations can be applied to the Business Hours rule, After Hours rule, or a Custom rule. These configurations consist of multiple greeting messages that are played to callers at different stages of the call flow.

<img class="img-fluid" src="../../../../img/greeting-configurations.png">
<br>

To set the greeting configurations using API, create an object and set the appropriate `type` and other parameters then add the object to the `actions` list.

|Action type|Description|
|||
|`type`="PlayWelcomePromptAction"|Greet caller with a system preset or a custom message.|
|`type`="PlayConnectingMessageAction"|Tell caller they're being connected|
|`type`="PlayConnectingPromptAction"|Play music while connecting|
|`type`="ScreeningAction"|Play a message to screen callers|

Each greeting action is configured within an object with different `type` as shown in the example below:

```javascript hl_lines="4-13"
let bodyParams = {
      dispatching: {
        actions: [
          {
            type: "PlayWelcomePromptAction",
            greeting: {
              effectiveGreetingType: "Preset",
              preset: {
                id: "66048"
              }
            },
            enabled: true
          },
          {...}
      ]
    }
  }
```
<br>
For the **"ScreeningAction"** action, the action object has different parameters

```javascript hl_lines="4-9"
let bodyParams = {
      dispatching: {
        actions: [
          {
            type: "ScreeningAction",
            screening: "NoCallerId",
            screeningResult: "AskToAnswer",
            enabled: false
          },
          {...}
      ]
    }
  }
```

!!! note
    When creating a custom rule, you can omit any greeting action object and let the system creates the default one. However, the greeting option will be disabled by default.

You can retrieve a [standard greeting](https://developers.ringcentral.com/api-reference/Greetings/listStandardGreetings) and use its resource ID to specify the `preset.id` value when setting a greeting action object. Use the following query parameters to call the API and obtain the resource ID:

|API params|Description|
|||
|{<br>&nbsp;`type`="Introductory",<br>&nbsp;`usageType`="UserExtensionAnsweringRule"<br>}|Welcome greeting message.|
|{<br>&nbsp;`type`="ConnectingMessage",<br>&nbsp;`usageType`="UserExtensionAnsweringRule"<br>}|Connecting message.|
|{<br>&nbsp;`type`="ConnectingAudio",<br>&nbsp;`usageType`="UserExtensionAnsweringRule"<br>}|Connecting music.|

You can create a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) and use the resource ID returned by the API to specify the `custom.id`

```javascript hl_lines="7 12"
let bodyParams = {
      dispatching: {
        actions: [
          {
            type: "PlayWelcomePromptAction",
            greeting: {
              effectiveGreetingType: "Custom",
              preset: {
                id: "66048"
              }
              custom: {
                id: "XXXXXXXXXXX"
              }
            },
            enabled: true
          }
      ]
    }
  }
```

### Ringing settings

Ringing configurations can be applied to the Business Hours rule, After Hours rule, Agent rule, or a custom rule. These settings allow users to predefine one or more of their own devices and specify co-workers or external phone numbers to ring when an incoming call is received.

<img class="img-fluid" src="../../../../img/ringing-configurations.png">
<br>
To set the ringing configurations using API, check the following table to set the proper parameters and call the API

|Action type|Target type|Description|
||||
|`type`="RingGroupAction"|`type`="AllMobileRingTarget"|Ring the user's mobile apps (if logged in from multiple devices)|
|`type`="RingGroupAction"|`type`="AllDesktopRingTarget"|Ring the user's desktop apps (if logged in from multiple devices)|
|`type`="RingGroupAction"|`type`="CoworkerRingTarget"|Ring a co-worker phone|
|`type`="RingGroupAction"|`type`="PhoneNumberRingTarget"|Ring an external phone number|

```javascript hl_lines="9 20 30 41"
let bodyParams = {
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
            type: "RingGroupAction",
            enabled: true,
            targets: [ {
              type: "CoworkerRingTarget",
              extension: {
                id: "6370056XXXX"
              }
            } ],
            duration: 20
          },
          {
            type: "RingGroupAction",
            enabled: true,
            targets: [ {
              type: "PhoneNumberRingTarget",
              destination: {
                phoneNumber: "+14081234567"
              }
            } ],
            duration: 20
          },
          {...}
      ]
    }
  }
```

!!! notes
    - The "RingGroupAction" objects that define the "AllMobileRingTarget" and "AllDesktopRingTarget" targets are mandatory and cannot be omitted from the API request body. However, if you do not want those devices to ring, you can disable them by setting `enabled` to false.
    - The duration value is in seconds and specifies the total ringing time. Each ring lasts approximately 5 seconds.

## Forwarding Configurations

Forwarding configurations can be set for the Forward-All-Calls rule, Do Not Disturb (DnD) rule, Business Hours rule, After Hours rule, or a Custom rule. These settings allow users to predefine a destination where calls should be forwarded when they are unavailable or do not answer.

Forwarding configurations can be specified to route incoming calls to one of the following destinations:

- `Voicemail` – Sends the call directly to the user’s voicemail box or to another extension's voicemail box, allowing the caller to leave a message.
- `Announcement` – Plays a pre-recorded message to the caller before ending the call.
- `Extension` – Forwards the call to another user or department within the organization by specifying an internal extension.
- `External Phone Number` – Forwards the call to an outside phone number, such as a mobile device or third-party service line.

There are two scenarios in which a call may be forwarded to a specified destination:

1. "No Answer" Forwarding – When the call rings but the user does not answer within a defined period.
2. Immediate Forwarding – When the user is unavailable, such as when their Do Not Disturb (DnD) status is active.

The table below outlines which rules can be configured with each type of forwarding mode:

|Rule|"No Answer" Forwarding|Immediate Forwarding|
||||
|Forward-All-Calls|No|Yes|
|DnD|No|Yes|
|Business Hours|Yes|No|
|After Hours|Yes|Yes|
|Agent|No|No|
|Interaction (Custom rules)|Yes|Yes|

Forwarding configurations are defined within an action object of type "TerminatingAction", where all destination settings are listed under the `targets` array.

```javascript  hl_lines="5 7-19"
let bodyParams = {
      dispatching: {
        actions: [
          {
            type: "TerminatingAction",
            targets: [
              {
                type: "VoiceMailTerminatingTarget",
                prompt: {
                  greeting: {
                    effectiveGreetingType: "Preset",
                    preset: {
                      id: "590080"
                    }
                  }
                }
              }, {
                ...
              }
            ]
          }
        ]
      }
  }
```

|Target type|Destination|
|||
|"VoiceMailTerminatingTarget"|Send to voicemail|
|"PlayAnnouncementTerminatingTarget"|Play an announcement message and terminate the call|
|"ExtensionTerminatingTarget"|Forward the call to an extension|
|"PhoneNumberTerminatingTarget"|Forward the call to an external phone number|

Target settings differ between "No Answer" forwarding and Immediate Forwarding modes. Each mode is identified by the `dispatchingType` parameter—set to "Ringing" for "No Answer" forwarding, and "Terminating" for immediate forwarding. This distinction allows users to configure separate forwarding destinations or announcement messages for each mode when a rule supports both.

An exception applies to the voicemail target, which is shared across both forwarding types.

!!! Important
    - When creating or updating a rule, you must always include the "VoiceMailTerminatingTarget" object, even if the intended forwarding destination is something else. E.g. forwarding to an extension.
    - The `ringingTargetType` and `terminatingTargetType` parameters are required and must reference a valid forwarding target, even if the terminating target is not actively used by the rule. In such cases, it's safe to assign the "VoiceMailTerminatingTarget", as this target is mandatory and applicable to both types of forwarding.

### "No Answer" Forwarding Configurations

"No Answer" forwarding configurations are applied to a rule when the dispatching action type is set to "RingAtOnce" or "RingInOrder". In this case, incoming calls will ring the user based on the "RingGroupAction" settings. If the call is not answered within a defined period, it will then be forwarded to a specified destination according to the configured forwarding settings.

```javascript  hl_lines="8 18 27 29 33 35 39 42"
let bodyParams = {
      "dispatching": {
        "actions": [
          {
            "type" : "TerminatingAction",
            "targets" : [
              {
                "type" : "VoiceMailTerminatingTarget",
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
                "prompt" : {
                  "greeting" : {
                    "effectiveGreetingType" : "Preset",
                    "preset" : {
                      "id" : "66816"
                    }
                  }
                },
                "dispatchingType" : "Ringing"
              }, {
                "type" : "ExtensionTerminatingTarget",
                "extension" : {
                  "id" : "6370110XXXX"
                },
                "dispatchingType" : "Ringing"
              }, {
                "type" : "PhoneNumberTerminatingTarget",
                "destination" : {
                  "phoneNumber" : "+16501234567"
                },
                "dispatchingType" : "Ringing"
              }
            ],
            "ringingTargetType" : "VoiceMailTerminatingTarget",
            "terminatingTargetType" : "PhoneNumberTerminatingTarget"
          }
        ],
        "type": "RingAtOnce" // Or "RingInOrder"
      }
    }
```

### Immediate Forwarding Configurations

Immediate forwarding configurations are applied to a rule when the dispatching action type is set to "Terminate". In this case, incoming calls will be forwarded immediately to a specified destination according to the configured forwarding settings.

```javascript  hl_lines="8 18 27 29 33 35 39 43"
let bodyParams = {
      "dispatching": {
        "actions": [
          {
            "type" : "TerminatingAction",
            "targets" : [
              {
                "type" : "VoiceMailTerminatingTarget",
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
                "prompt" : {
                  "greeting" : {
                    "effectiveGreetingType" : "Preset",
                    "preset" : {
                      "id" : "66816"
                    }
                  }
                },
                "dispatchingType" : "Terminating"
              }, {
                "type" : "ExtensionTerminatingTarget",
                "extension" : {
                  "id" : "6370110XXXX"
                },
                "dispatchingType" : "Terminating"
              }, {
                "type" : "PhoneNumberTerminatingTarget",
                "destination" : {
                  "phoneNumber" : "+16501234567"
                },
                "dispatchingType" : "Terminating"
              }
            ],
            "ringingTargetType" : "VoiceMailTerminatingTarget",
            "terminatingTargetType" : "PhoneNumberTerminatingTarget"
          }
        ],
        "type": "Terminate"
      }
    }
```

## Example API request body

### Case 1

Let's specify the `bodyParams` object to reconfigure the Business Hours rule to greet callers with a custom welcome message, ring all of the user's mobile devices simultaneously for at least 4 rings, and avoid ringing any desktop phone apps. If the user does not answer, forward the call to the external phone number (213) 222-3456.

Assumed that the custom welcome message id is "5072424004".

```javascript  hl_lines="7 12 15 20 23-24 29 33 61-67 69 72"
let bodyParams = {
      "dispatching": {
        "actions": [
          {
            "type": "PlayWelcomePromptAction",
            "greeting": {
                "effectiveGreetingType": "Custom",
                "preset": {
                  "id": "66048"
                },
                "custom": {
                  "id": "5072424004" // Play this custom welcome message
                }
            },
            "enabled": true
          },
          {
            "type": "RingGroupAction",
            "targets": [ {
              "type": "AllMobileRingTarget",
              "name": "My mobile apps"
            } ],
            "duration": 20,
            "enabled": true  // Ring all user's mobile apps for 20 seconds
          },
          {
            "type": "RingGroupAction",
            "targets": [ {
              "type": "AllDesktopRingTarget",
              "name": "My desktop"
            } ],
            "duration": 50,
            "enabled": false // Do not ring any of the user's desktop apps
          },
          {
            "type": "TerminatingAction",
            "targets": [
              {
                "type": "VoiceMailTerminatingTarget",
                "prompt": {
                  "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                      "id": "590080"
                    }
                  }
                }
              },
              {
                "type": "PlayAnnouncementTerminatingTarget",
                "prompt": {
                  "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                      "id": "66816"
                    }
                  }
                },
                "dispatchingType": "Ringing"
              },
              {
                "type": "PhoneNumberTerminatingTarget",
                "destination": {
                  "phoneNumber": "+12132223456"  // Forward the call to this phone number if the user does not answer the call
                },
                "dispatchingType": "Ringing"
              }
            ],
            "ringingTargetType": "PhoneNumberTerminatingTarget"  // Forward the call to a particular phone number
          }
        ],
        "type": "RingAtOnce"
      }
    }
```

See the "Update State Call Handling Rules" section in the [state-based rules](states-and-rules.md) for sample code on how to call the API to update a state-based rule.

### Case 2

Let's specify the `bodyParams` object to reconfigure the After Hours rule to greet callers with a custom welcome message, ring 3 of the user's co-workers, and avoid ringing any of the user's mobile and desktop phone apps. If the user's co-workers do not answer, forward the call to the user's voice mailbox.

Assumed that the custom welcome message id is "5072424004". And the co-workers' extension ids are "63701631004" and "63707590004".

```javascript  hl_lines="7 12 15 21-24 27-28 34-37 40-41 47 52 58 63 107 111"
let bodyParams = {
    "dispatching": {
        "actions": [
          {
            "type": "PlayWelcomePromptAction",
            "greeting": {
              "effectiveGreetingType": "Custom",
                "preset": {
                  "id": "66048"
                },
                "custom": {
                  "id": "5072424004" // Play this custom welcome message
                }
            },
            "enabled": true
          },
          {
            "type": "RingGroupAction",
            "targets": [
              {
                "type": "CoworkerRingTarget",
                "extension": {
                  "id": "63701631004" // First, ring this co-work
                }
              }
            ],
            "duration": 40,
            "enabled": true
          },
          {
            "type": "RingGroupAction",
            "targets": [
              {
                "type": "CoworkerRingTarget",
                "extension": {
                  "id": "63707590004" // Then, ring this co-work if the first co-worker does not answer the call
                }
              }
            ],
            "duration": 40,
            "enabled": true
          },
          {
            "type": "RingGroupAction",
            "targets": [
              {
                "type": "AllMobileRingTarget",
                "name": "My mobile apps"
              }
            ],
            "duration": 30,
            "enabled": false  // Do not ring any of the user's mobile apps
          },
          {
            "type": "RingGroupAction",
            "targets": [
              {
                "type": "AllDesktopRingTarget",
                "name": "My desktop"
              }
            ],
            "duration": 30,
            "enabled": false  // Do not ring any of the user's desktop apps
          },
          {
            "type": "TerminatingAction",
            "targets": [
              {
                "type": "VoiceMailTerminatingTarget",
                "name": "Voicemail",
                "prompt": {
                  "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                      "id": "590080"
                    }
                  }
                }
              },
              {
                "type": "PlayAnnouncementTerminatingTarget",
                "name": "PlayAnnouncement",
                "prompt": {
                  "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                      "id": "66816"
                    }
                  }
                },
                "dispatchingType": "Ringing"
              },
              {
                "type": "PlayAnnouncementTerminatingTarget",
                "name": "PlayAnnouncement",
                "prompt": {
                  "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                      "id": "66560"
                    }
                  }
                },
                "dispatchingType": "Terminating"
              }
            ],
            "ringingTargetType": "VoiceMailTerminatingTarget", // Forward the call to the user's voice mailbox if the co-workers do not answer the call
            "terminatingTargetType": "PlayAnnouncementTerminatingTarget"   // Mandatory for After Hours state rule
          }
        ],
        "type": "RingInOrder" // Ring the co-workers in the specified order
    }
}
```

See the "Update State Call Handling Rules" section in the [state-based rules](states-and-rules.md) for sample code on how to call the API to update a state-based rule.
