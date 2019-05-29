# Auth Tokens

Tokens are used to provide a context in each request for authorization or authentication. It is important to understand distinctions between token types:

* **Access token** is a special token issued by authorization server and used by the application to make requests to all endpoints which require authentication.

* **Refresh token** can be provided along with access token once your application successfully passes the authorization. It can be used only once to refresh short-lived access token. The refresh token itself cannot be used to access protected resources.

To prevent possible abuse by means of intercepting tokens and using them illegally, access and refresh token lifetimes are limited. By default access token **expires in one hour**. Refresh token lifetime is typically limited to one week. Actual lifetimes of access and refresh tokens are returned in `expires_in` and `refresh_token_expires_in` attributes of a token endpoint response.

The API requests which include expired access tokens are rejected with `HTTP 401 Unauthorized` responses. So an application is forced to obtain a new access token using one of the authorization flows.

Both access and refresh tokens may also be revoked by the user at any time. In this case the application is required to authorize again.

If the user's credentials are changed (via RingCentral Service Web, Mobile Web or Admin Interface sites), all issued tokens are invalidated immediately, and all established sessions are terminated.

## Token Revocation

There are some situations when the user may want to revoke the already granted access in order to stop application activity. To revoke access/refresh token the following request is used:

```http
POST /restapi/oauth/revoke  HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0

token=U0pDMDFQMDFKV1MwMXwJ_W7L1fG4eGXBW9Pp-otywzriCw
```

The request must contain HTTP Basic authorization string Base64 encoded and generated from client credentials: the application key ("userid" in terms of [RFC-2617](https://tools.ietf.org/html/rfc2617)) and application secret ("password" in terms of [RFC-2617](https://tools.ietf.org/html/rfc2617)). The request should contain the `token` form (preferred) or query parameter, which holds the value of an access or refresh token. The server returns `HTTP 200 OK` when the request has been successfully processed. Please note that due to security reasons (to prevent eavesdropping) successful response is returned even if revocation was not successful (for instance if a token passed was issued to another application, expired, or by other means malformed. For additional details see [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009).

