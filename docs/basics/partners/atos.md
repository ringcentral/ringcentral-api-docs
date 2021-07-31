# Unify Office Brand and Developer Guidelines

This document is intended for RingCentral ISVs and developers who want to enable their apps for Unify Office by RingCentral.

## App requirements for Unify Office

The document outlines incremental App requirements to enable your application for Unify Office by RingCentral. It is important to comply with these requirements, to qualify your app for Unify Office. If you have any questions, please reach out to your RingCentral developer support. As noted above, this document assumes you have already enabled (or are enabling) your application for Unify Office  and compliant with its guidelines.


### 1. Partner branding and logo

If you use "RingCentral MVP™" branding in your Application, replace it with "Unify Office" to reference Unify Office product.

Sample logo is shown below for Unify Office. This logo can be scaled to the appropriate pixel dimensions in your App. 

<img alt="Unify Offcie by RingCentral logo" src="../logo_atos.png">

Atos policy dictates that apps should not utilize the Atos corporate logo, Atos color scheme, and should always position the Unify Office logo and name as sub-tending to your own brand and App name; e.g. APP Name for Unify Office is acceptable, where as Unify Office APP NAME is not.

Furthermore, Atos policy is that App developers should not portray the App as being created, sold, delivered or supported directly by Atos in its UI design, documentation or supporting materials. Apps that do not conform to this policy will not be accepted for, or removed from, the Unify Office App Gallery.

### 2. Regional Requirements

Unify Office by RingCentral is initially offered in France and Germany. Your application needs to be supported in France and Germany to qualify for Unify Office integration. Additional countries will be introduced on a quarterly basis which may require specific application support and/or language support to remain eligible.

### 3. Language support
   
Unify Office by RingCentral initially supports U.S. English, French and German. Your App needs to support these languages and localization. As additional regional coverages are introduced on a quarterly basis, additional language support may be required to remain eligible.

### 4. Support for Unify Office customers

You need to set up customer support for Unify Office customers, leveraging the support model you have set up for RingCentral customers. Your App specific support for Unify Office customers should be handled by your support team. Where customers need additional Unify Office account specific support, you may route these support requests to your existing RingCentral support channel. Specifically note/tag "Unify Office" in your support requests, so it handled appropriately within RingCentral.

## App development guidelines for Unify Office

!!! warning "Feature limitations for Unify Office"
    At present, Unify Office service does not support sending and receiving SMS text messages to/from national and international DID numbers. Text messaging is supported only using pager messaging to connect extension numbers within an Unify Office account.

### Calling the API

The API for Unify Office is the same as RingCentral MVP™. That means you can easily re-use the same code-base used for your RingCentral application and it should be 100% compatible with Unify Office.

API: `https://platform.ringcentral.com/restapi/v1.0/account/~`

**Response excerpt**

```json
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12xx04",
  "id": 12xx04,
  "serviceInfo": {
    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12xx04/service-info",
    "brand": {
      "id": "2020",
      "name": "Unify Office"
...
```

### Partner test accounts

When you sign up for developer account and select to enable your App for RingCentral partners, you can reach out to developer support to request for partner test accounts (eg: Unify Office test account), in addition to RingCentral test account. These test accounts would have usage limitations like RingCentral MVP™. Additionally, there may be partner specific limitations such as countries of operation, languages, etc. For example, while Unify Office supports U.S. English language and localization, additional geographies will be added on a quarterly basis that will introduce additional language and regionalization options.

### App Submission for Unify Office

Follow the same App submission process as you do for RingCentral MVP™. When you submit, you will need to select the partners that you want to enable the App for. By default, you will be submitting the App for RingCentral MVP™. Additionally, now you can select the partners you want to enable your App for.

You will need to submit the following resources using the same process you follow for RingCentral MVP™.

* **App Gallery content page.** Once approved your App will be hosted on RingCentral App Gallery. You will need to submit the assets for your App page on the App Gallery. You can leverage the same content as RingCentral MVP™, except where there are differences such as branding or UI differences.

* **App test accounts.** If applicable, provide test accounts for RingCentral approvers to login to your App & verify partner integration.

Once submitted, RingCentral will review your App for compliance to Unify Office requirements. You will receive pertinent feedback on steps to approval.

When approved, and assuming this is a public App, it will be listed on the RingCentral App Gallery. This App Gallery serves as a great discovery portal for your App and prospective users can download or sign up for your App from here.

We are excited to see you develop and scale your App across RingCentral and Unify Office!

