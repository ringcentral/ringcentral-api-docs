# User Call Forwarding Targets

A user call forwarding target refers to an external phone number, a device, or a co-worker (another user extension within the same account) that will ring—either sequentially or simultaneously—when the user receives an incoming call, in addition to the user’s own devices and RingCentral apps (mobile and desktop app).

This feature allows users to answer incoming calls on the device or app that best suits their needs. For example, a user can set their personal mobile number as a forwarding target, ensuring that their mobile phone rings alongside their RingCentral business number—even if the RingCentral mobile app is not installed on their mobile phone.

Common use cases include:

  * External phone number – Forward incoming calls to an external phone number — for example, the user’s personal mobile number — allowing the user to answer calls without installing the RingCentral mobile app on their personal device.
  * Co-worker’s extension – Forward calls to a colleague’s extension to ensure coverage when the user is temporarily having access to the colleague's business phone, or expects the co-worker to answer incoming calls on their behalf.

Call forwarding targets can be set separately for the following user call handling rules:

  - The “work-hours” state call handling rule.
  - The “after-hours” state call handling rule.
  - The “agent” state call handling rule.
  - Any custom call handling rule.

With the ability to configure different call forwarding targets for different call handling rules, users can optimize how their incoming calls are managed in various scenarios. This flexibility ensures that calls are answered in the most effective way based on the user’s schedule and preferences.

!!! note "Notes"
    - Call forwarding target is not the same as call forwarding destination which can  be set via the “Forward the call” action configuration in the Do-not-disturb, or “Forward all calls" states, or in other call handling rules when a user is not available to answer incoming calls.
    - When a call is answered by an external number or a co-worker instead of the user’s own RingCentral app or device, the user’s presence status is set to “busy” and the user's telephony status is set to "CallConnected", even if the user is not actually on the call.
    - When a call is answered by a co-worker app or device instead of the user’s own RingCentral app or device, the co-worker’s presence status and the telephony status is unchanged, even if the co-worker is actually on the call.

Call forwarding target configurations are managed through the “Ring Settings” of a call handling rule. These settings allow users to add or remove targets, define the ringing duration, group or ungroup the targets, enable or disable specific targets, and choose the ringing mode—either ringing all targets simultaneously or in a predefined order.

<img class="img-fluid" src="../../../../img/ring-settings.png">
<br><br>

There is a special setting for desktop and mobile app targets that ensures they always ring for incoming calls alongside other enabled ring group targets, regardless of whether the dispatching type is set to "RingAtOnce" or "RingInOrder".

<img class="img-fluid" src="../../../../img/ring-always-targets.png">
<br>

### Example use case 1: Work hours vs. call queue
Alex works at a financial institution and uses both a RingCentral desk phone and a laptop with the RingCentral app installed. During work hours, Alex sits at his desk and can receive incoming calls on either device. In addition, Alex is a member of a call queue that handles new inquiries together with his colleagues, so he receives calls either directly to his business number or through the call queue.

To quickly distinguish between direct calls and call queue calls, Alex configures the call handling rules for the work-hours state and the agent state as follows:

  - **Work-hours state ring settings rule** – Direct business calls ring only the RingCentral app on his laptop.

  <img class="img-fluid" src="../../../../img/work-hours-ring-settings.png">
  <br><br>

  - **Agent state ring settings rule** – Call queue calls ring only his RingCentral desk phone.

  <img class="img-fluid" src="../../../../img/agent-ring-settings.png">
  <br><br>

This setup helps Alex easily identify the type of incoming call and respond appropriately.

### Example use case 2: After hours

Outside of work hours, Alex wants to ensure he can still receive urgent direct calls without being tied to his desk, but he does not have the RingCentral mobile app installed on his personal phone. To address this, he sets up an after-hours rule so that incoming direct business calls ring his personal mobile phone. This allows Alex to stay reachable for important calls while maintaining flexibility after leaving the office. He also configures the rule to prevent his RingCentral desk phone from ringing after hours, which could disturb colleagues sitting nearby.

  - After-hours state ring settings rule:

  <img class="img-fluid" src="../../../../img/after-hours-ring-settings.png">
  <br><br>

## Configure call forwarding targets and ring settings via API

All of the configurations demonstrated in the examples above can be set programmatically through the platform APIs. This is done using the [User Call Handling Configuration](call-handling-rules.md) APIs, which allow developers to define state-based rules (e.g., work hours, after hours, agent state) as well as custom rules tailored to specific call handling requirements.

A call forwarding target's parameters are specified within a “RingGroupAction” dispatching action object. The "RingGroupAction" action is an object which contains information about a call forwarding target, where the target can be set enabled or disabled and the specified ringing duration.

