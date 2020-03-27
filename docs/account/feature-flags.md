# User Feature Flags

A set of feature flags contains the list of permissions and abilities granted to a user, or "extension." These permissions are granted via a number of different means including:

* The features that come your with service plan
* The specific configuration of your account
* The licenses assigned to your account by a RingCentral Account Administrators
* Role assignments made explicitly by your RingCentral Account Administrators
* Role assignments made implicitly by RingCentral as it applies to Account Administrator actions for Roles and Permissions.

These permissions, or feature flags indicate the access control policy calculated for the currently authenticated user. This data (in whole or in part) is calculated by RingCentral every time permission verification is invalidated for a principal (user or extension) during each request. The set of features assigned to a user can be retrieved via the [Feature API](https://developers.ringcentral.com/api-reference/Features/readUserFeatures).

## How to use the Feature API to check permissions

Use the Feature API to fetch an aggregated list of permissions and abilities a user is allowed to perform. Below is a simple request and response showing how this can be done. 

### Sample Request

```http
GET /restapi/v1.0/account/~/extension/~/features
Accept: application/json
Accept-Language: en-US
```

### Sample Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
  "records": [  
        {
          "id": "FaxReceiving",
          "available": true
        },        
        {
          "id": "FaxSending",
          "available": true
        },        
        {
          "id": "EditFaxSettings",
          "available": true
        }, ...
  ]
}
```

!!! info "Keep in Mind"

    * Feature sets (fully or partially) are built every time RingCentral verifies if a certain permission is granted to the authenticated user.
    * Feature set data is part of the Extension API resource. Each extension in your RingCentral account will have a feature set associate with it. 
    * Feature set data is only accessible at the Extension Level and not at the Account Level. For Account data, please see view the [RingCentral API Account Resource Reference](https://developer.ringcentral.com/api-reference/account).
