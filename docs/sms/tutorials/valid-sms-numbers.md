# Listing Valid SMS Sending Numbers

To determine which numbers a user can use to end and receive SMS, retrieve the user's list of phone numbers from the `extension/phone-number` endpoint and then filter by numbers with the `SmsSender` feature.

The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number`

This example response shows the `SmsSender` feature:

```json
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/phone-number?page=1&perPage=100",
  "records":[
    {
      "id":33333333,
      "phoneNumber":"+16505551212",
      "paymentType":"Local",
      "type":"VoiceFax",
      "usageType":"DirectNumber",
      "features":[
        "SmsSender",
        "CallerId"
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

