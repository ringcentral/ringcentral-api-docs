RingCentral Call Conferencing enables RingCentral Office customers to setup and join conference calls anytime and anywhere. Each customer receives a conference bridge number and every user has an individual access code to host a conference. With the ‘invite’ feature, users can easily and quickly email conference details to participants. RingCentral Conferencing includes mute controls, listen only mode, record conference and more. RingCentral Conferencing is available to RingCentral Office US customers only.

Each RingCentral Office customer receives a local conference bridge and host/participant access codes per user. Conference details, including invite and host controls, are available on the Service Web and on the smartphone application. Invites can easily be sent to other participants via email.

The API provides the ability for a mobile, softphone application or other 3rd party application to obtain the conferencing details (for accounts that have this feature). The applications may then use the information and present it to the users, providing them with an ability to invite other participants to a conference.

The API allows obtaining conferencing details that pertain to a particular account, and returning the following data: conference (dial-in) phone number, conference host number, conference participant number. The API also allows getting information about Conferencing feature for a RingCentral account and to return the following data: conference phone number, host code, participant code. Let's consider the example below. For more details see the API Reference section.

```
GET /restapi/v1.0/account/~/extension/~/conferencing HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri" : "https.../account/130253008/extension/130255008/conferencing",
  "phoneNumber" : "18559012575",
  "hostCode" : "190204",
  "participantCode" : "128576"
}
```

By default the Conferencing feature is disabled on a tier/user level. Conferencing is unavailable for all non-user extension types. Conferencing Info can be accessed by the logged-in user only; however, the account administrator has access to the conferencing info of any user.

To check the availability of Conferencing functionality for the account, make a request for the account service-info. If the Conferencing feature is on, then the service features list contains the `featureName` "Conferencing" with the `enabled` parameter set to 'true'. See the example:

```
GET .../restapi/v1.0/account/~/service-info HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{...
       "featureName": "Conferencing",
       "enabled": true
 ...}
```

If the Conferencing feature is not activated for the account, the `403 Forbidden` error code is returned.