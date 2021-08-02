# Creating an application

To create your RingCentral application, start by [signing in](https://developers.ringcentral.com/login.html#/) to the RingCentral Developer Console with your account login and password. If you do not have RingCentral account, please sign up.

After you login you will be taken to the Apps Console where all of your apps are listed and can be managed. Click the "Create App" button.

??? note "Is the Create App button disabled?"
    If you see the "Create App" button, but it is disabled, then your account lacks the permission required to create an app. Contact your account's administrator to request this permission.

## Select your app type

<img src="../../img/create-app-type.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

RingCentral allows developers to create a number of different types of apps. Each type may expose different configuration options and/or capabilities specific to that app. The two app types we currently support are:

* **REST API App** - this is by far the most common type of app created by developers as it gives developers generalized access to our wide selection of APIs available across our MVP product-line (voice, SMS, meetings, team messaging, call logging, call control, etc.)

* **RingCentral Bot** - this special kind of app known as a "bot" is used within RingCentral's team messaging product.

* **RingCentral Add-in** - this app can be installed directly into RingCentral's desktop client to augment it with new functionality

<br clear="all">

### Describe your app

<img src="../../img/create-app-properties.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

Once your app type has been selected, provide the basic meta data about your app, like name, icon, etc. Here are a few things to note about these fields.

* **App name** - this field is never displayed publically, and is a useful way to help you disambiguate between apps whose names are similar, e.g. "Foo App (staging)" vs "Foo App (qa)."

* **Display name** - this field is what is displayed publicly to users within the context of our applications, like our desktop client. 

* **App icons** - this field may or may not be required based upon the app's type. Add-ins and bots require an icon as these apps often publish messages inside our desktop client. 

* **Primary contact** - designate a individual to be responsible for receiving and responding to important communications relating to this app.

<br clear="all">

### Will you be promoting your app?

To better support our developers wishing to promote their application to our customers, we ask if you intend to [promote your app in our App Gallery](../app-gallery/). *Your answer is for internal-use only.*

<img src="../../img/create-app-promote.png" class="img-fluid" style="max-width: 500px">

## Setup authentication

<img src="../../img/create-app-auth.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

Select the authentication method your app will utilize to connect to the platform. We support two primary modes:

* **3-legged OAuth flow**. This method is used when your application needs to gain access to a user's RingCentral data, or needs to perform various actions upon that user's behalf. This flow requires that your app publish a user interface so that users can initiate the authorization process. 

* **Password-based**. This method is easy to implement and is ideal for apps that run without a user-interface, e.g. a cron job, or a script. 

#### What is PKCE, and when should I use it?

PKCE, or Proof Key for Code Exchange, pronounced "Pixie," is an OAuth 2.0 extension designed to create a more secure way for client-only apps, like mobile apps, desktop applications, and pure javascript apps, to authenticate with the platform. If the answer to "From what type of app will you be calling the API?" is any of the following, then you are required to [implement PKCE](../authentication/auth-code-pkce-flow/):

* Client-side web app, e.g. SPA, Javascript
* Android mobile app
* iOS mobile app
* Windows desktop app
* Mac desktop app

#### Should I enable refresh tokens?

Auth tokens or "access keys" issued through the OAuth process expire automatically after a short period of time. Refresh tokens are used to keep access keys you have stored locally active and valid. If you desire users to authenticate once to your platform, and not be asked to login again, then you should enable refresh tokens.

When refresh tokens are enabled, an additional "refresh token" will be issued to your application. This token can be presented to RingCentral in order to obtain a new access key, which can then replace the previously issued access key. 

To keep access keys from ever expiring, developers should implement a recurring background task that will wake up once a day, iterate over all access keys stored locally, and exchange their refresh token for a new access key. If this is reliably done, then users will not need to relogin because their auth session will remain fresh and active. 

<br clear="all">

## Configure app security

<img src="../../img/create-app-security.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

Begin by selecting the permissions or the application scope your app will utilize. This effectively defines what actions your app will be permitted to perform. 

!!! tip "For security, request *only* permissions your application requires."

Next, determine who will have access to your application. The terms "public" and "private" in this context can lead to confusion. To clarifty, public and private here refers to the credentials that will be used to access your application. Here are some questions you can ask yourself to help you choose the right option for your application:

* **Will this application only be used to access my own company's information data?** If this is the case, then you will authenticate to this application using credentials from your own organization. This is the very definition of a private application, so select "private."

* **Am I using RingCentral as a communication platform?** If you are using RingCentral to send SMS messages to your customers, or to schedule and host meetings with your customers, then while your app will be used by people outside of your RingCentral account, you will only be using your own login credentials to make calls the APIs. In this case your app is in fact "private" even though members of the public will be using the app you build. Select "private."

* **Am I building an application specifically intended for RingCentral customers?** If you are an ISV or app developer creating an application that only RingCentral customers can authenticate to and use, then your app is public. Select "public."

#### What partners do I make my app available to?

If you are creating a public application that will be marketed exclusively to RingCentral customers, then we strongly recommend you select "make available to all current and future RingCentral carrier and brand partners." Doing so will ensure your app will be promoted to the largest possible customer base around the world. 

!!! tip "Maximize the reach of your application!"
    RingCentral works with a number of partners who white-label the RingCentral platform for their respective markets. Our partners include BT, Telus, Avaya and AT&T. [Learn more about about building apps for these partners &raquo;](../partner-compatibility/)

Select "make available only to specific carrier and brand partners" only if your app should be restricted to be used with one partner or another. 

<br clear="all">

## Enable app features

Depending upon your application type, different app features will be made available to your application. 

### Interactive Messages

<img src="../../img/create-app-rest-features.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

Interactive messages are a feature that allows applications to post messages into the RingCentral team messasing product that contain richly formatted content, and users can interact with using buttons, form elements, and more. Interactive messages are most often used by bots and add-ins. You will need to provide values for the following properties if this feature is enabled.

* **Outbound webhook URL.** This is the URL to which RingCentral will deliver events informing you when a user interacts with messages your application posts. 

* **Shared secret**. This is a string you should consider highly confidential, and will be used by your application to verify the authenticity of any event transmitted to your outbound webhook URL. 

<!--
Learn more about [interactive messages](../../team-messaging/interactive-messages/) and [Adaptive Cards](../../team-messaging/adaptive-cards/).
-->

<br clear="all">

### Integrated Installation

<img src="../../img/create-app-addin-features.png" class="img-fluid float-right ml-3 mb-3" style="max-width: 500px">

This feature is only available to RingCentral Add-ins, and is forcibly enabled. The feature defines for RingCentral how users will install your application. You must at least provide manual installation instructions to help users take the incoming webhook URL generated by RingCentral and install that URL into a target service being integrated with.

To maximize the number of people who will successfully install and use your application though, we recommend you implement a web interface that automates the installation process. If you select the "this app can be installed via the web," then the web interface you build will be presented within the RingCentral desktop app via an iframe to provide RingCentral users with a seamless installation experience.

<br clear="all">

## Taking the next step: building your app...

With your application having been created, you are now ready to begin building your app. Make note of your app's Client ID and Client Secret as you will need these when authenticating your app to the platform.

To help you get started, considering using one of the following Quick Starts:

* [SMS](../../sms/quick-start/)
* [Fax](../../fax/quick-start/)
* [Voice](../../voice/quick-start/)
* [Meetings](../../meetings/quick-start/)
  
