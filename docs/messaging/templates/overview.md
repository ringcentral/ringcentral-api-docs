# Overview

SMS templates are reusable messages that you would frequently need to send your users as SMS messages. They are predefined text messages that can contain text and URLs.

Each SMS template can have maximum 1000 UTF-16 encoded characters. This is also the maximum length of a single SMS message (sent in MMS format) that can be sent out from a RingCentral phone number.

RingCentral platform provides APIs to manage SMS templates for 2 scopes, company templates and user templates (a.k.a personal templates).

## Company SMS templates

Company SMS templates can be created, listed, modified and deleted only by users who have the "Edit Company SMS Templates" user permission, this user permission normally included in the default super admin user role. If you want to grant the "Edit Company SMS Templates" permission to other user roles, make sure that the permission is selected for that role.

Company SMS templates can be created for different sites under an account. Each account can have maximum up to 50 predefined company SMS templates. This number includes those templates created for any site under the same account.

The company SMS template name must be unique across all sites. If the same name is reused, the template creation API will fail.

Browse the [Company SMS template APIs reference](https://developers.ringcentral.com/api-reference/SMS-Templates/createCompanyMessageTemplate) to try online.

## User SMS templates

User SMS templates are personal resource. They can be created, listed, managed and accessed by a user who have the "Business SMS" user permission. And the templates are only accessible by that user.

Each user can create maximum up to 25 predefined user SMS templates. A user SMS template name must be unique. If the same name is reused, the template creation API will fail.

!!! note
    Any user with the "Business SMS" user permission can also read the company SMS templates using the user SMS template API by setting the "scope" query parameter to "all" or "company".

Browse the [User SMS template APIs reference](https://developers.ringcentral.com/api-reference/SMS-Templates/createUserMessageTemplate) to try online.

### Example of a use case of a user SMS template

Imagine if you are a community manager and you need to send an SMS message every month to remind your community members about the monthly meetup. You can compose the SMS message once, save it as a template. Then every month you need to send the reminder, you can simply load the SMS message from the template and use it to send out the reminder to your community members.

### Example code to create a user SMS template

!!! note "Running the code"
    * If you have tried the [SMS quick start](../quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `create_user_sms_template()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * The C# code requires the .NET SDK version 6.2.0 (or newer if available).
    * The Java code requires the Java SDK version 3.2.0 (or newer if available).

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js [ln:1-13]!}
    {!> code-samples/messaging/code-snippets/create-user-sms-template.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/code-snippets/create-user-sms-template.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php [ln:1-15]!}
    {!> code-samples/messaging/code-snippets/create-user-sms-template.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/code-snippets/create-user-sms-template.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb [ln:1-4] !}
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/code-snippets/create-user-sms-template.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/code-snippets/create-user-sms-template.java !}
    ```
