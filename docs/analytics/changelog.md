# Analytics API announcements and changelog

## July 19, 2021

This new release includes additional filters, renaming of API parameters that will result in breaking changes. It is recommended you read the "What's New" section in full in order to update your code to incorporate the latest API changes.

### What's New ?

Following changes have been made to the current API Endpoint :

```https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/analytics/performance/calls/```

!!! info "The '->' symbol used below signifies a nested JSON structure. Please refer to the [API Reference]('./api-reference/') for more details."

#### PerformanceCallsFilters -> CallResponseType

**Data Additions**

1. QueueCalls: Helps filter out queue calls answered by users.

2. TransferredCalls: Helps filter out calls answered by Groupby type that were transferred to them.

**Name Changes**

1. "inboundAnswer" renamed to "inboundDirect"

#### PerformanceCallsDataOptions ->

* PerformanceCallsCountersResponseOptions -> callsByResponseType
* PerformanceCallsTimersResponseOptions -> callsByResponseType
    1. QueueCalls: Helps retrieve number of queue calls answered by users & time spent on them.
    2. TransferredCalls: Helps retrieve number of transferred calls answered by Groupby type & time spent on them.         

#### PerformanceCallsDataOptions -> 

* PerformanceCallsCountersResponseOptions -> callsBySegment
    1. ringing, IVR prompt, Live talk, hold, park, transfer, voicemail, VM Greeting: Helps retrieve calls that had any of these specified segments.
* PerformanceCallsTimersResponseOptions -> callsByResponseType
    1. VM Greeting: Helps retrieve time spent on specified segments across all calls.


#### PerformanceCallsDataOptions -> 

* PerformanceCallsCountersResponseOptions -> callsByCompanyHours
* PerformanceCallsTimersResponseOptions -> callsLengthByCompanyHours 

    1. Business Hours: Helps retrieve calls & time spent on calls that happened during company business hours
    2. After Hours: Helps retrieve calls & time spent on calls that happened during company after hours

#### Following name changes have been made

1. Rename Call result: ended to Completed: (counters & timers) in response and req filter
    - Request:CallResultFilter: "isEnded" is now "isCompleted"
    - Response:CallsByResult: "ended" is now "completed"
    - Response:CallDurationByResult: "endedCallsSeconds" is now "completedCallsSeconds" 

2. Rename Response type: inboundAnswer to inboundDirect (counters & timers) in response and req filter
    - Request:CallResponseType Enum: "InboundAnswers" is now "InboundDirect" [in PerformanceCallsFilters]
    - Response:CallsByResponseType "inboundAnswer" is now "inboundDirect"
    - Response:CallDurationByResponseType: "inboundAnswersSeconds" is now "inboundDirectSeconds"

## June 17, 2021

Call Performance API is available only to private beta developers and partners 🎉

Note: Please be aware that the current API endpoint may change, any changes will be mentioned in this section.

### What's new ?

Private Beta Launch :  June 17, 2021

### Known Issues

- Ring Groups and Shared Line Groups are not supported in this release
- Aggregation functions, Avg, Min, Max are not functional at the time of the release, will be made available soon after the release
- Some call scenarios are currently resulting in the call not getting accounted for in calculations, they are; 
    - Internal calls between two RingCentral extensions where the caller puts the call on hold and transfers the call
    - Some cases of call parking, exact scenarios are under investigation
- DTMF Transfers where users can input some shortcut codes to perform a transfer, are currently not supported and hence won’t be accounted for in count of transfers.
