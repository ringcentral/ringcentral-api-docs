# Bulk Requests

One of the commonly used REST practices is the support of bulk operations to retrieve multiple homogeneous resources by their key using a single request. The RingCentral API supports bulk requests for a number of endpoints and objects, including messages, call records, blocked numbers, presence, and more. They are implemented via the methods `GET`, `DELETE` and `PUT` with all their features. Bulk operations are not transaction-atomic. Each resource in a bulk request is processed separately from the others, making it possible to receive different success/failure results for different resources wrapped in a multipart response object. The HTTP status code `207 Multi-Status` is returned in every multipart response object and indicates a bulk request.

!!! info "207 Multi-status is not returned for error accessing the endpoint"
    The `207 Multi-Status` code is not returned in response body in case of error accessing the endpoint. For example, if the requested endpoint does not exist at all, `404 Not Found` status code is returned. If there is a server error, `5xx` status code is returned.
    In bulk `DELETE` operations (if all resources are deleted successfully) the server returns the `204 No content` instead of multi status (since all parts would be identical in this case). In case of at least one failure the server returns the `207 Multi-Status`.

Apart from the top-level special status code in case of success, a multipart response object contains status codes in each part, representing a particular requested resource. This status specifies an individual result for each requested resource out of the bulk request. Let's consider the examples of bulk request below.

## Bulk request for `GET` method

### Multipart/Mixed

**Request**

```http 
GET /restapi/v1.0/account/~/extension/~/message-store/2447722008,2416832008 HTTP/1.1
Accept: application/json
```

**Reponse**

```json
{!> code-samples/basics/batch-request-get-1.txt !}
```

### Multipart+Json

**Request**

```http
GET /account/306059004/extension/306061004/message-store/972869004,111 HTTP/1.1
Accept: application/vnd.ringcentral.multipart+json
```

**Response**

```json
{!> code-samples/basics/batch-request-get-2.txt !}
```

## Bulk request for `PUT` method

### Multipart/Mixed

The client has to specify:
    - multipart/mixed content type and boundary;
    - modified fields for every single item which needs to be updated, separated by multipart boundaries.

**Request**

```http
PUT /restapi/v1.0/account/~/extension/~/message-store/401654758008,401642088008 HTTP/1.1
Content-Type: multipart/mixed; boundary=Boundary_1_15567762_1355833573664

--Boundary_1_15567762_1355833573664
Content-Type: application/json

{"readStatus": "Read"}
--Boundary_1_15567762_1355833573664
Content-Type: application/json

{"readStatus": "Read"}
--Boundary_1_15567762_1355833573664--
```

**Response**

```json
{!> code-samples/basics/batch-request-put-1.txt !}
```

### Multipart+Json

**Request #1 (IDs in path)**

```json
PUT /account/306065004/extension/306067004/message-store/972903004,972901004 HTTP/1.1
Content-Type: application/vnd.ringcentral.multipart+json

[
  {
    "body": {
      "readStatus": "Read"
    }
  },
  {
    "body": {
      "readStatus": "Read"
    }
  }
]
```

**Request #2 (IDs in body)**

```http
PUT /account/306065004/extension/306067004/message-store/* HTTP/1.1
Content-Type: application/vnd.ringcentral.multipart+json

[
  {
    "resourceId": "972903004",
    "body": {
      "readStatus": "Read"
    }
  },
  {
    "resourceId": "972901004",
    "body": {
      "readStatus": "Read"
    }
  }
]
```

**Response**

```json
{!> code-samples/basics/batch-request-put-2.txt !}
```
