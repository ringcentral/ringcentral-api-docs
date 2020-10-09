# Answering Rules Overview

Answering Rules APIs can be used to create and manage logic for routing incoming calls throughout your RingCentral account. For example, the following are all answering rules you can construct using the Answering Rule API. 

* If an incoming call is received outside business hours, route the call to my voicemail.
* If an incoming call is received outside of business hours, but the phone number is that of a VIP customer, route the call to my mobile phone. 
* A call comes in on a day you are off from work, you want all incoming calls to your work phone number to be re-routed automatically to one of your co-workers to handle the calls.

## Answering Rule Structure

An answering rule is made up of two main components:

* A set of conditions that must be met
* An action to take on a call that meets the conditions above

Here is an example Answering Rule flow:

<img class="img-fluid" src="../../../../img/answering-rule-flow.png">

### Rule Types

The Answering Rules API has endpoints for creating two different core rule types:

* **User Rules** - these rules are applied to incoming call to a specific user or extension. 

* **Company Rules** - these rules are applied to incoming calls to extensions that are not owned by a specific user, for example IVR extensions, call queues, departments, etc. 

Finally, both User and company rules can each be of the following sub-types:

| Rule Type | Purpose |
|-|-|
| Business Hours Rule | If active, incoming calls during defined business hours will be evaluated based on conditions defined in this rule. |
| After Hours Rule | If active, incoming calls after business hours will be evaluated based on conditions defined in this rule. |
| Custom Rule | Custom rules for special routing during holidays or specific times of the day (e.g. lunch break) or for special callers/callees. |

!!! note "Using IDs to differentiate rule types"
    Answering rules are identified by unique rule IDs. The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule` respectively. A custom `ruleId` is identified by a long-number as a string e.g. `33333333`

### Rule Conditions

Answering Rules can be constructed around the following conditions/criteria:

* **Schedule** - such as during company business hours, after hours or specific times of the day.
* **Caller's phone number** - incoming calls from the specified caller(s) phone number.
* **Recipient's phone number** - incoming calls to a selected phone number(s). Phone numbers must belong to the same extension.

### Rule Actions

The action that can taken on a call depends upon the type of the answering rule being created. 

#### Actions for User Answering Rules

* **Forward Call**: re-route an incoming call to multiple phone numbers in a specific order with greeting settings apply.
* **Unconditional Forward**: forward an incoming call immediately to a specified number.
* **Take a Message**: play back a voicemail greeting then forward an incoming call to a voice mailbox.
* **Play Announcement**: play back a pre-recorded announcement then hang up.
* **Transfer to Extension**: forward an incoming call (dialed to a Call Queue extension) to a specific extension.
* **Send to Agent Queue**: forward an incoming call (dialed to a Call Queue extension) to one or more specified agents.

!!! info "Important Notes about User Answering Rules"
    
    * Each user has 2 default answering rules for business hours and after business hours. The default rules can be read and updated with new schedule. They cannot be used with callers' or callees' conditions.
    * The default After Hours rule exists only if the user business hours is set different than 24 hours.
    * An answering rule can be turned on or off by changing the `enabled` parameter to True or False, respectively.

#### Actions for Company Answering Rules

* **Operator** - play company greeting and forward to an operator extension.
* **Disconnect** - play back company greeting then hangup.
* **Bypass** - bypass company greeting and forward to a selected extension.

!!! info "Important Notes about Company Answering Rules"
    * Company Answering Rules can be accessed/managed only by admin users!
    * Each account has 2 default answering rules for business hours and after business hours. The default rules can be read and updated with new schedule. They cannot be used with callers' or callees' conditions.
    * The default After Hours rule exists only if the Company Business Hours is set different than 24 hours.
    * An answering rule can be turned on or off by changing the `enabled` parameter to True or False, respectively.

## Continue Reading

To learn more about User and Company Answering Rules, see sample code, and to begin building your own rules via the Answering Rule API, please consult the following Developer Guide Resources:

* [User Answering Rules &raquo;](../user-answering-rules/)
* [Company Answering Rules &raquo;](../company-answering-rules/)