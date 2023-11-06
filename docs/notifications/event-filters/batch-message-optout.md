# Batch Message Opt-Out Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/~/a2p-sms/opt-outs` enables notifications in case customers opt out.
Opt-out events are sent when a user connects to the RingCentral opt-out service using standard keywords including stop, unstop, start, etc.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Query Parameters

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction` | 'Inbound' or 'Outbound' | Specifies if notification is sent on inbound or outbound messages |
| `batchId`   | string | Notification is sent on inbound/outboud messages of the specific message batch |
| `from`      | string | Notification is sent on outbound messages from a specific phone number in E.164 format |
| `to`        | string | Notification is sent on inbound messages to a specific phone number in E.164 format |

## Opt-Out Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the message is sent  |
| `to` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which the message is sent |
| `active` | boolean | Indicates if opt-out service is active or not from/to the number specified|


## Example

```json
{
  "uuid":"12345678901234567890",
  "event":"/restapi/v1.0/account/11111111/a2p-sms/opt-outs",
  "timestamp":"2020-10-01T00:00:00.000Z",
  "subscriptionId":"11112222-3333-4444-5555-666677778888",
  "ownerId": "22222222",
  "body":{
     "from":"+16505550100",
     "to":"+12125550100",
     "active":true
  }
}
```
