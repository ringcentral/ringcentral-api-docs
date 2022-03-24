no_breadcrumb:true

# Introduction to the RingCentral Line of Business Analytics APIs

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Getting Started with Analytics APIs</h3>
  <p class="lead">The RingCentral Line of Business (LOB) Analytics APIs gives developers access to the data and metrics necessary to help their organizations obtain a deeper understanding of how their team uses RingCentral's voice and telephony service.</p>
  <p>We invite all developers to try out our Analytics API by writing a simple app to access key call performance metrics in almost no time at all. Get started using a Quick Start : in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">JavaScript &raquo;</a>
  <a href="quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>
  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="https://god.postman.co/run-collection/ec998118d5bd3d56e4b6?action=collection%2Fimport#?env%5BRC%20Sharable%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5kZXZ0ZXN0LnJpbmdjZW50cmFsLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoicGxhdGZvcm0uZGV2dGVzdC5yaW5nY2VudHJhbC5jb20iLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiUkNfQVBQX0tFWSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjJ9LHsia2V5IjoiUkNfVVNFUk5BTUUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX0VYVEVOU0lPTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjR9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjZ9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fV0=" class="btn btn-light qs-link">Run in Postman &raquo;</a>
</div>

Line of Business (LOB) Analytics is a historical call performance analytics offering for RingCentral MVP customers, to help functional managers increase their understanding of their team’s performance across call queues, user groups, and individuals. There are currently two operations that comprise the Analytics APIs to help assess:

* Team’s performance
* Call handling patterns
* Call volume distribution by multiple time intervals


!!! hint "Analytics API is in beta - please request access"
    To call the Analytics API your application needs to have 'Analytics' permission. If you are using an application that doesn't have that permission, you can reach out to our support team with your application's Client ID and [request that the 'Analytics' permission be added](https://developers.ringcentral.com/support/create-case).


## What can the Analytics API be used for?

### Team and individual performance assessment

Managers who have teams setup on call queues, user groups or in departments to handle customer queries need to closely monitor the performance of their teams as well as members of the teams to identify areas of improvement.

### Operational performance optimization

Managers who are responsible for the customer experience need to ensure customers are being sent in the right direction and are served in a timely manner.

### Communication effectiveness vs business outcome analysis

Managers can also look at the above-mentioned metrics in conjunction with other business lifecycle data to assess the effectiveness of each of the team members in driving the business outcomes.

## What reports can the Analytics API help generate?

The Analytics APIs current supports creating two types of reports:

1. The [Call Performance Aggregate API](./aggregate/) allows users to get the aggregation of calls count (counter) and time spent (timer) on calls for specified data scopes.

2. The [Call Performance Timeline API](./timeline/) allow users to get the view of the count of calls (counter) or time spent on calls (timer) broken down by time frames for specified data scopes. Supported timeframes are  Hour, Day, Week, and Month 

Theese APIs can be used to analyze various call related metrics as stated below:

- Origin (internal or external calls)
- Direction (Inbound or outbound calls)
- Answered and not answered calls 
- Types of calls answered and reasons for not answering 
- Time  spent by the caller in phases of the call such as ringing, IVR prompt, live talk, hold etc.
- The times agents put the caller on hold, park, transferred during the call
- How the call ended, did it end after live talk at specified extension or got transferred, or sent to voicemail etc.
- Company Hours
- Various date and time ranges

### How is LOB Analytics API different than Call Log API ? 

The Call Log API is suitable for hop-by-hop call analysis on individual call basis. The Analtics API is suitable for aggregate call analysis. The Analytics API also provides an easy way to filter out data by conditional logic such as filter calls on time spent in ringing, holds etc.
