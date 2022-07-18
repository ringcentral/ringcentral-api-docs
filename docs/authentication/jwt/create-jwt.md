# How to create a JWT credential

The [JWT Auth flow](../../jwt-flow/) is a secure and easy way for authenticating a user on the RingCentral platform. A JWT credential operates in the same way that a username and password do, in that:

* An app presents a JWT credential to the Auth API.
* The Auth API responds with an access token.
* The app presents the access token in the Bearer HTTP header in subsequent calls to the API. 

In this way, a JWT is not actually and directly associated with an application. JWT credentials belong to users, as users are the ones who authenticate and use the API. The user a JWT credential is associated with in turn determines what features and capabilities can be performed using that credential. For example, if a user Luke does not have permission to edit accounts, and Luke's credential is used to edit an account, then that API call will fail because Luke's account lacks the necessary permission. 

## Creating a JWT credential

JWT tokens are created exclusively within the RingCentral Developer Console. For this reason, JWT credentials can only be created by users who have a valid developer account or role. To create a JWT used for app authentication, follow these steps:

1. Login to the [RingCentral Developer Console](https://developers.ringcentral.com/my-account.html). If you do not have access to the Developer Console, please reach out to your account administrator to request access. 

2. Hover your mouse over your name in the upper righthand corner, and select "Credentials."

    <img src="../../jwt-credentials-menu.png" class="img-fluid" style="max-width:300px">

3. Click "Create JWT."

    <img src="../../jwt-auth-list.png" class="img-fluid" style="max-width:600px">

4. Configure your JWT and click "Create." 

    <img src="../../jwt-auth-create.png" class="img-fluid" style="max-width:500px">

??? hint "Special considerations for Developer Admins"
    Developers with the role of "Developer Admin" have the ability to not only manage their own JWT credentials, but also the JWT credentials of other developers within their organization. 
	To manage another developer's credentials, click on "Organization" in the navigation. Then select the developer whose credentials you would like to manage, and finally click on "Credentials" in the navigation. 

### Configuring the apps permitted to use a credential

Giving someone a JWT credential is akin to you giving someone your username and password, as a JWT credential is, in a sense, a key that unlocks your account via the REST API. In light of this, options have been given to help you protect your credentials and limit the harm they may cause if compromised in some way. When you create a credential you have one of two options:

1. **Restrict the credential to be used only by apps within your organization**. This is a convenient way to create a single key that can be shared broadly within the trusted confines of a company. It is ideal for developers who work on a lot of private apps and don't want the hassle of having to generate separate credentials for each app. 

2. **Restrict the credential to be used by a specific list of trusted applications**. This is the best and only way to create a credential that can be safely shared with someone outside your company. It is "safe" because you have to explicitly grant an application permission to use it, so even if the credential was compromised, it can't be used to connect to your account easily. 

## How to restrict usage of a JWT to an specific application

For added security, especially when you intend to share your JWT with a third-party, we recommend you restrict your JWT to be used with a finite list of apps. To restrict a JWT to be used with only a specific app, you will need to ask the application developer for the client ID of their application. 

Then check "Only specific apps of my choice" under "What apps are permitted to use this credential?" and copy and paste the client ID you received into the text field. 

<img src="../../jwt-auth-clientid.png" class="img-fluid" style="max-width:500px">

Click "Add app." If the app was found, a table will appear showing the current list of apps authorized to use this token. 

<img src="../../jwt-auth-app-access.png" class="img-fluid" style="max-width:500px">

Click "Create" or "Save."

## Using JWT in sandbox versus production

JWT credentials are bound to the environment specified when they were created. A JWT configured for sandbox cannot be used to authenticate in production, and vice versa. 

Furthermore, JWT credentials are owned by a specific individual. So, if a user does not have an account in their sandbox environment, they will be unable to generate a JWT in sandbox. To fix this problem, navigate to your [sandbox accounts page](https://developers.ringcentral.com/console/sandbox) and look for the section entitled, "Your login credentials." Click the create sandbox account link as instructed to create an account for yourself within the sandbox environment.

