no_breadcrumb:true

# Create Glip Team Ruby Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new Glip team in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Glip+Team+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Glip+team&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Glip&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Glip Team App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>Glip</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Glip team

### Install RingCentral SDK gem

```bash
$ gem install ringcentral-sdk
```

### Create and Edit create-glip-team.rb

Create a file called `create-glip-team.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

```ruby
require 'ringcentral'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

resp = rc.post('/restapi/v1.0/glip/teams', payload: {
    public: true,
    name: "Fun team",
    members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
    description: "Let chit chat here"
})

puts resp.body
```

### Run Your Code

You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

```bash
$ ruby create-glip-team.rb
```

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=glip">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. 

<a class="btn btn-success btn-lg" href="../../../basics/your-first-steps/">Take your next step &raquo;</a>

