# Posting simple text messages via the API

To learn how to post a message to a RingCentral team, let's start with the ubiquitous example: Hello World. To post a message via the API, one must first know the ID of the chat they wish to post to.

To help you find an appropriate team ID to post to regardless of the environment or account you may be running within, we take advantage of a type of chat every RingCentral user has but may not know about: one's "personal" chat.

## Finding a safe and private chat ID in which to do development

Every user within RingCentral has a permanent and unique chat that is accessible exclusively by that user. This chat is in fact a chat with a single member: you. This is an ideal chat to post to for development and testing because it is easily discoverable regardless of the environment you may be operating in, and any post traffic you generate their will not intervere with anyone else.

The code sample below queries the Chats endpoint for the chat of type "Personal." The chat id associated with that chat will be found in the response. 

```javascript
{! code-samples/team-messaging/get-personal-chat.js [ln:12-] !}
```

## How to post a simple text message to a chat

With a chat ID in hand, posting is done quickly and easily:

```javascript
{! code-samples/team-messaging/post-text-message.js [ln:35-] !}
```

The code above will result in a chat message that appears as follows:

<img src="../simple-text-message.png" class="img-fluid">

!!! tip "You can also post via an Incoming Webhook"
    [Incoming Webhooks](../webhooks/) provide an alternative conduit by which messages can be posted to a team. An Incoming Webhook's URL can be input into a third-party service provider to allow them to post event messages into a team on your behalf.

## Glipdown: a RingCentral flavor of Markdown

RingCentral supports a simplified version of Markdown to assist in the formatting of text within a message. The following syntaxes are supported for post attachments in addition to post bodies.

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