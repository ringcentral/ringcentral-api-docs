no_breadcrumb:true

## Announcements

This new release includes additional filters, renaming of API parameters that will result in breaking changes. It is recommended you read the "What's New" section in full in order to update your code to incorporate the latest API changes.

### What's New ?

Following changes have been made to the current API Endpoint :

``` https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/analytics/performance/calls/ ```

---
**NOTE**
"->" is used below to signify nested JSON Structure. Please refer to the [API Reference Document]('swagger-api-ref.html') for more details.
---

##### 1. PerformanceCallsFilters -> CallResponseType

Data Additions: 
  <br />
  1. QueueCalls: Helps filter out queue calls answered by users.
  <br />
  2. TransferredCalls: Helps filter out calls answered by Groupby type that were transferred to them.

Name Changes
<br />
  1. "inboundAnswer" renamed to "inboundDirect"

##### 2. PerformanceCallsDataOptions ->
  -  PerformanceCallsCountersResponseOptions -> callsByResponseType
  -  PerformanceCallsTimersResponseOptions -> callsByResponseType
    1. QueueCalls: Helps retrieve number of queue calls answered by users & time spent on them.
    2. TransferredCalls: Helps retrieve number of transferred calls answered by Groupby type & time spent on them.         

##### 3. PerformanceCallsDataOptions -> 
  - PerformanceCallsCountersResponseOptions -> callsBySegment
    1. ringing, IVR prompt, Live talk, hold, park, transfer, voicemail, VM Greeting: Helps retrieve calls that had any of these specified segments.
 <br />
  - PerformanceCallsTimersResponseOptions -> callsByResponseType
    1. VM Greeting: Helps retrieve time spent on specified segments across all calls.


##### 4. PerformanceCallsDataOptions -> 
  - PerformanceCallsCountersResponseOptions -> callsByCompanyHours
  - PerformanceCallsTimersResponseOptions -> callsLengthByCompanyHours 

    1. Business Hours: Helps retrieve calls & time spent on calls that happened during company business hours
    2. After Hours: Helps retrieve calls & time spent on calls that happened during company after hours

##### 5. Following name changes have been made

  1. Rename Call result: ended to Completed: (counters & timers) in response and req filter
    - Request:CallResultFilter: "isEnded" is now "isCompleted"
    - Response:CallsByResult: "ended" is now "completed"
    - Response:CallDurationByResult: "endedCallsSeconds" is now "completedCallsSeconds" 
 <br />
  2. Rename Response type: inboundAnswer to inboundDirect (counters & timers) in response and req filter
    - Request:CallResponseType Enum: "InboundAnswers" is now "InboundDirect" [in PerformanceCallsFilters]
    - Response:CallsByResponseType "inboundAnswer" is now "inboundDirect"
    - Response:CallDurationByResponseType: "inboundAnswersSeconds" is now "inboundDirectSeconds"
