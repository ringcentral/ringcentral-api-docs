## Listing Valid High Volume SMS Numbers

Send and receive SMS messages using the SMS API (`a2p-sms`) requires a phone number with the `A2PSmsSender` feature.

To determine which numbers a user can use to send and receive A2P SMS, retrieve the user's list of phone numbers from the [`extension/phone-number` endpoint](https://developers.ringcentral.com/api-reference/Phone-Numbers/listExtensionPhoneNumbers) and then filter by numbers with the `A2PSmsSender` feature. The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

=== "JavaScript"
	```javascript
    {!> code-samples/messaging/high-volume/list.js !} 
	```

=== "Python"
	```python
    {!> code-samples/messaging/high-volume/list.py !} 
	```

=== "PHP"
	```php
    {!> code-samples/messaging/high-volume/list.php !} 
	```

=== "C#"
	```c#
    {!> code-samples/messaging/high-volume/list.cs !} 
	```

=== "Java"
	```java
    {!> code-samples/messaging/high-volume/list.java !} 
	```

=== "Ruby"
	```ruby
    {!> code-samples/messaging/high-volume/list.rb !} 
	```

=== "HTTP"
	```http
	GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number
	```

### Response

This example response shows the `A2PSmsSender` feature:

```json hl_lines="12"
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
        "A2PSmsSender",
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
