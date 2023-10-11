# Sending SMS in sandbox and production

## Sending test SMS in the developer sandbox

Sandbox accounts can be used to send SMS messages. These messages will be augmented with a text watermark indicating that it was sent via the sandbox environment. Developers do *not* need to register with TCR in order to send messages in sandbox. 

### Why can't I send SMS from my sandbox account?

Developers should be aware of certain challenges that may impede their ability to send SMS within sandbox. These challenges ultimately stem from the following:

1. Sandbox accounts are only provisioned a single phone number or direct line ("DL" for short).
2. Only the admin user, and/or operator in an account is permitted to use that number to send SMS.

Here are two ways developers can work around this limitation to send SMS successfully via the API in sandbox:

* create an additional free developer account using a unique email 
* have the admin or operator in the account create and share a [JWT credential](../create-credential/) with all developers in the organization

## Preparing your account to send SMS in production

In order to send SMS messages in our production environment, companies must first go through the process of registering with the necessary authorities in order to remain fully compliant with existing regulations that are designed to combat fraud and maintain a high quality experience across the entire carrier and SMS ecosystem. Luckily, RingCentral will help you and your company with this process. The process is broken down into three steps:

1. **Register your brand**. This first step helps to establish your company's identity and lets carriers know who is responsible for the sending of SMS within your company, both legally and operationally. Most companies only need to register a single brand. 
2. **Register your campaign**. Once your brand has been successfully created, the next step is to register a campaign through which SMS messages will be sent.
3. **Assign phone numbers to a campaign**. The last step is to assign phone numbers to the campaigns for which they are associated. This step will also enable your phone number to be used for SMS in production.

**Completing the entire TCR process can take up to 25 days.** Therefore, we recommend starting the TCR registration process as soon as possible, so that when the time comes to graduate your application to production and begin sending SMS, everything will already be setup for you. 

??? tip "Only Super Admins can register with TCR"
    Be aware that only users with the Super Admin role have the ability to go through the TCR process. Therefore, some developers may need to reach out to their system administrator to ensure this process is followed properly. 

### What is TCR registration? 

The TCR registration process helps to establish you as a trusted entity within the Business SMS ecosystem, which in-turn helps to improve deliverability rates for the SMS messages your business sends.

<iframe src="https://player.vimeo.com/video/786397152?h=ba43d1e7a0&color=ff7a00&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

Have more questions? Check out our [TCR FAQ](https://support.ringcentral.com/article-v2/TCR-business-registration-FAQ.html?brand=RingCentral&product=MVP&language=en_US) to find answers to common questions. 

#### Is TCR registration required for my business, even if I am not sending marketing messages?

If you are sending SMS in any business-related capacity, even if you are directly responding to customer inquiries, you are still required to go through the TCR registration process, and you are obligated under existing laws to observe all regulations regarding sending SMS as a business. 

### Registering with TCR ("The Campaign Registry")

??? hint "TCR registration is NOT required for sandbox"
    The RingCentral developer sandbox environment is already setup to send SMS for all sandbox phone numbers. Therefore, TCR registration is not required during the development process.

#### Local phone numbers

If your business uses local phone numbers (non-toll free) we have provided clear instructions on how setup your business to send SMS via the TCR registration process:

Read [Setting up TCR registration and assigning numbers to your SMS campaigns &raquo;](https://support.ringcentral.com/article-v2/Setting-up-TCR-registration-assigning-numbers-to-SMS-campaigns.html?brand=RingCentral&product=MVP&language=en_US)

#### Toll-free numbers

If your business needs the ability to send SMS from a toll-free number, the process is a litte different in that it requires help from RingCentral support to complete. You will need to do the following two steps:

1. [Add a toll-free number to a user](https://support.ringcentral.com/article-v2/10649-admin-add-direct-number-user-toll-free.html?brand=RC_US&product=RingCentral_MVP&language=en_US) via the Admin Console. 
2. [Enable SMS for the toll-free number](https://support.ringcentral.com/article-v2/Verifying-your-toll-free-number-for-SMS.html?brand=RingCentral&product=MVP&language=en_US) and then get it verified via support.

#### Short-codes

RingCentral does not currently support sending SMS messages via an SMS short-code.

### Don't forget: register your campaigns too!

Many customers register their brand via our Admin Console, but then forget to register their campaign and assigning phone numbers to that campaign. Remember, there are three steps to the registration process that you must successfully complete before being allowed to send SMS messages within our production environment:

1. Register your brand
2. Register your campaigns
3. Assign phone numbers

## Next step: graduating your application to production

Once the TCR process is complete, which can for some take up to 25 days, your application will be ready to operate and send SMS messages in our production environment by going through a process we call "graduation." This process is how a developer obtains credentials for our production environment. This is among the final steps before you can officially use an application using real production data.

<a class="btn btn-lg btn-primary" href="../graduate-app/">Graduate your application</a>
