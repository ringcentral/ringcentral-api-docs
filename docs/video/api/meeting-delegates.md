# Meeting delegates and scheduling on behalf of another

{! docs/video/beta-notice.md !}

By default, the host of the meeting is set to the person scheduling the meeting (or calling the API). However, sometimes you need to schedule a meeting on behalf of another. This is a common need for services that operate a centralized booking agent, whereby a single user is acting on behalf of everyone else in the organization to help schedule meetings with customers, clients, patients, etc. 

To schedule a meeting on behalf of someone else, one need only set the `accountId` and `extensionId` parameters in the create meeting request to the corresponding values of the host. 

```js 
var ACCOUNT_ID   = '123456789'
var EXTENSION_ID = '987654321'
platform.post('/rcvideo/v2/account/'+ACCOUNT_ID+'/extension/'+EXTENSION_ID+'/bridges', {
    name: 'Test Meeting'
})
.then(function (resp) {
    console.log(resp.json())
});
```

When setting the account ID and extension ID for a bridge, the tilda character ("~") can be used as a shorthand for the "same account/extension as the currently logged in user." For example:

| Account ID | Extension ID | Meaning                                                                             |
|------------|--------------|-------------------------------------------------------------------------------------|
| `~`        | `~`          | Create a bridge for the current user.                                               |
| `~`        | `12345678`   | Create a bridge for a specific user in the same org as the current user.            |
| `12345678` | `87654321`   | Create a bridge for a specific user in a different org. This syntax is rarely used. |

## Enabling someone to act as a meeting delegate

If you receive a "403 Forbidden" error message when trying to set the host of a meeting, that is because the host has not authorized you to schedule meetings on their behalf. People who have this authority are called "delegates." You can make someone a delegate by following the following instructions.

1. Login to the [RingCentral Admin Console](https://service.ringcentral.com/).
2. Edit your own settings, or that of another user (if you are permitted to do so). 
3. Expand the "User Details" section. 
4. Select the "Meetings" tab. 
5. Under "Schedule meetings for me," click Edit and select the users who are authorized to be your delegate. 

<img class="img-fluid" src="../meeting-delegates.png" style="max-width: 500px">

Alternatively, delegates can be selected and set within RingCentral Video directly. To do so, follow these instructions.

1. From a RingCentral Video meeting, select "Settings" from the "More" menu. 
2. Click the "Delegates" tab. 
3. Search for a delegate and click "Add."

<img class="img-fluid" src="../rcv-delegates.png" style="max-width: 500px">

#### Using the API to fetch a list of delegates

To see what users may act as a meeting delegate for any given user, you can call the following endpoint:

```js 
platform.get('/rcvideo/v1/accounts/~/extensions/~/delegators')
	.then(function (resp) {
		console.log( resp.json() )
	});
```

A successful call will have a response similar to the following (an array of users):

```json
[
  {
    id: '322555020',
    name: 'Craig Chan',
    accountId: '37555510',
    extensionId: '322555020'
  }
]
```

### Sample Response

When run, the sample code above should return something that looks like this:

```json
{!> code-samples/video/meeting-delegate-response.json !}
```
