# Methods, endpoints and parameters of the RingCentral API

This guide describes the fundamentals of the RingCentral API and is useful to developers wishing to understand its conventions and usage guidelines.

## Resources and parameters

Every entity in the RingCentral API is represented with a certain resource identified by a specific URI. The structure of a URI is similar to that of a web page's URL. The URI syntax is represented by the following scheme:

`<protocol> :// <hostname> [: <port>] / <path> [? <query>] [# <fragment>]`

| Name | Description |
|------|-------------|
| **protocol** | The networking protocol (`http` or `https` protocols are generally used in REST). |
| **hostname** | The server network address information. |
| **port** |  The TCP port where the server listens for incoming requests. If omitted, the default value is used for a given protocol. |
| **path** | A resource identification, typically hierarchical by nature, e.g. `foo/bar/baz`. |
| **query** | An optional part separated by a question mark (`?`) and contains additional identification information that is not hierarchical in nature. The query string syntax is organized as a sequence of key-value pairs separated by an ampersand. Not all API resources allow query parameters. |
| **fragment** | An optional part separated from the rest by a hash (`#`) and that contains additional information redirecting to a secondary resource; for example, a section heading of an article identified by the URI. The RingCentral REST API does not use fragments. |

Protocol, host and port together constitute the main entry point to access the API.

RingCentral production servers are accessible on `https://platform.ringcentral.com`. Please note that for security reasons connection is allowed using only HTTPS protocol to the default HTTPS port 443, so the port can be omitted in the URI.

### Path parameters: account and extension IDs

All of RingCentral's  API resources are organized in a hierarchical manner. Many but not all resource paths start with `/restapi` followed by the API major version number. Let's consider a typical API resource URI:

`https://platform.ringcentral.com/restapi/v1.0/account/`**`159048008`**`/extension/`**`171857008`**`/call-log?dateFrom=2012-08-26`

Path parameters are commonly used in the RingCentral API to identify a particular entity belonging to a given type by its unique key. Since most of the API resources represent objects owned by particular a RingCentral account (company) or user, two basic path parameters are `accountId` and `extensionId`. As you might expect, they identify the account and extension of a RingCentral user accordingly and are bolded in the example above.

!!! tip "Extension numbers versus IDs"
    RingCentral users associate an account with the main company phone number and an extension with the short extension number, but both accountId and extensionId are internal identifiers.

Developers often need to access a particular resource on behalf of the user whose credentials were transmitted during the authentication phase. As a shortcut, one can use the tilde symbol (~) in place of the `accountId` and/or `extensionId` to access data that belongs to the account/extension of the currently authenticated user. Considering the example above, if the user successfully authenticated to work with account "159048008" and extension "171857008" the URI to retrieve the same resource may be written as follows:

`https://platform.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log?dateFrom=2012-08-26`

Depending on the API, additional path parameters may exist. They are described extensively in the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#APIReference.html).

### Query Parameters

