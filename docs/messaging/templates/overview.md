# Overview

SMS templates are reusable messages that you would frequently need to send your users as SMS messages. They are predefined text messages that can contain text and URLs.

Each SMS template can have maximum 1000 UTF-16 encoded characters. This is also the maximum length of a single SMS message (sent in MMS format) that can be sent out from a RingCentral phone number.

RingCentral platform provides APIs to manage SMS templates for 2 scopes, company templates and user templates (a.k.a personal templates).

## Company SMS templates

Company SMS templates can be created, listed, modified and deleted only by users who have the "Edit Company SMS Templates" user permission, this user permission normally included in the default super admin user role. If you want to grant the "Edit Company SMS Templates" permission to other user roles, make sure that the permission is selected for that role.

| API Endpoint      | Method   | Description                                        |
| -------------- | ------ | ------------------------------------------------------- |
| /restapi/v1.0/account/~/message-store-templates | POST | Create a new company SMS template. |
| /restapi/v1.0/account/~/message-store-templates | GET | List all company SMS templates.  |
| /restapi/v1.0/account/~/message-store-templates/[templateId] | PUT | Update a company SMS template identified by a template id. E.g. change the template text. |
| /restapi/v1.0/account/~/message-store-templates/[templateId] | DELETE | Delete a company SMS template identified by a template id. |
| /restapi/v1.0/account/~/message-store-templates/[templateId] | GET | Read a single company SMS template identified by a template id. |

Company SMS templates can be created for different sites under an account. Each account can have maximum up to 50 predefined company SMS templates. This number includes those templates created for any site under the same account.

## User SMS templates

User SMS templates are personal resource. They can be created, listed, managed and accessed by a user who have the "Business SMS" user permission. And the templates are only accessible by that user.

| API Endpoint      | Method   | Description                                        |
| -------------- | ------ | ------------------------------------------------------- |
| /restapi/v1.0/account/~/extension/[extensionId]/message-store-templates | POST | Create a new personal SMS template. |
| /restapi/v1.0/account/~/extension/[extensionId]/message-store-templates | GET | List all personal SMS templates.  |
| /restapi/v1.0/account/~/extension/[extensionId]/message-store-templates/[templateId] | PUT | Update a personal SMS template identified by a template id. E.g. change the template text. |
| /restapi/v1.0/account/~/extension/[extensionId]/message-store-templates/[templateId] | DELETE | Delete a personal SMS template identified by a template id. |
| /restapi/v1.0/account/~/extension/[extensionId]/message-store-templates/[templateId] | GET | Read a single personal SMS template identified by a template id. |

Each user can create maximum up to 25 predefined user SMS templates.

!!! note
    Any user with the "Business SMS" user permission can also read the company SMS templates using the user SMS template API by setting the "scope" query parameter to "all" or "company".

### Example of a use case of a user SMS template

Imagine if you are a community manager and you need to send an SMS message every month to remind your community members about the monthly meetup. You can compose the SMS message once, save it as a template. Then every month you need to send the reminder, you can simply load the SMS message from the template and use it to send out the reminder to your community members.

### Example code to create a user SMS template

!!! note "Running the code"
    * If you have tried the [SMS quick start](../quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `create_user_sms_template()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js !}
    {!> code-samples/messaging/code-snippets/create-user-sms-template.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/code-snippets/create-user-sms-template.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py!}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php !}
    {!> code-samples/messaging/code-snippets/create-user-sms-template.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/code-snippets/create-user-sms-template.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb !}
    ```
