# Using access tokens

!!! info "Need help authenticating your application?"
    This guide is intended to assist developers in using access tokens once they have been acquired by going through one of the authorization flows:
          
    * [Authorization code flow](auth-code-flow.md)
    * [Authorization code with PKCE flow](auth-code-pkce-flow.md)
    * [JWT flow](jwt-flow.md)

OAuth tokens are used to provide an authorization context in each request. It is important to understand the distinctions between token types:

* An **access token** is a token issued by the authorization server and used by the application to make requests to all endpoints that require authentication.

* A **refresh token** can be provided alongside the access token after successful authorization. It is a single-use token used to fetch a new access token when it is expired or close to expiration. The refresh token itself cannot be used to access protected resources.

## Access token expiration and invalidation

Tokens may be invalidated for any of the following reasons:

* Access and/or refresh tokens expiration. 
* The app's authorization session is terminated by the end-user (that causes all active access and refresh tokens to get invalidated).
* The user's password was changed, which caused invalidating all sessions established with this credential and corresponding tokens.
* The company administrator enforces an "Absolute Session Timeout" setting that prohibits any session from exceeding the defined time-to-live interval.
* The application reached the limit (usually five) of parallel active sessions for the same user.

If an expired or invalidated token is used, RingCentral rejects the request with an "HTTP 401 Unauthorized" error. 

When tokens expire or are invalidated, applications must obtain a new access token. 

## Access token revocation

There are some situations when the user may want to revoke the already granted access in order to stop application activity. To revoke access/refresh tokens the following request is used:

**HTTP Headers**

| Header           | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| `Content-type`   | `application/x-www-form-urlencoded`                        |
| `Authorization`  | `Basic ` + base64_encoded( Client ID + ":" Client Secret ) |

**POST Parameters**

| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `token`         | string | Required. The token to revoke. |

**Sample Request**

```http
POST /restapi/oauth/revoke HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==

token=U0pDMTFQMDFQQVMwMXxBQUJfTVpHWk5lM29zNVFmWnNHQ01MSmJuMHJmNGlRcnRaeEptTWlPS0MzUTdYRDdSTURiaH
  BuWHZINGM2WTdqaWlBOEVhRHNxRWdJVUNYQjd4dmJsWHJoVVlWQVN2SFo2YWJPanJsRkFWZk9SMm5lek0tWnF5d3h8C3A
  nYOPxO0flEwO6Ffoq9Tlqs1s
```

Please note that while the revocation request accepts just one token, it actually terminates the entire authorization session associated with this token, i.e., invalidates ALL active access and refresh tokens for this session.

## Using access tokens to call RingCentral APIs

Once an access token is obtained, it should be transmitted with each call to the RingCentral API using one of the following methods:

#### Option 1: Bearer (recommended)

Transmit the access token through the `Authorization` header with the HTTP Bearer authentication scheme (recommended). For example:

```http hl_lines="2"
GET /restapi/v1.0/account/1110475004/extension/1110475004/address-book/contact/29874662828
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA 
Host: platform.ringcentral.com
Accept: application/json
Connection: keep-alive
```

#### Option 2. Access token query parameter

Transmit the access token as a query parameter specified as a value. For example:

```http hl_lines="1-2"
GET /restapi/v1.0/account/1110475004/extension/1110475004/address-book/contact/29874662828
   ?access_token=2YotnFZFEjr1zCsicMWpAA
Host: platform.ringcentral.com
Accept: application/json
Connection: keep-alive
```
This approach is not recommended because it may result in the leak of sensitive tokens through intermediary network nodes (proxies, gateways, etc.) that log HTTP requests.
The only scenarios in which it should be used are when you absolutely need to share the URL to access the resource or cannot augment the API call with the `Authorization` header due to technical limitations.

