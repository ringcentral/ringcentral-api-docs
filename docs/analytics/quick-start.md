no_breadcrumb:true

# RingCentral Call Performance API Quick Start

In this quick start guide, we are going to access call performance data via command line using CURL utility in just a few minutes. Let's get started.

### Create an App if you don't have one already

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developers.ringcentral.com/my-account.html#/getting-started/setup-wizard" class="btn btn-primary">Call Performance Analytics App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description.
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank for this test app.</li>
</ol>
</div>

#### Get Production Application Credentials (not Sandbox Credentials)

In the RingCentral Developer Dashboard, navigate to your App -> Dashboard -> Credential and note down the following: 

- App Server URL which should be https://platform.ringcentral.com . This is the URL for RingCentral Production Environment and we will be doing our development in Production Environment for this API. Please contact us to get your application graduated to production so you can access production credentials if you don't have them already.
- Client ID
- Client Secret

These will be used when making API calls either via Command Line (CURL), POSTMAN or in your application codebase.

### Add Authentication if you don't have RingCentral authentication in place

There are multiple ways to provide authentication support for your application for RingCentral users. This will depend on the type of authentication mechanism you chose when you created your application. For more information about how to use OAuth 2.0 with your application please refer to this [guide](https://developers.ringcentral.com/guide/authentication)

### Make API Call using CURL 

=== "Command Line"

    ### Obtain Access Token using RingCentral supported Authentication

    In this example, we are making an API request to the RingCentral platform using [Password Flow Authentication](https://developers.ringcentral.com/guide/authentication/password-flow). Once the command is executed, copy the 'access_token' string from the response body.

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

    ### Make a HTTP POST Request to get 'call performance data' 

    In this example, we are making the API request and sending the JSON describing our requirements. To understand what the various JSON properties please refer to the [API Reference documentation](swagger-api-ref.md). In this step, please make sure to update the "header" information with your 'access_token' string obtained in the previous step.

```bash
   curl --location --request POST 'https://platform.ringcentral.com/restapi/v1.0/account/~/analytics/performance/calls/aggregate' \
        --header 'Content-Type: application/json' \
        --header 'Accept: application/json' \
        --header '{Your Access Token goes here}' \
        --data-raw '{
          "grouping": {
            "groupBy": "CompanyNumbers"
          },
          "timeRange": {
            "timeFrom": "2021-07-23T19:18:50.450Z",
            "timeTo": "2021-07-23T19:18:50.450Z"
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
            "companyHours": "BusinessHours",
            "callDuration": {
              "minValueSeconds": 0,
              "maxValueSeconds": 0
            },
            "timeSpent": {
              "minValueSeconds": 0,
              "maxValueSeconds": 0
            }
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
              }
            }
          }
        }'
```

## Using Postman Tool

If you prefer to see the API request and response in GUI, we recommend using the Postman Tool (free version). Click the button below to automagically import the settings for Postman and run it there.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/784c49b4d63a58c33c64?action=collection%2Fimport#?env%5BProduction%20-%20analytics%20%20(Sharable)%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlJDX0FQUF9LRVkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJSQ19VU0VSTkFNRSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJSQ19FWFRFTlNJT04iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWV9LHsia2V5IjoibXlfYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfV0=)

<iframe src="https://player.vimeo.com/video/564399368?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen><title="Intro_Video"></iframe>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. You can reference our [Sample C# Application](sample-app/) or build an application from scratch.

<a class="btn btn-success btn-sm" href="https://developers.ringcentral.com/guide/basics/your-first-steps">Take your next step &raquo;</a>