### Example of a “RingGroupAction” object

```json
{
      "type": "RingGroupAction",
      "enabled": true,
      "targets": [
        {
          "type": "PhoneNumberRingTarget",
          "destination": {
            "phoneNumber": "+12093151072"
          },
          "name": "Personal Number"
        }],
      "duration": 20
}
```

### RingGroupAction Object

|Parameter|Type|Values/description|
| :---- | :---- | :---- |
|`type`|String|”RingGroupAction”|
|`enabled`|Boolean|true Or false. If true, this target will ring.|
|`targets`|List| An array containing one or more target objects that define call forwarding target information. If the `targets` array includes multiple objects, they form a ring group, and all specified targets will be collectively enabled or disabled based on the `enabled` flag setting. See the Targets object for more details. |
|`duration`|Integer| A number that defines the ringing duration at this target. One ringing equals 5 seconds. |

#### Ring group `targets` Object

 The `targets` object can be specified with one of the following target types:

  - "AllDesktopRingTarget"
  - "AllMobileRingTarget"
  - "CoworkerRingTarget"
  - "PhoneNumberRingTarget"
  - "DeviceRingTarget"
  - "HotdeskRingTarget"
  - "ImsPhoneNumberRingTarget"
  - "IntegrationRingTarget"

##### **AllDesktopRingTarget object**

Refers to all RingCentral apps (desktop, laptop, and web). This forwarding target is automatically created by the system as the user’s personal default forwarding target. It cannot be removed or deleted from the user’s personal call forwarding list; however, it can be enabled or disabled, and its ring duration can be modified.

