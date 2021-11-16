# Reading Call Log Data

RingCentral's Call Log is one of the platform's most utilized resources as it enables so many different use cases important to enterprises and businesses. Developers use RingCentral's Call Log for the following use cases:

* **Downloading Call Log Data to an External Database** - Since RingCentral does not store Call Log data indefinitely, developers use the Call Log API to download Call Log data into customer-owned, long-term, persistent storage.

* **Reporting and Analytics** - Developers use the Call Log API to analyze call histories, agent performance, answer rates, and more - with a desire and intent to improve company operations and performance.

* **CRM Integration** - Developers can use Call Log data to help augment 3rd party systems with customer interaction histories and more.

* **Billing Systems** - Service industries often need to bill customers based on the time spent serving them over the phone. Call Log data catalogs all time spent with customers to make time tracking easier.

!!! warning Call Log Anti-Patterns
    Here are ways developers should **not** use the Call Log API:

    * **Real-time reporting** - The Call Log API resource is labeled as a "Heavy" usage plan. RingCentral offers better solutions for event-driven, real-time reporting for RingCentral Extensions, primarily Webhooks and/or Push Notifications.
    * **Long-Polling** - While this is highly related to the above, it is important to clearly note that long-polling Call Log (executing multiple HTTP requests to simulate real-time, socket-based data) is not a supported use case.

## Sample Code to Get Started with Call Log

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-log.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/call-log.py !}
    ```
    
=== "PHP"

    ```php
    {!> code-samples/voice/call-log.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/call-log.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/voice/ReadCallLog.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/call-log.rb !}
    ```    

## Call Log API Permissions

There are various API Permissions your application will be required to use depending upon the type of call log data developers need to access from the RingCentral API.

* Active Calls, Account level Call Log Records, and Extension level Call Log Records require the `ReadCallLog` API permission.
* Call Recording Metadata and Call Recording Content require the `ReadCallRecording` API Permission
