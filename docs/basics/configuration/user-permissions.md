# Granting and Revoking User Permissions

RingCentral provides developers the ability to view Feature set information about user extensions. Feature flags define the capabilities and features within RingCentral which an extension may execute. This data concerning **Feature** availability is presented heuristically as *Feature Flags* data to developer applications and integrations providing useful context as it relates to a user/extension.

Feature flags can be used in a variety of use cases, the most common being:

* **Security** - Be certain that a principal currently has been granted the necessary permission prior to enabling access to that feature
* **User Experience** - Invalidating the permissions currently granted a principal prior to making a permission-dependent feature available from within your application or integration
* **Risk and Loss Prevention** - Ensuring you are not exposing risk or loss to your application/integration users and their organizations

!!! warning "Feature Availability Anti-Patterns"
    It is also important to understand anti-patterns of Feature Availability, these are ways developers should **not** use this resource.
    
    * **Role Assumption** - Developers should never ever assume that because a principal has a specific Role that principal will have an associated permission which is generally available
    * **Session Permission Caching** - Never store or cache permissions for a given principal for use during an entire session, as permissions may be revoked at any time

## Permission Validation

Users are granted specific permissions in RingCentral by Account Administrators within the Online Account Portal for either [Production](https://service.ringcentral.com) or [Sandbox](https://service.devtest.ringcentral.com) accounts.

We strongly recommended to developers that they should always validate user actions against the feature flags of an extension, and not against the role(s) assigned to a given user extension as permissions assigned to a role can modify over time. This can be accomplished by checking access to verify that a user has a specified feature and can be executed with the following API request (requires a valid `access_token` for the user):

```http tab="Response"
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
    "records": [
        {
          "id": "ReadMessages",
          "available": true
        }
    ]
}
```

```http tab="Request"
GET /restapi/v1.0/account/~/extension/~/features?featureId=ReadMessages
Authorization: Bearer xxxxxxxxxxxxx
Accept: application/json
Accept-Language: en-US
```

In case of the feature is not available for the current user, the API response contains `reason` attribute, which allows you to build a more user friendly experience, e.g. show some more detailed message like "Feature is not available on your service plan". See all the reason codes in the [API Reference](https://developer.ringcentral.com/api-reference/Features/readUserFeatures).

###  API Groups and Rate Limits

To make a request to the base route falls under the **Medium** API Group.

Dictionary resources used to obtain more detailed and specific Role and Permission information are in the **Light** API Group.

To learn more, consult the [Rate Limit](../../rate-limits/) section.

