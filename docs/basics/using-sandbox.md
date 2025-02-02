# Developing and testing your app in sandbox

{! mdx_includes/first-api-call-reminder.md !}

RingCentral provides developers with both a sandbox and production environment. Sandbox is used to develop and test your app, while production is used to run your app.

## What is the developer sandbox?

The RingCentral developer sandbox environment is completely separate and segregated environment from production, in which customers access our SLA-backed and highly available communication platform. We maintain two separate environments so that developers and customers can obtain the benefits below.

#### Benefits of the RingCentral developer sandbox

* **Data segregation**. Developers are free to make additions and changes without fear of littering the production account with test and dummy data.
* **Enhanced change control**. Developers are free to create and develop applications in sandbox without fear of interfering with applications safely running in our production environment. This is especially important for our HIPAA-compliant customers.
* **Cost savings**. API calls to our sandbox environment are not metered, or count against any allottments your account may be limited by.
* **Improved compliance**. By requiring developers to apply for access to production, we can put in place steps to reduce the risk of developers unknowingly violating our company's EULA or TOS.

??? hint "Understanding basic sandbox terminology"
    * The "sandbox environment" refers to the entire sandbox ecosystem in which developers from different companies are all developing their own applications.
	* A "sandbox account" refers to the account owned by a single company or developer organization within the sandbox environment. All developers within that company share access to the same sandbox account.
	* A "sandbox login" refers to a single user within a sandbox account. Each developer has their own separate login.

## Making API calls in sandbox

In order to successfully direct API calls to the sandbox environment, developers will need to do the following:

* Obtain the sandbox client ID and secret for your app
* Present sandbox authentication credentials 
* Direct API calls to sandbox servers

!!! warning "Not all APIs are available in sandbox"
    The following APIs are not currently available in the sandbox environment:
	
	* RingCentral Events
	* RingCentral Webinar
	* RingCentral Video and Video Client SDK
	* RingSense
	* SMS

### Finding your sandbox app credentials

Every RingCentral application is provisioned a client ID and secret for sandbox. These credentials can be found in the Developer Console, under the "Credentials" tab of any given app. 

<img src="../../img/app-credentials.png" class="img-fluid" style="max-width: 550px">

### Obtaining authentication credentials

If you are using [JWT auth](../authentication/jwt-flow.md) be sure the JWT auth credential you are using is for the sandbox environment. If you are using the auth code or traditional OAuth flow, be sure the username and password used to login are ones that belong to your sandbox environment. For most people this is your email address and the sandbox password you selected for yourself when logging into the Developer Console for the first time. 

