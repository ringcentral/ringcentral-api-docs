# Using refresh tokens to generate new access keys

Developers should be aware that access keys expire over time. As a result, your application will lose access to your customer's account data, and your users will need to go through the authorization process again, unless you take measures to keep their access keys live, by refreshing them via the [refresh token operation](https://developers.ringcentral.com/api-reference/Get-Token#section-refresh-token-flow).

Access keys and refresh tokens expire according to the following schedule:

| Token | TTL |
|-|-|
| Access key | 1 hour |
| Refresh token | 7 days |

## Using refresh tokens

Here are a few things to keep in mind when using refresh tokens to generate new access keys.

* Refresh tokens are transmitted to developers with their corresponding access keys
* Refresh tokens can only be used once. 
* A new refresh token is generated when access keys are refreshed. 
* Upon refreshing an access key, the previous access key is invalidated immediately. If the previous access key is used within ten seconds, the error "Access token corrupted" will be returned, and will eventually return the error "Access token not found."
* If one uses the newly generated access key, the old refresh token will become invalid in approximately ten seconds. Within those ten seconds, one can refresh the access key multiple times, however, the same access key will be returned. After approximately ten seconds, attempts to re-use the refresh token will result in a "Token not found" error. 
* If you don't use the newly generated access key, the old refresh token will remain valid for up to 60 minutes. You can issue a refresh request multiple times, but the same access key will be returned until the key is used. 

!!! hint "The JWT auth flow provides non-expiring auth credentials"
    The [JWT auth flow](../jwt-flow/) is ideal for apps that lack a frontend user interface. Through the JWT auth flow, access keys are still issued, but they are easily refreshed without the need for human interaction.

!!! info "How to keep access keys fresh"
    It is recommended that developers implement a separate service dedicated to the task of refreshing access keys on a regular basis. Such a service would ensure that at no time will your application lose access to a user's account data, and require them to re-login. 

### Refresh access key request

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
