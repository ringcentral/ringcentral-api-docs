# Retrieving and Modifying Message Histories

No content yet.

## Get list of messages

```javascript
  platform.get('/account/~/extension/~/message-store', {
    dateFrom: '2018-04-20T06:33:00.000Z'
  })
```

## Updating the Read Status

```javascript
  platform.get('/account/~/extension/~/message-store', {
    dateFrom: '2018-04-20T06:33:00.000Z'
  }).then(
    response => {
    const messages = response.json().records
    console.log(`We get of a list of ${messages.length} messages`)
    const message = messages[0]
    platform.put(`/account/~/extension/~/message-store/${message.id}`, {
      readStatus: 'Read'
    }).then(response => {
      console.log(`Message readStatus has been changed to ${response.json().readStatus}`)
    }).catch(e => {
      console.error(e)
    })
  }).catch(e => {
    console.error(e)
  })
```

## Deleting a Message

```javascript
  platform.get('/account/~/extension/~/message-store', {
    dateFrom: '2018-04-20T06:33:00.000Z'
  }).then(
    response => {
    const messages = response.json().records
    console.log(`We get of a list of ${messages.length} messages`)
    const message = messages[0]
    platform.delete(`/account/~/extension/~/message-store/${message.id}`).then(response => {
      console.log(`Message ${message.id} has been deleted`)
    }).catch(e => {
      console.error(e)
    })
  }).catch(e => {
    console.error(e)
  })
```

## Complete Example

```javascript
```