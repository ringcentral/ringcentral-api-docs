no_breadcrumb:true

# Building Your First App

<div class="jumbotron pt-1">
  <h3 class="display-5">Ready to build your RingCentral app?</h3>
  <p class="lead">Good work on successfully completing a Quick Start Guide! The guide below is specifically designed for developers who are ready to expand their knowledge of the RingCentral platform by building their next app for the platform.</p>
  <hr class="my-4">
  <p>New to RingCentral? If you have not completed a RingCentral <a href="../">Quick Start Guide</a>, we recommend you start there. Then return here to begin your journey in building your app.</p>
</div>

## Setting up your "soft phone"

If you are building an application having to do with making, receiving, routing or managing phone calls we recommend you install RingCentral software-based phone app, a.k.a. a "soft phone." Our software phone comes with a number of features you will find useful during development and testing:

* Toggle between our sandbox and production environments.
* Access voicemail.
* Send and receive SMS.
* View call log and history. 

[Learn more about your "RingCentral soft phones" &raquo;](../your-rc-phone)

## Registering your first app

The app you created when completing the Quick Start is highly constrained and probably not sufficient for an app you intend to create for others. We recommend you create a new app moving forward.

The choices you make when creating an app are important because they impact what types of authentication modes your app can support, and what actions your app will be allowed to perform. We have a comprehensive guide about creating apps (see link below), but we want to highlight a few key decisions you will need to make.

#### Application Type

This field determines who will be permitted to use your app, and whether your app can be listed in the RingCentral App Gallery. 

* If you intend others outside of your own company to use your app, then please select an "Application Type" of "Public."
* If the app you are building will only be used by your fellow co-workers, then please select an "Application Type" of "Private." 

Your choice is important because some authentication schemes are restricted to only specific application types. 

!!! danger "You cannot edit Application Type after your app has been created"

#### Platform Type

This field determines what development features will be made available to your app, and may impact what other options are visible in the app creation process. For example, apps of the "Server/Bot" type will be provisioned access to the Glip Sandbox environment, and be given special controls for installing and uninstalling your bot within Glip. Here are the most common types of apps created:

* **Server/Web** (most common) - if you are building a web-based app, need to receive webhooks, and/or connect to another user's account, select this option. 

* **Web Browser (Javascript)** - if you are building an app using the [RingCentral Embeddable](https://developers.ringcentral.com/embeddable-voice.html), select this option. 

* **Server/Bot** - if you are building an app for Glip, this is the option for you.

* **Server/No UI** - this is the only platform type that allows for password-based authentication.

!!! danger "You cannot edit Platform Type after your app has been created"

[Learn more about platform types in "Creating an Application" &raquo;](../create-app/)

#### Permissions

The permissions you select for your app will determine which APIs you can call and interact with. If you experience any authentication errors during development, you might want to check your app's permissions.

Selecting permissions you may not actually need can impede access to production later as we require apps in production to exercise all permissions assigned to them. If for example you declare your app needs the "SMS" permission but do not actually send an SMS, then you will need to adjust your permissions before graduating your app to production.

[Learn more about Application Permissions &raquo;](../permissions/)

## Choosing the right authentication scheme

RingCentral supports a number of authentication schemes depending upon the type of app you are creating. The authentication schemes available to your app will depend largely upon the following:

* **Platform Type** - different types of apps will have different technical requirements for auth, for example "browser-based apps" have access to Implicit Grant flows which other apps do not, and password-based auth is only allowed for "Server/No UI" apps. 

!!! hint "Recommended Auth Scheme: OAuth"
    The vast majority of applications on RingCentral should be using the [3-legged authentication auth code flow](../../authentication/auth-code-flow/) as it is the most secure and conforms to Internet best practices with regards to authorization, transparency and security. 

[Learn more about Authentication on RingCentral &raquo;](../../authentication/)

## Bringing all your features together

A single RingCentral application can interact with all the APIs on the RingCentral platform. That means there is no need to register multiple apps, and receive additional client IDs and secrets in order to call multiple RingCentral APIs.

Making your idea a reality though is part of the art of software design and development. However, you are not alone in this process. If you would like to advice of experts to help you architect your solution to help you save time down the road, consult our Developer Community! Over 1,000 questions have been asked there, and it is possible you may find others before you had a similar question.

[Join the RingCentral Developer Community &raquo;](https://forums.developers.ringcentral.com)
