# Introduction to the Custom Fields API

## What are custom fields?

A custom field is an additional piece of information or metadata that can be associated with a RingCentral user (a.k.a. an extension). A maximum of 5 custom fields can be created and associated with a user. In order to use custom fields, an admin must first be [enable them for your account](https://support.ringcentral.com/s/article/11285-Configure-Custom-Fields?language=en_US).

## How can custom fields be used?

Custom fields can be used any time you need to extend the user object to store additional data relating to a user. Here are some specific use cases you may consider:

* **Advanced search.** Custom field data is searchable, so it could be a useful way to enable search to find users by their employee Id, or other information unique to your enterprise. 
* **Ad tracking**. Track and manage marketing campaigns by assigning campaign IDs to user records, and then track calls received per campaign.
* **Organization**. Group users based on custom categories.

## What is the Custom Fields API?

The Custom Fields API is a REST-based interface that enables developers to create, update, delete and fetch custom fields programatically.
  
## Explore Custom Fields API sample code

### Create custom fields on User Extension

Developers can use this API to create a custom field on a user extension object. Maximum of 5 custom fields can be created.


=== "Raw"

    ```http
    POST /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
    Content-Type: application/json
    Content-Length: ACTUAL_CONTENT_LENGTH_HERE
    Authorization: <YOUR_ACCESS_TOKEN>

    {  
       "category": "User",
       "displayName": "HRCODE-TEST3"
    }
    ```

=== "Python"

    ```python
    from ringcentral import SDK
    from ringcentral.http.api_exception import ApiException

    sdk = SDK(APP_KEY, APP_SECRET, SERVER)
    platform = sdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)

    body ={
        "category": "User",
        "displayName": "HRCODE-TEST3"
        }

    try:
        response =  platform.post('/account/~/custom-fields', body)
        print("Custom Field Created")
    except ApiException as e:
        print("Error while creating custom fields" + e)
    ```


### Fetch Custom fields

Developers can use this API to fetch all the custom fields created on a RingCentral Account.

=== "Raw"

    ```http 
    GET /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
    Authorization: <YOUR_ACCESS_TOKEN>

    ```


=== "Python"

    ```python
    from ringcentral import SDK
    from ringcentral.http.api_exception import ApiException

    sdk = SDK(APP_KEY, APP_SECRET, SERVER)
    platform = sdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)

    response = platform.get('/account/~/custom-fields')
    custom_fields = response.json()
    try:
        for x in range(len(custom_fields.records)):
            print('Display Name- ' + custom_fields.records[x].displayName + ' id- ' +custom_fields.records[x].id + ' Category- '+custom_fields.records[x].category + '\n' )
        except ApiException as e:
            print("Error while fetching custom fields" + e)
            
    ```

### Update Custom fields

Developers can use this API to rename an existing custom field by specifying the custom field id in the query path parameter.

=== "Raw"

    ```http
    PUT /restapi/v1.0/account/{accountId}/custom-fields/2200033 HTTP/1.1
    Authorization: <YOUR_ACCESS_TOKEN>

    ```

=== "Python"

    ```python
    from ringcentral import SDK
    from ringcentral.http.api_exception import ApiException

    sdk = SDK(APP_KEY, APP_SECRET, SERVER)
    platform = sdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)

    body ={
        "displayName": "HRCODE"
        }

    try:
        response =  platform.put('/account/~/custom-fields/{}'.format(id), body)
        print(response.json().displayName)
    except ApiException as e:
        print("Error while creating custom fields" + e)
    ```

### Delete Custom fields

Developers can delete one or more existing custom field by passing the custom field id in the query parameter (separate by comma in case of multiple custom fields)

=== "Raw"

    ```http
    DELETE /restapi/v1.0/account/{accountId}/custom-fields/2200033,2200589 HTTP/1.1
    Authorization: <YOUR_ACCESS_TOKEN>

    ```

=== "Python"

    ```python
    from ringcentral import SDK
    from ringcentral.http.api_exception import ApiException

    sdk = SDK(APP_KEY, APP_SECRET, SERVER)
    platform = sdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)

    try:
        response =  platform.delete('/account/~/custom-fields/{}'.format(id))
        print("Deleted")
        print("Custom Field Deleted")
    except ApiException as e:
        print("Error while creating custom fields" + e)
    ```

## How to insert and update the Custom fields Value for User Extensions?
Once the custom fields are created developers can insert and update custom fields value for user extensions using the Update Extension API.
Only an Admin User can change and view the custom field values for other extensions. Standard users can only view custom field value on their assigned extensions.

=== "Python"

    ```python
    from __future__ import print_function

    from ringcentral.http.api_exception import ApiException
    from ringcentral import SDK
    from config import USERNAME, EXTENSION, PASSWORD, APP_KEY, APP_SECRET, SERVER
    sdk = SDK(APP_KEY, APP_SECRET, SERVER)
    platform = sdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)
     
    # POST Body
    body =  {
               "customFields": [
                   {
                     "id":"64016",
                      "value":"Test for Update"
                   }
                              ]
            }
    try:
        response =  platform.put('/account/~/extension/~', body)
        user = response.json()
        print('Custom Field value updated for Custom Field id 64016')
        for x in user.customFields:
             print('Custom Field Display Name -'+ x.displayName +  ' |  Custom Field Value - ' + x.value + ' | id - ' +  x.id)

    except ApiException as e:
        print("Error while updatibg custom field value" + e)
    ```

## How to find the Custom fields Value from User Extensions?

Once the custom field is created on a user extension, developers can use the Get Extension API to see custom field details on that extension

=== "Python"

```python
from __future__ import print_function

from ringcentral.http.api_exception import ApiException
from ringcentral import SDK
from config import USERNAME, EXTENSION, PASSWORD, APP_KEY, APP_SECRET, SERVER
sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)
        try:
            response = platform.get('/account/~/extension/~')
            user = response.json()
            for x in user.customFields:
                 print(x.value)
      
       except ApiException as e:
            print("Error fetching Custom Fields" + e)

```

=== "Response"

```http

{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016",
  "id": 809646016,
  "extensionNumber": "11101",
  "contact": {
    "firstName": "TESTER",
    "lastName": "Babji",
    "company": "DRE - Vyshakh Babji",
    "email": "johnsmith+rc+1@123mail.org",
    "businessPhone": "+16197619503",
    "businessAddress": {
      "street": "1400 Fashion Island Blvd, |#700",
      "city": "San Mateo",
      "state": "California",
      "zip": "94404",
      "country": "United States"
    },
    "emailAsLoginName": true,
    "pronouncedName": {
      "type": "TextToSpeech",
      "text": "Something New"
    }
  },
  "name": "TESTER Babji",
  "type": "User",
  "status": "Enabled",
  "departments": [
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/1081167016",
      "id": "1081167016",
      "extensionNumber": "11131"
    },
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/61986637016",
      "id": "61986637016",
      "extensionNumber": "11400"
    },
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/809646016/extension/62311822016",
      "id": "62311822016",
      "extensionNumber": "11602"
    }
  ],
  "serviceFeatures": [
    {
      "featureName": "SMS",
      "enabled": true
    },
    {
      "featureName": "SMSReceiving",
      "enabled": true
    },
    {
      "featureName": "Pager",
      "enabled": true
    },
    {
      "featureName": "PagerReceiving",
      "enabled": true
    },
    {
      "featureName": "Voicemail",
      "enabled": true
    },
    {
      "featureName": "Fax",
      "enabled": true
    },
    {
      "featureName": "FaxReceiving",
      "enabled": true
    },
    {
      "featureName": "DND",
      "enabled": true
    },
    {
      "featureName": "RingOut",
      "enabled": true
    },
    {
      "featureName": "InternationalCalling",
      "enabled": true
    },
    {
      "featureName": "Presence",
      "enabled": true
    },
    {
      "featureName": "VideoConferencing",
      "enabled": true
    },
    {
      "featureName": "SalesForce",
      "enabled": true
    },
    {
      "featureName": "Intercom",
      "enabled": true
    },
    {
      "featureName": "Paging",
      "enabled": true
    },
    {
      "featureName": "Conferencing",
      "enabled": true
    },
    {
      "featureName": "VoipCalling",
      "enabled": true
    },
    {
      "featureName": "FreeSoftPhoneLines",
      "enabled": true
    },
    {
      "featureName": "HipaaCompliance",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "CallPark",
      "enabled": true
    },
    {
      "featureName": "SharedLines",
      "enabled": true
    },
    {
      "featureName": "OnDemandCallRecording",
      "enabled": true
    },
    {
      "featureName": "Reports",
      "enabled": true
    },
    {
      "featureName": "CallForwarding",
      "enabled": true
    },
    {
      "featureName": "DeveloperPortal",
      "enabled": true
    },
    {
      "featureName": "EncryptionAtRest",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "BlockedMessageForwarding",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "EmergencyCalling",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "HDVoice",
      "enabled": true
    },
    {
      "featureName": "SingleExtensionUI",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "CallSupervision",
      "enabled": true
    },
    {
      "featureName": "VoicemailToText",
      "enabled": true
    },
    {
      "featureName": "WebPhone",
      "enabled": true
    },
    {
      "featureName": "RCTeams",
      "enabled": true
    },
    {
      "featureName": "UserManagement",
      "enabled": true
    },
    {
      "featureName": "Calendar",
      "enabled": true
    },
    {
      "featureName": "PasswordAuth",
      "enabled": true
    },
    {
      "featureName": "CallerIdControl",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "AutomaticInboundCallRecording",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "AutomaticOutboundCallRecording",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "AutomaticCallRecordingMute",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "SoftPhoneUpdate",
      "enabled": true
    },
    {
      "featureName": "LinkedSoftphoneLines",
      "enabled": false,
      "reason": "AccountTypeLimitation"
    },
    {
      "featureName": "CallQualitySurvey",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "AccountFederation",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "MMS",
      "enabled": true
    },
    {
      "featureName": "CallParkLocations",
      "enabled": true
    },
    {
      "featureName": "ExternalDirectoryIntegration",
      "enabled": true
    },
    {
      "featureName": "CallSwitch",
      "enabled": true
    },
    {
      "featureName": "PromoMessage",
      "enabled": true
    },
    {
      "featureName": "SiteCodes",
      "enabled": true
    },
    {
      "featureName": "InternationalSMS",
      "enabled": true
    },
    {
      "featureName": "ConferencingNumber",
      "enabled": true
    },
    {
      "featureName": "VoipCallingOnMobile",
      "enabled": true
    },
    {
      "featureName": "DynamicConference",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "ConfigureDelegates",
      "enabled": true
    },
    {
      "featureName": "Archiver",
      "enabled": true
    },
    {
      "featureName": "EmergencyAddressAutoUpdate",
      "enabled": false,
      "reason": "AccountLimitation"
    },
    {
      "featureName": "MobileVoipEmergencyCalling",
      "enabled": false,
      "reason": "AccountLimitation"
    }
  ],
  "regionalSettings": {
    "timezone": {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/58",
      "id": "58",
      "name": "US/Pacific",
      "description": "Pacific Time (US & Canada)",
      "bias": "-480"
    },
    "homeCountry": {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/dictionary/country/1",
      "id": "1",
      "name": "United States",
      "isoCode": "US",
      "callingCode": "1"
    },
    "language": {
      "id": "1033",
      "name": "English (United States)",
      "localeCode": "en-US"
    },
    "greetingLanguage": {
      "id": "1033",
      "name": "English (United States)",
      "localeCode": "en-US"
    },
    "formattingLocale": {
      "id": "1033",
      "name": "English (United States)",
      "localeCode": "en-US"
    },
    "timeFormat": "12h"
  },
  "setupWizardState": "Completed",
  "permissions": {
    "admin": {
      "enabled": true
    },
    "internationalCalling": {
      "enabled": true
    }
  },
  "profileImage": {
    "uri": "https://media.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016/profile-image",
    "etag": "13686d5bf2734702cf0ba1c9041d1415",
    "contentType": "image/png",
    "lastModified": "2017-07-13T23:34:05.472Z",
    "scales": [
      {
        "uri": "https://media.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016/profile-image/90x90"
      },
      {
        "uri": "https://media.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016/profile-image/195x195"
      },
      {
        "uri": "https://media.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016/profile-image/584x584"
      },
      {
        "uri": "https://media.ringcentral.com/restapi/v1.0/account/809646016/extension/809646016/profile-image/original"
      }
    ]
  },
  "customFields": [
    {
      "id": "21016",
      "displayName": "Salesforce Contact",
      "value": "Test-Admin4"
    },
    {
      "id": "61016",
      "displayName": "TESTCODE",
      "value": "Test-Admin5"
    },
    {
      "id": "62016",
      "displayName": "HRCODE-TEST",
      "value": "Test-Admin1"
    },
    {
      "id": "63016",
      "displayName": "HRCODE-TEST1",
      "value": "Test-Admin2"
    },
    {
      "id": "64016",
      "displayName": "HRCODE-TEST2",
      "value": "Test for Update"
    }
  ],
  "account": {
    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/809646016",
    "id": "809646016"
  },
  "site": {
    "name": "Main Site",
    "code": "11"
  },
  "hidden": false
}

```