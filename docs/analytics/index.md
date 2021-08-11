no_breadcrumb:true

# Introduction to the RingCentral Call Performance API (Beta)

Welcome to the RingCentral Platform - Call Performance API. Currently the API is in 'beta' release and you are one of the selected few invited to join the platform, try out the APIs and we look forward to your feedback. Please note that in future releases there will be changes to the APIs and this documenation, thus we highly recommend referring to this website time and again, specially the [release notes.](announcements/)

## Call Performance Report (PR) Overview & Use Cases

Performance Reports is a historical call performance analytics offering for RingCentral Office customers to help managers gain a comprehensive understanding of their team’s performance whether they are set up on call queues, user groups or as individual users.

The new performance reports offers a granular data set about call activities that can be accessed via an ad-hoc reporting tool on Analytics Portal or via a public API.

With new PR, there are two new metrics to assess for users, queues, groups, IVRs and sites.

1. Calls : aggregation of calls
2. Time Spent : aggregation of call durations

These metrics can then be further broken down for more detailed analysis. Available data are calls or time spent by:

- Origin (internal or external calls)
- Direction (Inbound or outbound calls)
- Answered and Not Answered calls 
- Types of calls answered & reasons for not answering 
- Time  spent by the caller in  phases of the call such as ringing, IVR prompt, live talk, hold etc.
- The times agents put the caller on hold, park, transferred during the call
- How the call ended, did it end after live talk at specified extn or got transferred, or sent to VM etc.
- Company Hours
- Various date and time ranges

<iframe src="https://player.vimeo.com/video/563903824?color=ff8800&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/564291528?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen><title="Intro_Video"></iframe>

## Frequently Asked Questions

### How do I get started ?

Pre-Requisite: This API is only available in RingCentral's 'production enviornment' therefore you need production credentials in order to use this API. To obtain the same, please reach out to us with Application's Client ID and request your application to be graduated to production.

There are three ways to get started:

1. Follow the step by step ["Quick Start Guide"](quick-start/) in order to build a command line application (application) or test the API using Postman

2. Read the ["API Reference"](swagger-api-ref.html) to understand the various APIs definition, HTTP Rquest and Response objects.

3. Dive into the ["Sample Application"](sample-app/) and use that as a starter for your application.

### What can you build with RingCentral Call Performance API ?

You can build "Performance or Analytics Reports or Dashboards" for all your call related metrics. For more information about the data and metrics, please refer to this [PDF guide.](https://drive.google.com/file/d/1cv07YoBcQm9eboRsihxzpxn0eGPuQ4nW/view)

### Is there an SDK for my favorite programming language ?

Yes, we have various SDK's for the RingCentral platform that you can refer to [here](https://developers.ringcentral.com/guide/sdks). However for this particular API, you need to directly call the API endpoint. 

### What persmission does my application need to have ?

Currently, the Call Performance API doesn't require any particular permission from your application so it should work as long as you have the  credentials for production enviornment.