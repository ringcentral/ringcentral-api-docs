# Working with Conversations in Team Messaging

A conversation in RingCentral parlance is a kind of chat between a fixed group of individuals. Conversations exhibit the following special qualities that set them apart from other types of chats:

* They do not have names. They are defined instead by the members of the chat.
* They cannot be deleted.
* The members that belong to them cannot be changed.
* One cannot leave a conversation, archive it, or unarchive it.

## Conversation Types

Conversations can be further disambiguated by their assigned type. Here are the various types of conversations that the system supports, which is reflected by the conversation's `type` property. 

| Type | Description |
|-|-|
| `Personal` | A special chat that contains a single person. The personal chat can only be accessed by the sole member of the chat, making them in many ways private. |
| `Everyone` | *Deprecated* Perhaps considered the opposite of a personal chat, the "everyone" chat is a conversation whose members automatically contain every member of the organization. In this way, the "everyone" chat breaks some of the aforementioned rules, but is a conversation nonetheless. |
| `Group` | A group chat is a chat between a fixed group of three to sixteen individuals. |
| `Direct` | A direct chat is a chat between exactly two people. |

!!! hint "Group chats have a limit of 16 members. If you need to chat between more than 16 people, use a [team](teams.md)."

## Creating a conversation

Conversations cannot be deleted or archived, so when [creating a conversation](https://developers.ringcentral.com/api-reference/Conversations/createGlipConversationNew) you specify the members of the conversation. If a chat does currently exist containing exclusively those members, then a new conversation will be created and returned. However, if a conversation with those members already exists, it will be returned instead. 

## Finding the members of a conversation

When calling any of the [conversation endpoints](https://developers.ringcentral.com/api-reference/Conversations/listGlipConversationsNew) in the REST API, an array of members will be returned. The array will contain only the IDs of the members. To find the members' names, one can call the [persons endpoint](https://developers.ringcentral.com/api-reference/Profile/readGlipPersonNew).

**Example Conversations JSON**

```json
{
    "records": [
        {
            "id": "6090227714",
            "type": "Personal",
            "members": [
                {
                    "id": "61307231006"
                }
            ],
            "creationTime": "2015-10-06T12:39:43.455Z",
            "lastModifiedTime": "2018-12-10T08:49:43.035Z"
        },
        {
            "id": "6090235906",
            "type": "Direct",
            "members": [
                {
                    "id": "986580011"
                },
                {
                    "id": "61307231006"
                }
            ],
            "creationTime": "2015-10-06T12:39:43.471Z",
            "lastModifiedTime": "2018-12-10T14:01:34.006Z"
        },
	// ..snip..
    ]
}
```

