# RingCentral API Error Codes

| Status Code(s)  | Error Code    | Message                                                                                                    |
|---------------- |------------   |----------------------------------------------------------------------------------------------------------  |
| 400               | CLG-101       | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                     |
| 400               | CLG-102       | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                     |
| 400               | CLG-103       | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                     |
| 400               | CLG-104       | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                     |
| 400               | CLG-105       | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                     |
| 400               | CLG-110       | Parameter [sessionId] is not allowed for usage along with parameter [${parameterName}]                                        |
| 400, 403          | CMN-101       | Parameter [${parameterName}] value is invalid.                                                                                |
| 400, 404          | CMN-102       | Resource for parameter [${parameterName}] is not found                                                                        |
| 400               | CMN-103       | JSON can't be parsed.                                                                                                         |
| 400               | CMN-104       | Cannot parse request                                                                                                          |
| 400               | CMN-105       | URL should not contain query string when method is [${method}] and content type is [${contentType}]                           |
| 400               | CMN-106       | Batch request is limited to ${limit} entries                                                                                  |
| 416               | CMN-107       | Requested Range Not Satisfiable                                                                                               |
| 400               | CMN-108       | Parameter ${parameterName} value in request body doesn't match specified in path.                                             |
| 403               | CMN-109       | Feature not available.                                                                                                        |
| 400               | CMN-110       | Header ${header} should be specified.                                                                                         |
| 404               | CMN-120       | Invalid URI                                                                                                                   |
| 500               | CMN-201       | Service Temporary Unavailable                                                                                                 |
| 501               | CMN-202       | Operation is not supported                                                                                                    |
| 500               | CMN-203       | Internal Server Error                                                                                                         |
| 429               | CMN-301       | Request rate exceeded                                                                                                         |
| 429               | CMN-302       | Unknown application. Rate limits undefined                                                                                    |
| 429               | CMN-303       | Can not resolve API plan. Rate limits undefined                                                                               |
| 403               | CMN-401       | Specific application permission required                                                                                      |
| 403               | CMN-402       | Administrator permission required                                                                                             |
| 403               | CMN-403       | The feature is not available for this extension type                                                                          |
| 403               | CMN-404       | Attempt to access another extension                                                                                           |
| 401               | CMN-405       | Login to extension required.                                                                                                  |
| 400.403           | CMN-406       | Duplicate value for parameter ${parameterName}: ${parameterValue} found in request                                            |
| 400               | CMN-407       | Parameter in header is invalid                                                                                                |
| 4003              | CMN-408       | [{permissionName}] permission required                                                                                        |
| 403               | MSG-240       | Specified recipient [${toPhoneNumber}] isn't an US phone number                                                               |
| 403               | MSG-241       | Cannot send SMS from Fax number                                                                                               |
| 403               | MSG-242       | Sending SMS is not available from the number specified.                                                                       |
| 400               | MSG-243       | Phone number is blocked                                                                                                       |
| 400               | MSG-245       | Cannot find the phone number which belongs to user                                                                            |
| 503               | MSG-290       | Sending SMS to ${toPhoneNumber} failed. Please try later.                                                                     |
| 403               | MSG-304       | Phone number doesn't belong to extension                                                                                      |
| 429               | MSG-305       | Request rate exceeded                                                                                                         |
| 403               | MSG-309       | Cannot receive SMS on Fax number                                                                                              |
| 400               | MSG-310       | Phone number is not assigned                                                                                                  |
| 403               | MSG-314       | Extension is of inappropriate type                                                                                            |
| 400               | MSG-316       | No department members found.                                                                                                  |
| 400               | MSG-324       | Recipient extension is in inappropriate state                                                                                 |
| 403               | MSG-325       | Reply is forbidden for old message threads                                                                                    |
| 403               | MSG-326       | Reply is denied for user, who is no longer a thread participant                                                               |
| 403               | MSG-330       | Sending from department message is not supported.                                                                             |
| 400               | MSG-331       | Sender extension number does not correspond to logged in extension                                                            |
| 400               | MSG-333       | Invalid message synchronisation request: full synchronization is required                                                     |
| 400               | MSG-337       | Attachment size limit exceeded                                                                                                |
| 400               | MSG-338       | Message size limit exceeded                                                                                                   |
| 403               | MSG-340       | Outbound fax is not available for extension type [${type}]                                                                    |
| 403               | MSG-341       | Outbound fax is not allowed for extension [${extensionId}]                                                                    |
| 406               | MSG-343       | Fax resend is not allowed for message in current state                                                                        |
| 400               | MSG-347       | Attachment body is empty                                                                                                      |
| 415               | MSG-348       | Unsupported attachment media type                                                                                             |
| 400               | MSG-349       | Unable to parse fax envelope                                                                                                  |
| 400               | MSG-350       | No content disposition                                                                                                        |
| 400               | MSG-351       | No file name in content disposition                                                                                           |
| 500               | MSG-352       | Message content is null                                                                                                       |
| 403               | OAU-101       | Parameter [brandId] is invalid                                                                                                |
| 403               | OAU-102       | Unable to issue authorization code                                                                                            |
| 403               | OAU-105       | Login for ${extensionType} extension is not allowed.                                                                          |
| 403               | OAU-106       | Invalid authorization code                                                                                                    |
| 403               | OAU-108       | Authorization code is expired                                                                                                 |
| 403               | OAU-109       | Redirect URIs do not match                                                                                                    |
| 403               | OAU-110       | Authorization code was not issued for this application                                                                        |
| 400               | OAU-111       | Request parameter duplication detected                                                                                        |
| 403               | OAU-112       | The client is unauthorized for the required grant type: [${grant_type}]                                                       |
| 403               | OAU-113       | No redirect uri is registered for the client                                                                                  |
| 403               | OAU-116       | Invalid authorization method                                                                                                  |
| 403               | OAU-117       | The scope of requesting application cannot be narrower than the target application                                            |
| 403               | OAU-119       | International Virtual number cannot be used to login                                                                          |
| 401               | OAU-120       | Wrong Application ID                                                                                                          |
| 401               | OAU-121       | Wrong Application                                                                                                             |
| 401               | OAU-123       | Invalid Authorization header value: ${parameter}                                                                              |
| 401               | OAU-125       | Grant type is not allowed for application.                                                                                    |
| 401               | OAU-127       | Invalid application release.                                                                                                  |
| 401               | OAU-128       | Access token expired.                                                                                                         |
| 401               | OAU-129       | Access token corrupted.                                                                                                       |
| 401               | OAU-134       | Invalid Authorization header.                                                                                                 |
| 401               | OAU-136       | Extension not found.                                                                                                          |
| 401               | OAU-140       | Invalid resource owner credentials.                                                                                           |
| 401               | OAU-141       | Login for extension in current state is not allowed.                                                                          |
| 401               | OAU-142       | Login to account in current state is not allowed.                                                                             |
| 401               | OAU-146       | Invalid client credentials                                                                                                    |
| 400               | OAU-147       | The account is locked out due to multiple unsuccessful logon attempts.                                                        |
| 400               | OAU-148       | The account is locked out due to multiple unsuccessful logon attempts. Please use Single Sign-on way to authenticate.         |
| 401               | OAU-149       | Unparsable access token                                                                                                       |
| 400               | OAU-150       | The value of query parameter [${queryParameterName}] should be equal to parameter [${requestParameterName}] in request body   |
| 401               | OAU-151       | Authorization method not supported                                                                                            |
| 403               | SUB-402       | Presence feature is disabled for this extension type (${param} / ${url})                                                      |
| 403               | SUB-403       | User disallowed to monitor his presence                                                                                       |
| 403               | SUB-404       | User disallowed this subscriber to pick up calls                                                                              |
| 403               | SUB-405       | Not allowed subscribe for messages to other extensions                                                                        |
| 403               | SUB-406       | Not allowed subscribe for events to extensions of other account                                                               |
| 403               | SUB-407       | Not allowed subscribe for APNS if endpoint_id not defined                                                                     |
| 403               | SUB-408       | Not allowed subscribe for unknown user                                                                                        |
| 403               | SUB-505       | Subscriptions limit exceeded                                                                                                  |
| 404               | SUB-507       | Subscription with key [${subscriptionKey}] and assigned session [${session}] was expired                                      |
| 400               | SUB-508       | Invalid event filters: [${filters}]                                                                                           |
| 400               | SUB-509       | findSubscription only works with PubNub transport type                                                                        |
| 405               | SUB-511       | Action not allowed for APNS subscription                                                                                      |
