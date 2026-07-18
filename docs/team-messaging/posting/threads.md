# Posting thread messages via the API

Chat posts can be grouped into threads. A threaded reply is still a post in the same chat, but the post response includes thread metadata that lets your app find the parent post and retrieve the other posts in the thread.

Use threaded posts when a bot or app needs to keep follow-up messages attached to a specific conversation inside a chat.

## Creating a thread reply

Create the first reply to a post by passing the parent post ID in the `parentPostId` request property when you call [Create Post](https://developers.ringcentral.com/api-reference/Posts/createGlipPostNew).

```json
{
  "text": "First reply in the thread",
  "parentPostId": "1234567890"
}
```

If `parentPostId` identifies a reply that is already in a thread, the new post is added to the original parent post's thread.

## Adding a reply to a thread

If your app already has a thread ID, you can add a reply by passing `threadId` instead.

```json
{
  "text": "Reply using a thread ID",
  "threadId": "9876543210"
}
```

Use one of `parentPostId` or `threadId` for a threaded reply. To create a regular top-level post, omit both fields.

## Reading thread metadata

Post responses from [Create Post](https://developers.ringcentral.com/api-reference/Posts/createGlipPostNew), [Get Post](https://developers.ringcentral.com/api-reference/Posts/readGlipPostNew), [Update Post](https://developers.ringcentral.com/api-reference/Posts/patchGlipPostNew), and [List Posts](https://developers.ringcentral.com/api-reference/Posts/readGlipPostsNew) can include these thread fields:

| Field | Description |
|-|-|
| `isParent` | Returned for a post that is the parent post of a thread. |
| `parentPostId` | The parent post ID when the post belongs to a thread. |
| `threadId` | The thread ID shared by posts in the same thread. |

## Listing posts in a thread

Call [List Thread Posts](https://developers.ringcentral.com/api-reference/Posts/readGlipThreadPostsNew) to fetch posts that belong to a specific thread.

```http
GET /team-messaging/v1/chats/{chatId}/threads/{threadId}/posts?recordCount=30
```

The response uses the same Chat pagination model as other list endpoints. If the response contains `navigation.nextPageToken` or `navigation.prevPageToken`, pass the token as the `pageToken` query parameter in the next request.

```http
GET /team-messaging/v1/chats/{chatId}/threads/{threadId}/posts?pageToken={pageToken}
```

## Example

The following example finds the authenticated user's personal chat, creates a parent post, creates a threaded reply using `parentPostId`, and then lists posts from the returned `threadId`.

=== "JavaScript"

    ```javascript
    --8<-- "code-samples/team-messaging/threaded-posts.js"
    ```
