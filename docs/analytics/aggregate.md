# Obtaining Aggregate Call Business Analytics Data

!!! warning "Analytics API - breaking change alert!"
    Analytics API aggregate path has changed to `POST /analytics/calls/v1/accounts/~/aggregation/fetch`

It is quite common to acquire and segment call related data for reporting or analysis. Call Aggregate API provides the ability to aggregate call related data in various ways such as by summing, averaging, getting minimum or maximum or percentage of data etc. Line of business managers can make incentive, allocation, or training decisions by looking at total answered calls vs not answered calls per agent, or by looking at the average abandonment rate for an agent, or by checking the total handle time for each agent.

Example Use Cases:

- How many calls are being answered over a particular period?
- What does the abandonment rate look like?

For more information, please refer to the [overview section](index.md).

## Composing a request using RingCentral API Reference

One can use our [interactive API Reference](https://developers.ringcentral.com/api-reference/Line-Of-Business-Analytics/aggregatePerformanceReportCalls) to not only create API Request but also run it interactively and see the response.

## API Definition Guide

### Controlling what to group data by

There are two options to group by. The `groupBy` element allows users to perform direct grouping. The `groupByMembers` element allows users to group by individual users with the selected option.  All the data retrieved will represent the portion of the calls that involved the specified `groupBy` or `groupByMember` type. GroupBy types cannot be mixed in one request, there can only be one type.  If this field is undefined or null, the response will contain one record with data aggregated by the whole company.

#### Direct Grouping (groupBy)

|groupBy (API)	| Description |
|---|---|
| `Company` | This grouping will return call data for the entire company. |
| `CompanyNumbers` | This grouping will return call data for direct numbers set up under Phone Systems - > Phone Numbers on Admin Portal. |
| `Users` | This grouping will return call data for individual mailboxes. When users are added to the grouping, the response provides call data aggregated at the user level.  |
| `Queues` | This grouping will return call data for Queue extensions. |
| `IVRs` | This grouping will return call data for IVR extensions. |
| `SharedLines` | This grouping will return Call data for the calls made to one phone number that can be answered by up to 16 phones within a designated group. |
| `UserGroups` | This grouping will return call data for  User Groups setup on Admin Portal. |
| `Sites` | This grouping will return call data for Site extensions when an account is using the multi-site feature. |
| `Departments` | This grouping will return call data for users labeled with the same Department on Admin Portal. |

#### Group by Memebers (groupByMembers)

|groupByMember (API)	| Description |
|---|---|
| `Department` | This grouping will return call data for individual users under Departments. Specify Ids of departments along with this grouping which will provide aggregated call data for users under those departments. |
| `UserGroup` | This grouping will return call data for individual users under User Groups. Specify Ids of user groups along with this grouping which will provide aggregated call data for users under those user groups. |
| `Queue` | This grouping will return call data for individual users under Queues. Specify Ids of queues along with this grouping which will provide aggregated call data for users under those queues.
| `Site` | This grouping will return call data for individual users under Sites. Specify Ids of Sites along with this grouping which will provide aggregated call data for users under those Sites. |

**Example**

```json
"grouping": {
  "groupBy": "Users",
  "keys": []
}

or

"grouping": {
  "groupByMember": "Site",
  "keys": []
}
```

### Setting the timeframe of the request

The `timeSettings` object contains the following important elements:

* The `timeZone` will be used to determine the `includeDays` and `includeHours` specified in the `advancedTimeSettings`
* The `timeRange` element allows users to specify the datetime range for which the calls will be aggregated and will be provided in set time intervals (for example day, week etc). The call is considered to be within time range if it was started within that range. This is similar to aggregate endpoint along with providing data at different timeframe splits.
* The `advancedTimeSettings` gives you even more flexibility in including and excluding data from generated reports, including the ability to include/exclude weekdays and set the timezone and working hours.

In the below example, under `advancedTimeSettings`, the `includeDays` will allow users to add weekdays of choice, and `includeHours` will allow users to filter data for custom hours (format hh:mm) for specified date-time range under `timeRange` section. Further, they can add `grouping` as necessary to make sure that the data received is aggregated by counter & timer.

**Example**

```json
"timeSettings": {
  "timeZone": "America/Los_Angeles",
  "timeRange": {
    "timeFrom": "2021-10-02T00:00:00.877Z",
    "timeTo": "2022-01-02T04:01:33.877Z"
  },
  "advancedTimeSettings": {
    "includeDays": [
      "Sunday"
    ],
    "includeHours": [
      {
        "from": "00:00",
        "to": "23:59"
      }
    ]
  }
}
```

### Customizing Data Response

The `responseOptions` element allows users to specify call aggregation breakdown and its data aggregation types for API response. These response options will get sliced and diced by using the additional filters section in the API request.

The `counters` element provides aggregation on Call volume by specified metrics. The metrics can be provided in the counter section under the response option. Every response section has an option to specify aggregation type & Interval. The supported types are Sum, Average, Min, Max, Percent, and Interval is Hour, Day, Week, Month.

**Example**

```json
"responseOptions": {
  "counters": {
    "allCalls": {
      "aggregationType": "Sum"
    },
    "queueOpportunities": {
      "aggregationType": "Sum"
    },
    "callsByDirection": {
      "aggregationType": "Sum"
    },
    "callsByOrigin": {
      "aggregationType": "Sum"
    },
    "callsByResponse": {
      "aggregationType": "Sum"
    },
    "callsSegments": {
      "aggregationType": "Sum"
    }
    /* snip */
  }
}
```

The `timers` element provides aggregation for time spent on the call. The metrics can be provided in the timer section under the response option which will provide duration details. Every response section has an option to specify aggregation type & Interval. The supported types are Sum, Average, Min, Max, Percent and Interval is Hour, Day, Week, Month.

**Example**

```json
"responseOptions": {
  "timers": {
    "allCallsDuration": {
      "aggregationType": "Sum"
    },
    "callsDurationByDirection": {
      "aggregationType": "Sum"
    },
    "callsDurationByOrigin": {
      "aggregationType": "Sum"
    },
    "callsDurationByResponse": {
      "aggregationType": "Sum"
    },
    "callsSegmentsDuration": {
      "aggregationType": "Sum"
    }
    /* snip */
  }
}
```

### Filtering your dataset even more

The `callFilters` element allows users to filter out the data and specify the granular scope to call breakdown metrics for both `counter` and `timer` section. Detailed splits of these sections can be found in Data Dictionary below.

|Filters list| type | Purpose|
|---|---|---|
| `directions` | array[string] | Specifies whether the call was inbound or outbound relative to the scope specified in the grouping object. Not applicable to internal calls with company scope (when grouping is not specified).|
| `origins` | array[string] | Specifies whether an external party was present in the initial segment of the call. |
| `callResponses` | array[string] | Aggregation of calls by the first response action. |
| `callResults` | array[string] | Aggregation of calls by the nature of call result. |
| `callSegments` | array[object] | Aggregation of calls by the presence of specific segment. Example: `hold`, `park`, or `transfer`. |
| `callActions` | array[object] | Aggregation of calls by the presence of specific action. Example: hold on/off or park on/off. |
| `companyHours` | array[string] | Aggregation of calls by company's business hours or after hours. |
| `callDuration` | object | aggregation of calls based on the overall call length
| `timeSpent` | object | aggregation of calls based on the time spent by the specified mailbox(es) on call. |
| `extensionFilters.fromIds` | array[string] | List of extension Ids from which users specified in groupBy received calls. |
| `extensionFilters.toIds` | array[string] | List of extension Ids to which users specified in groupBy placed calls. |
| `calledNumbers` | array[string] | The direct company numbers the caller called. |
| `queueSla` | array[string] | To get aggregate of calls that were either in or out of a particular queueSLA. |
| `callTypes` | array[string] | To get aggregate of calls based on how the call started from the callee perspective. |

**Example**

```json
  "callFilters": {
    "directions": [ "Inbound", "Outbound" ],
    "origins": [ "Internal" ],
    "callResponses": [ "Answered" ],
    "callResults": [
      "Completed"
    ],
    "callSegments": [
      {
        "segment": "Ringing",
        "length": {
          "minSeconds": 0,
          "maxSeconds": 200
        }
      }
    ],
    "callActions": [
      "HoldOff"
    ],
    "companyHours": [
      "BusinessHours"
    ],
    "callDuration": {
      "minSeconds": 0,
      "maxSeconds": 200
    },
    "timeSpent": {
      "minSeconds": 0,
      "maxSeconds": 200
    },
    "extensionFilters": {
      "fromIds": [
        "123",
        "432"
      ],
      "toIds": [
        "345",
        "654"
      ]
    },
    "calledNumbers": [
      "+16505551212"
    ],
    "queueSla": [
      "InSla"
    ],
    "callTypes" : [
      "Direct"
    ]
  }
```

### Pagination

Analytics can produce a lot of results so you may want to paginate your results to enable easier processing. Pagination is done with two additional query parameters: `page` and `perPage`

| Pagination (API) | Description |
|-|-|
| `page` | The page you wish to start with. For example, start on page 2. |
| `perPage` | The number of results return on each page. For example, you want 10 results on the first page and an additional 10 on the second page. Note: aggregate reports have a max limit of `200` per page. |

**Example**

``` http
POST /analytics/calls/v1/accounts/~/aggregation/fetch?page=2&perPage=10
Host: platform.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_VALID_ACCESS_TOKEN
```

### Data Dictionary

|CounterResponseOptions (API)| TimerResponseOptions (API)| Description |
|---|---|---|
| allCalls | allCallsDuration | <p>The combined total of all the calls involving the specified groupby dimension. </p><p> Counter will return aggregration of total calls. Timer will return call duration aggregation for total calls.</p> |
| queueOpportunites | Not Applicable | <p>The total number of times calls are presented to an extension. </p><p> QOpportunities is applicable for users grouping only.</p> |
| callsByOrigin | callsDurationByOrigin | <p>Breaks down of calls that happened within or outside of the account. </p><ul><li><b> Internal:</b> Calls that originated inside the account </li> <li><b>External:</b> Calls that originated outside the account</li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByDirection | callsDurationByDirection | <p>Aggregates all the calls based on the direction of the call with reference to the specified row type. </p><ul><li><b> Outbound:</b> Calls made from extn are represented as "Outbound" </li><li><b> Inbound:</b> Calls received on extn are "Inbound" </b></li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByResponse | callsDurationByResponse | <p> Breakdown of the response to the calls by the selected dimension. Gives a higher level aggregation of how many were: </p><ul><li><b> answered:</b> Calls picked & answered by user</li><li><b>notanswered:</b> Calls not answered by user </li> <li><b>connected: </b> Only applicable to outbound calls and aggregates all the calls that got connected to the called number </li> <li><b>notConnected:</b> Only applicable to outbound calls and aggregates all the calls that did not get connected to the called number </li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByType | callsDurationByType | <p> Aggregation based on the types of calls that are handled by users. </p> <ul><li><b>direct:</b> Direct calls answered by the user. </li> <li><b>fromQueue:</b> Queue calls that are answered by the user </li> <li><b>parkRetrieval:</b> Calls answered by the user after retrieving a parked call </li> <li><b>transferred:</b> Transferred calls that were answered by the user </li> <li><b>outbound:</b> Calls made from the extension numbers </li><li><b>overflow:</b> Total calls overflowed from an extension. </li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| CallsByActions | Not Applicable| <p> Aggregation of actions taken by the user on all the calls they handled. </p> <ul><li><b>holdOn:</b> Number of times user placed the calls on hold </li> <li><b>holdOff:</b> Number of times user removed calls from hold </li> <li><b>parkOn:</b> Number of times user placed the calls on park location </li> <li><b>parkOff:</b> Number of times user retrieved calls from park location </li> <li><b>blindTransfer:</b> Type of call transfer where a call is transferred to another agent without any prior information </li> <li><b>warmTransfer:</b> Type of transfer where a call is transferred to another agent with prior information about the transfer </li> <li><b>dtmfTransfer:</b> Type of transfer where a call is transferred vis dtmf sequence </li></ul> Counter will return aggregration of calls for these actions. Not applicable for Timer. |
| CallsByResult | callsDurationByResult | <p> End result of the calls. Describes how the calls that came to specified Groupby ended. </p> <p>For Answered:</p> <ul><li><b>Completed:</b> Call ended normally after a live talk with the user. It is possible calls may not have ended at this level and got transferred or forwarded out or abandoned during hold in which case even after a calls were answered not all were completed. </li> <li><b>Abandoned:</b> Caller hung up before the user could answer or during hold </li> <li><b>Voicemail:</b> Call reached the voicemail of the user or group </li></ul> <p>For Not Answered:</p>  <ul><li><b>Missed:</b> Calls that  rang to max time/rings as per the setup and was not answered by the user </li> <li><b>Accepted:</b> Calls that were responded by a system such as automated response or VM and disconnected </li> <li><b>Unknown:</b> for outbound pstn calls, result is unknown for calls connected/Not connected </li></ul> Counter will return aggregration of total calls for these Results. Timer will return call duration aggregation for the same calls. |
| callsSegments | callsSegmentsDuration | <p> Aggregates the times spent by the caller in different stages of the call. These are the calls that came to the dimensions specified by GroupBy. </p> <ul><li><b>setup:</b> It is when the phone system is connecting to callee's device. This is when caller is calling via RC App and system says "Please wait while I try to connect you" before the beeps starts. </li> <li><b>ringing:</b> Duration for which calls spent ringing to the Extn/No & can be found under Timer. When selected under counter, it  returns, the number of calls that had a ringing phase. </li> <li><b>ivrPrompts:</b> Duration for which calls spent in IVR Prompt before reaching the Extn/No. When selected as “Calls” returns, the number of calls that had  IVR Prompt phase. </li> <li><b>livetalk:</b> Duration for which callers were having a live talk with Extn/No & can be found under Timer. When selected under counter, it returns  number of calls that had a Live Talk phase. </li> <li><b>holds:</b> Duration for which callers were put on hold by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that had a Hold phase. </li> <li><b>parks:</b> Duration for which callers spent in a parked state after being parked by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that were parked by Extn/No. </li> <li><b>transfers:</b> Duration for which caller was being transferred by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that were transferred by Extn/No. </li> <li><b>vmGreeting:</b> Duration for which callers spent listening to VM greeting & can be found under Timer. When selected under counter, it returns, number of calls that had VM greeting phase. </li> <li><b>voicemail:</b> Duration for which callers spent in Voicemail & can be found under Timer. When selected under counter, it  returns  number of calls that had Voicemail Phase. </li></ul> |
| callsByCompanyHours | callsDurationByCompanyHours. | <p> Aggregates data by company "Business Hours" or "After Hours" as setup on admin portal. </p> Counter will return aggregration of calls for Business Hours & After Hours. Timer will return call duration aggregation for same. |
| callsByQueueSla | callsDurationByQueueSla | <p> Provides count of calls and their duration details for calls answered within SLA for Queues grouping only. Not applicable for rest of the grouping available. </p> <ul><li><b>inSla:</b> Calls answered withing SLA. </li> <li><b>outOfSla:</b> Calls answered outside of SLA. </li></ul> Counter will return aggregration of calls for these metrics. Timer will return call duration aggregation for same. |
|

## Full sample request for Analytics Aggregate Report

```json
{!> code-samples/analytics/aggregate-request-body.json !}
```
