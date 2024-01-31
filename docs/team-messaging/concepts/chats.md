# Working with Chats in Team Messaging

RingCentral's team messaging product enables individuals within an organization to exchange messages with one another. The general term we use to describe these message exchanges is a "chat." However, there are many terms within the API which bare a striking resemblance semantically to a "chat," so before you dig too deep into the API it is recommended you get a firm grasp of these basic terms to help disambiguate the various types of chats that exist.

## Team messaging terminology

The following table provides a description of the various types of chats supported within RingCentral's team messaging product. 

| Term | Definition |
|-|-|
| Chat | A generalized term that encompasses all message exchanges. |
| Conversation | A conversation is a chat that is defined exclusively by the members of the chat. [Conversations](conversations.md) obey a certan set of rules that set them apart from other kinds of chats. |
| Group | A group is a kind of conversation that consists of 3 to 16 members. |
| Team | A team is a named chat, usually associated with a topic of conversation, that consists of one or more members. Members can join and leave teams without disrupting the conversation. | 

## Listing Chats

The [chats endpoint](https://developers.ringcentral.com/api-reference/Chats/listGlipChatsNew) is useful in that it returns a list of every chat in the system regardless of type. This can be helpful when generating a list of chats a person belongs to. However, because not all chats have a name (only teams have names), extra work may be needed in order to construct a human-readable handle to help people identify every chat in the list. 

Furthermore, the chats endpoint does not return a list of members. To obtain a list of members, additional API calls should be made to the endpoints specific to that type.

The following code sample shows a simple way to retrieve a list of chats. As you can see, its utility in generating a list of chats that can be fully understood and appreciated by a human is limited. 

=== "Javascript"

    ```js
    {!> code-samples/team-messaging/get-chats.js !}
    ```

!!! hint "The example above assumed only page of results will be returned. Learn about [pagination](../manual/pagination.md) to iterate over a large result set."
