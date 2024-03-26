no_breadcrumb:true

# Introduction to the RingCentral Business Analytics APIs

<div class="jumbotron pt-1" markdown>
  <h3 class="h3 display-5">Getting Started with Analytics APIs</h3>
  <p class="lead">The RingCentral Business Analytics APIs gives developers access to the data and metrics necessary to help their organizations obtain a deeper understanding of how their team uses RingCentral's voice and telephony service.</p>
  <p>We invite all developers to try out our Analytics API by writing a simple app to access key call performance metrics in almost no time at all. Get started using a quick start guide in any of the following languages:</p>
  [Javascript &raquo;](quick-start.md#Javascript){class="btn btn-light qs-link"}
  [PHP &raquo;](quick-start.md#PHP){class="btn btn-light qs-link"}
  [Python &raquo;](quick-start.md#Python){class="btn btn-light qs-link"}
  [Ruby &raquo;](quick-start.md#Ruby){class="btn btn-light qs-link"}
  [Java &raquo;](quick-start.md#Java){class="btn btn-light qs-link"}
  [C# &raquo;](quick-start.md#C#){class="btn btn-light qs-link"}
  [Run in Postman &raquo;](https://god.postman.co/run-collection/ec998118d5bd3d56e4b6?action=collection%2Fimport#?env%5BRC%20Sharable%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5kZXZ0ZXN0LnJpbmdjZW50cmFsLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoicGxhdGZvcm0uZGV2dGVzdC5yaW5nY2VudHJhbC5jb20iLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiUkNfQVBQX0tFWSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjJ9LHsia2V5IjoiUkNfVVNFUk5BTUUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX0VYVEVOU0lPTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjR9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjZ9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fV0=){class="btn btn-light qs-link"}
</div>

Business Analytics is a historical call performance analytics offering for RingEX customers, to help functional managers increase their understanding of their team’s performance across call queues, user groups, and individuals. There are currently two operations that comprise the Analytics APIs to help assess:

* Team’s performance
* Call handling patterns
* Call volume distribution by multiple time intervals


## What can the Analytics API be used for?

### Team and individual performance assessment

Managers who have teams set up on call queues, user groups or departments to handle customer queries need to closely monitor the performance of their teams as well as members of the teams to identify areas of improvement.

### Operational performance optimization

Managers who are responsible for the customer experience need to ensure customers are being sent in the right direction and are served on time.

### Communication effectiveness vs business outcome analysis

Managers can also look at the above-mentioned metrics in conjunction with other business lifecycle data to assess the effectiveness of each of the team members in driving the business outcomes.

## What reports can the Analytics API help generate?

The Analytics APIs current supports creating two types of reports:

1. The [Call Business Analytics Aggregate API](aggregate.md) allows users to get the aggregation of calls count (counter) and time spent (timer) on calls for specified data scopes.

2. The [Call Business Analytics Timeline API](timeline.md) allows users to get the view of the count of calls (counter) or time spent on calls (timer) broken down by time frames for specified data scopes. Supported timeframes are  Hour, Day, Week, and Month

These APIs can be used to analyze various call-related metrics as stated below:

- Origin (internal or external calls)
- Direction (Inbound or outbound calls)
- Answered and not answered calls
- Types of calls answered and reasons for not answering
- Time spent by the caller in phases of the call such as Setup, Ringing, IVR prompt, Live Talk, Hold etc.
- The time duration agents put the caller on hold, park, transferred during the call
- How the call end, did it end after 'livetalk' at a specified extension or got transferred, or sent to voicemail etc.
- Company Hours
- The APIs provide data from the current date and time to the past 184 days for which you can set custom date and time ranges


### How is Business Analytics API different than Call Log API?

!!! info "Please beware of the known discrepancies between Call Log and Analytics APIs"

The Call Log APIs are suitable for getting metadata of individual calls. The Analytics APIs are suitable for aggregate call analysis. Call log and analytics APIs are two different systems using different data sources (call log uses an older source), 100% match is unlikely, however we continue to work towards minimizing the gap of Analytics APIs.