This type of forwarding target can be added or removed when configured as a co-worker forwarding target. See the [Requirements section](#co-worker-forwarding-target-configurations-requirements) for details on setting it up as a co-worker forwarding target.

|Parameter|Type|Values/Description |
| :---- | :---- | :---- |
|`type`|String|"AllDesktopRingTarget" |
|`name`|String| The name of the desktop app. The default value is "My desktop", and it is read-only. |
|`extension`|Object| An object contains the extension ID of the target extension. Required only for co-worker forwarding targets. See the Extension object for details. |

##### **AllMobileRingTarget object**

Refers to all RingCentral mobile apps (Android and iOS).  This forwarding target is automatically created by the system as the user’s personal default forwarding target. It cannot be removed or deleted from the user’s personal call forwarding list; however, it can be enabled or disabled, and its ring duration can be modified.

This type of forwarding target can be added or removed when configured as a co-worker forwarding target. See the [Requirements section](#co-worker-forwarding-target-configurations-requirements) for details on setting it up as a co-worker forwarding target.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"AllMobileRingTarget"|
|`name`|String| The name of the mobile app. The default value is "My mobile apps", and it is read-only.|
|`extension`|Object| An object contains the extension ID of the target extension. Required only for co-worker forwarding targets. See the Extension object for details.|

##### **PhoneNumberRingTarget object**

Refers to an external PSTN phone number.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"PhoneNumberRingTarget"|
|`destination`|Object| An object contains the external phone number as the target. See the Destination object for details. |
|`name`|String| The label of the phone number. |

##### **CoworkerRingTarget object**

Refers to a user extension within the same RingCentral account.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"CoworkerRingTarget"|
|`extension`|Object| An object contains the extension ID of the target extension. See the Extension object for details. |

##### **DeviceRingTarget object**

Refers to a hard phone (a SIP device) registered and assigned to a user extension within the same RingCentral account.

This forwarding target is automatically created by the system as the user’s personal default forwarding target if a user is assigned with a device (usually a desk phone). It cannot be removed or deleted from the user’s personal call forwarding list; however, it can be enabled or disabled, and its ring duration can be modified.

This type of forwarding target can be added or removed when configured as a co-worker forwarding target. See the [Requirements section](#co-worker-forwarding-target-configurations-requirements) for details on setting it up as a co-worker forwarding target.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"DeviceRingTarget"|
|`device`|Object| An object contains the info of the target device. See the Device object for details. |
|`extension`|Object| An object contains the extension ID of the extension that owns the device. Required only for co-worker forwarding targets. See the Extension object for details. |
|`name`|String| The name of the device. |

##### **HotdeskRingTarget object**

Refers to a Hot Desk phone registered within the same RingCentral account.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"HotdeskRingTarget"|
|`device`|Object| An object contains the info of the target device. See the Device object for details. |
|`name`|String| The name of the hot desk device. |

##### **ImsPhoneNumberRingTarget object**

Refers to an IMS phone number. Requires the user to have an active IMS phone number.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"ImsPhoneNumberRingTarget"|
|`destination`|Object| An object contains the integration info of the target. See the Destination object for details. |
|`name`|String| The label of the phone number. |

##### **IntegrationRingTarget object**

Refers to an integration (MS-Team or FMC Lite). Required account special configurations!

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String|"IntegrationRingTarget"|
|`integration`|Object| An object contains the integration info of the target. See the Integration object for details. |
|`name`|String| The label of the phone number. |

###### Destination object

Refers to a PSTN phone number target

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`phoneNumber`|String|The PSTN phone number. Number is in E.164 format.|

###### Extension object

Refers to a user extension who owns the forwarding target.

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`id`|String|The internal identifier of the extension.|

###### Device object

Refers to a user own device or a co-worker device

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`id`|String|The internal identifier of the device. |
|`name`|String| The name of the device. This is a read-only value. |
|`phoneNumber`|String| The phone number assigned to the device. This is a read-only value. |

###### Integration object

|Parameter|Type|Values/Description|
| :---- | :---- | :---- |
|`type`|String| The integration identifier. Can be either "MsTeamDirectRouting" or "FmcLite". |
|`phoneNumber`|String| The phone number to be ringing. |

### RingAlwaysGroupAction Object

Refers to the user's own desktop app or mobile app configured to always ring.

|Parameter|Type|Values/description|
| :---- | :---- | :---- |
|`type`|String|RingAlwaysGroupAction|
|`enabled`|Boolean|true Or false. If true, this target will ring.|
|`targets`|List| An array containing one or more target objects that define call forwarding target information. If the `targets` array includes multiple objects, they form a ring group, and all specified targets will be collectively enabled or disabled based on the `enabled` flag setting. See the Targets object for more details. |

#### Ring always group targets object

The `targets` object within a "RingAlwaysGroupAction" object can be specified with one of the following target types:

- "AllDesktopRingTarget". See the [AllDesktopRingTarget object](#all-desktop-ring-target-object)
- "AllMobileRingTarget". See the [AllMobileRingTarget object](#all-desktop-ring-target-object)

!!! notes
    When the "RingAlwaysGroupAction" is applied to the "AllDesktopRingTarget" or "AllMobileRingTarget", the corresponding "RingGroupAction" configuration for that target must be removed from the call handling settings.

### Read user call forwarding target configurations

As user’s call forwarding targets are set per call handling rule, developers can read the user's call forwarding targets for their "work-hours", "after-hours" and "agent" state-based rules and custom rules using the following APIs:

Read state-base rules:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

Read a custom rule:

GET [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules/{ruleId}](https://developers.ringcentral.com/api-reference/Interaction-Rules/readVoiceInteractionRule)

#### Example response with "RingGroupAction" and "RingAlwaysGroupAction" info

```json
...
  {
    "type": "RingGroupAction",
    "enabled": true,
    "targets": [
      {
        "type": "AllDesktopRingTarget",
        "name": "My desktop"
      }
    ],
    "duration": 20
  },
  {
    "type": "RingGroupAction",
    "enabled": false,
    "targets": [
      {
        "type": "PhoneNumberRingTarget",
        "destination": {
          "phoneNumber": "+16501234567"
        },
        "name": "Temporary number"
      }
    ],
    "duration": 30
  },
  {
    "type": "RingGroupAction",
    "enabled": false,
    "targets": [
      {
        "type": "CoworkerRingTarget",
        "extension": {
          "id": "2465164005"
        }
      }
    ],
    "duration": 20
  },
  {
    "type": "RingAlwaysGroupAction",
    "enabled": true,
    "targets": [
      {
        "type": "AllMobileRingTarget",
        "name": "My mobile apps"
      }
    ]
  }
...
```
<br>

### Set user call forwarding target configurations

As user’s call forwarding targets are set per call handling rule, developers can update the user's call forwarding targets for their "work-hours", "after-hours" and "agent" state-based rules and custom rules using the following APIs:

Update state-base rules:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/after-hours](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/agent](https://developers.ringcentral.com/api-reference/State-based-Rules/readVoiceStateBasedRule)

Update a custom rule:

PATCH [/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules/{ruleId}](https://developers.ringcentral.com/api-reference/Interaction-Rules/readVoiceInteractionRule)

The recommended approach to updating call forwarding targets is to first retrieve the current call handling settings, then modify, add, or remove the "RingGroupAction" or "RingAlwaysGroupAction" within the actions list as needed, and finally update the entire call handling `dispatching` object.

#### Example of setting the work-hours state-based call forwarding targets

The following example demonstrates how to add a new call forwarding target of type "PhoneNumberRingTarget" to the work-hours state-based rule.

!!! note "Running the code"
    If you have tried the RingOut quick start, you can just copy all the functions below and add them to the quick start project then call the read_user_workhours_state_rules() function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.

    - 'RC_APP_CLIENT_ID' : Your app client ID
    - 'RC_APP_CLIENT_SECRET': Your app client secret
    - 'RC_USER_JWT': The user's JWT

=== "JavaScript"

    #### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk --save
    ```

    #### Create and edit a update-wh-state-call-forwarding-targets.js file

    Create a file named `update-wh-state-call-forwarding-targets.js`, then copy and paste the following code into the file.

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/update-wh-state-call-forwarding-targets.js [ln:10-] !}
    ```

=== "PHP"

    #### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    #### Create and edit a update-wh-state-call-forwarding-targets.php file

    Create a file named `update-wh-state-call-forwarding-targets.php`, then copy and paste the following code into the file.

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/update-wh-state-call-forwarding-targets.php [ln:2-] !}
    ```

=== "Python"

    #### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    ```

    #### Create and edit a update-wh-state-call-forwarding-targets.py file

    Create a file named `update-wh-state-call-forwarding-targets.py`, then copy and paste the following code into the file.

    ```python
    {!> code-samples/voice/code-snippets/update-wh-state-call-forwarding-targets.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py !}
    ```

=== "Ruby"

    #### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    #### Create and edit a update-wh-state-call-forwarding-targets.rb file

    Create a file named `update-wh-state-call-forwarding-targets.rb`, then copy and paste the following code into the file.

    ```ruby
    {!> code-samples/voice/code-snippets/update-wh-state-call-forwarding-targets.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb !}
    ```

### Sample response

```json hl_lines="17-30"
{
    "id": "work-hours",
    "displayName": "Work Hours",
    "dispatching": {
        "actions": [
            {
                "type": "PlayWelcomePromptAction",
                "greeting": {
                    "effectiveGreetingType": "Preset",
                    "preset": {
                        "id": "66048"
                    }
                },
                "enabled": true
            },
            ...
            {
                "type": "RingGroupAction",
                "enabled": true,
                "targets": [
                    {
                        "type": "PhoneNumberRingTarget",
                        "destination": {
                            "phoneNumber": "+13121234567"
                        },
                        "name": "Temporary number"
                    }
                ],
                "duration": 25
            },
            ...

```

### Co-worker forwarding target configurations requirements

To configure co-worker forwarding targets for the following target types, the "CoworkerLineAndAppsForwarding" feature must be enabled on the account before these targets can be set up:

- "AllMobileRingTarget"
- "AllDesktopRingTarget"
- "DeviceRingTarget"

The following API allows developers to verify whether the required feature is enabled for their account.

```http
GET `/restapi/v1.0/account/~/extension/[extId]/features?featureId=CoworkerLineAndAppsForwarding`
```

#### Example response

```json
{
  "records" : [ {
    "id" : "CoworkerLineAndAppsForwarding",
    "available" : false,
    "reason" : {
      "code" : "AccountLimitation",
      "message" : "The feature is turned off for the current account"
    }
  } ]
}
```

To enable this feature for an account, the customer can submit a request to [RingCentral Customer Support](https://support.ringcentral.com/contact-support.html) or contact their RingCentral Account Manager.

### Read user call forwarding targets

To list all call forwarding targets configured across a user’s state-based and custom call handling rules, developers can use the [Get Forwarding Targets API](https://developers.ringcentral.com/api-reference/Forwarding-Targets/readForwardingTargets). This endpoint returns detailed information about each forwarding target; however, it does not include the associated rule identity.

### Delete user call forwarding targets

If a call forwarding target is no longer available or no longer needed, it can be removed from the user's call forwarding targets list.

While a call forwarding target can be removed from an individual call handling rule (state-based or custom) using the User Call Handling Rule API, developers can remove the target from all rules (if configured for multiple rules) by calling the [Delete Forwarding Targets API](https://developers.ringcentral.com/api-reference/Forwarding-Targets/deleteForwardingTargets). This is equivalent to selecting “Yes, all rules” in the RingCentral app (Settings -> Phone -> Incoming call rules) or [user admin portal](https://service.ringcentral.com) when manually deleting a forwarding target.

<img class="img-fluid" src="../../../../img/delete-forwarding-target-options.png">

!!! notes

    Please notice that the following user's personal forwarding targets cannot be deleted:

    - "AllMobileRingTarget"
    - "AllDesktopRingTarget"
    - "DeviceRingTarget"
