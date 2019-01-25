# Sending Images over SMS

No content yet.

## Form Data

```javascript
  const formData = new FormData()
  const body = {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
  }
  formData.append('json', Buffer.from(JSON.stringify(body)), {
  			  filename: 'request.json',
			  contentType: 'application/json'
  })
  formData.append('attachment', require('fs').createReadStream('./test.jpg'))
  platform.post('/account/~/extension/~/sms', formData).then(response => {
    console.log('MMS sent: ' + response.json().id)
  }).catch(e => {
    console.error(e)
  })
```


## Complete Example
```javascript
const SDK = require('ringcentral')
const dotenv = require('dotenv')
const FormData = require('form-data')

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
  const formData = new FormData()
  const body = {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
  }
  formData.append('json', Buffer.from(JSON.stringify(body)), {filename: 'request.json', contentType: 'application/json'})
  formData.append('attachment', require('fs').createReadStream('./test.jpg'))
  platform.post('/account/~/extension/~/sms', formData).then(response => {
    console.log('MMS sent: ' + response.json().id)
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```