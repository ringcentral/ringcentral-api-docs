no_breadcrumb:true

# RingCentral Call Performance API Quick Start

In this quick start guide, we are going to access call performance data via the command line using CURL utility in just a few minutes. Let's get started.

### Create an App if you don't have one already

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Analytics+Quick+Start+App&desc=A+simple+app+to+demo+accessing+call+performance+metrics+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Analytics App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>None</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

#### Get production credentials (not Sandbox Credentials)

In the RingCentral Developer Dashboard, navigate to your App -> Dashboard -> Credential and note down the following: 

- App Server URL which should be https://platform.ringcentral.com . This is the URL for RingCentral Production Environment and we will be doing our development in Production Environment for this API. 

Please contact us to get your application graduated to production so you can access production credentials if you don't have them already. You need to provide us the following so we can move your application to production enviornment:

- Client ID
- Client Secret

These will be used when making API calls either via Command Line (CURL), POSTMAN or in your application codebase.

### Add Authentication if you don't have RingCentral authentication in place

There are multiple ways to provide authentication support for your application for RingCentral users. This will depend on the type of authentication mechanism you chose when you created your application. For more information about how to use OAuth 2.0 with your application please refer to this [guide](../../authentication)

### Make the API Call C# or using CommandLine

Select your preferred language below.

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net or .Net Core
    * Select Target Framework Version
    * Enter project name "AnalyicsAPIClient"
    * Add NuGet package RingCentral.Net --version 5.5.0 to use it for setting up authentication
    * Add RestSharp package to use it for HTTP Request 

    Note: You need to implement authentication (OAuth, Basic Auth etc) based on how you configured your application when creating it in the RingCentral Dev Portal.

    ### Edit the file 'Program.cs'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```c#
    {!> code-samples/analytics/quick-start.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app by typing in the command line 
    
    ```c# 
    dotnet run
    ```
  
=== "Command Line"

    #### Obtain Access Token using RingCentral supported Authentication

    In this example, we are making an API request to the RingCentral platform using [Password Flow Authentication](../../authentication/password-flow). Once the command is executed, copy the 'access_token' string from the response body.

    ```bash
    curl --location -g --request POST 'https://platform.ringcentral.com/restapi/oauth/token' \
         --header 'Authorization: {{basic_auth_header}}' \
         --header 'Accept: application/json' \
         --header 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' \
         --data-urlencode 'grant_type=password' \
         --data-urlencode 'username={{RC_USERNAME}}' \
         --data-urlencode 'password={{RC_PASSWORD}}' \
         --data-urlencode 'extension={{RC_EXTENSION}}'
    ```

    #### Make a HTTP POST Request to get 'call performance data' 

    In this example, we are making the API request and sending the JSON describing our requirements. To understand what the various JSON properties please refer to the [API Reference](../call-performance/api-reference/). In this step, please make sure to update the "header" information with your 'access_token' string obtained in the previous step.

    ```bash
    curl --location --request POST 'https://platform.ringcentral.com/restapi/v1.0/account/~/analytics/performance/calls/aggregate' \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        --header '{Your Access Token goes here}' \
        --data-raw '{
                      "grouping": {
                        "groupBy": "Queues",
                        "ids": [
                        ]
                      },
                      "timeRange": {
                        "timeFrom": "2021-08-14T19:06:59.029Z",
                        "timeTo": "2021-08-18T19:06:59.029Z"
                      },
                      "additionalFilters": {
                        "direction": "Inbound",
                        "origin": "Internal",
                        "callResponse": "Answered",
                        "callResponseType": [
                          "InboundDirect"
                        ],
                        "callResult": [
                          "Completed"
                        ],
                        "callSegments": [
                          {
                            "callSegment": "Ringing"
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
                          "maxValueSeconds": 100
                        },
                        "timeSpent": {
                          "minValueSeconds": 0,
                          "maxValueSeconds": 100
                        },
                        "queueSla": "InSla"
                      },
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
                          "callsByResponseType": {
                            "aggregationType": "Sum"
                          },
                          "callsBySegment": {
                            "aggregationType": "Sum"
                          },
                          "callsByResult": {
                            "aggregationType": "Sum"
                          },
                          "callsByActions": {
                            "aggregationType": "Sum"
                          },
                          "callsByCompanyHours": {
                            "aggregationType": "Sum"
                          },
                          "callsByQueueSla": {
                            "aggregationType": "Sum"
                          }
                        },
                        "timers": {
                          "totalCallLength": {
                            "aggregationType": "Sum"
                          },
                          "timeSpentByCallSegments": {
                            "aggregationType": "Sum"
                          },
                          "callLengthByDirection": {
                            "aggregationType": "Sum"
                          },
                          "callLengthByOrigin": {
                            "aggregationType": "Sum"
                          },
                          "callLengthByResponse": {
                            "aggregationType": "Sum"
                          },
                          "callLengthByResponseType": {
                            "aggregationType": "Sum"
                          },
                          "callLengthByResult": {
                            "aggregationType": "Sum"
                          },
                          "callsLengthByCompanyHours": {
                            "aggregationType": "Sum"
                          },
                          "callsLengthByQueueSla": {
                            "aggregationType": "Sum"
                          }
                        }
                      }
                    }'
    ```



## Using Postman

If you prefer to see the API request and response in GUI, you can use Postman Tool or our API Explorer. Click the button below to import the settings for Postman and run it there.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/784c49b4d63a58c33c64?action=collection%2Fimport#?env%5BProduction%20-%20analytics%20%20(Sharable)%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlJDX0FQUF9LRVkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJSQ19VU0VSTkFNRSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJSQ19FWFRFTlNJT04iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibXlfYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfV0=)

**Watch a demo of using Postman to call the Analytics API**

<iframe src="https://player.vimeo.com/video/564399368?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen><title="Intro_Video"></iframe>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. You can reference our [Sample C# Application](https://github.com/ringcentral/call-performance-api-demo) or build an application from scratch.

<a class="btn btn-success btn-sm" href="https://developers.ringcentral.com/guide/basics/your-first-steps">Take your next step &raquo;</a>