Another kind of parameter you will come across in the RingCentral API is a *query parameter*. Query parameters are generally used in object retrieval operations and let the consumer specify the filtering criteria, the desired level of details, etc. Query parameter values in the URL have to be encoded according to [RFC-1738: Uniform Resource Locators](https://tools.ietf.org/html/rfc1738). Query parameters support setting multiple values. It is possible to specify several values for a single query parameter, and filtering results will cover all of them. For example, this functionality is applied to retrieve or remove lists of messages and records.

### Examples

Let's consider the examples below to illustrate the API resources and parameters. For simplicity reasons, we will exclude protocol and host values from the URIs in the examples below.

* Get service plan information for RingCentral customer account (`accountId` will be automatically determined from authentication data):

    `/restapi/v1.0/account/~/service-info`

* Get all SMS messages from the account user's mailbox (`extensionId` is specified explicitly):

    `/restapi/v1.0/account/~/extension/171857008/message-store?messageType=SMS`

* Get all SMS and fax messages from the account user's mailbox (both `accountId` and `extensionId` will be automatically determined from authentication data):

    `/restapi/v1.0/account/~/extension/~/message-store?messageType=SMS&messageType=Fax`

## Methods

As with many other REST APIs, the RingCentral API's resources are accessible by standard HTTP methods: GET, POST, PUT (or PATCH), and DELETE. These methods form a uniform CRUD interface expanded as "create, retrieve, update and delete".

| Method | Description |
|--------|-------------|
| `GET` | Retrieves the object represented by the resource identified by the request URI. It may be the call log information for an extension, the address book with contacts, etc. |
| `POST` | Creates a new object represented by the resource data in the request body. In the response body, the server typically sends the representation of the object created, as if there is an immediate `GET` request for it.
| `PUT` | (Full modification) Modifies an already existing object identified by the request URI, by replacing the existing resource with data passed in the request body. If the object was successfully modified, the server responds with the representation of the changed resource in the response body. Usually, the request should contain all mandatory resource attributes (the omitted ones will be replaced by default values). The response returns the entire resource representation with all of the properties, as in the case of the `GET` request. |
| `PATCH` | (Partial modification) Modifies an already existing object by the request URI by modifying only those properties contained within the request body. Any property not explicitly referenced in the request body will be left unaltered. In this way, patching a resource is similar to a partial update of that resource. |
| `DELETE` | Removes the object represented by the resource identified by the request URI. |

### Example

Let's consider a simple example of a `GET` method — retrieving the version of the RingCentral REST API.

=== "Request"
	```http
	GET /restapi/v1.0 HTTP/1.1
	Accept: application/json
	Authorization: Bearer UExxxxxxxxMnzpdvtYYNWMSJ7CL8h0zM6q6a9ntw
	```

=== "Response"
	```http
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

!!! alert "Don't assume all methods are supported"
    Most RingCentral API resources do not support all of the HTTP methods. In order to find out which resources support a particular method, please refer to the API Reference.

### Method Tunneling

Sometimes, due to technical limitations, API clients cannot use PUT/PATCH/DELETE HTTP methods. To work around this situation the RingCentral API provides a mechanism for masquerading (or "tunneling") `PUT`, `PATCH` and `DELETE` methods as a `POST`. This can be achieved in two ways:

#### X-HTTP-Method-Override header

Using `X-HTTP-Method-Override` the client instructs the server to override the actual value of the HTTP method by one passed in this header. For example, the following request:

```http
DELETE /restapi/v1.0/account/~/extension/~/message-store/4084362008 HTTP/1.1
```

Can be alternatively sent as:

```http
POST /restapi/v1.0/account/~/extension/~/message-store/4084362008 HTTP/1.1
X-HTTP-Method-Override: DELETE
```

#### The "_method" query parameter

In really unfortunate circumstances some clients do not even support HTTP headers. Therefore, one additional way one can override the method name is via the `_method` query parameter. For example:

```
POST /restapi/v1.0/account/~/extension/~/message-store/4084362008?_method=DELETE HTTP/1.1
```

If both the override header and query parameter are specified in the HTTP request and contain different values, the server returns an `HTTP 400 Bad Request` error.

!!! warning "Tunneling HTTP methods should be used only when no other workaround is available."
    Each HTTP method has its own characteristics, such as how it is cached -- which HTTP clients and intermediaries expect. When tunneling these methods through HTTP POST, those expectations can no longer be met.

## User Agent Identification

It is strongly recommended that client applications provide the `User-Agent` HTTP header with every request. This header should contain key information about the requesting application, including the application name and its version. 
It really helps with troubleshooting various incidents where other ways to identify API request sources do not help.

There are three primary rules when setting the User Agent:

1. Clients should send the `User-Agent` header and value with each request.
2. A particular application instance should send the exact same user agent string in all API requests.
3. The format of user agent value should follow the convention described below.

We recommend using a short application name and version delimited by a forward slash character and optionally followed by additional details about this client instance in parentheses (e.g. operating system name, version, revision number, etc.).

For example:

* `RCMobile/3.6.0 (RingCentral; Android/2.6; rev.12345)`
* `RCMobile/3.6.1 (OfficeAtHand; iOS/6.0; rev.987654)`
* `Softphone/6.2.0.11632`

The `User-Agent` string format is described in <a target="_new" href="https://tools.ietf.org/html/rfc1945">RFC 1945</a> and <a target="_new" href="https://tools.ietf.org/html/rfc2068">RFC 2068</a>.

For browser-based (JavaScript) applications, it is usually not possible to override the browser's user agent string. In this case, our recommendation is to send a user agent string in the `X-User-Agent` request header.


