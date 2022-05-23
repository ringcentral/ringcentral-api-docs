# Using refresh tokens

Developers should be aware that access tokens expire over time. As a result, your application will lose access to your customer's account data, and your user's will need to go through the authorization process again, unless you take measures to keep their access tokens live, by refreshing them via the [refresh token operation](https://developers.ringcentral.com/api-reference/Get-Token#section-refresh-token-flow).

Access and refresh tokens expire according to the following schedule:

| Token | TTL |
|-|-|
| Access token | 1 hour |
| Refresh token | 7 days |

Key facts about refresh tokens:

* Refresh tokens are transmitted to developers alongside access tokens
* Refresh tokens can only be used once. 
* A new refresh token is generated when access tokens are refreshed. 

!!! hint "How to keep access tokens fresh"
    It is recommended that developers implement a separate service dedicated to the task of refreshing access tokens on a regular basis. Such a service would ensure that at no time will your application lose access to a user's account data, and require them to re-login. 

!!! info "The JWT auth flow provides non-expiring auth credentials"
    The [JWT auth flow](../jwt-flow/) is ideal for apps that lack a frontend user interface. Through the JWT auth flow, access tokens are still issued, but they are easily refreshed without the need for human interaction.

### Refresh access token request

!!! tip "Special considerations for client-side web apps"

    Pay close attention to the following for REST API apps with the app type of "Client-side web app":
	
	* An Authorization header is not transmitted in the refresh token request in order to keep the app's client secret hidden from the request/response
	* The app's `client_id` should be transmitted in the refresh token request.

**HTTP Headers**

| Header           | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| `Content-type`   | `application/x-www-form-urlencoded`                        |
| `Authorization`  | Only required if app type is "Client-side web app." Must be equal to `Basic ` + base64_encoded( Client ID + ":" Client Secret ) |

**POST Parameters**

| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `grant_type`    | string | Must be equal to `refresh_token`. |
| `refresh_token` | string | Required. The refresh token corresponding to the access key you want to refresh. |
| `client_id`     | string | Only required if the corresponding app type is "Client-side web app." |

**Example request**

```http
POST /restapi/oauth/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded

refresh_token=BCMDFUMDRKV1MwMXx5d5dwzLFL4ec6U1A0XMsUv935527jghj48
   &grant_type=refresh_token&client_id=adsadsadsadadsad
```

### Refresh access token response

**Example response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "access_token" : "U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw",
    "token_type" : "bearer",
    "expires_in" : 7199,
    "refresh_token" : "U1BCMDFUMDRKV1MwMXxzLFL4ec6A0XMsUv9wLriecyxS_w",
    "refresh_token_expires_in" : 604799,
    "scope" : "AccountInfo CallLog ExtensionInfo Messages SMS",
    "owner_id" : "256440016"
}
```
