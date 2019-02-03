# SMS Sending Numbers

RingCentral numbers have SMS and MMS capabilities depending on the account plan. Users can send and receive SMS from enabled phone numbers assigned to their extension. The operator extension can further send and recieve SMS from the Main Company Number. See more below on using the Main Company Number.

Phone numbers can have different capabilties determined by the presence of the following values in the `features` property of the Phone Number info object:

* `SmsSender`: send and receive regular texts
* `MmsSender`: send and receive group texts and files
* `InternationalSmsSender`: send and receive regular texts to international numbers

## Listing Valid SMS Numbers

To determine which numbers a user can use to end and receive SMS, retrieve the user's list of phone numbers from the `extension/phone-number` endpoint and then filter by numbers with the `SmsSender` and/or `MmsSender` feature. The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

```HTTP tab=
GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number
```

```Ruby tab=
require 'ringcentral'

rc = RingCentral.new(
  'client_id',
  'client_secret',
  'https://platform.ringcentral.com')

rc.authorize(
  username:  '+16505550100',
  extension: '',
  password:  'my_password')

res = rc.get '/restapi/v1.0/account/~/extension/~/phone-number'
```

This example response shows the `SmsSender`, `MmsSender` and `InternationalSmsSender` features:

```json
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/phone-number?page=1&perPage=100",
  "records":[
    {
      "id":33333333,
      "phoneNumber":"+16505550100",
      "paymentType":"Local",
      "type":"VoiceFax",
      "usageType":"DirectNumber",
      "features":[
        "CallerId",
        "SmsSender",
        "MmsSender",
        "InternationalSmsSender"
      ],
      "status":"Normal",
      "country":{
        "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1",
        "id":"1",
        "name":"United States"
      }
    }
  ]
}
```

## SMS and the Main Company Number

You can send and receive SMS messages from the main company phone number when authorized as the Operator Extension. By default, the Operation Extension is set to extension 101. This can be edited and assigned to other extensions in the Online Account Portal under "Auto-Receptionist" > "Operator Extension.""

