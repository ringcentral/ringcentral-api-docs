# Obtaining Timeline Call Business Analytics Data

It is quite common to acquire and segment call data based on time related metrics for reporting and analysis. Call Timeline API provides data over multiple time intervals such as 'Hourly', 'Daily', 'Weekly' or 'Monthly'. This kind of information can provide key insights to the line of business managers, for instance, detect when peak call times are and if and when they should adjust their call staff shifts to manage those peak times.

Example Use Cases:

- Get average 'Call Handle Time' for all calls daily.
- Calculate the 'Average Time to Answer' for all calls hourly.

For more information, please refer to the [overview section](index.md).

## Composing a request using RingCentral API Reference

One can use our [interactive API Reference](https://developers.ringcentral.com/api-reference/Business-Analytics/performanceReportCallsTimeline) to not only create an API Request but also run it interactively and see the response.

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

In the below example, under `advancedTimeSettings`, the `includeDays` will allow users to add weekdays of choice, and `includeHours` will allow users to filter data for custom hours (format hh:mm) for specified date-time range under `timeRange` section. Further, they can add grouping as necessary to make sure that the data received is aggregated by counter & timer.

**Example**

```json
"timeSettings": {
  "timeZone": "America/Los_Angeles",
  "timeRange": {
    "timeFrom": "2023-01-01T00:00:00.877Z",
    "timeTo": "2023-01-31T04:01:33.877Z"
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

The `responseOptions` element allows users to specify call aggregation breakdown and its data aggregation types for API responses.

The `counters` element provides aggregation on Call volume by specified metrics for set Time Interval split. The metrics can be provided in the counter section under the `responseOptions`.

The `timers` element provides aggregation for time spent on the call.  The metrics can be provided in the timer section under `responseOptions` which will provide duration details by specified metrics for set Time Interval splits.

**Example**

```json
"responseOptions": {
  "counters": {
    "allCalls": true,
    "queueOpportunities": true,
    "callsByDirection": true,
    "callsByOrigin": true,
    "callsByResponse": true,
    "callsSegments": true,
    "callsByResult": true,
    "callsByCompanyHours": true,
    "callsByActions": true,
    "callsByType": true
  },
  "timers": {
    "allCallsDuration": true,
    "callsDurationByDirection": true,
    "callsDurationByOrigin": true,
    "callsDurationByResponse": true,
    "callsSegmentsDuration": true,
    "callsDurationByResult": true,
    "callsDurationByCompanyHours": true,
    "callsDurationByType": true
  }
}
```

### Filtering your dataset further

The `callFilters` element allows users to filter out the data and specify the granular scope to call breakdown metrics for both `counter` and `timer` section. Detailed splits of these sections can be found in Data Dictionary below.

|Filters list| type | Purpose|
|---|---|---|
| `directions` | array[string] | Specifies whether the call was inbound or outbound relative to the scope specified in the grouping object. Not applicable to internal calls with company scope (when grouping is not specified).|
| `origins` | array[string] | Specifies whether an external party was present in the initial segment of the call. |
| `callResponses` | array[string] | Aggregation of calls by the first response action. |
| `callResults` | array[string] | Aggregation of calls by the nature of call result. |
| `callSegments` | array[object] | Aggregation of calls by the presence of specific segment. |
| `callActions` | array[object] | Aggregation of calls by the presence of specific action. |
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
      {
        "callAction": "HoldOff"
      }
    ],
    "companyHours": "BusinessHours",
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

Analytics can produce a lot of results so you may want to paginate your results to enable easier processing. Pagination is done with two additional query parameters: `page` and `perPage`. For timeline reports, you can also specify the `interval` as a query parameter.

| Pagination (API) | Description |
|-|-|
| `page` | The page you wish to start with. For example, start on page 2. |
| `perPage` | The number of results return on each page. For example, you want 10 results on the first page and an additional 10 on the second page. Note: timeline reports have a max limit of `20` per page. |

**Example**

``` http
POST /analytics/calls/v1/accounts/~/timeline/fetch?interval=Week&page=2&perPage=10
Host: platform.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_VALID_ACCESS_TOKEN
```

## Data dictionary

|CounterResponseOptions (API)| TimerResponseOptions (API)| Description |
|---|---|---|
| allCalls | allCallsDuration | The combined total of all the calls involving the specified groupby dimension. Counter will return  of total calls by time intervals. Timer will return call duration aggregation for total calls by time intervals. |
| queueOpportunites | Not Applicable | <p>The total number of times calls are presented to an extension. </p><p> QOpportunities is applicable for users grouping only.</p> |
| callsByOrigin | callsDurationByOrigin | <p>Breaks down of calls that happened within or outside of the account. </p><ul><li><b>Internal:</b> Calls that originated inside the account. </li> <li><b>External:</b> Calls that originated outside the account. </li></ul> Counter will return aggregation of calls for these breakdown by time intervals. Timer will return call duration aggregation for the same by time intervals. |
| callsByDirection | callsDurationByDirection | <p>Aggregates all the calls based on the direction of the call with reference to the specified row type. </p> <ul><li><b>Outbound:</b> Calls made from extension are represented as "Outbound". </li> <li><b>Inbound:</b> Calls received on extension are "Inbound". </li></ul> Counter will return aggregation of calls for these breakdown by time intervals. Timer will return call duration aggregation for same by time intervals. |
| callsByResponse | callsDurationByResponse | <p> Breakdown of the response to the calls by the selected dimension. Gives a higher level aggregation of how many were: </p> <ul><li><b>answered:</b> Calls picked & answered by the user. </li> <li><b>notanswered:</b> Calls not answered by the user. </li> <li><b>connected:</b> Only applicable to outbound calls and aggregates all the calls that got connected to the called number. </li> <li><b>notConnected:</b> Only applicable to outbound calls and aggregates all the calls that did not get connected to the called number. </li></ul> Counter will return aggregation of calls for these breakdowns by time intervals. Timer will return call duration aggregation for the same by time intervals. |
| callsByType | callsDurationByType | <p> Aggregation is based on the types of calls that are handled by users. </p> <ul><li><b>direct:</b> Direct calls answered by the user. </li> <li><b>fromQueue:</b> Queue calls that are answered by the user.<li><b>parkRetrieval:</b> Calls answered by the user after retrieving a parked call. </li> <li><b>transferred:</b> Transferred calls that were answered by the user. </li> <li><b>outbound:</b> Calls made from the extension numbers. </li><li><b>overflow:</b> Total calls overflowed from an extension. </li></ul> Counter will return aggregation of calls for these breakdown by time intervals. Timer will return call duration aggregation for same by time intervals. |
| CallsByActions | Not Applicable | <p> Aggregation of actions taken by the user on all the calls they handled. </p> holdson: Number of times the user placed the calls on hold.<ul><li><b>holdsoff:</b> Number of times the user removed calls from hold. </li> <li><b>parkson:</b> Number of times the user placed the calls on park location. </li> <li><b>parksoff:</b> Number of times the user retrieved calls from park location blindTransfer: Type of call transfer where a call is transferred to another agent without any prior information. </li> <li><b>warmTransfer:</b> Type of transfer where a call is transferred to another agent with prior information about the transfer. </li> <li><b>dtmfTransfer: Type of transfer where a call is transferred vis dtmf sequence. </li></ul> Counter will return aggregation of calls for these actions by time intervals. Not applicable for Timer. |
| CallsByResult | callsDurationByResult | <p> End result of the calls. Describes how the calls that came to specified Groupby ended. </p> <p> For Answered: </p> <ul><li><b>Completed:</b> Call ended normally after a live talk with the user. It is possible calls may not have ended at this level and got transferred or forwarded out or abandoned during the hold in which case even after calls were answered not all were completed. </li> <li><b>Abandoned:</b> The caller hung up before the user could answer or during the hold.</li> <li><b>Voicemail: Call reached the voicemail of the user or group. </li></ul><p> <p>For Not Answered:</p>  <ul><li><b>Missed:</b> Calls that  rang to max time/rings as per the setup and were not answered by the user </li> <li><b>Accepted:</b> Calls that were responded by a system such as automated response or VM and disconnected </li> <li><b>Unknown:</b> for outbound pstn calls, the result is unknown for calls connected/Not connected </li></ul> Counter will return aggregation of total calls for these Results by time intervals. Timer will return call duration aggregation for the same calls by time intervals. |
| callsSegments | callsSegmentsDuration | <p> Aggregates the times spent by the caller in different stages of the call. These are the calls that came to the dimensions specified by GroupBy. The data received will be by time intervals split pre-applied (hour, day, week, month). </p> <ul><li><b>setup:</b> It is when the phone system is connecting to callee's device. This is when the caller is calling  via RC App and the system says "Please wait while I try to connect you" before the beeps start. </li> <li><b>ringing:</b> Duration for which calls spent ringing to the Extn/No & can be found under Timer. When selected under counter, it returns, the number of calls that had a ringing phase. </li> <li><b>ivrPrompts:</b> Duration for which calls are spent in IVR Prompt before reaching the Extn/No. When selected as “Calls” returns, the number of calls that had IVR Prompt phase. </li> <li><b>livetalk:</b> Duration for which callers were having a live talk with Extn/No & can be found under Timer. When selected under counter, it returns the number of calls that had a Live Talk phase. </li> <li><b>holds:</b> Duration for which callers were put on hold by Extn/No & can be found under Timer. When selected under counter, it returns, number of calls that had a Hold phase. </li> <li><b>parks:</b> Duration for which callers spent in a parked state after being parked by Extn/No & can be found under Timer. When selected under counter, it returns the number of calls that were parked by Extn/No. </li> <li><b>transfers:</b> Duration for which caller was being transferred by Extn/No & can be found under Timer. When selected under counter, it returns the number of calls that were transferred by Extn/No. </li> <li><b>vmGreeting:</b> Duration for which callers spent listening to VM greeting & can be found under Timer. When selected under counter, it returns the number of calls that had VM greeting phase. </li> <li><b>voicemail:</b> Duration for which callers spent in Voicemail & can be found under Timer. When selected under counter, it returns number of calls that had Voicemail Phase. </li></ul> |
| callsByCompanyHours | callsDurationByCompanyHours | <p> Aggregates data by company "Business Hours" or "After Hours" as setup on the admin portal. </p> Counter will return aggregation of calls for Business Hours & After Hours by time intervals. Timer will return call duration aggregation for the same by time intervals. |
| callsByQueueSla | callsDurationByQueueSla | <p> Provides the count of calls and their duration details for calls answered within SLA for Queues grouping only. Not applicable for the rest of the groupby available. </p><ul><li><b>inSla:</b> Calls answered within SLA. </li> <li><b>outOfSla:</b> Calls answered outside of SLA. </li></ul> Counter will return aggregation of calls for these metrics by time intervals. Timer will return call duration aggregation for the same by time intervals. |
|

## Full sample request for Analytics Timeline Report

```json
{!> code-samples/analytics/aggregate-request-body.json !}
```

The following code samples show how to read analytics timeline data.

### Call the Analytics Timeline API - Grouped by users

!!! note "Running the code"
    * If you have tried the [SMS quick start](../messaging/quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `read_analytics_timeline_grouped_by_users()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "Javascript"

    ```javascript
    {!> code-samples/analytics/code-snippets-headers/header.js !}
    {!> code-samples/analytics/code-snippets/timeline-by-users.js [ln:10-82] !}
    ```

=== "Python"

    ```python
    {!> code-samples/analytics/code-snippets/timeline-by-users.py !}
    {!> code-samples/analytics/code-snippets-headers/footer.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/analytics/code-snippets-headers/header.php [ln:1-9]!}
    {!> code-samples/analytics/code-snippets/timeline-by-users.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/analytics/code-snippets/timeline-by-users.rb !}
    {!> code-samples/analytics/code-snippets-headers/footer.rb !}
    ```

=== "C#"

    ```C#
    {!> code-samples/analytics/code-snippets/timeline-by-users.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/analytics/code-snippets/timeline-by-users.java !}
    ```

### Call the Analytics Timeline API - Grouped by call queues

!!! note "Running the code"
    * If you have tried the [SMS quick start](../messaging/quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `read_analytics_timeline_grouped_by_queues()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"


=== "Javascript"

    ```javascript
    {!> code-samples/analytics/code-snippets-headers/header.js !}
    {!> code-samples/analytics/code-snippets/timeline-by-queues.js [ln:10-81] !}
    ```

=== "Python"

    ```python
    {!> code-samples/analytics/code-snippets/timeline-by-queues.py !}
    {!> code-samples/analytics/code-snippets-headers/footer.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/analytics/code-snippets-headers/header.php [ln:1-9]!}
    {!> code-samples/analytics/code-snippets/timeline-by-queues.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/analytics/code-snippets/timeline-by-queues.rb !}
    {!> code-samples/analytics/code-snippets-headers/footer.py !}
    ```

=== "C#"

    ```C#
    {!> code-samples/analytics/code-snippets/timeline-by-queues.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/analytics/code-snippets/timeline-by-queues.java !}
    ```
