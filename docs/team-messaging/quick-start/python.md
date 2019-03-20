no_breadcrumb:true

# Team Messaging Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, team messaging and meetings. 

In this Quick Start, we are going to help you build your first chat bot using our Team Messaging API. Let's get started.

## Setup Your Project

!!! info "Prerequisites"
    This framework requires Python3.6+ and Pip3.

First we install virtualenv which will create an isolated environment in which to install and run all the python libraries needed by this framework. Using virtualenv will ensure that the libraries installed for this project do not conflict or disrupt the other python projects you are working on.

```bash
mkdir my-glip-bot
cd my-glip-bot
pip3 install virtualenv
virtualenv venv --python=python3
source ./venv/bin/activate
pip3 install python-dotenv ringcentral pydash boto3 flask pylint ringcentral_client
```

Next, we need to install and run ngrok, a tool for routing web requests to a localhost. This is what will allow your local bot in development to receive webhooks from RingCentral. ngrok is a node app and is installed and started as follows:

```bash
npm install
./bin/proxy
```

After ngrok has started, it will display the URL when the ngrok proxy is operating. It will say something like:

Forwarding https://xxxxx.ngrok.io -> localhost:9898

Make note of this URL, as you will need it in the next step.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Chat Bot App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,Glip,EditExtensions&redirectUri=" class="btn btn-primary">Create Chat Bot App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server-only (No UI)' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>Glip</li>
    <li>Webhook Subscriptions</li>
    <li>Edit Extensions</li>
  </ul>
  </li>
<li>Leave "OAuth Redirect URI" blank for now. We will come back and edit that later.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Edit .env

Create a file called `.env`. Then copy and paste the contents below. Be sure to substitute values accordingly.

```
## common required
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com
RINGCENTRAL_BOT_SERVER=https:xxxxx.ngrok.io

## for bots auth required
RINGCENTRAL_BOT_CLIENT_ID=
RINGCENTRAL_BOT_CLIENT_SECRET=

## for user auth, could be empty if do not need user auth
RINGCENTRAL_USER_CLIENT_ID=
RINGCENTRAL_USER_CLIENT_SECRET=

## extensions, separate by `,`
# example: EXTENSIONS=ringcentral_bot_framework_extension_botinfo,ringcentral_bot_framework_extension_some_other_extnesion
# find more ringcentral_bot_framework_extensions from pypi.org, search by keyword `ringcentral_bot_framework_extension`
EXTENSIONS=

## Dataviewer visit /data to check database data json
# enable it by set to `yes`
# Default is disbaled
DATA_VIEWER_ENABLED=no

## Database

## db module
## filedb -- built-in filedb
## dynamodb -- built-in dynamodb
## custom -- use custom `dbWrapper` function defined in config.py
DB_TYPE=filedb
## filedb config
FILEDB_FOLDER_NAME=filedb

## DynamoDB config
DYNAMODB_TABLE_PREFIX=ringcentral_bot1
DYNAMODB_ReadCapacityUnits=1
DYNAMODB_WriteCapacityUnits=1
AWS_REGION=us-east-1

## local dev server config
PORT=9898
HOST=localhost
FLASK_ENV=development
```

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../../../basics/app-gallery) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
