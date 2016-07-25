The RingCentral API is based on the Representational State Transfer (REST) architecture. REST is not a standard but an architectural style, and it uses the following standards:

* HTTP
* URL
* XML/HTML/GIF/JPEG/etc. (resource representations)
* text/xml, text/html, application/json, image/jpeg, etc. (MIMETypes)

REST allows you to access the API in the same way you would access a web server. Whenever you want to access any API service, send a standard HTTP command to a particular resource that represents the required functionality. Every API service is represented by a specific endpoint that is accessed by its own URI via sending standard requests using HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

One of the key advantages of REST architecture is simplicity. You can build your application on the fly without any additional tools, development kits or specifications. If you know how to interact with a simple web server, then you are ready to use the RingCentral API.

# Resources and Parameters

Every entity in the RingCentral API is represented with a certain resource identified by a specific URI. The structure of each resource URI is similar to that of the web page URL. The URI syntax is represented by the following scheme:

`<protocol> :// <hostname> [: <port>] / <path> [? <query>] [# <fragment>]`

* **protocol** indicates a networking protocol (http or https protocols are generally used in REST).
* **hostname** is a part of the URI that contains server network address information.
* **port** is a TCP port where server listens for incoming requests. If omitted, the default value is used for a given protocol.
* **path** is a resource identification hierarchical by nature.
* **query** is an optional part separated by a question mark (?) and contains additional identification information that is not hierarchical in nature. The query string syntax is commonly organized as a sequence of key=value pairs separated by an ampersand. In the case of the RingCentral API, key is a name of query parameter, while value is its value. Not all API resources allow query parameters.
* **fragment** is an optional part separated from the front parts by hash symbol (#), that contains additional information redirecting to a secondary resource; for example, a section heading of an article identified by the URI. The RingCentral REST API does not use fragments.

Protocol, host and port altogether constitute the main entry point to access the API.

RingCentral production servers are accessible on `https://platform.ringcentral.com`. Please note that for security reasons connection is allowed using only HTTPS protocol to the default HTTPS port 443, so the port can be omitted in the URI.

---

**Note** 

If you plan to work with non-production servers you may be required to use other entry points. For example, RingCentral Sandbox environment is accessible via `https://platform.devtest.ringcentral.com` base URI. If you are not sure what URI you should use for your environment, please contact RingCentral Technical Support to get proper connection settings.

---

All of the API resources are organized in a hierarchical manner and presented in a tree-like structure. All resource paths are started from /restapi. Let's consider a typical API resource URI:

`https://platform.ringcentral.com/restapi/v1.0/account/159048008/extension/171857008/call-log?dateFrom=2012-08-26`

The URI in the example above contains path parameters highlighted in bold. Path parameters are commonly used in the RingCentral API to identify a particular entity belonging to a given type by its unique key. Since most of the API resources represent some objects which are owned by particular a RingCentral account (company) or user, two basic path parameters are accountId and extensionId. They identify the account and extension of a RingCentral user, accordingly.

---

**Note**

RingCentral users associate an account with the company main phone number and an extension with the short extension number, but both accountId and extensionId are internal identifiers.

---

At the same time the typical API usage scenario includes accessing particular resources on behalf of some user whose credentials (phone number, extension number and password) were passed on authentication phase. Thus in this case API enables the simplified syntax of specifying account and extension identifiers in the URI. The tilde symbol (~) can be used as a replacement for both accountId and extensionId if you are going to access data that belongs to account/extension that you are currently logged in to. Considering the example above, if the user successfully authenticated to work with account 159048008 and extension 171857008 the URI to retrieve the same resource may be written as follows:

`https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log?dateFrom=2012-08-26`

Apart from these two basic path parameters you will also meet the others while learning the API. They will be discussed further in this guide and are extensively described in the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#APIReference.html).

Another kind of parameter you will come across in the RingCentral API is a *query parameter*. Query parameters are generally used in object retrieval operations and let the consumer specify the filtering criteria, the desired level of details, etc. Query parameter values in the URL have to be encoded according to [RFC-1738: Uniform Resource Locators](https://tools.ietf.org/html/rfc1738). Query parameters support setting multiple values. It is possible to specify several values for a single query parameter, and filtering results will cover all of them. For example, this functionality is applied to retrieve or remove lists of messages and records.

Let's consider the examples below to illustrate the API resources and parameters. For simplicity reasons, we will exclude protocol and host values from the URIs in the examples.

* Get service plan information for RingCentral customer account (accountId will be automatically determined from authentication data):

`/restapi/v1.0/account/~/service-info`

* Get all SMS messages from a mailbox of account user (extensionId is specified explicitly):

`/restapi/v1.0/account/~/extension/171857008/message-store?messageType=SMS`

* Get all SMS and Pager messages from a mailbox of account user:

`/restapi/v1.0/account/~/extension/~/message-store?messageType=SMS&messageType=Pager`

# API Methods

## HTTP Methods

In the RingCentral API, as in any REST API, the resources are accessible by standard HTTP methods: GET, POST, PUT and DELETE. These methods form a uniform CRUD interface expanded as "create, retrieve, update and delete".

* `GET` method is idempotent and retrieves the object represented by the resource that is specified in the request body. It may be the call log information for an extension, the address book with contacts, etc.

* `POST` method creates a new object represented by the resource that is specified in the request. In the response body the server sends the representation of the created object, as if there is an immediate `GET` request for it.

* `PUT` method modifies the already existing object represented by the resource that is specified in the request body. If the object was successfully modified, the server responds with the representation of the changed resource in the response body. The request body may contain only the modified properties of the resource. The response returns the entire resource representation with all of the properties, as in case of the `GET` request.

* `DELETE` method removes the object represented by the resource that is specified in the request body.

Let's consider a simple example of a `GET` method — retrieving the version of the RingCentral REST API.

```
GET /restapi/v1.0 HTTP/1.1
Accept: application/json
Authorization: Bearer UExBMDFUMDRQV1MwMnzpdvtYYNWMSJ7CL8h0zM6q6a9ntw

HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri" : "https.../restapi/",
  "apiVersions" : [ {
    "uri" : "https.../restapi/v1.0",
    "versionString" : "1.0.9",
    "releaseDate" : "2013-12-01T00:00:00.000Z",
    "uriString" : "v1.0"
  } ],
  "serverVersion" : "6.1.0.846",
  "serverRevision" : "294476"
}
```

The majority of API resources do not support all of the four methods. In order to find out which resources support a particular method, please refer to API Reference.

## Method Tunneling

Sometimes, due to different technical limitations, API clients cannot issue all HTTP methods. In the most severe case a client may be restricted to `GET` and `POST` methods only. To work around this situation the RingCentral API provides a mechanism for tunneling `PUT` and `DELETE` methods through `POST`. This can be achieved in two ways:

1. **`X-HTTP-Method-Override` header**

Using X-HTTP-Method-Override the client instructs the server to override the actual value of the HTTP method by one passed in this header. For example, the following request:

    DELETE /restapi/v1.0/account/~/extension/~/message-store/4084362008 HTTP/1.1
                 
can be alternatively sent as:

    POST /restapi/v1.0/account/~/extension/~/message-store/4084362008 HTTP/1.1
    X-HTTP-Method-Override: DELETE
                 
2. **`_method` query parameter**

In really unfortunate circumstances some clients do not even support HTTP headers. The API allows overriding the method name using _method query parameter. See the example below which demonstrates this approach.

    POST /restapi/v1.0/account/~/extension/~/message-store/4084362008?_method=DELETE HTTP/1.1
                 
If both the override header and query parameter are specified in the HTTP request and contain different values, the server returns `HTTP 400 Bad Request` error.

Tunneling HTTP methods should be used only when no other workaround is available. Each HTTP method has its own characteristics, such as how it is cached, which HTTP clients and intermediaries expect. When tunneling these methods through HTTP POST, those expectations can no longer be met.

# Object Representation

Whenever you need to send or retrieve a particular piece of data — for example, a call log record, information on an extension, etc. — it will be embedded in the HTTP request or response.

The RingCentral API allows you to explicitly define a representation format by using the following HTTP headers.

`Content-Type` header defines the MIME type of the request body. The server will expect the request body to contain data in the specified format.

`Accept` header indicates desired MIME type of the response body. The server will return response data in this format (if possible) and will set the `Content-Type` response header accordingly.

---

**Note**

The API server accepts and returns all string values in UTF-8 encoding and does not support other character sets. It is not required to explicitly specify charset in Content-Type and Accept HTTP headers. But a client has to implement proper encoding/decoding of character strings passed in HTTP requests/responses.

---

## Supported Representation Formats

| Format | MIME type | HTTP request/response body example |
| ------ | --------- | ---------------------------------- |
| JSON   | `application/json` |	{<br/>   "uri": "https://platform.ringcentral.com/restapi/v1.0",<br/>   "versionString": "1.0.0",<br/>   "releaseDate": "2012-06-14T00:00:00.000Z",<br/>   "uriString": "v1.0"<br/>} |
| HTML Form Data<br/>*(only for token request body as governed by OAuth 2.0 specification)* | `application/x-www-form-urlencoded` | grant_type=password&username=18887776655&password=987654 |

The RingCentral API uses JSON as the default representation format. It means that if the `Accept` header is not set, the server will return results in JSON. And, consequently, all of the examples in this guide are given in JSON.

However, `Content-Type` header is mandatory for all requests which have body (namely requests with `POST` and `PUT` HTTP methods). Also for such requests client is required to provide Content-Length header containing the length of the request body in bytes.

# Data Types

The table below describes the data types which are used in the RingCentral API.

| Data Type     | Description |
| ------------- | ----------- |
| `string`      | General string value |
| `enumeration` | Predefined string constants/List of predefined string constants |
| `integer`     | 64-bit integer value |
| `datetime`    | Timestamp in XML schema-compatible format, in accordance with [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone. <br/>Note that "T" appears literally in the string, to indicate the beginning of the time element.<br/>The supported formats with the examples are as follows:<br/>Year: `YYYY` (eg 2012)<br/>Year and month: `YYYY-MM` (eg 2012-07)<br/>Complete date: `YYYY-MM-DD` (eg 2012-07-16)<br/>Complete date plus hours and minutes: `YYYY-MM-DDThh:mmTZD` (eg 2012-07-16T23:12:30)<br/>Complete date plus hours, minutes and seconds:<br/>`YYYY-MM-DDThh:mm:ssTZD` (eg 2012-07-16T23:12:30Z or 2012-07-16T23:12:30+04:00)<br/>Complete date plus hours, minutes, seconds and a decimal fraction of a second: `YYYY-MM-DDThh:mm:ss.sTZD` (eg 2012-07-16T23:12:30.45Z)<br/><br/>where:<br/><br/>`YYYY` = four-digit year<br/>`MM`   = two-digit month (01=January, etc.)<br/>`DD`   = two-digit day of month (01 through 31)<br/>`hh`   = two digits of hour (00 through 23) (am/pm NOT allowed)<br/>`mm`  = two digits of minute (00 through 59)<br/>`ss`   = two digits of second (00 through 59)<br/>`s`    = one or more digits representing a decimal fraction of a second<br/>`TZD`  = time zone designator (Z or +hh:mm or -hh:mm)<br/><br/>The server currently processes all timestamps in UTC timezone; for example, 2012-01-01T00:15:34Z.<br/><br/>By default the server returns datetime format in full format, including a decimal fraction of a second YYYY-MM-DDThh:mm:ss.sTZD, for example 2012-07-16T23:12:30.45Z).<br/><br/>Please note, that when comparing timestamps, the timestamp is truncated to a second precision. For example, the response to request where the 'dateFrom' value equals to 2012-07-16T23:12:30.45Z is always identical to the one with the 'dateFrom' value 2012-07-16T23:12:30Z. |

# Resource Identification Properties

The table below describes properties which are supported by almost all API resources and used for identification purposes.

| Parameter | Type       | Description |
| --------- | ---------- | ----------- |
| `id`      | string     | Internal unique identifier of a resource. This property exists in all resources which support retrieval/update/delete of a single record of particular type. Depending on a resource it can hold either an integer or a string value. The resource `id` is also passed as a path parameter in the URI |
| `uri`     | URI string |Canonical URI of a resource. This URI might not be the same as the one which was used to retrieve this resource information. For example, if a resource was accessed by the URI containing simplified syntax with the tilde (~) characters, the canonical URI will also contain real identifiers. In most cases the URI contains an `id` value embedded as a path parameter |

The similar convention is used when one resource refers to another. For example, a direct phone number returned by the API contains a link to the extension it is assigned to in the following property:
```
"extension":
  {
    "id": 234244008,
    "uri": ".../account/405884008/extension/234244008"
  }
```

# User Agent Identification

It is strongly recommended that client applications provide the `User-Agent` HTTP header with every request, which should contain the key information about the requesting application, including application name, version, OS/platform name and version, etc. For browser-based (JavaScript) applications it is usually not possible to override the user agent string which is sent by browser. But other types of applications (desktop, mobile and server-side) can easily follow this recommendation.

There are three main rules:

* Client should send `User-Agent` value with each request
* Particular application instance should send exactly the same user agent string in all API requests
* The format of user agent value should follow the convention described below.

We recommend using a short application name and version delimited by forward slash character and optionally followed by additional details about this client instance in parentheses (e.g. operating system name, version, revision number, etc.).

Look at the examples below:
```
User-Agent: RCMobile/3.6.0 (RingCentral; Android/2.6; rev.12345)
User-Agent: RCMobile/3.6.1 (OfficeAtHand; iOS/6.0; rev.987654)
User-Agent: Softphone/6.2.0.11632
```

The `User-Agent` string format is described in [RFC-1945](https://tools.ietf.org/html/rfc1945) and [RFC-2068](https://tools.ietf.org/html/rfc2068).

# Languages Support

In most cases the content returned by RingCentral API is not localized because it is assumed to be machine-readable, not human readable. So all constants, enumerated values, error codes are in US English. However there are some API methods which return localized content. In this case client application can pass the preferred language (locale) code in the `Accept-Language` HTTP header. If this header is omitted, incorrect or contains unsupported language code, the server returns localized content in the language which is configured in user extension's regional settings (by default, `en-US` for RingCentral US and Canada accounts, `en-GB` for RingCentral UK accounts).

The server returns the language code in the `Content-Language` header in response.

For example, if one needs to get the localized content in English (UK variant)
```
GET /restapi/v1.0/.... HTTP/1.1
Authorization: Bearer U0pDMDFQMDFQQVMwMnxBQUFWZmY4ZXoxM
Accept-Language: en-GB
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-GB

{...}
```

# Response Status Codes. Error Handling

The RingCentral API is built on top of HTTP protocol, making use of general concepts and common HTTP status codes to inform a client on results of method calls.

The possible response scenarios are:

1. Success — HTTP response with `2xx` or `3xx` status code and optionally - body payload depending on the request.
2. Client Error — HTTP response with a `4xx` status error code. Occurs if client does something disallowed or incorrect.
3. Server Error — HTTP response with a `5xx` status code. Occurs in case of unexpected issues on server side.

## Response Status Codes

`HTTP 2xx` - Success — `200`, `201`, `202`, `204`, `206`

Indicate that the action requested by the client was received, understood, accepted and processed successfully.

`HTTP 207` is a multi-status code which is returned for API requests consisting of multiple parts. In this case the first part of a multipart response contains JSON array with HTTP status codes corresponding to each part of a response, see also [Multi-Status](http://restpatterns.org/HTTP_Status_Codes/207_-_Multi-Status), [Batch Requests](#batch-requests).

*Example*

```
GET /restapi/v1.0/account/1446856004/extension/1446856004/message-store/2147676004,2147694004 HTTP/1.1
Authorization: Bearer U0pDMDFQMDFQQVMwM3xBQURiN1lJRkROUTIya2xPaEhMaFR0WEVmLe_T0eA
Accept: application/json
```

```
HTTP/1.1 207 
Content-Type: multipart/mixed;boundary=Boundary_4061_632833321_1448881816038
Content-Language: en-US
Content-Length: 2406

--Boundary_4061_632833321_1448881816038
Content-Type: application/json

{
  "response" : [ {
    "href" : "https.../restapi/v1.0/account/1446856004/extension/1446856004/message-store/2147676004",
    "status" : 200,
    "responseDescription" : "OK"
  }, {
    "href" : "https.../restapi/v1.0/account/1446856004/extension/1446856004/message-store/2147694004",
    "status" : 200,
    "responseDescription" : "OK"
  } ]
}
--Boundary_4061_632833321_1448881816038
Content-Type: application/json

{
  "uri" : "https.../restapi/v1.0/account/1446856004/extension/1446856004/message-store/2147676004",
  "id" : 2147676004,
  {...}
}
--Boundary_4061_632833321_1448881816038
Content-Type: application/json

{
  "uri" : "https.../restapi/v1.0/account/1446856004/extension/1446856004/message-store/2147694004",
  "id" : 2147694004,
  {...}
}
--Boundary_4061_632833321_1448881816038--
```

`HTTP 3xx` - Redirection — `301`, `302`, `303`, `304`, `307`, `308`

Indicate that the client must take additional action to complete the request. For `301`, `302`, `303`, `307` and `308` the client must support automatic redirection to new URL returned in `Location` header.

If by some reason `Location` header is not returned, the client should repeat request to the target URL specified in `Location` header in original request.

`HTTP 304` indicates that resource is not modified and there is no need to update its locally cached version. Returned for API requests with conditional headers `If-None-Match` or `If-Modified-Since`.

*Example*

```
GET /restapi/v1.0/number-parser/phonedata.xml HTTP/1.1
Accept: application/xml
Authorization: Bearer U0pDMDFQMDFQQVMwMnxBQUJFU3VOMlp2bjZFT3FnS3RzN2Jhd2tsZmo5NFl5
If-None-Match: "1.25"
HTTP/1.1 304 Not Modified
ETag: "1.24"
Content-Language: en-US
```

`HTTP 4xx` - Client Error — `400`, `403`, `405`, `406`, `409`, `415`

Indicate that the client does something incorrect. In this case (except for `429`) the request should be changed.

`HTTP 429` means that the client exceeded some rate limit defined for this API request (a particular one or any). The client should resend the original request when retry period is over, the value of retry period is specified in seconds in `Retry-After` response header.

`HTTP 401` means that access token provided by the client is invalid or expired. The client should request a new access token and repeat the request.

`HTTP 404` often means that the requested URL is invalid; or that resource with the given ID (a part of URL) is not accessible for the authorized user or does not exist. If the code is returned as a result of `DELETE` request it can be ignored, it means the resource was already deleted on server.

`HTTP 5xx` - Server Error

Indicate that the server failed to fulfill an apparently valid request. The client may retry request up to 3 times and contact RingCentral Developer Support if the problem persists.

`HTTP 503` means that the server is currently unavailable (overloaded or down for maintenance), which is a temporary state. In some cases this status indicates that the server cannot handle just this particular request type while others still can be processed. The client should resend the original request when retry period is over, the value of retry period is specified in seconds in `Retry-After` response header.

## Logical Error Codes

The API uses specific logical error codes to make error processing for client applications more simple and effective. The body of HTTP response should be always logged and analyzed. It is sometimes impossible to understand the reason of the issue by HTTP status code only, so the logical code from the body should also be taken into consideration. The client app should rely on error code and, in some cases,on additional fields like `parameterName`, not on error message as they can be changed in next API versions.

Error code is unique and consists of two parts: short name of a functional module and a digital number, unique per module, for example `CMN-101`, `MSG-221`, etc.

The most common logical error codes are:

`CMN-101` — for most of 'Invalid parameter' errors;

`CMN-102` — for most of 'Not found' errors (for resource identifiers provided either in path or in request body);

`CMN-201` — for most of temporary internal server errors;

`CMN-203` — for most of internal server errors, of which client app is not aware of and/or cannot affect;

`BIL-101` — for most of 'Feature not available' errors in terms of account service/billing plans;

`BIL-102` — for most of 'Limit exceeded' errors in terms of account service/billing plans.

Response body can contain multiple error messages and has the following common structure:

```
{
   "errorCode": "LegacyCode",  //legacy logical error code, deprecated. Will not be supported in later versions of API
   "message": "Error message", //legacy error message
   "errors": [
      {
         "errorCode": "ABC-123",     //logical error code
         "message": "Error message", //error message
         "additionalInfo": "value",  //additional attribute for this error, e.g. "parameterName": "extensionId"
      },
      {
         "errorCode": "CBA-321",
         "message": "Second error message"
      }
   ]
}
```

Let's see the example below:
```
{
   "errorCode": "InvalidParameter",
   "message": "Parameter [to] is invalid. No recipients specified.",
   "parameterName": "to",
   "errors":    [
            {
         "errorCode": "MSG-219",
         "message": "Parameter [to] is invalid. No recipients specified.",
         "parameterName": "to"
      },
            {
         "errorCode": "MSG-221",
         "message": "Parameter [from] is invalid. Value is empty.",
         "parameterName": "from"
      },
            {
         "errorCode": "MSG-224",
         "message": "SMS message is empty."
      }
   ]
}
```

# Batch Requests

One of the commonly used REST practices is the support of batch operations to retrieve multiple homogeneous resources by their key using a single request. The RingCentral API supports batch requests for a number of endpoints, for example messages, call records, blocked numbers, presence etc. They are implemented via the methods `GET`, `DELETE` and `PUT` with all their features.

Batch operations are not transaction-atomic. Each resource in a batch is processed separately from the others, making it possible to receive different success/failure results for different resources wrapped in a multipart response object. The HTTP status code `207 Multi-status` (Multi-Status) is returned in every multipart response object and indicates a batch request.

---

**Note**

The `207 Multi-status` code is not returned in response body in case of error accessing the endpoint. For example, if the requested endpoint does not exist at all, `404 Not Found` status code is returned. If there is a server error, `5xx` status code is returned.
In batch `DELETE` operations (if all resources are deleted successfully) the server returns the `204 No content` instead of multi-status (since all parts would be identical in this case). In case of at least one failure the server returns the `207 Multi-status`.
Apart from the top-level special status code in case of success, a multipart response object contains status codes in each part, representing a particular requested resource. This status specifies an individual result for each requested resource out of the batch. Let's consider the examples of batch request below.

---

1. Batch request via `GET` method:

        GET /restapi/v1.0/account/~/extension/~/message-store/2447722008,2416832008 HTTP/1.1
        Accept: application/json 
        
        HTTP/1.1 207 Multi-Status
        Content-Type: multipart/mixed
        
        --Boundary_20_32057915_1351669531796
        Content-Type: application/json
        
        {
          "response" : [ {
            "href" : ".../account/154364008/extension/154364008/message-store/2447722008",
            "status" : 200,
            "responseDescription" : "OK"
          }, {
            "href" : "...1/restapi/v1.0/account/154364008/extension/154364008/message-store/2416832008",
            "status" : 200,
            "responseDescription" : "OK"
          } ]
        }
        --Boundary_20_32057915_1351669531796
        Content-Type: application/json
        
        {
          "uri" : ".../restapi/v1.0/account/154364008/extension/154364008/message-store/2447722008",
          "id" : 2447722008,
          "to" : [ {
            "phoneNumber" : "18559100010"
          } ],
          "from" : {
            "phoneNumber" : "18559100010"
          },
          "type" : "SMS",
          "creationTime" : "2012-10-29T15:36:04.000Z",
          "readStatus" : "Unread",
          "priority" : "Normal",
          "attachments" : [ {
            "id" : 1,
            "uri" : ".../restapi/v1.0/account/154364008/extension/154364008/message-store/2447722008/content/1",
            "contentType" : "text/plain"
          } ],
          "direction" : "Inbound",
          "availability" : "Alive",
          "subject" : "verificationMessage",
          "messageStatus" : "Received",
          "conversationId" : 5717224681082742945,
          "lastModifiedTime" : "2012-10-29T15:36:04.000Z"
        }
        --Boundary_20_32057915_1351669531796
        Content-Type: application/json
        
        {
          "uri" : ".../restapi/v1.0/account/154364008/extension/154364008/message-store/2416832008",
          "id" : 2416832008,
          "to" : [ {
            "phoneNumber" : "18559100010"
          } ],
          "from" : {
            "phoneNumber" : "16509101086"
          },
          "type" : "SMS",
          "creationTime" : "2012-10-29T13:09:54.000Z",
          "readStatus" : "Unread",
          "priority" : "Normal",
          "attachments" : [ {
            "id" : 1,
            "uri" : ".../restapi/v1.0/account/154364008/extension/154364008/message-store/2416832008/content/1",
            "contentType" : "text/plain"
          } ],
          "direction" : "Inbound",
          "availability" : "Alive",
          "subject" : "Inbound SMS",
          "messageStatus" : "Received",
          "conversationId" : 141549019326272744,
          "lastModifiedTime" : "2012-10-29T13:09:54.000Z"
        }
        --Boundary_20_32057915_1351669531796--

2. Batch request via `PUT` method:

    The client has to specify the multipart/mixed content type and the boundary;
	
    The client has to provide in request body modified fields for every single item which needs to be updated, separated by multipart boundaries.  

        PUT /restapi/v1.0/account/~/extension/~/message-store/401654758008,401642088008 HTTP/1.1
        Accept: application/json
        Authorization: Bearer U0pDMDFQMDFKV1MwMXz6Z7EkpZfJjToT_z4CVUwdekt9Iw
        Content-Type: multipart/mixed; boundary=Boundary_1_15567762_1355833573664
        
        --Boundary_1_15567762_1355833573664
        Content-Type: application/json
        
        {"readStatus": "Read"}
        --Boundary_1_15567762_1355833573664
        Content-Type: application/json
        
        {"readStatus": "Read"}
        --Boundary_1_15567762_1355833573664--

        HTTP/1.1 207 Multi-Status
        Content-Type: multipart/mixed; boundary=Boundary_1_15567762_1355833573664
        
        --Boundary_1_15567762_1355833573664
        Content-Type: application/json
        
        {
          "response" : [ {
            "href" : ".../account/400129284008/extension/400129284008/message-store/401654758008",
            "status" : 200,
            "responseDescription" : "OK"
          }, {
            "href" : ".../account/400129284008/extension/400129284008/message-store/401642088008",
            "status" : 200,
            "responseDescription" : "OK"
          } ]
        }
        --Boundary_1_15567762_1355833573664
        Content-Type: application/json
        
        {
          "uri" : ".../account/400129284008/extension/400129284008/message-store/401654758008",
          "id" : 401654758008,
          "to" : [ {
            "phoneNumber" : "18559100010"
          } ],
          "type" : "Fax",
          "creationTime" : "2013-07-11T12:05:43.000Z",
          "readStatus" : "Read",
          "priority" : "Normal",
          "attachments" : [ {
            "id" : 1,
            "uri" : ".../account/400129284008/extension/400129284008/message-store/401654758008/content/1",
            "contentType" : "image/tiff"
          } ],
          "direction" : "Outbound",
          "availability" : "Alive",
          "messageStatus" : "SendingFailed",
          "faxResolution" : "Low",
          "faxPageCount" : 0,
          "lastModifiedTime" : "2013-07-11T12:26:24.000Z"
        }
        --Boundary_1_15567762_1355833573664
        Content-Type: application/json
        
        {
          "uri" : ".../account/400129284008/extension/400129284008/message-store/401642088008",
          "id" : 401642088008,
          "to" : [ {
            "phoneNumber" : "77653287256446"
          } ],
          "type" : "Fax",
          "creationTime" : "2013-07-11T08:45:57.000Z",
          "readStatus" : "Read",
          "priority" : "Normal",
          "attachments" : [ {
            "id" : 1,
            "uri" : ".../account/400129284008/extension/400129284008/message-store/401642088008/content/1",
            "contentType" : "image/tiff"
          } ],
          "direction" : "Outbound",
          "availability" : "Alive",
          "messageStatus" : "SendingFailed",
          "faxResolution" : "Low",
          "faxPageCount" : 0,
          "lastModifiedTime" : "2013-07-11T12:26:52.000Z"
        }
        --Boundary_1_15567762_1355833573664--