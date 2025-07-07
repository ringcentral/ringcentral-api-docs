# Site Call Handling

If you are a company with operational functions spread across many locations, you need to be able to set individualized call handling rules according to their different time zones, company hours, language preferences, and more.

<img class="img-fluid" src="../../../../img/site-call-handling.png">

Site call handling is a set of configurations that determine how incoming calls to a site direct phone number (including calls via the site number i.e. MainCompanyNumber*SiteNumber) are routed and managed. These configurations can be tailored for different scenarios to ensure efficient call distribution and a consistent caller experience.

Site call handling rules can be defined separately based on the following conditions:

- Business Hours rule – Defines how calls are managed during the site's regular operating hours.
- After Hours rule – Applies when the business is closed (if business hours are not set to 24/7).
- Custom Schedules and Conditions rule  – Allows for special rules based on specific criteria, such as caller ID, called number, or custom time schedules (e.g., holidays or special events).

If a site has a custom rule that is configured and enabled, any incoming call directly to site will first be evaluated against the conditions defined in that rule. If all the conditions are met, the call will be routed according to the dispatching settings specified in the rule.

When multiple custom rules are active, the system will evaluate each rule in order. The first rule whose conditions match will determine how the call is handled. If none of the active custom rules match the incoming call, the system will fall back to evaluating the call against the Business Hours or After Hours rule, depending on the current date and time.

Site call handling rule can be configured to route incoming calls to the following destinations:

- IVR menu - Any IVR menu within the account
- User extension - A specific user extension
- Call queue - A call queue extension
- Site - Another site extension
- Shared line - Must be a share line extension
- Limited extension - Must be a limited extension
- Voicemail - Must be a Message-only extension
- Announcement - Must be an Announcement-only extension

## Business Hours rule

<img class="img-fluid" src="../../../../img/site-business-hours-rule.png">

The Business Hours rule defines how direct incoming calls to a site number are handled during the site's regular working hours. This rule ensures calls are routed to the designated destination. This rule typically aligns with the operating hours of the site or a specific branch office, helping to maintain a consistent and responsive customer experience.

A site business hours schedule can be read by using the following API:

