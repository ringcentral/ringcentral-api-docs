# Using access tokens

!!! info "Need help authenticating your application?"
    This guide is intended to assist developers in using access tokens once they have been acquired by going through one of authorization flows:
          
    * [Auth code flow](auth-code-flow.md)
    * [Auth code with PKCE flow](auth-code-pkce-flow.md)
    * [JWT flow](jwt-flow.md)

Tokens are used to provide a context in each request for authorization or authentication. It is important to understand distinctions between token types:

* An **access token** is a token issued by authorization server and used by the application to make requests to all endpoints which require authentication.

* A **refresh token** can be provided alongside the access token during authorization. It is a single-use token used to fetch a new access token before it expires. The refresh token itself cannot be used to access protected resources.

## Access token expiration and invalidation

Tokens may be invalidated for any of the following reasons:

* Access and refresh tokens can expire. 
* Access and refresh tokens may be revoked by the end-user at any time.
* If a user's credentials are changed (via RingCentral's Service Web, Mobile Web or Admin Interface sites) all issued tokens are invalidated immediately, and all established sessions are terminated.

In an expired or invalidated token is used, RingCentral will respond with an HTTP error of "401 Unauthorized."

When tokens expire or are invalidated, applications must obtain a new access token. 

## Access token revocation

There are some situations when the user may want to revoke the already granted access in order to stop application activity. To revoke access/refresh token the following request is used:

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

## Using access tokens to call RingCentral APIs

Once an access token is obtained, it should be transmitted with each call to the RingCentral API using one of the following methods:

#### Option 1: Bearer (recommended)

Transmit the access token by way of the HTTP Bearer authentication scheme. For example:

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

