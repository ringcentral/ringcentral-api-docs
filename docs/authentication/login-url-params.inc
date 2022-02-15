| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `response_type` | string | Required. Must be set to `code`. |
| `client_id`     | string | Required. The client ID of the application making the request. |
| `redirect_uri`  | URL    | Required. The URL the response will be sent to. is is a callback URI which determines where the response will be sent to. The value of this parameter must exactly match one of the URIs you provided when creating your app. |
| `state`         | string | Optional. A pass-through value used by the client to maintain state between the request and callback. RingCentral ignore the values of this parameter. |
| `scope`         | string | Ignored. Common to other OAuth apps, the scope parameter is ignored by RingCentral deferring to the permissions set by the developer when the app was created. It can be safely omitted. |
| `brandId`       | integer | Optional. A number identifying what branding should be displayed on the login page. See [RingCentral Partner Compatibility Guide](../../basics/partner-compatibility/). |
| `display`       | string | This is for RingCentral-use only and can be safely omitted. |
| `prompt`        | string | This is for RingCentral-use only and can be safely omitted. |