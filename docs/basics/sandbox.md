# Developing in Sandbox

RingCentral provides developers with both a Sandbox and Production environment in which to develop and test your app. Upon creating an application, a sandbox account is generated automatically if you do not already have one.

Access to the production environment is made available after your application has been reviewed and approved. As a result, sandbox accounts are required in order to develop your application. That being said, sandbox accounts come also with the following benefits:

* **Data Segregation** - developers are free to make additions and changes without fear of littering the production account with test and dummy data.
* **Change Control** - developers are free to create and develop applications in sandbox without fear of interfering with applications safely running in our production environment . This is especially important for our HIPAA-compliant customers.
* **Cost** - API calls to our sandbox environment are not metered, or count against any allottments your account may be limited by.
* **Compliance** - by requiring developers to apply for access to production, we can put in place steps to reduce the risk of developers unknowingly violating our company's EULA or TOS.

## Sandbox URLs

Product | URL |
|--------|-----|
| RingCentral app | `https://app.devtest.ringcentral.com` |
| RingCentral account portal | `https://service.devtest.ringcentral.com` |
| RingCentral API | `https://platform.devtest.ringcentral.com` |

**Please note:** Glip App (mobile or desktop) does NOT have:

* Support for the RingCentral Sandbox API (cannot switch to 'developer mode')
* Support for a 'Sandbox version'

### How Sandbox Accounts Are Organized

Sandbox accounts are currently shared across all users within the same account. We do not currently support creating multiple **user level** Sandbox accounts within a single **RingCentral account**. Within that account, developers can easily collaborate on the applications created within that account.

If you need to simulate two different users from two different organizations during development, you may need to create additional RingCentral accounts in order to do so. 

##  Limitations

In order to ensure that our sandbox environment is used for testing purposes only, we add the following watermarks to messages and voice calls eminating from that environment:

* **SMS** (Inbound/Outbound) - a text watermark of *"Test SMS using a RingCentral Developer account"*

* **Voice calls** (Inbound/Outbound) - a voice watermark of *"Test call using a RingCentral Developer account"*

* **Faxes** (Outbound) - an image watermark of *"Test fax using a RingCentral Developer account'*, for example:

    <img src="../../img/fax-watermark.png" class="img-fluid">
    
## Configuring Sandbox

To configure your Sandbox environment please follow the steps:

1. Go to [https://service.devtest.ringcentral.com](https://service.devtest.ringcentral.com)

    <img src="../../img/my-app-created.png" class="img-fluid">

2. Login with your sandbox account username (main company number) and password that are available on your App page:

    * in 'Sandbox Credentials' section on the 'Dashboard' tab (see above);
    * in 'User Account Credentials' section on the 'Credentials' tab (see below)

    <img src="../../img/app-credentials.png" class="img-fluid">

3. Configure your user account phone system to emulate your target user environment:

    * set auto-receptionist and company info;
    * add extensions and phone numbers;
    * add and set devices;
    * etc.

Your Sandbox account is now ready to be used. You can now direct API calls to `https://platform.devtest.ringcentral.com`.

## Deactivation of idle sandbox accounts

!!! warning "Use it or lose it"
    Sandbox accounts are provided to developers completely free of charge. As long as a sandbox is in active use, developers can rely on the sandbox being available. However, **if a sandbox account becomes idle for 60 days, the sandbox account will be deactivated** in order to free up phone numbers for others to use. 

### How can I extend the life of my sandbox account?

If you receive an email about your account facing deactivation, and you would like to prevent that from happening, then the quickest and easist thing one can do is use the "Try it out" feature in the [API Explorer](https://developer.ringcentral.com/api-reference) to conduct a single API call in sandbox. 

A more sustainable and recommended practice however is to routinely test your app in sandbox using a CI/CD system, or some other automated process. 

### What happens if I lose access to my sandbox?

If you find yourself in the circumstance where your sandbox account has been deactivated, you can easily create a new one by following the prompts inside of the Developer Console. 

Once the new sandbox account has been created then you may need to update the configuration of any apps that connect to your sandbox account, as your authentication credentials may have changed. 

