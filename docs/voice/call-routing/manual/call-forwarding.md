# Call Forwarding and Call Flipping

Call Forwarding allows incoming phone calls to be directed to another phone number. This is handy when recipients have multiple phone numbers and/or a physical phone at which they can be reached. There are two primary ways calls are directed to other phones/numbers:

* **Call Forwarding** applies to incoming calls, and allows those calls to ring at one or more numbers sequentially or simultaneously.

* **Call Flipping** applies to active calls, and allows a speaker to instantly transfer an active call to another phone or device without having to terminate the call.

## Phone Types

| Type | Description |
|-|-|
| PhoneLine | This refers to a RingCentral device or hard-phone. When specifying this type when creating/registering a new call forwarding number, the developer must also specify the device id (see [API Reference](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)). |
| Home | Home phone number. |
| Mobile | Mobile phone number. |
| Work | Work phone number. |
| Other | A phone number of any other type. |

## Create a Forwarding Number

To create a forwarding number:

* Specify the `phoneNumber` parameter. This is a phone number for an incoming call to be forwarded to.
* Specify `type` parameter using one of the type's value from the table above. The default value is "Other"
* Specify the `label` (title of the forwarding number object) parameter if the `type` is omitted or specified as "Other".
* Specify the `id` for the `device` object if the `type` is specified as "PhoneLine".
* Make a POST request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number` endpoint.

!!! Important
    The `label` will be ignored if the `type` value is different than "Other"!

    The `phoneNumber` cannot be any direct number of any extension under the same account!

    The `device` parameter cannot be specified together with the `phoneNumber`!

    A list of valid device ids can be retrieved by calling the [Get Extension Device List API](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices).


Required permission(s): EditExtensions

### Sample code to create a forwarding number object

The following code sample shows how to create a forwarding number object. The `id` value from the response can be used to specify a rule when [creating a custom answering rule](user-answering-rules.md).

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-forwarding.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-forwarding.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/call-forwarding.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/call-forwarding.cs !}
    ```
    
=== "Java"

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/CreateForwardingNumber.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/call-forwarding.rb !}
    ```

## Read all Forwarding Numbers

To read all forwarding numbers:

* Make a GET request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number` endpoint.

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains a list of predefined forwarding numbers
```json hl_lines="6 17 25"
{
  "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number?page=1&perPage=100",
  "records":[
    {
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/592178004",
      "id":"592178004",
      "phoneNumber":"+14135554674",
      "label":"RingCentral for Desktop",
      "features":["CallFlip"],
      "flipNumber":"1",
      "type":"PhoneLine",
      "device":{
        "id":"801553370004"
        }
    },{
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/711909004",
      "id":"711909004",
      "phoneNumber":"+16505550930",
      "label":"Mobile",
      "features":["CallForwarding","CallFlip"],
      "flipNumber":"2",
      "type":"Mobile"
    },{
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/711910004",
      "id":"711910004",
      "phoneNumber":"+16505555476",
      "label":"Work",
      "features":["CallForwarding","CallFlip"],
      "flipNumber":"3",
      "type":"Work"
    }
  ],
  ...
```

## Read a Forwarding Number

To read a forwarding number:

* Make a GET request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/[forwardingNumberId]` endpoint, where the `forwardingNumberId` is the id of an existing forwarding number object.

!!! Hint
    A valid `forwardingNumberId` can be retrieved using the previous API to read all forwarding numbers.

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains a detailed information of a forwarding number
```json
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178003454/extension/178003454/forwarding-number/712613004",
  "id": "712613004",
  "phoneNumber": "+14085554388",
  "label": "RingCentral for Desktop",
  "features": [
    "CallFlip",
    "CallForwarding"
  ],
  "flipNumber": "6",
  "type": "PhoneLine",
  "device": {
    "id": "801553625004"
  }
}
```

## Update a Forwarding Number

To update an existing forwarding number:

* Specify the [parameters](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber) which need to be updated.
* Make a PUT request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/[forwardingNumberId]` endpoint, where the `forwardingNumberId` is the id of an existing forwarding number object.

!!! Hint
    A valid `forwardingNumberId` can be retrieved using the previous API to read all forwarding numbers.

Required permission(s): EditExtensions

## Related API Endpoints

* [Get Forwarding Number List](https://developers.ringcentral.com/api-reference/Call-Forwarding/listForwardingNumbers)
* [Create Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)
* [Get Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/readForwardingNumber)
* [Update Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber)
* [Delete Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/deleteForwardingNumber)
