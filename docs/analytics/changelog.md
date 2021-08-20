# Analytics API announcements and changelog

## Aug 12, 2021

This new release includes additional filters, renaming of API parameters that will result in breaking changes. It is recommended you read the "What's New" section in full in order to update your code to incorporate the latest API changes.

### What's New ?

Following changes have been made to the current API Endpoint :

``` https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/analytics/performance/calls//aggregate/ ```

---
**NOTE**
"->" is used below to signify nested JSON Structure. Please refer to the [API Reference Document]('swagger-api-ref.html') for more details.
---

##### 1. Actions as a filter

- A new filter option has been introduced as part of,  "additionalFilters" object. 
- When applied returns aggregation of calls by presence of specific actions by the agent    
            during the call.
- Available options: [ HoldOff, HoldOn, ParkOn, ParkOff, BlindTransfer, WarmTransfer, DTMFTransfer ]
- Multiple actions will be ORed together.

###### Example : This request returns aggregation of all the calls to the specified queue (groupBy) that had at least one hold during the call. 

HTTP Request
```bash
   curl --location --request POST 'https://platform.ringcentral.com/restapi/v1.0/account/~/analytics/performance/calls/aggregate' \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        --header '{Your Access Token goes here}' \
        --header 'RCAccountId: Account Id' \  
        --header 'RCExtensionId: Extension Id' \  
        --data-raw '{
                      "grouping": {
                        "groupBy": "Queues",
                        "ids": [
                          "Extention"
                        ]
                      },
                      "timeRange": {
                        "timeFrom": "2021-04-04T00:00:22.528Z",
                        "timeTo": "2021-07-27T23:59:22.528Z"
                      },
                      "additionalFilters": {
                        "callActions": [
                          {
                            "callAction": "Holds On"
                          }
                        ]
                      },
                      "responseOptions": {
                        "counters": {
                          "allCalls": {
                            "aggregationType": "Sum"
                          }
                        },
                        "timers": {
                          "totalCallLength": {
                            "aggregationType": "Sum"
                          }
                        }
                      }
                    }'
```

##### 2. Queue SLA as a response option & filter

A new response option has been added to get aggregation of all queue calls that have been answered within the specified queue SLA as well as out of SLA. Queue SLA can be specified on the RC admin portal.

Example :  Similarly “inSla” and “outOfSla” can be used as part of “additionalFilters” to filter out calls.

HTTP Request:
```bash
   curl --location --request POST 'https://platform.ringcentral.com/restapi/v1.0/account/~/analytics/performance/calls/aggregate' \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        --header '{Your Access Token goes here}' \
        --header 'RCAccountId: Account Id' \  
        --header 'RCExtensionId: Extension Id' \  
        --data-raw '{
                      "grouping": {
                        "groupBy": "Queues",
                        "ids": [
                          "Extention"
                        ]
                      },
                      "timeRange": {
                        "timeFrom": "2021-04-04T00:00:22.528Z",
                        "timeTo": "2021-07-27T23:59:22.528Z"
                      },
                      "responseOptions": {
                        "counters": {
                          "allCalls": {
                            "aggregationType": "Sum"
                          }
                        },
                        "callsByQueueSla": {
                          "aggregationType": "Sum"
                        }
                      },
                      "timers": {
                        "totalCallLength": {
                          "aggregationType": "Sum"
                        },
                        "callsLengthByQueueSla": {
                          "aggregationType": "Sum"
                        }
                      }
                    }'
```
HTTP Response:
```bash
{
  "data": { 
    "869723004": {  
      "timers": {
        "callsDurationSeconds": 991, 
        "callsByQueueSla": { 
          "inSla": 25, 
          "outOfSla": 36
        }
      },
      "counters": { 
        "totalCalls": 40, 
        "callsByQueueSla": {  
          "inSla": 2, 
          "outOfSla": 1 
        } 
      }
    }
  }
}
```

##### 3. Pagination

Pagination support has been added to calls performance API endpoint. Now, developers can make use of two additional query parameters to specify how much data they want to retrieve per page.

 * page : Defines the page number to retrieve. Only positive numbers are allowed, optional parameter, default is 1. Other values should lead to HTTP 400, Bad Request.

 * perPage - Defines the page size (number of items), optional parameter, default is 100.

##### 4. Additional Validations, format updates

This release also includes few miscellaneous updates to functionalities and validations as follows:

  - Counters no longer support Avg, Min,Max. Inclusion of this in the request will return an error
  - Validation has been added to “timeRange” to max value specified is always greater than or equal to min value. If the specified “timeRange” max is less than time range min, an error message will be returned. 
  - Phone numbers returned in response are updated to E164 format. Any phone numbers returned in response,will be converted to E164 format. (Ex: Before: 61280742914, Now: +61280745135)

## July 19, 2021

This new release includes additional filters, renaming of API parameters that will result in breaking changes. It is recommended you read the "What's New" section in full in order to update your code to incorporate the latest API changes.

### What's New ?

Following changes have been made to the current API Endpoint :

```https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/analytics/performance/calls/```

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
