Faxes are a popular communication mechanism for sending files supported by RingCentral.

There are two ways send faxes, one using `multipart/form-data` and another using `multipart/mixed` described below, the choice of which may depend on your API client.

For more information on fax support, see the following resources:

* [API Reference](https://developers.ringcentral.com/api-reference#Fax-sendFaxMessage)
* [Developer FAQ](http://ringcentral-faq.readthedocs.io/en/latest/fax/)

## Send fax using multipart/form-data

`multipart/form-data` is a popular approach for sending faxes because many HTTP client libraries support `multipart/form-data` natively due to the fact it is supported by web browsers.

### Example Request

```bash
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: multipart/form-data;boundary=Boundary_14_2952358_1361963763144
Authorization: Bearer MyToken

--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="coverPageText"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain


--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="coverIndex"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

2
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="faxResolution"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

High
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="sendTime"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

2030-03-19T08:00:00.000Z
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="isoCode"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

UK
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="to"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

18001234567
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="to"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

18001234568
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment0
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment1
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment2
--Boundary_14_2952358_1361963763144--
```

## Send fax using multipart/mixed

`multipart/mixed` is more compact as shown below but is not supported natively by HTTP clients so either a RingCentral SDK or custom `multipart/mixed` code may be useful.

```bash
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: multipart/mixed; boundary=Boundary_1_14413901_1361871080888
Authorization: Bearer MyToken

--Boundary_1_14413901_1361871080888
Content-Type: application/json

{"to":[{"phoneNumber":"18001234567"}],
 "faxResolution":"High",
 "sendTime":"2013-02-26T09:31:20.882Z"}

--Boundary_1_14413901_1361871080888
Content-Disposition: attachment; filename="fax.txt"

Hello, World!

--Boundary_1_14413901_1361871080888--
```

## Forwarding and Resending Faxes

With RingCentral, you can forward or resend a fax that has been previously sent through the system. In this case, the RingCentral API can use the fax message already stored on our servers so there is no need to send the message again. This can be useful for the following use cases:

1. forwarding a received inbound fax to another fax number
2. resending a fax that has not been received

The request takes a JSON body with the following parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `originalMessageId` | `string` | yes | original message to be resent identifier |
| `to` | List of `CallerInfo` | no | resend the message to another recipient(s) |
| `sendTime` | `DateTime` | no | time to resend fax |

### Example request

The request below shows the required `originalMessageId` property with the optional `to` and `sendTime` properties.

```bash
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: application/json
Authorization: Bearer MyToken

{
  "originalMessageId": "12345678",
  "to": [ { "phoneNumber": "+16501112222" } ],
  "sendTime": "2016-12-01T00:00:00Z"
}
```
