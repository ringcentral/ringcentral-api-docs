# Fax

Faxes are a popular communication mechanism for sending files supported by RingCentral.

There are two ways send faxes, one using `multipart/form-data` and another using `multipart/mixed` described below, the choice of which may depend on your API client.

For more information on fax support, see the following resources:

* [Developer Guide](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefFaxMessages.html)
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

