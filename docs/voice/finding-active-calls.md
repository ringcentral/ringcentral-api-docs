# Finding Active Calls on the Network

Active Calls provides developers with time-sensitive insights into what is (or has recently) occurred in your RingCentral Account. We can perform this lookup at the Account Level or at the Extension Level depending upon the role of the user who has authenticated and obtained an access_token.

Active Calls are not **real-time**. There is some latency between the time when a call has terminated and when it shows up in the records returned, this latency differs but it is typically 3-10 seconds.

Active Calls are created to work as a tool for developers who need to lookup call log data to append notes, and sentiment for things such as CRM integrations. Active Calls are a handy tool for looking up this time-sensitive information, but this can also be confusing for developers expecting this Call Log data type to represent `real time` active calls. For `real-time` or `near real-time` call data developers will want to either use [Webhooks](http://ringcentral-quickstart.readthedocs.io/en/latest/webhooks/) or [Push Notification](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefNotifications.html).

Developers should consider Active Calls to be a time-sensitive cache, where the default period of time a call remains in this cache (after being ended) is approximately 120 seconds.

!!! info "See Also: Call Log"
    The Active Call API is a close cousin to the RingCentral [Call Log API](../call-log/reading-call-log/) using identical data constructs and responses. The key and only difference being the following:

    * Active Call API returns a list of live calls in an account. These are calls that have been connected to an extension. It does not return calls currently being routed to an extension.
    * Active Call API connects to a different URL/endpoint.

Query parameters are dropped if supplied and only `Simple` views of Call Log data are available using Active Call requests.

## Account Level Active Calls

Developers can access a list of active calls for an entire account. This requires an Admin account to authenticate and obtain the access_token used for this request.

```http
GET /restapi/v1.0/account/~/active-calls HTTP/1.1
```

!!! warning ReadCompanyCallLog Permission
    Attempting to access Account-Level Active Calls with an access_token that is not associated with an Admin account will result in the following "InsufficientPermissions" error: [ReadCompanyCallLog] permission required.

## Extension Level Active Calls

Developers can access a list of active calls associated with the currently authenticated access_token user account credentials.

```http
GET /restapi/v1.0/account/~/extension/~/active-calls HTTP/1.1
```

## Response Format

The response format for active calls mirrors that of Call Log responses exactly.

## Sample Code to Get Started with reading user active calls

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/finding-active-calls.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/finding-active-calls.py !}
    ```
    
=== "PHP"

    ```php
    {!> code-samples/voice/finding-active-calls.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/finding-active-calls.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/FindActiveUserCalls.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/finding-active-calls.rb !}
    ```    
