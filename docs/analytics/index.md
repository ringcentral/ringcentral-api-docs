no_breadcrumb:true

# Introduction to the RingCentral Line of Business Analytics APIs

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Getting Started with Analytics APIs</h3>
  <p class="lead">The RingCentral Line of Business (LOB) Analytics APIs gives developers access to the data and metrics necessary to help their organizations obtain a deeper understanding of how their team uses RingCentral's voice and telephony service.</p>
  <p>We invite all developers to try out our Analytics API by writing a simple app to access key call performance metrics in almost no time at all. Get started using a Quick Start : in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">JavaScript &raquo;</a>
  <a href="quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>
  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
</div>

## Overview

Line Of Business (LOB) Analytics is a historical call performance analytics offering for RingCentral Office customers, to help functional managers gain a comprehensive understanding of their team’s performance whether they are set up on call queues, user groups, or as individual users.

There are two APIs that provides insight into :

- Performance data around call handling
- Call handling patterns
- Call volume distribution


#### [API Reference](https://developers.ringcentral.com/api-reference/analytics)
#### [API Data Guide](api-guide)

## Use Cases

### Team & individual Performance assessment
Managers who have teams setup on call queues, user groups or in departments to handle customer queries need to closely monitor the performance of their teams as well as members of the teams to identify areas of improvement.

### Operational decision making such as staffing and training
Managers who are responsible for the customer experience, need to ensure customers are being sent in the right direction and are served in a timely manner.  

### Analyze communication effectiveness vs business outcomes
Managers can also look at the above-mentioned metrics in conjunction with other business lifecycle data to assess the effectiveness of each of the team members in driving the business outcomes.

## Public APIs (Beta) :

BASE URI : 

  - Production: `https://platform.ringcentral.com` 
  - Sandbox: `https://platform.devtest.ringcentral.com`

HTTP METHOD : `POST`

API ENDPOINTS :

1. Call Performance Aggregate API `/analytics/phone/performance/v1/accounts/{accountId}/calls/aggregate/` : It provides an aggregation of the number of calls a user was on.

2. Timeline API `/analytics/phone/performance/v1/accounts/{accountId}/calls/timeline/interval={interval}` : It provides an aggregation of time spent (duration) on call related metrics.

These metrics can then be further broken down to get detailed reports by:

- Origin (internal or external calls)
- Direction (Inbound or outbound calls)
- Answered and Not Answered calls 
- Types of calls answered & reasons for not answering 
- Time  spent by the caller in  phases of the call such as ringing, IVR prompt, live talk, hold etc.
- The times agents put the caller on hold, park, transferred during the call
- How the call ended, did it end after live talk at specified extn or got transferred, or sent to VM etc.
- Company Hours
- Various date and time ranges

## Get Started

You can get started by any of the following ways:

1. [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/ec998118d5bd3d56e4b6?action=collection%2Fimport#?env%5BRC%20Sharable%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5kZXZ0ZXN0LnJpbmdjZW50cmFsLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoicGxhdGZvcm0uZGV2dGVzdC5yaW5nY2VudHJhbC5jb20iLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiUkNfQVBQX0tFWSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjJ9LHsia2V5IjoiUkNfVVNFUk5BTUUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX0VYVEVOU0lPTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjR9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjZ9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fV0=)


3. Follow the step-by-step [Quick Start](./quick-start/) in order to build a command-line application in JavaScript/Java/C#.

4. Play with one of our sample applications on GitHub for [Node.JS - JavaScript](https://github.com/ringcentral/call-performance-analytics-demo-node), [C#](https://github.com/ringcentral/call-performance-analytics-demo-csharp) and [Java](https://github.com/ringcentral/call-performance-analytics-demo-java). You can also use these as a springboard to develop/modify based on your needs.



