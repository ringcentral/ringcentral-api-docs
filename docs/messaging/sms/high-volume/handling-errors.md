# Handling High Volume SMS Errors

High Volume SMS provides detailed error codes for reasons why a SMS may have failed sending or delivery which can be used to determine how to adjust your campaigns.

## Error Code Structure

Error codes are composed of a prefix and a number. The prefix identifies the error reporting party and the numeric code is aligned with HTTP response status codes. In the following error code, `SMS-CAR-411`, `SMS-CAR-` is the prefix and `411` is the numeric code.

### Error Reporting Party Prefix

For SMS, there are 3 parties that can return an error:

| Party | Error Code Prefix | Description |
|-|-|-|
| RingCentral | `SMS-RC-` | RingCentral's own error checking. |
| Upstream Provider | `SMS-UP-` | This is the upstream sending carrier. |
| Recipient's Carrier | `SMS-CAR-` | This is the recipient's wireless provider. |

### Error / Status Numbers

The numerical portion of the error follows a subset of HTTP status conventions:

1. Informational responses (100–199)
1. Client errors (400–499)
1. Server errors (500–599)

## Common Errors

Commonly encountered errors fall into categories:

1. Sending to invalid numbers such as landline numbers or other numbers that cannot support texting.
1. Being rejected as spam.

### Invalid Number

When you receive an error that indicates a number is invalid or unavailable (e.g. `SMS-UP-410`, `SMS-UP-411`, `SMS-UP-412`, `SMS-UP-413`), you should make a note of it and consider stopping messages to that number. You can also ask your user to confirm the validity of their number (via SMS) before resuming messages.

A common reason for this is texting to landline numbers that do not have texting capability. An API service like [NumVerify](https://numverify.com/) can be used to check whether a number is a landline number (without texting capability) or a mobile number (likely with texting capability).

### Spam

If are receiving a lot of spam rejections, your users may be indicating this is spam or the carrier may be using spam detection algorithms. In this case, you should consider changing your message so it is not recognized as spam. After you change your message, you may want to consider provisioning a new phone number with the updated messages as your existing number may be blacklisted.

Different recipient wireless carriers will have different spam policies so it may be worthwhile to check errors against recipient carrier. An API service like [NumVerify](https://numverify.com/) can also be used to identify the recipient's wireless carrier.

## Expected Errors

Some information is provided for informational purposes and while it may be classified as an error, may be expected from  carriers. For example, it may not possible to get delivery status from carriers as reported by `SMS-CAR-104` and `SMS-CAR-199`. When checking for delivery success and failure, you may want to verify receipt of the SMS message before classifying these as non-delivered messages.

## Error Code List

| Code | Description |
|-|-|
| `SMS-UP-410` | Destination number is invalid, unallocated, or does not support this kind of messaging. |
| `SMS-UP-430` | This message has been filtered and blocked by a upstream carrier for spam. |
| `SMS-UP-431` | From number is blacklisted due to spam or other violations. |
| `SMS-UP-500` | General upstream error. Upstream is malfunctioning. |
| `SMS-CAR-104` | Carrier has not reported delivery status. |
| `SMS-CAR-199` | Carrier reports unknown message status. |
| `SMS-CAR-400` | Carrier does not support this kind of messaging. |
| `SMS-CAR-411` | Destination number invalid, unallocated, or does not support this kind of messaging. |
| `SMS-CAR-412` | Destination subscriber unavailable. |
| `SMS-CAR-413` | Destination subscriber opted out. |
| `SMS-CAR-430` | This message has been filtered and blocked by a recipient's carrier for spam. |
| `SMS-CAR-431` | Message rejected by carrier with no specific reason. |
| `SMS-CAR-432` | Message too long. |
| `SMS-CAR-433` | Message is malformed for the carrier. |
| `SMS-CAR-450` | P2P messaging volume violation. Please contact RingCentral support to review your account settings and ensure you are utilizing the appropriate A2P provisioning for high volume traffic |
| `SMS-CAR-460` | Destination rejected short code messaging. Currently not applicable for RingCentral. |
| `SMS-CAR-500` | Carrier reports general service failure. |
| `SMS-RC-410` | Destination number unsupported. |
| `SMS-RC-413` | Destination subscriber opted out. |
| `SMS-RC-430` |This message has been filtered and blocked by a RingCentral's message filtering system for spam. |
| `SMS-RC-500` | General/Unknown internal RC error. |
| `SMS-RC-501` | RingCentral is sending an invalid upstream API call. Please raise a support ticket with RingCentral developer support.|			
| `SMS-RC-503` | RingCentral provisioning error. Phone number is incorrectly provisioned by RingCentral in upstream. |
