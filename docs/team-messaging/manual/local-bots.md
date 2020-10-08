# Building a RingCentral Bot Locally

To develop a bot for the RingCentral App sign in to your RingCentral account and login into the [RingCentral Developer Console](https://developers.ringcentral.com/my-account.html#/applications).

## Prerequisites - ngrok

Bot applications must have OAuth redirect URLs that are accessible over the Internet. If webhooks are used those must also be accessible over the Internet. For developing locally, a tunneling tool like ngrok is useful. To set up ngrok, use the following steps:

* Go to [https://ngrok.com/](https://ngrok.com) and download the version that corresponds to your platform. In our case, we'll be downloading the Mac OS X 64-bit version.
* You can extract ngrok into the folder of your preference and run ngrok from there.
* Launch ngrok by navigating to the directory where you unzipped ngrok and starting with the port you want to expose to the public internet with the following:

```bash 
./ngrok http 4390
```

If every thing goes well you should see the follow screen.

<img src="../../../img/ngrok-running.png" class="img-fluid" style="max-width: 400px">

## Create a Bot application

With our proxy running, we now have all the information we need to create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Chat Bot App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Chatbot+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,Glip,EditExtensions&redirectUri=" class="btn btn-primary">Create Bot App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "Bot App for Team Messaging" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>Glip</li>
    <li>Webhook Subscriptions</li>
    <li>Edit Extensions</li>
  </ul>
  </li>
<li>Leave "OAuth Redirect URI" blank for now. We will come back and edit that later.</li>
</ol>
</div>

## Create a Simple Node.js application

Let's set up a simple web server to processes all incoming HTTP requests.

We'll be using Node.js to develop our app, so you'll need to make sure you've installed it on your machine as well.

1. Clone the sample application from [Github](https://github.com/pkvenu/developing-locally-with-Glip.git)

2. Fire up the terminal window and change the path to the cloned applicaton directory and enter the command below:

     ```bash
     npm install
     ```

3. Create a copy of the `env.template` file and rename it to `.env`

4. Update the `.env` file with the values for `CLIENT_ID`, `CLIENT_SECRET` from the the bot creation step and the `REDIRECT_HOST` from ngrok. I would look something like this:
   
       <img src="../../../img/envfile.png" class="img-fluid" style="max-width: 500px">

5. Run the following command in terminal to launch the app.

     ```bash
     npm start
     ```

6. Go to the `Bot` tab of the recently created app in the Developer Console. Click on the `Add to Glip` button.

    <img src="../../../img/glip_bot_tab.png" class="img-fluid" style="max-width: 500px">

    This will trigger the installation of the bot and will respond back with `authorization code` to the oauth redirect Url.

    !!! info "The bot provisioner will only use the first URL specificed in the oAuth settings."

    <img src="../../../img/authorization.png" class="img-fluid" style="max-width: 300px">

7. You can now exchange the authorization code for an bot token using the code below:
    
     ```javascript
     //Authorization callback method.
     app.get('/oauth', function (req, res) {
         if(!req.query.code){
             res.status(500);
             res.send({"Error": "Looks like we're not getting code."});
             console.log("Looks like we're not getting code.");
         }else {
             platform.login({
                 code : req.query.code,
                 redirectUri : REDIRECT_HOST + '/oauth'
             }).then(function(authResponse){
                 var obj = authResponse.json();
                 bot_token = obj.access_token;
                 res.send(obj)
                 subscribeToEvents();
             }).catch(function(e){
                 console.error(e)
                 res.send("Error: " + e);
             })
         }
     });
     ```
     
     The access token obtained is a `permanent` access token. It's the developer responsibility to manage access token. For public applications this would mean storing the bot token in a database and mapping to a customerId. They would then use the customerId to retrieve the access token before posting back to RingCentral.

8. We can now subscribe to RingCentral events using the code below:
    
    ```javascript
    function subscribeToEvents(token){
        var requestData = {
            "eventFilters": [
                "/restapi/v1.0/glip/posts",
                "/restapi/v1.0/glip/groups"
            ],
            "deliveryMode": {
                "transportType": "WebHook",
                "address": REDIRECT_HOST + "/callback"
            },
            "expiresIn": 500000000
        };
        platform.post('/subscription', requestData)
            .then(function (subscriptionResponse) {
                console.log('Subscription Response: ',
		   subscriptionResponse.json());
                subscription = subscriptionResponse;
                subscriptionId = subscriptionResponse.id;
            }).catch(function (e) {
                console.error(e);
                throw e;
            });
    }
    ```

9. Now login to `glip.devtest.ringcentral.com` with your credentials and search for the bot name. Click on the bot name and type in "Hi" to start communicating with it.

    <img src="../../../img/glip_bot_devtest.png" class="img-fluid">

10. You should now see the notification messages in the console as show below:

```json
{
    "timestamp": "2017-03-21T18:29:27.408+0000",
    "subscriptionId": "a45645-0001-cc71-9de3-674476722",
    "uuid": "b11c9430-9687-4498-b12b-3fcb470bfe04",
    "event": "/restapi/v1.0/glip/posts",
    "body": {
        "eventType": "PostAdded",
        "id": "0000001",
        "type": "TextMessage",
        "text": "Hi!",
        "creatorId": "123456789",
        "groupId": "1234",
        "creationTime": "2017-03-21T18:29:20Z",
        "lastModifiedTime": "2017-03-21T18:29:27Z"
    }
}
```
