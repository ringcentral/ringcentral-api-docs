# Sending Images over SMS

One can send images and other files via SMS as well. Doing so requires developers to POST to the `sms` endpoint using multipart form-data, or attachments. In the following example we will transmit an image called `test.jpg` along with the text message, "hello world."

## Creating Attachments

When assembling a multipart message, it is important to remember that the root part, or first part of the request is always the request body or payload. Subsequently you attach images and files to the request. You can see how this is done via the code samples below.

!!! warning "Attachment Limitations"
    * There is a combined limit of 1.5M bytes for all attachments.
    * There is a limit of 10 attachments for any request. 

```javascript tab="Javascript" hl_lines="15 16 17 18 19 20 21"
const SDK = require('ringcentral')
const FormData = require('form-data')
const rcsdk = new SDK({
  server: "server_url", appKey: "client_id", appSecret: "client_secret"
})
const platform = rcsdk.platform()
platform.login({
  username: "username", extension: "extension_number", password: "password"
}).then(response => {
  const body = {
    from: { phoneNumber: "username" },
    to: [ { phoneNumber: "recipient_number" } ],
    text: 'Hello world'
  }
  const formData = new FormData()
  file = {filename: 'request.json', contentType: 'application/json'};
  formData.append('json',
                  Buffer.from(JSON.stringify(body)),
                  {filename: 'request.json', contentType: 'application/json'})
  formData.append('attachment',
                  require('fs').createReadStream('./test.jpg'))
  platform.post('/account/~/extension/~/sms', formData).then(response => {
    console.log('MMS sent: ' + response.json().id)
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```

```python tab="Python" hl_lines="5 6 7 8 9 10 11 12 13"
from ringcentral import SDK
sdk = SDK( "client id", "client_secret", "server_url" );
platform = sdk.platform()
platform.login( "username", "extnsion_number", "password" )
builder = sdk.create_multipart_builder()
builder.set_body({
    'from': {'phoneNumber': "username"},
    'to': [{'phoneNumber': "recipient_number"}],
    'text': "Hello World"
})
image = open ('test.jpg', 'rb')
attachment = ('test.jpg', image, 'image/jpeg')
builder.add(attachment)
try:
    request = builder.request('/account/~/extension/~/sms')
    response = platform.send_request(request)
except Exception as e:
    print(e)
```

```php tab="PHP" hl_lines="10 11 12 13"
<?php
$rcsdk = new RingCentral\SDK\SDK("client id","client_secret","server_url");
$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );
$body = array(
   'from' => array( 'phoneNumber' => "username" ),
   'to'   => array( array('phoneNumber' => "receiver" ) ),
   'text' => 'Hello world'
);
$request = $rcsdk->createMultipartBuilder()
    ->setBody( $body )
    ->add(fopen(__DIR__.'/test.jpg', 'r'))
    ->request('/account/~/extension/~/sms');
$r = $platform->sendRequest($request);
?>
```
