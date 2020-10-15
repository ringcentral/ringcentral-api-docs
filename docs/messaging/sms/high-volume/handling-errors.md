# Handling High Volume SMS Errors

High Volume SMS provides detailed error codes for reasons why a SMS may have failed sending or delivery which can be used to determine how to adjust your campaigns.


| Code | Description |
|-|-|
| SMS-UP-410 | Destination number invalid, unallocated, or does not support this kind of messaging. |
| SMS-UP-430 | Spam content detected. |
| SMS-UP-431 | Number blacklisted due to spam. |
| SMS-UP-500 | General upstream error. Upstream is malfunctioning. |
| SMS-CAR-104 | Carrier has not reported delivery status. |
| SMS-CAR-199 | Carrier reports unknown message status. |
| SMS-CAR-400 | Carrier does not support this kind of messaging. |
| SMS-CAR-411 | Destination number invalid, unallocated, or does not support this kind of messaging. |
| SMS-CAR-412 | Destination subscriber unavailable. |
| SMS-CAR-413 | Destination subscriber opted out. |
| SMS-CAR-430 | Message is spam. |
| SMS-CAR-431 | Message rejected by carrier with no specific reason. |
| SMS-CAR-432 | Message too long. |
| SMS-CAR-433 | Message is malformed for the carrier. |
| SMS-CAR-450 | P2P messaging volume violation. |
| SMS-CAR-460 | Destination rejected short code messaging. Currently not applicable for RC. |
| SMS-CAR-500 | Carrier reports general service failure. |
| SMS-RC-500 | General/Unknown internal RC error. |
| SMS-RC-501 | RC is making a bad upstream API call. |			
| SMS-RC-503 | RC provisioning error. Phone number is incorrectly provisioned by RC in the upstream. |
