# RingCentral Social Messaging Guide

<div class="jumbotron pt-1">
  <h3 class="display-5">Welcome!</h3>
  <p class="lead">Here you have access to all the resources necessary to build an app successfully using Social Messaging API’s. Getting started is easy with resources and guides collected here to help developers use the Social Messaging APIs.</p>
  <!--<hr class="my-4">
  <p>The following Quick Start Guides have been created to assist developers in getting started in each of our major APIs:</p>
  <ul>
    <li><a href="./interactions/quick-start/">List Threads</a> using our <strong>Interaction API</strong>.</li> 
    <li><a href="./routing/quick-start/">List Agent Tasks</a> using our <strong>Routing API</strong>.</li> 
  </ul>
  -->
  <!--<p>Not a programmer? <a href="./basics/explorer/">Try out the API with no programming</a>.</p>-->
  <hr class="my-4">
  <p>Developers interested in leveraging Social Messaging API’s for CX use cases can fill out the following form to sign up for accesss.</p>

  <p><a class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSdj2nC4VA2ppfdYJA4-BNAsgnElrU2eiNdhXeieZmvERpjPXA/viewform">Social Messaging Developer Signup Form &raquo;</a></p>
</div>

## Concepts

To get started, let's walk through some initial concepts every Social Messaging Developer should know about to use our features.

### Sources/Channels

A channel (or source) is referred to as a digital medium for customers to connect with enterprises. We currently support the following channels/sources through the API’s:

* Facebook public and private
* Twitter public and private
* Instagram public and private
* WhatsApp
* LinkedIn
* Apple Messages for Business (AMB)
* YouTube
* Engage Messaging
* Google Messages for Business
* Google Reviews
* Email
* Viber

To get messages from these channels you would need to have an account which can be connected, authorized and set up to start getting messages.

To configure a channel, one has to be provided with an Engage Digital account where they can use specific channel flows for setup and configuration.  Please use the signup button above to request an Engage Digital account for channel setup and configuration.

### Content

Content refers to messages that are sent/received on the configured channels. Content could be simple text messages, rich structured messages (e.g. carousels, rich link, etc.) or attachments in the form of files or videos. The Contents API will allow developers to both obtain and send content out on the configured source/channel.

### How to configure a channel

Each channel like WhatsApp, Viber, and Facebook is a medium through which agents can communicate with customers.

Please refer to the following [documentation](https://support.ringcentral.com/engagedigital/admin/configure-entry-points.html) on how to setup and configure a channel.

### Webhooks

Social Messaging provides a Webhook API to be notified when events occur. This API is near real time and provides an alternative to polling the REST API. The purpose is to be able to trigger event-based behavior. This way you will be able to build a gamification mechanism, live dashboard, synchronizing contents, etc. The current event type supported through Social Messaging webhook is as below

#### Resource Types

|Type|Description|
|-|-|
|`content.imported`|When a new content has been imported from the source to Engage.|
|||

## Content API

### Get Content

This method lists contents ordered by creation date (descending) as a flat list (not nested).

RingCentral production servers are accessible on `https://platform.ringcentral.com`. Please note that for security reasons connection is allowed using only HTTPS protocol to the default HTTPS port 443, so the port can be omitted in the URI.
Be sure to set the proper [authorization header](https://developers.ringcentral.com/guide/authentication/auth-code-flow#step-4-make-your-api-calls) for your deployment.

=== "HTTP"
    ```html
    GET https://platform.ringcentral.com/engage/advanced-messaging/v1/contents
    ```

#### An Example with Facebook

There are several IDs in the GET `/content` API. Each has a different meaning. As an example with Facebook developers can interpret the meanings of the IDs as such:

|ID Name|Description|
|-|-|
|`foreignId`|This is the ID supplied by the channel. In this case, with Facebook, the ID consists two numeric parts, delimited by an underscore (_). The first part is the post ID of the post in Facebook. The second part, after the underscore, is the reply ID from Facebook.|
|||

!!! note "Intervention IDs"
    Intervention IDs are only used on the Engage Digital platform. You will notice that if a user responds to a post/message, the intervention ID will be populated, but any post/reply from the API will not have an intervention ID.

### Get Content from a Specific Channel

You can create multiple channels including, but not limited to, WhatsApp, Facebook, and LinkedIn. When you want to retrieve the contents of a single channel, you must first find the `sourceId` from the channel. With this `sourceId`, you can then get the contents just for that source.

=== "HTTP"
    ```html
    GET https://platform.ringcentral.com/engage/advanced-messaging/v1/contents?source=64c831b164ffc8574324139e
    ```

These parameters go into the query string

### Paginating Through Content

When retreiveing content, only the last 30 posts are returned by default. You can change the number of results per page as well as move from page to page using the paging object.

To change the number of results (posts) per page, set the `perPage` object:
```html
  perPage=10
```

Then to move to the next page, use the `pageToken` to move to the next page of results.
```html
  pageToken=eyJ2YWx1ZSI6MTY5MTUzMzQxOC4wLCJmaWV...QyYzA2YWFiYTEzMjAwMDczNDgyNjUifQ==
```

Theses parameters belong in the query string, so the entire request URL with paginating to the second page with 10 objects per page would look like this:
```html
  GET https://platform.ringcentral.com/engage/advanced-messaging/v1/contents?perPage=10&pageToken=eyJ2YWx1ZSI6MTY5MTUzMzQxOC4wLCJmaWV...QyYzA2YWFiYTEzMjAwMDczNDgyNjUifQ==
```

### Create Content

This method allows you to create new content for use in discussions. It can be a reply to another piece of content or be used to initiate a discussion. If authorized, the token’s user will be used as the content author. Content will be created and pushed asynchronously to the source.

Replying to a customer's content is usually possible (unless the source/conversation is read only).

Composing a content on the contrary depend on the source itself:

* The source may not support it (and be purely reactive like Instagram, Messenger ...)
* Some sources (usually public account) like Twitter or Facebook page allows you to publish content without targeting specific individuals.
* Some sources (usually non public media) require specific targeting (phone number for SMS, email address for email, customer_id ...) to be able to create a content. This is source specific and detailed under the generic parameters.

Authorization​: only users that can reply or initiate discussion (= compose) on given source. it renders also an error if in_reply_to isn’t synchronized or if in_reply_to content is not under an ​open intervention.

RingCentral production servers are accessible on `https://platform.ringcentral.com`. Please note that for security reasons connection is allowed using only HTTPS protocol to the default HTTPS port 443, so the port can be omitted in the URI.
Be sure to set the proper [authorization header](https://developers.ringcentral.com/guide/authentication/auth-code-flow#step-4-make-your-api-calls) for your deployment.

=== "HTTP"
    ```html
    POST https://platform.ringcentral.com/engage/advanced-messaging/v1/contents
    ```

## Identities API

A single end user can use many different channels. To identify the end user, we have the identities API. This identity is then linked to each post in the form of an alphanumeric ID. To find the name of the end user, or typically known as the sender or poster, look for the `authorIdentityId` object and pass that into the query string using the identities API.

=== "HTTP"
    ```html
    GET https://platform.ringcentral.com/engage/advanced-messaging//v1/identities/642d950e206a4e0007666f31
    ```


In the response object, you will look for the `screenName` field for the name of the user.

You can also get a list of all known identities by not specifying the ID:

=== "HTTP"
    ```html
    GET https://platform.ringcentral.com/engage/advanced-messaging//v1/identities
    ```
