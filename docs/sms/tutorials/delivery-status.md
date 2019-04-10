# Updating the Delivery Status of an SMS

No content yet.

## Form Data

```javascript
platform.get(`/account/~/extension/~/message-store/${messageId}`).then(response => {
  console.log(response.json().messageStatus)
})
```

## Complete Example

```javascript
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  platform.post('/account/~/extension/~/sms', {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
  }).then(response => {
    const messageId = response.json().id
    platform.get(`/account/~/extension/~/message-store/${messageId}`).then(response => {
      console.log(response.json().messageStatus)
    })
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```