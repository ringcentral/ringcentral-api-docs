**RingCentral Glip** is a messaging application, both web and desktop, providing built-in chat, tasks, calendar, file/screen sharing, video conferencing and other useful tools.

With **Glip API** you can automate conversational communications, easily synchronize notifications into a single location (greatly reducing email), programmatically generate Glip message post content, and you can even couple the new Glip API resources to operate with AI or Machine Learning to solve advanced use cases.

Now Glip API provides you with the following functionality scope (base URL `/restapi/v1.0`):

- send messages  - `POST /glip/posts`
- read messages filtered by chat  - `GET /glip/posts`
- create chats - `POST /glip/groups`
- edit chat members  - `PUT /glip/groups/[groupId]/bulk-assign`
- get chat member information - `GET /glip/persons/[personId]`
- get list of chats filtered by chat type - `GET /glip/groups`
- get particular chat(s) - `GET /glip/groups/[groupId]`

To learn more about the Glip API methods please view the following resources:

* [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html)
* [API Explorer](https://developer.ringcentral.com/api-explorer/latest/index.html#/Glip_%5BBeta%5D)

On top of that Glip API features chat bots. You may need a smart companion to rent a car, broadcast weather, provide currency exchange rates, send birthday messages, or just in case.