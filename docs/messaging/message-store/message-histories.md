# Retrieving and Modifying Message Histories

The RingCentral API allows clients to retrieve and modify message histories. This allows developers to modify the read status of a message, or even delete a message, like an internal pager message or a voicemail.

Here are a few examples of how developers can interface with the RingCentral Message Store.

## Updating the Read Status

Individual messages can also be modified.

!!! note "The RingCentral API only allows developers to change the Read Status of a message."

```javascript
const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )

platform.on(platform.events.loginSuccess, async function(e){
  try{
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
        dateFrom: '2018-04-20T06:33:00.000Z'
      })
    var jsonObj = await resp.json()
    const messages = jsonObj.records
    console.log(`We get of a list of ${messages.length} messages`)
    const message = messages[0]
    var resp = await platform.put(`/restapi/v1.0/account/~/extension/~/message-store/${message.id}`, {
        readStatus: 'Read'
      })
    var jsonObj = await resp..json()
    console.log(`Message readStatus has been changed to ${jsonObj.readStatus}`)
  }catch(e){
    console.error(e)
  }
}
```

## Deleting a Message

One or more messages can be deleted as well. Deleting messages is a two-step process. The first call changes the status of a message to "Deleted." The second call will purge the message, the equivalent of "emptying the trashcan." Developers can optionally skip this two-step process by using the `purge=true` parameter in the delete request.

```javascript
const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )

platform.on(platform.events.loginSuccess, async function(e){
  try{
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
        dateFrom: '2018-04-20T06:33:00.000Z'
      })
    var jsonObj = await resp.json()
    const messages = jsonObj.records
    console.log(`We get of a list of ${messages.length} messages`)
    const message = messages[0]
    var resp = await platform.delete(`/restapi/v1.0/account/~/extension/~/message-store/${message.id}`)
    var jsonObj = wait resp.json()
    console.log(`Message ${message.id} has been deleted`)
  }catch(e)
    console.error(e)
  }
}
```
