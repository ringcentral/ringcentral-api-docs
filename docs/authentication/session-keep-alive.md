# Keeping access tokens fresh and valid

One way RingCentral works to help protect customer accounts from unauthorized access via the API is to regularly expire access tokens obtained through the authentication process. When an access token expires for a user, it can no longer be used to access that user's account or perform any actions on their behalf. In most circumstances this is not a problem, as RingCentral users are accustomed to having to login from time to time to ensure no one is using their account in an unauthorized context. 

However, there are some applications that need to act on behalf of user in the background. For example, a server that routinely processes a user's call log needs the ability to access that user's data even when they are not physically present to login should their access token have expired. In this circumstance, the developer needs to take additional steps after an access token has been issued to keep that access token fresh at all times. 

What follows are recommendations on how developers can keep access tokens fresh.

## Use refresh tokens

[Refresh tokens](refresh-tokens.md) can be used by developers to obtain a newly-issed access token. Following the OAuth specification, this is how a previously issued access token can be replaced with a new key, which will be valid for another 24 hours. 

## Implement a separate process to keep tokens fresh

Once an access token has been obtained, store it somewhere so that it can re-used in the future. When the access token is stored, also store its associated refresh token, along with a timestamp of when it was originally issued. Then, create a scheduled task that will periodically iterate over keys that are about to expire, and use the associated refresh token to obtain a new key and update your storage with that key. In so doing, you can trust that all of the access tokens you store on behalf of users will be up to date and valid. 

## Avoid race conditions

Be careful to avoid a situation in which an access token being used by one process is invalidated by another process designed to keep keys fresh. In such a circumstance the access token being used to call the API may suddenly stop working, causing important offline processes to fail.

There is no one way to avoid a race condition such as this, but here are some common solutions developers may employ:

* Schedule offline processes to run at widely different times. 
* Utilize record locking so that one cannot obtain an access token while it is being refreshed, and keys cannot be refreshed while the current one is actively being used.
* Avoid long-running process in which an access token may remain in memory for long periods of time, increasing the risk that it might be invalidated elsewhere. 

## Consider using JWT auth

RingCentral's [JWT authentication](jwt/quick-start.md) was designed in part to alleviate the overhead of having to implement separate processes to keep access tokens fresh. JWT tokens are persistent and can be used to easily obtain a new access token prior to an action needs to be performed. 

That being said, JWT auth is intended to be used in server-to-server authentication use cases. If your application needs to maintain access tokens for multiple users, we recommend developers not use JWT auth, as doing so by-passes key security protocols to ensure users have full visibility into what actions an app is authorized to perform on their behalf. 