!!! tip "Using JWT in sandbox versus production"
    JWT credentials are bound to the environment specified when they were created. A JWT configured for sandbox cannot be used to authenticate in production, and vice versa. 
	
    Furthermore, JWT credentials are owned by a specific individual. So, if a user does not have an account in their sandbox environment, they will be unable to generate a JWT in sandbox. To fix this problem, navigate to your [sandbox accounts page](https://developers.ringcentral.com/console/sandbox) and look for the section entitled, "Your login credentials." Click the create sandbox account link as instructed to create an account for yourself within the sandbox environment.

### Directing API calls to sandbox server URLs

Our sandbox API responds to a different set of URLs than our production environment. Be sure in your code you specify a `SERVER_URL` of `https://platform.devtest.ringcentral.com/`. 

## Accessing your sandbox account

Your RingCentral sandbox account is a completely distinct environment from production, but contains all of the same services and products. That means that within the sandbox environment you can make and receive phone calls, create meetings, manage users, and do all of the same things you can in production. However, you may access these products and services through a different set of URLs. These URLs are:

| Product                   | URL                                                                                    |
|---------------------------|----------------------------------------------------------------------------------------|
| RingCentral app           | [`https://app.devtest.ringcentral.com`](https://app.devtest.ringcentral.com)           |
| RingCentral Admin console | [`https://service.devtest.ringcentral.com`](https://service.devtest.ringcentral.com)   |
| RingCentral API           | [`https://platform.devtest.ringcentral.com`](https://platform.devtest.ringcentral.com) |

You can discover and access all of the various sandbox services within the sandbox environment under the [Sandbox Accounts](https://developers.ringcentral.com/console/sandbox) tab in the Developer Console. 

<img src="../../img/sandbox-accounts-tab.png" class="img-fluid" style="max-width: 550px">

## Managing users and extensions within your sandbox

Every developer in your company who logs into the Developer Console will be prompted to create a login for your sandbox account. This will allow developers to authenticate with the platform during development. You are free however to create additional sandbox logins, as well as extensions, call queues, and all the other artifacts you need to build and test your application properly. All of this is done via the [RingCentral Admin console in sandbox](https://service.devtest.ringcentral.com).

## Requesting multiple sandbox accounts

Sandbox accounts are currently shared across all users within the same account. We do not currently support creating multiple sandbox accounts within a single **RingCentral account**. 

If you need to simulate two different users from two different organizations during development, we recommend that you create additional RingCentral accounts in order to do so, then using those accounts login to the Developer Console in order to provision an additional sandbox account. 

## Sending SMS in sandbox

Developers may find that they are unable to send SMS using their sandbox account. All sandbox accounts have the ability to send SMS messages, but developers should familiarize themselves with how to work around certain limitations they may face.

See "[Sending test SMS in the developer sandbox](sms.md)".

## Using phones in sandbox

Every sandbox account is provisioned a different main company phone number and user that is different than ones used in production. Additional phone numbers and users can also be configured in your sandbox account. Some use cases supported by these communication apps include:

* RingOut - to receive calls at a sandbox phone number.
* Voicemail - to retrieve, listen to, and delete voicemails.
* Call Control - to hang-up, hold, flip, forward calls placed to sandbox numbers. 

RingCentral phones can be used with your sandbox account to make and receive calls.

1. [RingCentral Embeddable](https://ringcentral.github.io/ringcentral-embeddable/). This is a full-featured, production ready developer tool that can be used to integrate a complete phone and dialer into any web page or application.
1. [WebRTC Demo App](https://ringcentral.github.io/ringcentral-web-phone/). This is a WebRTC voice endpoint that implements inbound and outbound calls with various call controls.

More information is available below on using and configuring these endpoints to work in Sandbox and to configure your app if needed.

##  Limitations

### Restrictions

To help contain costs and curb abuse, the following restrictions are placed on sandbox accounts:

* Telephony and voice APIs are restricted to US phone calls only. In other words, RingOut and other voice APIs that initiate calls do not work with non-US/international numbers. 

### Sandbox watermarks

In order to ensure that our sandbox environment is used for testing purposes only, we add the following watermarks to messages and voice calls eminating from that environment:

* **SMS** (Inbound/Outbound) - a text watermark of *"Test SMS using a RingCentral Developer account"*

* **Voice calls** (Inbound/Outbound) - a voice watermark of *"Test call using a RingCentral Developer account"*

* **Faxes** (Outbound) - an image watermark of *"Test fax using a RingCentral Developer account'*, for example:

    <img src="../../img/fax-watermark.png" class="img-fluid" style="max-width: 150px">
    
## Deactivation of idle sandbox accounts

!!! warning "Use it or lose it"
    Sandbox accounts are provided to developers completely free of charge. As long as a sandbox is in active use, developers can rely on the sandbox being available. However, **if a sandbox account becomes idle for 60 days, the sandbox account will be deactivated** in order to free up phone numbers for others to use. 

### How can I extend the life of my sandbox account?

If you receive an email about your account facing deactivation, and you would like to prevent that from happening, then the quickest and easist thing one can do is use the "Try it out" feature in the [API Explorer](https://developer.ringcentral.com/api-reference) to conduct a single API call in sandbox. 

A more sustainable and recommended practice however is to routinely test your app in sandbox using a CI/CD system, or some other automated process. 

### What happens if I lose access to my sandbox?

If you find yourself in the circumstance where your sandbox account has been deactivated, you can easily create a new one by following the prompts inside of the Developer Console. 

Once the new sandbox account has been created then you may need to update the configuration of any apps that connect to your sandbox account, as your authentication credentials may have changed. 

