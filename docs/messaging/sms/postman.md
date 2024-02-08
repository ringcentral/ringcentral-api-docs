# Using Postman to Test Enhanced Business SMS APIs

For easy testing using [Postman](https://www.getpostman.com/), RingCentral provides a Postman 2.0 Collection for Enhanced Business SMS. If you use Postman, the we recommend using the collection as it provides authorization handling using Postman variables and environments as recommended by Postman.

The collection is available here:

* [Postman 2.1 Collection](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/master/docs/messaging/sms/specs/ringcentral_sms_rest_apis.postman_collection.json)


This document describes how to install and use the Postman 2.1 Collection.

## Pre-Requisites

This Postman spec is designed for following environment:

* Current RingCentral MVP account located at: https://www.ringcentral.com. 
* RingCentral app created at https://developers.ringcentral.com with Password-based or JWT auth flow enabled.

## Using Postman

Using Postman once you have your pre-requisites consists of a few steps:

1. Importing the Postman Collection
2. Creating/Configuring Your Postman Environment
3. Authenticating and Authorizing the user.
4. Making an API call


### Importing the Postman Collection

Use the following steps to import the Postman collection.

1. In the upper left corner of the Postman application click the "Import" button.
2. Click the "Import from Link" tab.
3. Paste in the following URL where it says "Enter a URL and press import": [`https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/master/docs/messaging/sms/specs/ringcentral_sms_rest_apis.postman_collection.json`](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/master/docs/messaging/sms/specs/ringcentral_sms_rest_apis.postman_collection.json)
4. Click the "Continue" button

## Configuring Your Postman Environment

The Postman Collection uses environment variables for authentication and authorization. Fill out the following for your environment:

1. In Postman, create an environment by clicking the Gear icon for "Management Environments" in the upper right corner. This will bring up a list of existing environments.
2. Click "Add" to create a new environment.
3. Choose a name of your choice.
4. Enter your enviroment variables as described below.
5. Click the "Add" button to finish adding this environment.
You can also use this [Postman 2.1 Environment](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/master/docs/messaging/sms/specs/ringcentral_environment.postman_environment.json) export as reference. 

<img class="img-fluid" width="100%" src="../../../img/postman_ringcentral_environment.png">

| Variable | Description |
|------|-------------|
| **`RINGCENTRAL_SERVER_URL`** | RingCentral's API Url which would be https://platform.ringcentral.com for Production and https://platform.devtest.ringcentral.com for Sandbox|
| **`RINGCENTRAL_CLIENT_ID`** | Application's Client ID|
| **`RINGCENTRAL_CLIENT_SECRET`** | Application's Client Secret |
| **`RINGCENTRAL_USERNAME`** | RingCentral username |
| **`RINGCENTRAL_EXTENSION`** | RingCentral user's extension number |
| **`RINGCENTRAL_PASSWORD`** | RingCentral user's password. Note, this needs to be using the RingCentral passsword system and not SSO for this Postman spec. |
| **`RINGCENTRAL_JWT`** | RingCentral user's JWT token from User's Profile -> Credentials |

!!! note "Regarding Authentication"
    If you are using authentication based on password flow, you would need to fill in RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION(optional) and RINGCENTRAL_PASSWORD only. No need to fill in RC_JWT.

    If you are using authentication based on JWT flow, you would need to fill in RINGCENTRAL_JWT only.

    See the Developer Guide for information on several [authentication methods that your app can use](../../authentication/index.md).

### Making an API call

To test the Postman collection, let's call the "Send SMS" API.

1. In the Environments pick list in the upper right corner, select the environment you just created.
1. In the left hand navigation menu, select "Auth" > "Auth via Password Flow" if using password based authentication. Select "Auth" > "Auth via JWT Flow" if using JWT.
1. Clicking on the "Send" button will run the "Pre-request Script" followed by API call, and then will load the access_token in "my_access_token" environment variable. You do not need to do anything with this token.
1. Navigate to "APIs" > "Send SMS" and click "Send".

If all your environment variables are set properly, you will be able to see the SMS sent out successfully.
Follow this up by trying "Send MMS" API.

## Feedback

If you have any feedback on using the Postman collection, please [post to the RingCentral MVP docs GitHub repo](https://github.com/ringcentral/ringcentral-api-docs/issues).
