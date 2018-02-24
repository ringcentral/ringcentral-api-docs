# Legacy RingOut.asp and FaxOut.asp APIs

## Upgrading from RingOut.asp API to the REST API

### How do I Upgrade the RingOut.asp List API to the REST API?

The legacy RingOut List API returns a list of phone numbers to use as the `from` value in the RingOut API call. To retrieve a list of phone numbers you can use for RingOut using the REST API, call the following endpoint:

`GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number`

In the response, filter the phone number `records` array for the `CallForwarding` value in the `features` property. The phone numbers are in the `phoneNumber` property.

More information on this API is available here:

[https://developer.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefExtensionForwardingNumbers.html)

### How do I Upgrade the RingOut.asp Call API to the REST API?

The legacy RingOut Call API performs a two-legged RingOut. To make the same call using the REST API, use the following endpoint:

`PUT /restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out`

More information on this API is available here:

[https://developer.ringcentral.com/api-docs/latest/index.html#!#RefMakeRingOut](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefMakeRingOut)

### How do I Upgrade the RingOut.asp Status API to the REST API?

The legacy RingOut Status API looks up the status of a RingOut. To make the same call using the REST API, use the following endpoint:

`GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}`

More information on this API is available here:

[https://developer.ringcentral.com/api-docs/latest/index.html#!#RefGetRingOutCallStatus](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefGetRingOutCallStatus)

### How do I Upgrade the RingOut.asp Cancel API to the REST API?

To cancel a RingOut call using the REST API, use the following endpoint:

`DELETE /restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}`

More information on this API is available here:

[https://developer.ringcentral.com/api-docs/latest/index.html#!#RefCancelRingOut](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefCancelRingOut)

## Upgrading from FaxOut.asp API

### How do I Upgrade the FaxOut.asp API to the REST API?

To send a fax using the REST API, use the following endpoint:

`POST /restapi/v1.0/account/{accountId}/extension/{extensionId}/fax`

More information on this API is available here:

[https://developer.ringcentral.com/api-docs/latest/index.html#!#RefCreateFaxMessage](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefCreateFaxMessage)
