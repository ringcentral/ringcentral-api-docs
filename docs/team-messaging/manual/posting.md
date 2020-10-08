# Posting simple text messages via the API

To learn how to post a message to a Glip team, let's start simple with a simplest possible example: Hello World. To post a message via the API, one must first discover the ID of the chat you will be posting into. The code below demonstrates how to fetch your "Personal" chat.

## Finding your "Personal" chat

Every user within Glip has a chat with themselves. This is a good chat to post to for development and testing because it is easily discoverable regardless of the environment you may be operating in.

```javascript
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
    .then(
        function(resp) {
	    var endpoint = "/restapi/v1.0/glip/chats"
	    platform.get(endpoint, { type: 'Personal' } )
      	       .then(function(resp){
            var json = resp.json()
            var chat_id = json['records'][0]['id']
            console.log("Personal chat ID: " + chat_id)
        }
    );
```

## How to post a simple text message to a Glip chat

With a chat ID in hand, posting is done quickly and easily:

```javascript
var CHAT_ID = "<ENTER CHAT ID>"
var params = {
    text: "Hello world"
}
platform.post('/restapi/v1.0/glip/chats/'+CHAT_ID+'/posts', params)
    .then(function(resp){
        var json = resp.json()
        var id = json['id']
        console.log("Posting message successfully, id: " + id)
    })
    .catch(function(e){
        console.log(e)
    })
```

The code above will result in a chat message that appears as follows:

<img src="../simple-text-message.png" class="img-fluid">

!!! tip "You can also post via a Glip Webhook URL"
    [Glip Webhook URLs](../webhooks/) provide an alternative conduit by which messages can be posted to a team. Glip Webhook URLs can be input into a third-party service provider to allow them to post on your behalf.

## Glipdown: a Glip flavor of Markdown

Glip supports a simplified version of Markdown to assist in the formatting of text within a message. The following syntaxes are supported for post attachments in addition to post bodies.

<table class="table">
<thead>
<tr><th scope="col">Glip/Markdown</th><th scope="col">Resulting Text</th></tr>
</thead>
<tbody>
<tr><td>*italics*</td><td><i>italics</i></td></tr>
<tr><td>**bold**</td><td><b>bold</b></td></tr>
<tr><td>_underline_</td><td><u>underline</u></td></tr>
<tr><td>[a link](http://example.com)</td><td><a href="http://example.com">a link</a></td></tr>
<tr><td>&gt; quote</td><td><blockquote>quote</blockquote></td></tr>
<tr><td>* bullet</td><td><ul><li>bullet</li></ul></td></tr>
</tbody>
</table>

## Keep reading...

In this article you learned how to post a simple text message. You can also post the following:

* [Cards](../posting-cards/)