no_breadcrumb:true

# Call Answering Rules JavaScript Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to read preset call answering rules of a user, so that you can see the rule's details and update the rule with new values if you want to. Let's get started.


### Install RingCentral Node JS SDK

```bash
$ npm install @ringcentral/sdk --save
```

### Create and Edit get-call-answering_rules.js

Create a file called <tt>get-call-answering_rules.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

```javascript
const SDK = require('@ringcentral/sdk').SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new SDK({
      server: RINGCENTRAL_SERVER,
      clientId: RINGCENTRAL_CLIENTID,
      clientSecret: RINGCENTRAL_CLIENTSECRET
  });
var platform = rcsdk.platform();
platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
      })
      .then(function(resp) {
          get_user_call_answering_rules()
      });

function get_user_call_answering_rules() {
    platform.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
        'view': "Detailed",
        'enabledOnly': false
      })
      .then(function(resp){
          return resp.json()
      }).then(function(jsonObj) {
        for (var record of jsonObj.records){
          // use the record.id to read rule details
          get_user_call_answering_rule(record.id)
        }
      })
      .catch(function(e){
          console.log(e.message)
      })
}

function get_user_call_answering_rule(id) {
    platform.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + id )
        .then(function(resp){
          return resp.text()
        })
        .then(function(text) {
          console.log(text)
        })
        .catch(function(e){
            console.log(e.message)
        })
}
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node get-call-answering_rules.js
```

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=call+management">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. 

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>

