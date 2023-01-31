# Authenticating with the Client SDK

{! docs/video/beta-notice.md !}

## What is a Client ID and Client Secret used for?

Each app you build must first be registered in the RingCentral Developer Console. Upon doing so, you will receive a Client ID and Client Secret that together uniquely identify your application on our platform. You only need to create one app in our console regardless of how many companies or meeting participants that app will be supporting. 

## What authentication methods are supported by the Video Client SDK?

Each instance of the Client SDK must establish a session on behalf of each participant or host that will be joining a meeting. These sessions are created by authenticating them via the SDK. We support a number of different modes of authentication. Each is discussed below. 

### RingCentral auth code

Using a RingCentral auth code, obtained through an OAuth flow, offers end users with the best and easiest-to-use authentication option. For this reason, we recommend this method be used in production. If you are familiar with OAuth grant types and flows, the process is relatively straight-forward. 

Start the process by initiating the [RingCentral auth code grant type flow](../../../authentication/auth-code-flow/). When the user is redirected back to your application after logging in, you will receive an auth code from RingCentral. Provide this auth code to the Client SDK and it will complete the auth process for you. 

### Guest authentication

Using an auth code to authenticate a user presumes the user has a RingCentral account. However, many video client applications are made available to a much large audience of people who do not have a RingCentral account. Consider for example a doctor's office. The doctor may very well be a RingCentral customer and can authenticate accordingly. However, the doctor's patients would not typically be a RingCentral customer, so they would need a way to authenticate in order to join a meeting. We call this auth mode "guest auth."

Guest auth is accomplished by providing no credentials (apart from the app's Client ID and Client Secret), and by providing a name for the user so that other participants can see the name of the person speaking. 

!!! tip "Guest authentication is disabled by default"
    Be advised that this method is disabled by default. If you require guest authentication, please contact RingCentral support to enable this feature of your account. 

=== "Javascript"

    ```js
	{!> code-samples/video/sdk-auth-guest.js !} 
    ```

### JWT credential

A [JWT credential](../../../authentication/jwt/create-jwt/) can be input into the SDK to authenticate a user. JWT credentials are currently obtained through the RingCentral Developer Console and are associated with an individual user. JWT credentials are an ideal way to authenticate to the RingCentral REST API for scheduling meetings, but they do not necessarily offer the best user experience in client applications because the current process of obtaining a JWT through the Developer Console may intimidate a casual end-user. That being said, many developers consider them ideal to use during development because they are quick and easy for developers to generate, and it avoids having to implement a more complex authentication flow just to get started. 

The following code sample shows how JWT authentication is accomplished across our three SDKs.

=== "Javascript"

    ```js
	{!> code-samples/video/sdk-auth-jwt.js !} 
    ```

=== "iOS"

    ```swift
    {!> code-samples/video/sdk-auth-jwt.swift !} 
	```

=== "Android" 

    ```java
    {!> code-samples/video/sdk-auth-jwt.java !} 
    ```

### Username/password

One can also input a username and password via the SDK as a way to authenticate a user into a meeting. This has the advantage of being very easy to use if people know their RingCentral username and password. However, we do not encourage developers to use this model because best practices generally instruct users not to share usernames and passwords directly with third parties. 

Authenticating via a username and password is almost identical to using a JWT credential. The code sample below demonstrates username and password based authentication. 

```js
{!> code-samples/video/sdk-auth-password.js !} 
```

Developers should be aware of the following limitations associated with using username/password: all meeting participants must belong to the same RingCentral account, and they must also belong to the same account in which the app’s client ID and secret were generated. In this way username and password auth is limited to "private applications" or applications that are intended to used by users who all are managed under the same RingCentral account. 

JWT credentials free developers from this limitation, however, JWT credentials can only be generated within the Developer Console, which is not ideal for most users. For this reason, the auth methodology we recommend for production use is a RingCentral auth token.

## Can I provide my own authentication layer?

The default assumption of the RingCentral Video Client SDK is that all the meeting participants joining a meeting via the SDK are RingCentral customers who possess RingCentral login credentials. What if, on the other hand, you want to build an app intended to be used primarily by non-RingCentral users? In this modality, applications should authenticate meeting participants independently, and employ the guest auth mode to pass into the SDK the user's name from the authentication provider. 
