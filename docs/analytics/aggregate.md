# Using the Analytics APIs to access call performance aggregate and timeline data

## Composing a request to the Call Performance Aggregate API

Please refer to our [API Reference](https://developers.ringcentral.com/api-reference/Line-Of-Business-Analytics/aggregatePerformanceReportCalls) for details about Timeline API Endpoint.

### Controlling what to aggregate/group data by

The `groupBy` element allows users to specify data scope. All the data retrieved will represent the portion of the calls that involved the specified GroupBy type. GroupBy types cannot be mixed in one request, there can only be one type.  If this field is undefined or null, the response will contain one record with data aggregated by whole company.

|GroupBy (API)	| Description |
|---|---|
| Users | This grouping will return call data for individual mailboxes. When users are added in the grouping, then response provides call data aggregated at user level.  |
| DepartmentMembers | This grouping will return call data for individual users under Departments. Specify Ids of departments along with this grouping which will provide aggregated call data for users under those departments. |
| UserGroupMembers | This grouping will return call data for individual users under User Groups. Specify Ids of user groups along with this grouping which will provide aggregated call data for users under those user groups. |
| QueueAgents | This grouping will return call data for individual users under Queues. Specify Ids of queues along with this grouping which will provide aggregated call data for users under those queues.
| SiteMembers | This grouping will return call data for individual users under Sites. Specify Ids of Sites along with this grouping which will provide aggregated call data for users under those Sites. |
| UserGroups | This grouping will return call data for  User Groups setup on Admin Portal. |
| Departments | This grouping will return call data for users labeled with the same Department on Admin Portal. |
| Queues | This grouping will return call data for Queue Extns. |
| IVRs | This grouping will return call data for IVR extensions. |
| Sites | This grouping will return call data for Site Extns when an account is using the multi-site feature. |
| CompanyNumbers | This grouping will return call data for direct numbers set up under Phone Systems - > Phone Numbers on Admin Portal. |
| Shared Lines | This grouping will return Call data for the calls made to one phone number that can be answered by up to 16 phones within a designated group. |
| No grouping specified, i/e null or unstable | It will return one record with data aggregated by the whole company.|
|

**Example**

```json
"grouping": {
  "groupBy": "Users",
  "ids": []
}
```

### Setting the timeframe of your request

The `timeSettings` element allows users to specify the datetime range for which the calls will be aggregated. The call is considered to be within time range if it was started within that range. 

The `timeSettings/advancedTimeSettings` gives you even more flexibility in including and excluding data from generated reports, including the ability include/exclude weekdays and set timezone and working hours. 

In the below example, under advancedTimeSettings, timeZone can be specified, include Days will allow users to add weekdays of choice, and Includehours will allow users to filter data for custom hours (format hh: mm) for specified date-time range under timeRange section. Further, they can add grouping as necessary to make sure that the data received is aggregated by counter & timer by timeframes

**Example**

```json
"timeSettings": {
  "timeRange": {
    "timeFrom": "2021-10-02T00:00:00.877Z",
    "timeTo": "2022-01-02T04:01:33.877Z"
  },
  "advancedTimeSettings": {
    "timeZone": "Europe/Moscow",
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

### Response options

The `responseOptions` element allows users to specify call aggregation breakdown and it’s data aggregation types for API response. These response options will get sliced and diced by using additional filters section in API request.

The `counters` element provides aggregation on Call volume by specified metrics. The metrics can be provided in the counter section under the response option. Every response section has an option to specify aggregation type & Interval. The supported types are Sum, Average, Min, Max, Percent, and Interval is Hour, Day, Week, Month.

**Example**

```json
"responseOptions": {
  "counters": {
    "allCalls": {
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

The `additionalFilters` element allows users to filter out the data and specify the granular scope to call breakdown metrics for both counter and timer section. Detailed splits of these section can be found in Data Dictionary below.

|Filters list|Purpose|
|---|---|
| direction | Specifies whether the call was inbound or outbound relative to the scope specified in grouping object. Not applicable to internal calls with company scope (when grouping is not specified).|
| origin | Specifies whether an external party was present in the initial segment of the call. |
| callResponse | Aggregation of calls by first response. |
| callResult | Aggregation of calls by the nature of call result. |
| callSegments | Aggregation of calls by presence of specific segment. |
| callActions | Aggregation of calls by presence of specific action. |
| companyHours | Aggregation of calls by company's business hours or after hours. |
| callDuration | aggregation of calls based on the overall call length
| timeSpent | aggregation of calls based on the time spent by specified mailbox(es) on call. |
| callerExtensionIds | List of extension Ids from which users specified in groupBy received calls. |
| calledExtensionIds | List of extension Ids to which users specified in groupBy placed calls. |
| calledNumbers | The direct company numbers the caller called. |
queueSla | This filter allows to get aggregation of calls that were either within or out of queue SLA. |
| callType | Allows to get aggregation of calls based on how the call started from the callee perspective. |
|

These filters can be applied to slice and dice the data as needed and can be done in additionalfilters section. 

**Example**

```json
  "additionalFilters": {
    "direction": "Inbound",
    "origin": "Internal",
    "callResponse": "Answered",
    "callResult": [
      "Completed"
    ],
    "callSegments": [
      {
        "callSegment": "Ringing",
        "callSegmentLength": {
          "minValueSeconds": 0,
          "maxValueSeconds": 200
        }
      }
    ],
    "callActions": [
      {
        "callAction": "HoldOff"
      }
    ],
    "companyHours": "BusinessHours",
    "callDuration": {
      "minValueSeconds": 0,
      "maxValueSeconds": 200
    },
    "timeSpent": {
      "minValueSeconds": 0,
      "maxValueSeconds": 200
    },
    "callerExtensionIds": [],
    "calledExtensionIds": [],
    "calledNumbers": [],
    "queueSla": "InSla",
    "callType" : [
      "Direct"
    ]
  }
```

### Data Dictionary

|CounterResponseOptions (API)| TimerResponseOptions (API)| Description |
|---|---|---|
| allCalls | allCallsDuration | <p>The combined total of all the calls involving the specified groupby dimension. </p><p> Counter will return aggregration of total calls. Timer will return call duration aggregation for total calls.</p> |
| callsByOrigin | callsDurationByOrigin | <p>Breaks down of calls that happened within or outside of the account. </p><ul><li><b> Internal:</b> Calls that originated inside the account. </li> <li><b>External:</b> Calls that originated outside the account.</li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByDirection | callsDurationByDirection | <p>Aggregates all the calls based on the direction of the call with reference to the specified row type. </p><ul><li><b> Outbound:</b> Calls made from extn are represented as "Outbound". </li><li><b> Inbound:</b> Calls received on extn are "Inbound". </b></li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByResponse | callsDurationByResponse | <p> Breakdown of the response to the calls by the selected dimension. Gives a higher level aggregation of how many were: </p><ul><li><b> answered:</b> Calls picked & answered by user.</li><li><b>notanswered:</b> Calls not answered by user. </li> <li><b>connected: </b> Only applicable to outbound calls and aggregates all the calls that got connected to the called number. </li> <li><b>notConnected:</b> Only applicable to outbound calls and aggregates all the calls that did not get connected to the called number. </li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| callsByType | callsDurationByType | <p> Aggregation based on the types of calls that are handled by users. </p> <ul><li><b>direct:</b> Direct calls answered by the user. </li> <li><b>fromQueue:</b> Queue calls that are answered by the user. </li> <li><b>parkRetrieval:</b> Calls answered by the user after retrieving a parked call. </li> <li><b>transferred:</b> Transferred calls that were answered by the user. </li> <li><b>outbound:</b> Calls made from the extension numbers. </li></ul> Counter will return aggregration of calls for these breakdown. Timer will return call duration aggregation for same. |
| CallsByActions | Not Applicable| <p> Aggregation of actions taken by the user on all the calls they handled. </p> <ul><li><b>holdson:</b> Number of times user placed the calls on hold. </li> <li><b>holdsoff:</b> Number of times user removed calls from hold. </li> <li><b>parkson:</b> Number of times user placed the calls on park location. </li> <li><b>parksoff:</b> Number of times user retrieved calls from park location. </li> <li><b>blindTransfer:</b> Type of call transfer where a call is transferred to another agent without any prior information. </li> <li><b>warmTransfer:</b> Type of transfer where a call is transferred to another agent with prior information about the transfer. </li> <li><b>dtmfTransfer:</b> Type of transfer where a call is transferred vis dtmf sequence. </li></ul> Counter will return aggregration of calls for these actions. Not applicable for Timer. |
| CallsByResult | callsDurationByResult | <p> End result of the calls. Describes how the calls that came to specified Groupby ended. </p> <ul><li><b>Completed:</b> Call ended normally after a live talk with the user. It is possible calls may not have ended at this level and got transferred or forwarded out or abandoned during hold in which case even after a calls were answered not all were completed. </li> <li><b>Abandoned:</b> Caller hung up before the user could answer or during hold. </li> <li><b>Voicemail:</b> Call reached the voicemail of the user or group. </li> <br/><p>For Not Answered:</p>  <li><b>Missed:</b> Calls that  rang to max time/rings as per the setup and was not answered by the user. </li> <li><b>Accepted:</b> Calls that were responded by a system such as automated response or VM and disconnected. </li> <li><b>Unknown:</b> for outbound pstn calls, result is unknown for calls connected/Not connected. </li></ul> Counter will return aggregration of total calls for these Results. Timer will return call duration aggregation for the same calls. |
| callsSegments | callsSegmentsDuration | <p> Aggregates the times spent by the caller in different stages of the call. These are the calls that came to the dimensions specified by GroupBy. </p> <ul><li><b>setup:</b> It is when the phone system is connecting to callee's device. This is when caller is calling  via RC App and system says "Please wait while I try to connect you"  before the beeps starts. </li> <li><b>ringing:</b> Duration for which calls spent ringing to the Extn/No & can be found under Timer. When selected under counter, it  returns, the number of calls that had a ringing phase. </li> <li><b>ivrPrompts:</b> Duration for which calls spent in IVR Prompt before reaching the Extn/No. When selected as “Calls” returns, the number of calls that had  IVR Prompt phase. </li> <li><b>livetalk:</b> Duration for which callers were having a live talk with Extn/No & can be found under Timer. When selected under counter, it returns  number of calls that had a Live Talk phase. </li> <li><b>holds:</b> Duration for which callers were put on hold by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that had a Hold phase. </li> <li><b>parks:</b> Duration for which callers spent in a parked state after being parked by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that were parked by Extn/No. </li> <li><b>transfers:</b> Duration for which caller was being transferred by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that were transferred by Extn/No. </li> <li><b>vmGreeting:</b> Duration for which callers spent listening to VM greeting & can be found under Timer. When selected under counter, it returns, number of calls that had VM greeting phase. </li> <li><b>voicemail:</b> Duration for which callers spent in Voicemail & can be found under Timer. When selected under counter, it  returns  number of calls that had Voicemail Phase. </li></ul> |
| callsByCompanyHours | callsDurationByCompanyHours. | <p> Aggregates data by company "Business Hours" or "After Hours" as setup on admin portal. </p> Counter will return aggregration of calls for Business Hours & After Hours. Timer will return call duration aggregation for same. |
| callsByQueueSla | callsDurationByQueueSla | <p> Provides count of calls and their duration details for calls answered within SLA for Queues grouping only. Not applicable for rest of the grouping available. </p> <ul><li><b>inSla:</b> Calls answered withing SLA. </li> <li><b>outOfSla:</b> Calls answered outside of SLA. </li></ul> Counter will return aggregration of calls for these metrics. Timer will return call duration aggregation for same. |
|
