# Handling SMS Messaging Errors

SMS message delivery can fail for a variety of reasons, such as invalid phone numbers, carrier filtering, network issues, or recipient device problems. Successfully invoking the SMS API—whether to send a single message or a batch of messages—only confirms that the request was accepted by the system. It does not guarantee that the messages will be delivered to the intended recipient(s). Delivery status should always be verified through the message record updates provided by the API.

If the API successfully pushes a message to the sending queue, it creates a corresponding message record and stores it in the message store database. This record serves as a persistent log, allowing developers to track the message’s lifecycle, query its status, and retrieve its content when needed.

- When a message is sent and successfully delivered, its record will be updated with the status "Delivered", as shown in the example below:

```json
"to": [
        {
          "phoneNumber": "+1650513XXXX",
          "messageStatus": "Delivered"
        }
      ],
```

- If a message fails to send, its record will be updated with the corresponding status and error code, as shown in the example below:

```json
"to": [
        {
          "phoneNumber": "+1209248XXXX",
          "messageStatus": "SendingFailed",
          "errorCode": "SMS-RC-413"
        }
      ],
```

## SMS Error Code Structure

SMS error codes consist of a prefix and a numeric value. The prefix identifies the source reporting the error, while the numeric portion represents the specific error code. For example, in `SMS-CAR-411`, the prefix is `SMS-CAR-` and the numeric code is `411`. There are 3 sources that can return an error:

| Source | Error Code Prefix | Description |
| :---- | :---- | :---- |
| RingCentral  |  `SMS-RC-` | This error is detected and reported by RingCentral when it sends a message to the upstream unsuccessfully. |
| Upstream Provider |  `SMS-UP-` | This error is detected and reported by the upstream (e.g. Bandwidth) when it sends a message to a mobile carrier. |
| Recipient's Carrier | `SMS-CAR-` | This error is detected and reported by a recipient's wireless provider (e.g. T-Mobile, Verizon etc.). |

## Common Errors

Commonly encountered errors fall into categories:

1. Sending to invalid numbers such as landline numbers or other numbers that cannot support SMS messaging.
2. Being rejected as spam.
3. Being rejected by carriers due to daily/monthly throughput limits on your TCR brand and campaign.
4. Not enough credits.
5. Number is blocked due to compliance violation.
6. The recipient opted out.

## Error Code List

### Error returned by RingCentral Messaging Service

