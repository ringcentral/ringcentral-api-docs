## Messaging Consent Management

The SMS opt-out process allows recipients to choose to stop receiving messages from a sender. It's necessary for several key reasons:

1. Legal compliance: Businesses in North America must provide SMS opt-out options to comply with Telephone Consumer Protection Act (TCPA) regulations and Cellular Telecommunications and Internet Association (CTIA) guidelines for marketing communications.

2. User control: Recipients can manage their preferences and avoid unwanted messages.

3. Sender reputation: Respecting opt-outs helps maintain a positive reputation and prevents messages from being marked as spam.

4. Customer satisfaction: Honoring opt-out requests improves the customer experience by respecting communication preferences.

To understand more on SMS opt out configuration, listing in admin and apps, you can visit [Understanding SMS opt-out management](https://support.ringcentral.com/article-v2/Understanding-SMS-opt-out-management.html?brand=RingCentral&product=RingEX&language=en_US).

By default, RingCentral assumes that when you send an outbound SMS from a RingCentral number to an external number, you have already collected their consent via one of the methods you described during the [TCR registration process](https://support.ringcentral.com/article-v2/Setting-up-TCR-registration-assigning-numbers-to-SMS-campaigns.html?brand=RingCentral&product=RingEX&language=en_US). In other words, a SMS enabled RingCentral number can send outbound texts to an external number. However, RingCentral Opt out management provides an easy way for external numbers to opt out of these messages by sending back industry compliant SMS opt out keywords (like STOP, END, etc) . Also, an opted out number can opt back in by sending back industry compliant SMS opt in keywords (like START, RESUME, etc).

From a technical perspective, the SMS opt-in and opt-out process in RingCentral's SMS configuration is managed on a per-pair basis, linking the sender's phone number to the recipient's phone number. For instance, if your business uses two different phone numbers—one for customer support and another for product marketing—you may need to explicitly request the customer’s consent for each purpose. This approach ensures clear consent management and makes it easier to handle future opt-out requests.

To help your business comply with SMS regulations, RingCentral manages SMS opt-out using industry-standard keywords in a text message to identify whether your customer wishes to opt out of receiving text messages from your business(or opt back in). This feature simplifies communication, allowing customers to easily notify you about their preferences regarding future messages.

## Handling SMS Opt-Out requests

Once you have obtained a customer's consent to communicate via SMS, you are authorized to send appropriate and relevant text messages to the phone number they provided. However, it is important to offer your customers a simple way to opt out if they no longer wish to receive text messages from your business.

The easiest way for customers to opt out of receiving text messages from your business is by sending a `STOP` message to your business phone number. When this occurs, RingCentral automatically adds the customer's phone number to an opt-out list associated with your business phone number. As a result, any future attempts to send messages from that RingCentral number to that opted out customer's phone number will be blocked by RingCentral, helping your business stay compliant with SMS regulations and avoiding potential violations.

To support this functionality and improve transparency, it is recommended to include opt-out instructions in your text messages. For example, you can add the following line at the end of your message:

***"Reply STOP to opt out."***

### Popular use cases for SMS opt out APIs

Below are a few common use cases where you may need to synchronize user SMS consent data between your CRM system and the RingCentral SMS consent database.

#### Upload opted-out phone numbers to RingCentral via API

**Example of use case:** You are using some external means to collect opt outs (like via email, website, over phone, etc), and want to push that info to RingCentral SMS opt out database.

If a customer declines consent to receive SMS communications, or if you receive a verbal or written request indicating that a customer no longer wishes to receive SMS messages from your business, you must refrain from sending text messages to their phone number. To ensure compliance and prevent any accidental messaging, you can upload those customers phone numbers to RingCentral to update the opt-out list. This allows RingCentral to block all text message attempts to those numbers, helping your business maintain compliance with regulations.

To add opted out phone numbers to your RingCentral database, you can follow the instructions below to call this API:

PATCH `/restapi/v2/accounts/~/sms/consents`

In the API body parameters, define the `records` array, create the input object and add to the `records` array as shown below.

```json
var bodyParams = {
      records: [
          {
            from: "+14085556789", // Your Business Phone Number
            to: "+16501112345", // You Customer Phone Number
            optStatus: "OptOut",
            source: 'Api'
          }
        ]
      }
```

The `from` parameter should be set to your business phone number, and the `to` parameter should contain the customer’s phone number requesting to opt out. The source should be set to `Api` to indicate that the OptOut was handled programmatically by your system and it is primarily for auditing purposes. The records list can contain multiple objects, allowing you to submit them all in a single API request.

If you use multiple business phone numbers for different services or products, and a customer has opted out of all SMS communications with your company, you can use the wildcard * to indicate that their phone number should be excluded from receiving messages from any of your business numbers within the account.

```json
var bodyParams = {
      records: [
          {
            from: "*", // From all your business phone numbers within your RingCentral account
            to: "+16501112345", // You-Customer-Phone-Number
            optStatus: "OptOut",
            source: 'Api'
          }
        ]
      }
```

#### Update your CRM with opted-out phone numbers

**Example of use case:** You are using an external system/CRM for storing opted out numbers and want to pull all info from RingCentral SMS opt out database, and sync with that external CRM/system.

If your company stores customer phone numbers in a CRM system, it is crucial to regularly update your CRM database with the latest list of opted-out phone numbers from RingCentral’s database. Keeping this information up-to-date ensures seamless text messaging integration with your system and helps you manage customer preferences effectively. Consider the following scenarios:

Click-to-Text Feature: If your web application includes a click-to-text functionality, you can disable this feature for customers who have opted out of SMS communication. This prevents agents from attempting to send messages that would inevitably fail, saving time and enhancing workflow efficiency.

Mass Campaigns: When providing an option to export customer phone numbers for mass messaging campaigns, you can automatically exclude those who have opted out. This optimizes the recipient list, reduces the risk of failed message delivery due to opt-out restrictions.

By maintaining an updated CRM, you improve the overall user experience.

To read opted out phone numbers from your RingCentral's database, you can follow the instructions below to call this API:

GET `/restapi/v2/accounts/~/sms/consents`

In the API query parameters, set the `from` parameter to the business phone number(s) for which you want to retrieve the list of opted-out phone numbers.

```json
var bodyParams = {
	    from: ["+14085556789", "+14086667890"], // Your Business Phone Number
	    optStatus: ["OptOut"]
    }
```

Below is a sample response returned by the API:

```json
{
  records: [
    {
      from: "+14081112345",
      to: "+16501112345",
      optStatus: "OptOut",
      source: "Api",
      lastModifiedTime: "2025-05-12T22:21:03.891149Z"
    },
    {
      from: "+14086667890",
      to: "+16502223456",
      optStatus: "OptOut",
      source: "Recipient",
      lastModifiedTime: "2025-05-12T22:21:03.879569Z"
    }
  ],
  paging: {
    pageToken: "Rjo1MTIwMjI=",
    perPage: 2,
    firstPageToken: "Rjo1MTIwMjI="
  }
}
```

You can call the API without specifying the `from` query parameter to retrieve all opted-out numbers across all phone numbers associated with your RingCentral account. Use the `perPage` parameter to control the maximum number of records returned by the API. Additionally, you can use the `pageToken` parameter to navigate to the next or previous page, provided the `nextPageToken` or `previousPageToken` is included in the paging object of the response. In such a scenario, the API request body requires only the following parameters:

```json
var bodyParams = {
      optStatus: ["OptOut"]
    }
```

In addition to reading opted-out phone numbers, you can [subscribe for the opt-out event notification](https://developers.ringcentral.com/api-reference/Subscriptions/createSubscription) to be notified when a customer opts out by sending a `STOP` message to your business phone number.

Example event payload

```json
{
  "uuid": "3005295198780472204",
  "event": "/restapi/v2/accounts/80964xxxx/sms/consents",
  "timestamp": "2025-05-13T20:57:06.673Z",
  "subscriptionId": "d8f7905d-c8a6-4520-b501-bf6dac950f0c",
  "ownerId": "6228832xxxx",
  "body": {
    "records": [
      {
        "from": "+14081112222", // This is your business phone number
        "to": "+13123335555",   // This is your customer phone number
        "optStatus": "OptOut",  // Indicating an opt-out
        "source": "Recipient",  // Opted out by the recipient
        "lastModifiedTime": "2025-05-13T20:57:06.473705035Z"
      }
    ]
  }
}
```

#### Export SMS opt status from your RingCentral Account

**Example of use case:** You are using an external system or CRM to manage opted-in and opted-out phone numbers, and you want to manually export a CSV file from RingCentral to upload into your CRM, you can do so as part of your data synchronization process.

To export the SMS opt status for all of your business phone numbers within your RingCentral account, call the following API:

GET `/restapi/v2/accounts/~/sms/consents/export`

The response is a text string in .CSV format including the header columns defined as shown below:

`FROM,TO,STATUS,SOURCE`

## Handling SMS Opt-In requests

Customer consent is essentially an agreement to opt in to relevant communications from your business. Since customers may not be familiar with all the phone numbers your business uses, their initial consent typically covers receiving messages from any of your business's phone numbers, provided these numbers are used legitimately and in alignment with their expectations.

If a customer opts out by sending a `STOP` or any standard opt out keyword to your business phone number, RingCentral will block any outbound text messages you attempt to send to that customer's phone number. The block will be lifted only if the customer sends an opt-in keyword like `START` to your business phone number, indicating their consent to resume receiving messages.

To ensure compliance and transparency, RingCentral automatically sends a confirmation message to the customer after receiving a STOP message, as defined in your TCR registration. One example can be:

***“You will no longer receive texts from this number of Acme Inc. To opt back in, reply START”***

### Popular use cases for SMS opt in APIs

#### Add opted-in phone numbers to RingCentral via API

**Example of use case:** You are using some external means to collect opt back-ins (like via email, website, over phone, etc), and want to push that info to RingCentral SMS opt out database.

There might be a scenario where a customer opts out by sending a STOP message to your business phone number, deletes the conversation, and removes your business phone number from their contacts. Later, they may agree to opt back in by providing verbal or written consent. In such cases, you may need to notify RingCentral to unblock the customer's phone number.

To unblock an opted out phone number in your RingCentral database, you can follow the instructions below to call this API:

PATCH  `/restapi/v2/accounts/~/sms/consents`

In the API body parameters, define the `records` array and create the input object as shown below. The `to` phone number is the phone number of a customer who has given the consent to the optIns list.

```json
var bodyParams = {
    records: [
        {
     		  from:"Your-Business-Number-1",
		      to: "Your-Customer-Phone-Number",
		      optStatus: "OptIn"
		      source: "Api"
        },
        {
     		  from:"Your-Business-Number-2",
		      to: "Your-Customer-Phone-Number",
		      optStatus: "OptIn"
		      source: "Api"
        }
    ]
}
```

The API allows you to register multiple `OptIn` phone numbers for multiple business numbers in a single API call. It also allows you to use the wild card `*` to indicate that the `OptIn` phone number will be opted in for all of your account phone numbers. This helps to significantly reduce the amount of input objects in the API body params, particularly if your company has a large number of phone numbers.

#### Update your CRM with opted-in phone numbers

**Example of use case:** You are using an external system/CRM for storing opted out numbers and want to pull all info from RingCentral SMS opt out database, and sync with that external CRM/system.

If a customer opts back in to receiving SMS messages from your business by sending a START message to your business phone number, you might want to update your CRM with the latest list of opted-in phone numbers from RingCentral’s database.

To read opted in phone numbers from your RingCentral's database, you can follow the instructions below to call this API:

GET `/restapi/v2/accounts/~/sms/consents`

In the API query parameters, set the from parameter to the business phone number(s) for which you want to retrieve the list of opted-in phone numbers.

```json
  var bodyParams = {
	       from: ["+14085556789", "+14086667890"], // Your Business Phone Number
	       optStatus: "OptIn"
      }
```

Below is a sample response returned by the API:

```json
{
	records: [
		{
			from: "+14135556789",
			to: "+15023334444",
			status: "OptIn",
			source: "Recipient"
		},
		{
			from: "+14135556789",
			to: "+14081112222",
			status: "OptIn",
			source: "Recipient"
		}
	],
	paging: {
		pageToken: "yyBjo1MTIwMjI=",
		perPage: 1,
		firstPageToken: "yyBjo1MTIwMjI="
	}
}
```

In addition to reading opted-in phone numbers, you can [subscribe for the opt-out event notification](https://developers.ringcentral.com/api-reference/Subscriptions/createSubscription) to be notified when a customer opts in by sending a `START` message to your business phone number.
