| Parameter           | Type     | Description |
| ------------------- | -------- | ----------- |
| `grant_type`        | string   | Required. Must be set to `authorization_code` for authorization code flow |
| `code`              | string   | Required. Provide your authorization code received in the previous step |
| `client_id`         | string   | Required. Enter your application key (Production or Sandbox) here |
| `redirect_uri`      | URI      | Required. This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. |
| `access_token_ttl`  | integer  | Optional. Access token lifetime in seconds; the possible values are from 600 sec (10 min) to 3600 sec (1 hour). The default value is 3600 sec. If the value specified exceeds the default one, the default value is set. If the value specified is less than 600 seconds, the minimum value (600 sec) is set |
| `refresh_token_ttl` | integer  | Optional. Refresh token lifetime in seconds. The default value depends on the client application, but as usual it equals to 7 days. If the value specified exceeds the default one, the default value is applied |