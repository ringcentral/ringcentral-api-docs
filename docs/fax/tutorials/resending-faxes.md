# Forwarding and Resending Faxes

With RingCentral, you can forward or resend a fax that has been previously sent through the system. In this case, the RingCentral API can use the fax message already stored on our servers so there is no need to send the message again. This can be useful for the following use cases:

1. forwarding a received inbound fax to another fax number
2. resending a fax that has not been received

The request takes a JSON body with the following parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `originalMessageId` | `string` | yes | original message to be resent identifier |
| `to` | List of `CallerInfo` | no | resend the message to another recipient(s) |
| `sendTime` | `DateTime` | no | time to resend fax |

## Example Request

The request below shows the required `originalMessageId` property with the optional `to` and `sendTime` properties.

```http
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: application/json
Authorization: Bearer MyToken

{
  "originalMessageId": "12345678",
  "to": [ { "phoneNumber": "+15551234567" } ],
  "sendTime": "2016-12-01T00:00:00Z"
}
```

