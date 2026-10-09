---
id: scheduled-messages
title: Scheduled Messages
slug: /omnichannel-api/scheduled-messages
---

# Scheduled Messages

Schedule messages to be sent for later.

---

!!! tip
    The easiest way to use Omnichannel API is with our [official libraries](development-libraries.md). They will take care of authentication, request validation and response handling automatically.

## Schedule a message

Send a message with `time_to_send` parameter to schedule it for later. Learn how to compose a message in our [quickstart guide](index.md).

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/schedule-message.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/schedule-message.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/schedule-message.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/schedule-message.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/schedule-message.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/schedule-message.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/schedule-message.sh !}
    ```

!!! note "Time format"
    * Time must be specified in the ISO 8601 format.
    * Default timezone is UTC.

    For example, both of the cases below are allowed:

    * `2019-06-22T09:05` - UTC is set as timezone
    * `2019-06-22T09:05:07+04:00` - Default timezone is ignored and UTC+4 is used


## Cancel a scheduled message

To cancel a scheduled message you need to know the omnimessage_id that you got when you sent out the message.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/cancel-message.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/cancel-message.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/cancel-message.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/cancel-message.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/cancel-message.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/cancel-message.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/cancel-message.sh !}
    ```
