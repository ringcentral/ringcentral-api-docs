no_breadcrumb:true

# Introduction to the RingCentral Analytics API

!!! warning "The RingCentral MVP Analytics API is currently in beta."

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Getting Started with Analytics</h3>
  <p class="lead">The RingCentral Analytics API gives developers access to the data and metrics necessary to help their organizations obtain a deeper understanding of how their team uses RingCentral's voice and telephony service.</p>
  <p>We invite all developers to try out our Analytics API by writing a simple app to access key call performance metrics in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
<!--  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>-->
</div>

## Requesting access to the beta

The Analytics API is currently in a private beta. We have made the documentation available to help developers determine for themselves whether this API would be of value to them. To request access to the beta so that you can use this API, click the button below. 

<a class="btn btn-primary" href="">Request access to the Analytics API Beta &raquo;</a>

!!! info "Important notes about the beta"
    The Analytics API is only available in our production enviornment, and cannot yet be called in our sandbox environment where most development occurs. Therefore you will need production credentials to use this API. To obtain production credentials, please [submit a help ticket](https://developers.ringcentral.com/support/create-case) to request your application to be graduated to production.

## Learn more about the Analytics API

<iframe src="https://player.vimeo.com/video/563903824?color=ff8800&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/564291528?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen><title="Intro_Video"></iframe>

## Access metrics to measure your team's performance

Call Performance Reports is a historical call analytics offering for RingCentral MVP customers to help managers gain a comprehensive understanding of their team’s performance whether they are set up on call queues, user groups or as individual users. This product provides direct access to granular data behind our Analytics Portal via an API. There are two primary metrics summarized and accessible through this API:

* **Calls** - an aggregation of the number of calls a person is on
* **Time Spent** - an aggregation of time spent on calls

The above metrics can be broken down even further for more detailed analyis. 

Learn more about [Call Performance Reports &raquo;](./call-performance/)

## Frequently Asked Questions

### How do I get started ?

There are three ways to get started:

1. Follow the step-by-step [Quick Start](./quick-start/) in order to build a command-line application or test the API using Postman.

2. Read the [API Reference](./call-performance/api-reference/) to understand the various APIs' definition, HTTP Request and Response objects.

3. Dive into the [sample application](./call-performance/sample-app/) and use that as a springboard for your custom application.

### What can you build with RingCentral Call Performance API?

You can build performance or analytics reports, and dashboards for all your call related metrics. For more information about the data and metrics, please refer to this [PDF guide.](https://drive.google.com/file/d/1cv07YoBcQm9eboRsihxzpxn0eGPuQ4nW/view)

### Is there an SDK for my favorite programming language?

Yes, RingCentral offers developers a number of [SDKs for the most popular programming languages](https://developers.ringcentral.com/guide/sdks). 

During our beta however, Java and C# programmers will need to call Analytics API endpoints directly. When this API is made available publicly, our Java and C# SDKs will be updated as well. 

### What permission does my application need to have?

Currently, the Call Performance API doesn't require any particular permission from your application so it should work as long as you have the  credentials for production enviornment.
