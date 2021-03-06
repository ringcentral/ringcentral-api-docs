# AT&T Office@Hand Brand and Developer Guidelines

This document is intended for RingCentral ISVs and developers that want to enable their apps for AT&T Office@Hand, leveraging their App for RingCentral Office.

## App requirements for AT&T Office@Hand

The doc outlines incremental App requirements to enable for AT&T Office@Hand. It is important to comply with these requirements, in order to qualify your app for AT&T Office@Hand. If you have any questions, please reach out to your RingCentral developer support. As noted above, this doc assumes you have already enabled (or are enabling) RingCentral Office and compliant with its guidelines.

### 1. Partner branding and logo

If you use "RingCentral Office" branding in your App, replace this with "AT&T Office@Hand" to reference AT&T Office@Hand product.
Sample logo is shown below for AT&T Office@Hand. This logo can be scaled to the appropriate pixel dimensions in your App.

<img alt="AT&amp;T Office at Hand Logo" src="../logo_att.svg">

### 2. Countries support

AT&T Office@Hand is now supported in United States, UK, Canada and 11 EU countries, including Netherlands, Ireland, Spain, Switzerland, Sweden, Austria, Belgium, Denmark, Germany, France and Italy. 

Your App needs to be supported in the United States to qualify for AT&T Office@Hand integration. Additionally AT&T has restrictions on presence or support operation in China, Russia, and Ukraine. 

Additional countries will be introduced on a quarterly basis which may require specific application support and/or language support to remain eligible for those countries.

### 3. Language Support

AT&T Office@Hand supports US English as the base line. Your App needs to support this language and localization. Additionally, UK English, Canadian French, French French, German, Italian, Spanish, and Dutch are supported languages and localization for non-US countries.

As additional regional coverages are introduced on a quarterly basis, additional language support may be required to remain eligible.


### 4. Support for AT&T Office@Hand customers

You need to set up customer support for AT&T Office@Hand customers, leveraging support model you have set up for RingCentral customers. Your App specific support for AT&T Office@Hand customers should be handled by your support team. Where customers need additional AT&T Office@Hand account specific support, you may route these support requests to your existing RingCentral support channel. Specifically note/tag "AT&T Office@Hand" in your support requests, so it handled appropriately within RingCentral.

## App development guidelines for AT&T Office@Hand

### Calling the API

AT&T Office@Hand customers on RingCentral operate in a completely separate environment. This creates additional requirements for developers wishing to provide applications that are compatible with both RingCentral and Office@Hand customers. Primarily, developers need to architect their applications to direct their API requests to either the RingCentral or Office@Hand server environments, depending upon the customer they are acting on behalf of. The table below shows these two server environments:

| Service | Domain |
|-|-|
| RingCentral, BT, Telus, Avaya | `https://platform.ringcentral.com/` |
| Office@Hand | `https://platform.ringcentral.biz/` |

**Response excerpt**

```json
{
  "uri": "https://platform.ringcentral.biz/restapi/v1.0/account/12xx04",
  "id": 12xx04,
  "serviceInfo": {
    "uri": "https://platform.ringcentral.biz/restapi/v1.0/account/12xx04/service-info",
    "brand": {
      "id": "3420",
      "name": "AT&T Office@Hand"
      ...
```

### Best practices and recommendations

Below are a set of recommendations for developers when building their applications.

1. When constructing the Login URL to initiate the 3-legged authorization flow:
     * Developers should direct their users to the proper domain depending upon whether the user is a customer of RingCentral or Office@Hand.
     * Developers should include the `brandId` querystring parameter and set it to `3420`.
     * Developers wishing to use the same OAuth Redirect URI for both Office@Hand and RingCentral customers should also provide a value in the `state` querystring parameter. The `state` parameter will be returned verbatim in the redirect to complete the OAuth flow. The value provided can help developers disambiguate between a RingCentral and Office@Hand customer.

2. Developers should make efforts to remember whether their users are associated with RingCentral or Office@Hand, as all subsequent API requests need to be directed to the proper server environment in order to be completed successfully.

#### Sample Application

A [sample application](https://github.com/byrnereese/ringcentral-office-at-hand-sample-app) was created to help illustrate the guidelines above. It's README highlights the specific code changes you may need to make to your application to ensure compatibility with all of our partners. 

API: `https://platform.ringcentral.biz/restapi/v1.0/account/~`

### Partner test accounts

When you sign up for developer account and select to enable your App for RingCentral partners, you can reach out to developer support to request for partner test accounts (eg: AT&T Office@Hand test account), in addition to RingCentral test account. These test accounts would have usage limitations similar to RingCentral Office. Additionally there may be partner specific limitations such as countries of operation, languages, etc. For example AT&T Office@Hand only supports US English and certain countries.

## App Submission for AT&T Office@Hand

Follow the same App submission process as you do for RingCentral Office. When you submit you will need to select the partners that you want to enable the App for. By default you will be submitting the App for RingCentral Office. Additionally, now you can select the partners you want to enable your App for.

You will need to submit the following resources using the same process you follow for RingCentral Office.

* **App Gallery content page.** Once approved your App will be hosted on RingCentral App Gallery. You will need to submit the assets for your App page on the App Gallery. You can leverage the same content as RingCentral Office, except where there are differences such as branding or UI differences.
* **App test accounts.** If applicable, provide test accounts for RingCentral approvers to login to your App & verify partner integration.

Once submitted, RingCentral will review your App for compliance to AT&T Office@Hand requirements. You will receive pertinent feedback on steps to approval.

When approved, and assuming this is a public App, it will listed on the RingCentral App Gallery. This App Gallery serves as a great discovery portal for your App and prospective users can download or sign up for your App from here.

We are excited to see you develop and scale your App across RingCentral and AT&T Office@Hand!
