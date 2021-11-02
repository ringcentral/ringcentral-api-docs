# Emergency Locations

In North America, a system is used to automatically provide the caller's location to 911 dispatchers. The 911 dispatcher's comupter receives information from the telephone company about the physical address or geographic coordinates of the caler. This information is used to dispatch police, fire, medical and other services as needed.

Setting the emergency address allows you to enter your physical location with a discrete address. This method is via update device.

### Example Request

```http
PUT /restapi/v1.0/account/~/device/<deviceId>
```

```json
{
  "street": "997 BAKER WAY",
  "street2": "5001",
  "city": "SAN MATEO",
  "state": "CA",
  "country": "US",
  "zip": "94404",
  "customerName": "RingCentral"
}
```

!!! important "Changes due to RAY BAUM's Act"
    Setting emergency address flow has been changed due to legislation (Section 506 of the RAY BAUM's Act) which may cause errors while trying to set the emergency address. Eventually it won’t be possible to set the emergency address via updating a device method shown above.

## Emergency Response Location

Another way to set emergency locations is through the Emergency Response Locations API. Instead of having to enter a discrete address each time you change locations, you can create location profiles for users to easily select their emergency location from a drop down list.

A feature will be set on the account to determine if Emergencey Response Locations (ERL) are enabled. Use the following method to check if this feature is enabled on the account:

### Example

#### Request
```http
GET /restapi/v1.0/account/~/extension/~/features?featureId=NewEmergencyCallingFramework
```

#### Response
```json
...
{
  "id" : "NewEmergencyCallingFramework",
  "available" : true,
  "params":[
    {
        "name":"maxNumberOfCompanyERLs",
        "value":"10000"
    },
    {
        "name":"maxNumberOfPrivateERLsForSingleUser",
        "value":"20"
    }
  ]
}
...
```

The parameters seen in this response have a particular meaning for Emergency Response Locations.

| Property | Value | Description |
|-|-|-|
| `maxNumberOfCompanyERLs` | `10000` | Maximum number of emergency locations you can define for the entire company account. These can be used by any user/extension on the account. |
| `maxNumberOfPrivateERLsForSingleUser` | `20` | Maximum number of emergency locations each user/extension can create for their own private use. |


!!! important "EME-384 Error"
    If you see an error message `EME-384`, this indicates you are not able to set the discrete emergency address anymore and must use this workflow for creating emergency response locations.

Notice above that the `NewEmergencyCallingFramework` feature is set to `true`.  This means you can **not** set the discrete emergency address (street, city, country, etc) and must use this ERL flow instead.

### Set Company Wide Emergency Locations

Company wide emergency response locations are public locations available to all users on the company account. 

#### Example

```http
POST /restapi/v1.0/account/~/emergency-locations
```

```json
{
  "name": "San Mateo Office Location",
  "address":
  {
    "street":"997 BAKER WAY",
    "street2":"5001",
    "city":"SAN MATEO",
    "state":"CA",
    "country":"US",
    "zip":"94404",
    "customerName":"RingCentral"
  },
  "visibility":"Public"
}
```

Please see the [API Reference](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createEmergencyLocation) for more details.

### Set User Specific Emergency Locations

User specific emergency response locations are private locations for use by the uesr (extension) only.

#### Example

```http
POST /restapi/v1.0/account/~/extension/~/emergency-locations
```

```json
{
  "name": "My work location",
  "address":
  {
    "street":"997 BAKER WAY",
    "street2":"5001",
    "city":"SAN MATEO",
    "state":"CA",
    "country":"US",
    "zip":"94404",
    "customerName":"RingCentral"
  }
}
```

Please see the [API Reference](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createExtensionEmergencyLocation) for more details.