| Code | Description | Remedy |
| :---- | :---- | :---- |
| `SMS-RC-410`  |  Destination number unsupported. | Check the recipient's phone number. Make sure the number is valid and not a landline phone number. |
| `SMS-RC-413`  |  The destination subscriber opted out. |  Check your number’s opt-out list. If a recipient has opted out, contact them through another channel to obtain consent for SMS messages. To opt back in, the recipient must reply **START** to your RingCentral number. |
| `SMS-RC-430`  | This message has been filtered and blocked by RingCentral's message filtering system for spam. | Modify the message and make sure the content complies with our [content policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html) and try again. |
| `SMS-RC-500`  |  General/Unknown internal RC error. | Submit a support ticket with [RingCentral developer support](https://developers.ringcentral.com/support/create-case). |
| `SMS-RC-501`  | RingCentral is sending an invalid upstream API call. | Submit a support ticket with [RingCentral developer support](https://developers.ringcentral.com/support/create-case). |
| `SMS-RC-503`  | RingCentral provisioning error. Phone number is incorrectly provisioned by RingCentral in upstream. | Submit a support ticket with [RingCentral customer support](https://support.ringcentral.com/contact-support.html) |
| `SMS-RC-504`  | RC provisioning error. Invalid SMS provider configuration. | Contact your account administrator. |

### Error returned by RingCentral SMS Upstream (Gateway)

| Code | Description | Remedy |
| :---- | :---- | :---- |
| `SMS-UP-410`  |  Destination number invalid, unallocated, or does not support this kind of messaging. | Check the recipient's phone number. Make sure the number is valid and not a landline phone number. |
| `SMS-UP-413`  |  The destination subscriber opted out. |   Check your number’s opt-out list. If a recipient has opted out, contact them through another channel to obtain consent for SMS messages. To opt back in, the recipient must reply **START** to your RingCentral number. |
| `SMS-UP-414`  |  This phone number is not set up to send text messages. | Contact your account administrator. |
| `SMS-UP-430` | Your message wasn't delivered because it may contain spam content. | Modify the message and make sure the content complies with our [content policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html) and try again. |
| `SMS-UP-431`  |  This number has been flagged for potential spam. You can no longer send messages from this number. | Contact your RingCentral admin. |
| `SMS-UP-432`  |  Content length exceeded maximum supported request size. | Check the length of the message and reduce it to less than 1000 characters. |
| `SMS-UP-433`  |  Your message couldn’t be delivered as written. Please revise it and try again. | Please review the message content, revise it if necessary, and send it again. |
| `SMS-UP-500`  |  General upstream error. Upstream is malfunctioning. | Please retry later and contact RingCentral support if this happens often. |

### Error returned by a Carrier

| Code | Description | Remedy |
| :---- | :---- | :---- |
| `SMS-CAR-104`  |  Carrier has not reported delivery status. | Check the message status again after an hour. |
| `SMS-CAR-199`  |  Carrier reports unknown message status. | None – the message may have been delivered, but the carrier did not return a status confirmation. |
| `SMS-CAR-400`  |  Carrier does not support this kind of messaging. | Contact the recipient via phone call, as they do not support text/SMS. |
| `SMS-CAR-410`  |  Message was expired/canceled before reaching SMSC. | Please retry later and contact RingCentral support if this happens often. |
| `SMS-CAR-411`  |  Destination number invalid, unallocated, or does not support this kind of messaging. | Please validate the recipient's phone number’s format/status or use an alternative channel (e.g., voice) if SMS isn’t supported. |
| `SMS-CAR-412`  |  Destination subscriber unavailable. Check the recipient number's carrier. | Please validate the recipient's phone number’s format/status or use an alternative channel (e.g., voice) if SMS isn’t supported. |
| `SMS-CAR-413`  |  The destination subscriber opted out. | Check your number’s opt-out list. If a recipient has opted out, contact them through another channel to obtain consent for SMS messages. To opt back in, the recipient must reply **START** to your RingCentral number.  |
| `SMS-CAR-414`  |  Source number is invalid. This phone number isn't set up to send text messages | Contact your RingCentral admin. |
| `SMS-CAR-430`  |  This message has been filtered and blocked by a recipient's carrier for spam. | Check the message content and verify the content against your company TCR registration. |
| `SMS-CAR-431`  |  Message rejected by carrier with no specific reason. | Please retry later and contact RingCentral support if this happens often. |
| `SMS-CAR-432`  |  Message too long. | Some carriers do not support concatenate messages. Reduce the length of the message to 160 characters. |
| `SMS-CAR-433`  |  Message is malformed for the carrier. | Please review the message content, revise it if necessary, and send it again. |
| `SMS-CAR-434`  |  Rejected as media size is too large. | Reduce the size of attachments. |
| `SMS-CAR-435`  |  Rejected due to shortened url. | Please obtain your own dedicated domain if shortened links are needed for SMS. |
| `SMS-CAR-450`  | T-Mobile rejected this SMS as you have sent over the daily limit for your 10DLC Brand. | Please contact RingCentral support to review your account’s TCR brand and campaign scores and throughputs.  |
| `SMS-CAR-451`  |  AT&T rejected this SMS as you have sent over the daily limit for your 10DLC Campaign. | Please contact RingCentral support to review your account’s TCR brand and campaign scores and throughputs. |
| `SMS-CAR-452`  |  Carriers rejected this SMS as you have sent over the allotted limit. | Please contact RingCentral support to review your account’s TCR brand and campaign scores and throughputs. |
| `SMS-CAR-460`  |  Destination rejected short code messaging. Currently not applicable for RingCentral. | Not Applicable for RingCentral, as we don’t support Short Codes. |
| `SMS-CAR-461`  |  The message was blocked by carriers as your toll free number is not verified. | Please contact support or start the [Toll-Free Verification process](https://support.ringcentral.com/article-v2/Verifying-your-toll-free-number-for-SMS.html?brand=RingCentral&product=RingEX&language=en_US). |
| `SMS-CAR-500`  |  Carrier reports general service failure. | Please wait for some time and try again. |
