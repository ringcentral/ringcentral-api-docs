# Call Forwarding and Call Flipping

Call Forwarding allows incoming phone calls to be directed to another phone number. This is handy when receipients have multiple phone numbers and physical phone at which they can be reached. There are two primary ways calls are directed to other phones/numbers:

* **Call Forwarding** applies to incoming calls, and allows those calls to ring at one or more numbers sequentially or simultaneously.

* **Call Flipping** applies to active calls, and allows a speaker to instantly transfer an active call to another phone or device without having to terminate the call.

## Phone Types

| Type | Description |
|-|-|
| PhoneLine | This refers to a RingCentral device or hard-phone. When specifying this type when creating/registering a new call forwarding number, the developer must also specify the device id (see [API Reference](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)). |
| Home | Home phone number. |
| Mobile | Mobile phone number. |
| Work | Work phone number. |
| Other | A phone number of any other type. | 

## Registering a Call Forwarding Number

```javascript tab="Javascript"
const RC = require('ringcentral');

PERSONAL_CELL_PHONE = '<ENTER YOUR PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
      server: RINGCENTRAL_SERVER,
      appKey: RINGCENTRAL_CLIENTID,
      appSecret: RINGCENTRAL_CLIENTSECRET
  });
var platform = rcsdk.platform();
platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
      })
      .then(function(resp) {
          call_forwarding()
	  show_extension()
      });

function call_forwarding() {
    platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
      'phoneNumber': PERSONAL_CELL_PHONE,
      'label'      : 'Personal Phone',
      'type'       : 'Mobile'
    })
    .then(function(resp){
        console.log("Call forwarding configured. Phone numbers: ")
    })
    .catch(function(resp){
        console.log("Something went wrong. Maybe you already configured \ncall forwarding for your mobile phone number? Let's see: ")
    })
}

function show_extension() {
    platform.get('/restapi/v1.0/account/~/extension/~/forwarding-number')
    .then(function(resp){
        resp.json().records.forEach( function(val) {
            console.log( val.label + ": " + val.phoneNumber )
        });
    })
}
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$PERSONAL_CELL_PHONE = '<ENTER YOUR PHONE NUMBER>';

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

try {
    $resp = $platform->post('/account/~/extension/~/forwarding-number',
        array(
            'phoneNumber' => $PERSONAL_CELL_PHONE,
            'label'       => 'Personal Phone',
            'type'        => 'Mobile'
        ));
    echo "Call forwarding configured. Phone numbers:\n";
} catch (Exception $e) {
    echo "Something went wrong. Maybe you already configured\n";
    echo "call forwarding for your mobile phone number? Let's see:\n";
}
$resp = $platform->get('/account/~/extension/~/forwarding-number');
foreach ( $resp->json()->records as $key => $val ) {
    echo $val->{'label'} . ":  " . $val->{'phoneNumber'} . "\n";
}
?>
```

```python tab="Python"
const RC = require('ringcentral');

PERSONAL_CELL_PHONE = '<ENTER YOUR PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
        'phoneNumber': PERSONAL_CELL_PHONE,
        'label'      : 'Personal Phone',
        'type'       : 'Mobile'
    })
    print("Call forwarding configured. Phone numbers: ")
except:
    print("Something went wrong. Maybe you already configured")
    print("call forwarding for your mobile phone number? Let's see: ")
    
resp = platform.get('/restapi/v1.0/account/~/extension/~/forwarding-number')
for val in resp.json().records:
    print( val.label + ": " + val.phoneNumber )
```

## Related API Endpoints

* [Get Forwarding Number List](https://developers.ringcentral.com/api-reference/Call-Forwarding/listForwardingNumbers)
* [Create Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)
* [Get Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/readForwardingNumber)
* [Update Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber)
* [Delete Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/deleteForwardingNumber)



