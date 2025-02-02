# Sending SMS 

## Sending test SMS from a Developer account

Developer accounts can be used to send SMS messages. These messages will be augmented with a text watermark indicating that it was sent via a test environment. Developers still need to register with TCR in order to send messages from a Developer account, even if they have completed the TCR process from their primary account. 

## Preparing your account to send SMS

In order to send SMS messages companies must first go through the process of registering with the necessary authorities in order to remain fully compliant with existing regulations that are designed to combat fraud and maintain a high quality experience across the entire carrier and SMS ecosystem. Luckily, RingCentral will help you and your company with this process. The process is broken down into three steps:

1. **Register your brand**. This first step helps to establish your company's identity and lets carriers know who is responsible for the sending of SMS within your company, both legally and operationally. Most companies only need to register a single brand.
2. **Register your campaign**. Once your brand has been successfully created, the next step is to register a campaign through which SMS messages will be sent.
3. **Assign phone numbers to a campaign**. The last step is to assign phone numbers to the campaigns for which they are associated. This step will also enable your phone number to be used for SMS in production.

**Completing the entire TCR process can take up to 25 days.** Therefore, we recommend starting the TCR registration process as soon as possible, so that when the time comes to finalize and release your product, everything will already be setup for you.

??? tip "Only Super Admins can register with TCR"
    Be aware that only users with the Super Admin role have the ability to go through the TCR process. Therefore, some developers may need to reach out to their system administrator to ensure this process is followed properly.

### What is TCR registration?

The TCR registration process helps to establish you as a trusted entity within the Business SMS ecosystem, which in-turn helps to improve deliverability rates for the SMS messages your business sends.

<iframe src="https://player.vimeo.com/video/786397152?h=ba43d1e7a0&color=ff7a00&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

Have more questions? Check out our [TCR FAQ](https://support.ringcentral.com/article-v2/TCR-business-registration-FAQ.html?brand=RingCentral&product=MVP&language=en_US) to find answers to common questions.

#### Is TCR registration required for my business, even if I am not sending marketing messages?

If you are sending SMS in any business-related capacity, even if you are directly responding to customer inquiries, you are still required to go through the TCR registration process, and you are obligated under existing laws to observe all regulations regarding sending SMS as a business.

### Registering with TCR ("The Campaign Registry")

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

## Final step: promote your app in the RingCentral App Gallery

For those developers and partners who are building an application that is intended to be used by RingCentral customers, you have one more step: to add your application to the RingCentral App Gallery so that it can be promoted to the RingCentral customer base.

<a class="btn btn-lg btn-primary" href="../promote-app/">Promote your application in the App Gallery</a>