GET [/restapi/v1.0/account/~/extension/[SiteExtensionId]/business-hours](https://developers.ringcentral.com/api-reference/Business-Hours/readUserBusinessHours)

By default, the business hours schedule is set to 24/7. To change the business hours schedule, call the following API with appropriate `schedule` params.

PUT [/restapi/v1.0/account/~/extension/[SiteExtensionId]/business-hours](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)

To read the site business hours rule, call the following API:

GET [/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/business-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/readAnsweringRule)

To update the site's business hours rule, call the following API with appropriate parameters:

PUT [/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/business-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRule)

## After Hours rule

<img class="img-fluid" src="../../../../img/site-after-hours-rule.png">

If business hours are set for a site, the system will automatically create an after-hours schedule, which is the inverse of the defined business hours.

The After Hours rule manages call behavior outside of regular business hours. When the office is closed, this rule reroutes calls to voicemail, plays a recorded message, or forwards them to an alternate destination such as another call queue, an extension or even another site. It ensures that callers are still acknowledged and provided with relevant information or next steps.

To read the site after hours rule, call the following API:

GET [/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/after-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/readAnsweringRule)

To update the site's after hours rule, call the following API with appropriate parameters:

PUT [/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/after-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRule)

## Custom rule

<img class="img-fluid" src="../../../../img/site-custom-rule.png">

Custom rules allow for flexible and tailored call handling based on specific criteria, such as caller ID, called number, or custom time schedules (e.g., holidays or special events). These rules can override both business and after-hours rules to support unique scheduling or routing needs.

Each custom rule can have its own configurations to manage incoming calls. This includes the trigger conditions and forwarding configurations.

To create a site custom rule, call the following API with appropriate parameters:

POST [/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/createAnsweringRule)

```javascript
let bodyParam = {
  name: "Custom rule 1",
  type: "Custom",
  ...
}
```

#### Trigger configurations

A custom rule can be set with one or more trigger conditions below:

* `callers`: A list of callers' phone numbers or contact names.
    * `callerId`: Caller's phone number
    * `name`: Caller's contact names
* `calledNumbers`:  A list of recipients' phone numbers. It is not typically applied to call queues unless the queue has multiple direct numbers.
    * `phoneNumber`: A phone number belonging to the call queue.
* `schedule`: Specified time based schedules.
    * `weeklyRanges`: Repeatedly for certain week day and time ranges. For example every weekdays during lunch time.
    * `ranges`: A period of time specified by date and time range. For example a public holiday.
    * `ref`: Match the "BusinessHours" or "AfterHours".

The following example sets a custom rule to be triggered by the caller numbers "14132223333" and "15093334444" during business hours:

```javascript
let bodyParams = {
      callers: [
        { callerId: "14132223333" }, { callerId: "15093334444" }, { name: "John Smith" }
      ],
      schedule: { ref: "BusinessHours" }
  }
```
<br>
A custom rule is executed only in case all its conditions match the incoming call. This means that the condition evaluation is an AND operator.


### Site Forwarding Configurations

Each site's rule (business hours, after hours and custom rules) can be individually configured to forward incoming calls to the following destinations:

- IVR menu - An IVR menu
- User extension - A specific user extension
- Call queue - A call queue extension
- Site - A site extension
- Shared line - Must be a share line extension
- Limited extension - Must be a limited extension
- Voicemail - Must be a Message-only extension
- Announcement - Must be an Announcement-only extension

The `callHandlingAction` parameter of any site's call handling rule is always set to "TransferToExtension".

To set the forwarding destination, specify the extension Id under the `transfer` object as shown in the example below:

```javascript
let bodyParams = {
      callHandlingAction: "TransferToExtension",
      transfer: {
        extension: {
          id: "XXXXXXXXX"
        }
      }
    }
```
<br>
To detect the extension Id of a destination, call [this API](https://developers.ringcentral.com/api-reference/Extensions/listExtensions) with the appropriate type query parameter as shown on the table below:

|Type|Description|
|||
|`type`="User"|List user extensions|
|`type`="IvrMenu"|List IVR menu extensions|
|`type`="Department"|List call queue extensions|
|`type`="Site"|List site extensions|
|`type`="Limited"|List limited extensions|
|`type`="SharedLineGroup"|List shared line extensions|
|`type`="Voicemail"|List message-only extensions|
|`type`="Announcement"|List announcement-only extensions|

## Creating a Site Custom Call Handling Rule

Be mindful of the following when constructing a request to create a custom call handling rule:

* Provide a meaningful name for the rule using the `name` parameter.
* Set the `type` parameter as "Custom."
* Set the `enabled` parameter to True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more trigger conditions.
* Set the parameter `callHandlingAction`="TransferToExtension".
* Set the `transfer` object accordingly.

Finally, make a POST request to the following endpoint:

`/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule`

### List Site Answering Rules

To list a site's call handling rules make a GET request to the following endpoint:

`/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule`

Required app scope(s): ReadAccounts

Upon successful API call completion, the response contains a list of all existing answering rules (including the default rules).

```json hl_lines="6 11 16"
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/84854YYYY/answering-rule?page=1&perPage=100",
  "records" : [ {
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/84854YYYY/answering-rule/business-hours-rule",
    "id" : "business-hours-rule",
    "type" : "BusinessHours",
    "enabled" : true
  }, {
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/84854YYYY/answering-rule/after-hours-rule",
    "id" : "after-hours-rule",
    "type" : "AfterHours",
    "enabled" : true
  }, {
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/84854YYYY/answering-rule/9424952016",
    "id" : "9424952016",
    "type" : "Custom",
    "name" : "VIP customers",
    "enabled" : true
  } ],
  "paging" : {
    ...
  },
  "navigation" : {
    ...
  }
}
```

### Fetch a Single Site's Call Handling Rule

To fetch the details associated with an individual site's call handling rule, make a GET request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/[ruleId]`

!!! info "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required app scope(s): ReadAccounts

Upon successful API call completion, the response contain detailed information of a rule.

GET `/restapi/v1.0/account/~/extension/84854YYYY/answering-rule/business-hours-rule`

```json
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/84854YYYY/answering-rule/business-hours-rule",
  "id" : "business-hours-rule",
  "type" : "BusinessHours",
  "enabled" : true,
  "schedule" : {
    "ref" : "BusinessHours"
  },
  "callHandlingAction" : "TransferToExtension",
  "transfer" : {
    "extension" : {
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/6295243YYYY",
      "id" : "62952431016"
    }
  }
}
```

### Update a Site Call Handling Rule

To update a company answering rule specify only the parameter values which need to be updated. Then make a PUT request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/[ruleId]`

!!! note "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required app scope(s): ReadAccounts

### Delete a Site Call Handling Rule

To delete a site custom call handling rule, make a DELETE request to the following endpoint, where the `ruleId` is the id of an existing rule.

`/restapi/v1.0/account/~/extension/[SiteExtensionId]/answering-rule/[ruleId]`

!!! note "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    You cannot delete the default Business Hours and After Hours rule. However, if you change the site's business hours to 24/7, the system will automatically remove the After Hours rule!

Required app scope(s): EditExtensions
