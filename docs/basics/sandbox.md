# Developing in Sandbox

## Introducing Environments

We provide you with Sandbox and Production environments to develop and test your app. Once you have created a new application Sandbox account is generated and Sandbox environment is already available. Production environment will be available upon application approval.

### Current Environments

Product Name | Sandbox URI | Production URI
-------------|-------------|---------------
Glip | `https://glip.devtest.ringcentral.com` | `https://glip.com`
RingCentral Online Account Portal | `https://service.devtest.ringcentral.com` | `https://service.ringcentral.com`
RingCentral API - Base URI | `https://platform.devtest.ringcentral.com` | `https://platform.ringcentral.com`

**Please note:** Glip App (mobile or desktop) does NOT have:

* support for the RingCentral Sandbox API (cannot switch to 'developer mode')
* does not have a 'Sandbox version'

### How Sandbox Accounts Are Organized

Sandbox accounts are currently created at **account level**. We do not support creating multiple **user level** Sandbox accounts within a single **RingCentral account**. However once the Sandbox account is created and associated with your RingCentral account, you are able to use the Developer Portal to define as many new applications as you need.

### Benefits of Having Sandbox Accounts

The Sandbox environment provides a safe place for developers to build, test and fix their source code, being identical to Production, but without any risks.

The Sandbox environment helps:

* our customers not to worry that a developer will make a change in a Production environment for their RingCentral integration which might introduce risk or potentially alter an operational state (unless they modify the code-behind, but that is outside of our control). This is especially important for our HIPAA-compliant customers.
* RingCentral Connect Platform Team to improve developer experience over time and to prevent some customers' actions who would have unknowingly violated our company's EULA or TOS had they continued forward with their integration in Production without us being more engaged in the process. It has provided us the ability to monitor how people use the Platform and to make improvements.

### Sandbox Account Limitations

In order to ensure that Sandbox environment is used for testing purposes only, the following watermarks are added to messages and voice calls employing Sandbox environment:

* **SMS** (Inbound/Outbound) - text watermark *'Test SMS using a RingCentral Developer account'*

* **Voice calls** (Inbound/Outbound) - voice watermark *'Test call using a RingCentral Developer account'*

* **Faxes** (Outbound) - image watermark *'Test fax using a RingCentral Developer account'*, see the image below:
    <img src="../../img/fax-watermark.png" class="img-fluid">
    
## Configure Dev Environment

Let's configure your development environment.

### Your Sandbox

To configure your Sandbox environment please follow the steps:

1. Go to [https://service.devtest.ringcentral.com](https://service.devtest.ringcentral.com)
    <img src="../../img/my-app-created.png" class="img-fluid">
2. Login with your sandbox account username (main company number) and password that are available on your App page:
    * in 'Sandbox Credentials' section on the 'Dashboard' tab (see above);
    * in 'User Account Credentials' section on the 'Credentials' tab (see below)
    <img src="../../img/app-credentials.png" class="img-fluid">
3. Configure user account phone system to emulate your target user environment:

    * set auto-receptionist and company info;
    * add extensions and phone numbers;
    * add and set devices;
    * etc.

    For more details please visit our [Learning Center](http://success.ringcentral.com/RCSupportPortalLearningCenter?LCtabId=getting_0).

4. Your Sandbox account is ready to be used on Sandbox environment at `https://platform.devtest.ringcentral.com`


