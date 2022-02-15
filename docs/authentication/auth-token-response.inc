| Parameter                  | Type    | Description |
| -------------------------- | ------- | ----------- |
| `access_token`             | string  | Access token to pass to subsequent API requests |
| `expires_in`               | integer | Issued access token TTL (time to live), in seconds |
| `refresh_token`            | string  | Refresh token to get a new access token, when the issued one expires |
| `refresh_token_expires_in` | integer | Issued refresh token TTL (time to live), in seconds |
| `scope`                    | string  | List of permissions allowed with this access token, white-space separated |
| `token_type`               | string  | Type of token. The only possible value supported is 'Bearer'. This value should be used when specifying access token in `Authorization` header of subsequent API requests |
| `owner_id`                 | string  | Extension identifier |