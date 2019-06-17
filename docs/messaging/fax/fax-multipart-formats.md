# Fax Multipart Formats

Fax documents can be packaged using two different MIME formats: `multipart/form-data` and `multipart/mixed`. The distinction between these two formats is nuanced. If you are using a RingCentral SDK then it is not entirely necessary to know the difference as the SDK takes care of packaging for you. However, if you are writing your own client to transmit faxes, then this guide will help you encode your MIME attachments properly. 

## Send a Fax Using multipart/form-data

`multipart/form-data` is a popular approach for sending faxes because many HTTP client libraries support `multipart/form-data` natively due to the fact it is supported by web browsers.

### Example Request

```http
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

## Send a Fax Using multipart/mixed

`multipart/mixed` is more compact as shown below but is not supported natively by HTTP clients so either a RingCentral SDK or custom `multipart/mixed` code may be useful.

```http
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

