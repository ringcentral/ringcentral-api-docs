no_breadcrumb:true

# Data Guide

## Overview

This document serves as a data guide that explains the analytics data you can access using the 'Call Performance API' or via the 'Ad-Hoc Report' dashboard.

Essentially, there are two new metrics to assess for users, queues, groups, IVRs and sites:

1. Calls  - aggregation of calls
2. Time Spent - aggregation of call durations

These metrics can then be further broken down for more detailed analysis such as by:

- Origin (internal or external calls)
- Direction (Inbound or outbound calls)
- Answered and Not Answered calls 
- Types of calls answered & reasons for not answering 
- Time  spent by the caller in  phases of the call such as ringing, IVR prompt, live talk, hold etc.
- The times agents put the caller on hold, park, transferred during the call
- How the call ended, did it end after live talk at specified extn or got transferred, or sent to VM etc.
- Company Hours
- Various date and time ranges

## Rows/PerformanceCallsGrouping

These are the dimensions to which the scope of the call data to be aggregated will be limited to. This data can be found in either our Ad-hoc reporting UI - Table Builder where it is referred to as "Rows". When accessing via the API, it is referred to as "GroupBy" property within PerformanceCallsGrouping. 

| Rows (UI) | GroupBy (API)	| Description |
|---|---|---|
| Users | Users, DepartmentMembers, UserGroupMembers, QueueAgents, SiteMembers | Call data for  individual mailboxes.<br /><br />Also possible to group them as users of a group type such as users that are part of a queue, user group etc. In UI, by using Row Filters on “Users” & in API by using one of the X_Members groupby | 
| Groups |  UserGroups | Call data for User Groups setup on Admin Portal. To filter for specific users of User Group, select Users & filter by User Groups filter in UI.<br /><br />Use UserGroupMembers and specify Extn Ids of users you want the data for. |
| Departments | Departments | Call data for users labeled with the same Department on Admin Portal.<br /><br />To filter for specific users of Departments, select Users & filter by Departments filter in UI.<br /><br />Use DepartmentMembers and specify Extn Ids of users you want the data for. | 
| Queues | Queues | Call data for Queue Extns.<br /><br />To filter for specific agents of Queues, select Users & filter by Queues  filter in UI.<br /><br />Use QueueAgents and specify Extn Ids of users you want the data for. |
| IVRs | IVRs | Call data for IVR extensions |
| Sites | Sites | Call data for Site Extns when an account is using the multi-site feature.<br /><br />To filter for specific users of Sites, select Users & filter by Sites filter in UI.<br /><br />Use SiteMembers and specify Extn Ids of users you want the data for. |
| Company Numbers | CompanyNumbers | Direct numbers set up under Phone Systems - > Phone Numbers on Admin Portal. |
| All | No GroupBy specified | Call data for the entire eaccount, i.e, all extensions and direct numbers within the account aggregated together. |
||||


- All the data retrieved will represent the portion of the calls that involved the specified Rows/GroupBy type.
- At least one row type is required to start building the report in UI, in API when no GroupBy is specified data defaults to entire account level.
- Row/GroupBy types cannot be mixed in one request, there can only be one type.

## Columns/PerformanceCallsResponseDataOptions

Columns are the measures/metrics by which managers can measure the call activities of the selected dimension. 

There are two main components to the call data:

1. Metric Types. There are two main metric types defined to measure call activities:

    - Calls/PerformanceCallsCountersResponseOptions: Provides aggregation of calls and actions taken by agents (hold, transfer etc.) during the call.
    - Time Spent/PerformanceCallsTimersResponseOptions: Provides aggregation of duration of calls or phases of calls that were handled by selected dimension.

2. Aggregation Function. The aggregation function allows users to specify how the chosen metric should be aggregated. Available options are:

    - Sum
    - Avg
    - Min
    - Max

!Note: In this phase, only Sum is available for individual extensions. All group extensions such as Queues, User Groups, Sites, Departments can leverage Avg, Min, Max along with Sum.

For further comprehensive analysis, all the metrics can be further broken down and/or used to filter the data:

| Columns (UI) | CounterResponseOptions(API) | TimerResponseOptions (API) | Description | Available as a Data Filter? |
|---|---|---|---|---|
| Total Calls | allCalls | totalCallLength | The combined total of all the calls involving the specified dimension | No |
| Origin |  callsByOrigin | callLengthByOrigin | Breaks down of calls that happened within or outside of the account. <br /><br />Internal:  Calls that originated inside the account. <br /><br />External: Calls that originated outside the account. | Yes |
| Direction | callsByDirection | callLengthByDirection | Aggregates all the calls based on the direction of the call with reference to the specified row type. Calls made are represented as "Outbound" and calls received as "Inbound | Yes |
| Call Response | callsByResponse | callLengthByResponse | Breakdown of the response to the calls by the selected dimension. Gives a higher level aggregation of how many were:<br />- Answered<br />- Not Answered<br /><br />Further information about response can be found in Response Type. | Yes |
| Response Type | callsByResponseType | callLengthByResponseType | Aggregation based on the nature of answered calls and the reason for not answered calls. Provides further details to understand Answered & Not Answered Calls.<br /><br />For Answered:<br /><br /> - Inbound Direct: Direct calls answered by the user.<br /><br /> - Queue Calls: Queue calls answered by the user.<br /><br /> - Park Retrievals: Calls answered by the user after retrieving a parked call.<br /><br /> - Transferred Calls: Transferred calls that were answered by the user.<br /><br />For Not Answered:<br /><br /> - Missed: Calls that  rang to max time/rings as per the setup and was not answered by the user<br /><br  /> - Accepted: Calls that were responded by a system such as automated response or VM and disconnected. | Yes |
| Actions | CallsByActions | NA | Aggregation of actions taken by the user on all the calls they handled.<br /><br />Hold On: Number of times user placed the calls on hold<br /><br />Hold Off: Number of times user removed calls from hold<br /><br />Parks On: Number of times user placed the calls on park location<br /><br />Parks Off: Number of times user retrieved calls from park location<br /><br />Transfers: Number of times user transferred the calls out<br /><br />| Not in Phase I, Coming in Phase II |
| Result | CallsByResult | CallLengthByResult | End result of the calls. Describes how the calls that came to specified extn/No in the row/Groupby ended.<br /><br />Completed: Call ended normally after a live talk with the user. It is possible calls may not have ended at this level and got transferred or forwarded out or abandoned during hold in which case even after a calls were answered not all were completed.<br /><br />Abandoned: Caller hung up before the user could answer or during hold.<br /><br />VoiceMail: Call reached the voicemail of the user or group.<br /><br />Connected: Only applicable to outbound calls and aggregates all the calls that got connected to the called number.| Yes |
| Call Segment | Phase II | CallLengthByCallSegments | Aggregates the times spent by the caller in different stages of the call. These are the calls that came to the dimensions specified by row/GroupBy.<br /><br />Ringing: Duration for which calls spent ringing to the Extn/No. When selected as “Calls”, it returns the number of calls that had a ringing phase.<br /><br />IVR Prompt: Duration for which calls spent in IVR Prompt  before reaching  the Extn/No. When selected as “Calls”, it returns the number of calls that had  IVR Prompt phase.<br /><br />Live Talk: Duration for which callers were having a live talk with Extn/No. When selected as “Calls”, it returns the number of calls that had a Live Talk phase.<br /><br />Hold: Duration for which callers were put on hold by Extn/No. When selected as “Calls”, it returns the number of calls that had a Hold phase.<br /><br />Park: Duration for which callers spent in a parked state after being parked by Extn/No. When selected as “Calls”, it returns the number of calls that were parked by Extn/No.<br /><br />Transfers: Duration for which caller was being transferred by Extn/No. When selected as “Calls”, it returns the number of calls that were transferred by Extn/No.<br /><br />VM Greeting: Duration for which callers spent listening to VM greeting. When selected as “Calls”, it returns the number of calls that had VM greeting phase.<br /><br />VoiceMail: Duration for which callers spent in VoiceMail. When selected as “Calls”, it returns the number of calls that had VoiceMail Phase. | Not in Phase I coming in Phase II |
| Company Hours | PerformanceCallsFilters -> CompanyHours | PerformanceCallsFilters -> CompanyHours | Aggregates data by company "Business Hours" or "After Hours" as setup in the admin portal | Yes |
||||||

#### Filters:

Third component of the New PR is filtering ability that allows data to be narrowed down further.

In UI there are three main types of filtering available:

- Row Filters: Allows you to filter the selected row type to specific Extns/No within that category
- Data Filters: Allows data in the table to be filtered further down by specific conditions. Available data filters are specified in the Columns table.
- Date-Time Filters: Can be used to specify a date-time range for the data to be retrieved. This can be done by using calendars at dashboard, Table builder and KPI builder level. By default the date-time range is selected to “Yesterday”, 24 hours.

In API, there are three main types of filtering available:

- PerformanceCallsTimeRange: Can be used to specify date-time range as “timeFrom” & “timeTo”.
- PerformanceCallsFilters: Can be used to filter the data further down by specific conditions, available filters are specified in the Columns table.
- PerformancecallsGrouping: Along with specifying GroupBy, further filtering of dimension must be done using “ids” within this object.







