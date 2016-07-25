#RingOut

The RingOut option enables the users to make a call from any other outside number (not RingCentral number) by means of the RingCentral account, when it is not convenient for them to use the RingCentral number. This feature is available for softphone, web service and mobile applications.

The user specifies a certain number under the forwarding number list, starts RingOut and enters the required called number. RingCentral makes a call to the specified forwarding number and connects the user with the called number.

The API treats a two-legged RingOut call as a resource that can be created, retrieved, or deleted via the POST, GET and DELETE methods correspondingly.

## Making a Call

The two-legged RingOut call can be created via the following request:

```
POST /restapi/v1.0/account/~/extension/~/ringout
Content-Type: application/json
Authorization: Bearer <access-token> 

{
	    "from": {"phoneNumber": "13443334444"}, /* from parameter is optional if there is a default number in user's forwarding numbers */ 
        "to": {"phoneNumber": "13453443434"}, /* to parameter is required */ 
        "callerId": {"phoneNumber": "13443334444"}, /* optional field*/ 
        "playPrompt": true /* optional field */
}
```
 
Where:

-   **from**

    Refers to the number of the calling party. Required field only if there is no default number in the user's forwarding number list. The phoneNumber attribute should comply with the E.164 standard. As a result of validation of the phoneNumber attribute the server may return the error code: 400 Bad Request - phoneNumber specified in the field is empty or invalid.

-   **to**

    Refers to the called party number. Required field. If this field is missing from the request, the 400 Bad Request error is returned. The phoneNumber attribute should comply with the E.164 standard. As a result of validation of the phoneNumber attribute the server may return the error code: 400 Bad Request - phoneNumber specified in the field is empty or invalid.

-   **callerId**

    The number which is displayed to the called party. Optional field. If the field is specified and invalid the 403 Forbidden error code is returned. If the field is not specified in the request then it is based on the CallerId parameter specified in RingCentral application (Main phone Number/Current Location Number/Blocked).

    Caller ID Validation Rules:

    -   `callerId` is the same as the user's extension number;

    -   Get all phone numbers associated with the mailbox. Phone is the default and `callerId` is the same as this number;

    -   Get a list of all forwarded phone numbers for the user. `callerId` is the same as one of the local or toll-free numbers.

-   **playPrompt**

    The audio prompt that the calling party hears when the call is connected. Optional field. It corresponds to the setting in the RingCentral application "Prompt me to dial 1 before connecting" (When selected, the system will ask you to press "1" on your phone's key pad before connecting to the destination number).

The response can be as follows:

```
200 OK
Content-Type: application/json 
 
{  
   "id": 234343434, 
   "uri": "/restapi/v1.0/account/~/extension/~/ringout/234343434", 
   "status": {  
       "callStatus": "Success",  
       "callerStatus": "Success",  
       "calleeStatus": "Success"   
     }
}
```

Where:

-   **callStatus** can take the following values: 'Invalid' | 'Success' | 'InProgress' | 'CannotReach' | 'Error' | 'NoAnsweringMachine' | 'NoSessionFound'

-   **callerStatus**, **calleeStatus** can take the following values: 'Invalid' | 'Success' | 'InProgress' | 'Busy' | 'GenericError' | 'NoAnswer' | 'Rejected' | 'Finished' | 'InternationalDisabled' | 'DestinationBlocked' | 'NotEnoughFunds' | 'NoSuchUser'. In case the `callerStatus` or `calleeStatus` is set to `InternationalDisabled` or `NotEnoughFunds`, the `403 Forbidden` error is returned in response.

## Polling Call Status

Use polling to get the status of an ongoing outbound call.

    GET/restapi/v1.0/account/~/extension/~/ringout/234343434
   
The response will be as follows:

```
200 OK
Content-Type: application/json

{  
   "id": 234343434, 
   "uri": "/restapi/v1.0/account/~/extension/~/ringout/234343434", 
   "status": {  
       "callStatus": "Success",  
       "callerStatus": "Success",  
       "calleeStatus": "Success"   
     }
}
```

## Call Control

The RingCentral Connect Platform does not currently support control of outbound calls. However, you can cancel ringout call while callee party status is `InProgress`. To do that make a `DELETE` request to ringout URI.

```
DELETE /restapi/v1.0/account/~/extension/~/ringout/234343434  

204 No Content  
```

# URI Scheme
In addition to making calls via the RingOut API, if the user has the RingCentral for Desktop softphone installed, it is possible to use a URI scheme to initiate a dial out from the application.

RingCentral supports both a custom `rcmobile` URI scheme will resolve the issue of competing applications using the same URI scheme and a standard `tel` URI scheme which is more common but subject to competing uses.

## RingCentral URI Scheme

The RingCentral `rcmobile` URI Scheme is specific to RingCentral and thus has a higher probability of workign as intended.

```
// HTML URI Scheme
<a href="rcmobile://call?number=16501112222">1-650-111-2222</a>
```

## Standard URI Scheme

The standard `tel` URI Scheme is also supported but since multiple applications use this URI scheme, there may be competing applications resulting in a less desirable expeirence.

```
// HTML URI Scheme
<a href="tel:1-650-111-2222">1-650-111-2222</a>
<a href="tel:16501112222">1-650-111-2222</a>
```