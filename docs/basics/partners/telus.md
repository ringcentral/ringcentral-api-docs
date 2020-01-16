# TELUS Business Connect Brand and Developer Guidelines

This document is intended for RingCentral ISVs and developers who want to enable their apps for TELUS Business Connect, leveraging their App for RingCentral Office.

## App requirements for TELUS Business Connect

The document outlines incremental App requirements to enable your application for TELUS Business Connect. It is important to comply with these requirements, to qualify your app for TELUS Business Connect. If you have any questions, please reach out to your RingCentral developer support. As noted above, this document assumes you have already enabled (or are enabling) your application for RingCentral Office and compliant with its guidelines.

### 1. Partner branding and logo

If you use "RingCentral Office" branding in your Application, replace it with "TELUS Business Connect" to reference TELUS Business Connect product.

Sample logo is shown below for TELUS Business Connect. This logo can be scaled to the appropriate pixel dimensions in your App

![TELUS logo](../logo-telus.png)

<div style="background-color: #66cc00; width: 160px; height: 100px; color: white; padding: 15px; margin-bottom: 15px;">
TELUS Green<br>
&#35;66cc00
</div>

For example, the TELUS Business Connect version of Google Chrome application screen is shown below:

<img class="img-fluid mx-auto d-block" src="../telus-google-chrome-extension.png" style="max-width: 500px">

### 2. Regional Requirements

TELUS Business Connect is primarily offered in Canada. Your Application needs to be supported in the Canada to qualify for TELUS Business Connect integration.

### 3. Language support
   
TELUS Business Connect supports English (US, CA), and Canadian French for all its subscribers. TELUS promotes to its customers' integration applications that support both English and French.

### 4. TELUS Business Connect "Service Terms" Link

[TELUS Business Connect Service Terms &raquo;](http://www.telus.com/BusinessConnect/ServiceTerms)

### 5. Support for TELUS Business Connect customers

You need to set up customer support for TELUS Business Connect customers, leveraging support model you have set up for RingCentral customers. Your App specific support for TELUS Business Connect customers should be handled by your support team. Where customers need additional TELUS Business Connect account specific support, you may route these support requests to your existing RingCentral support channel. Specifically note/tag "TELUS Business Connect" in your support requests, so it handled appropriately within RingCentral.

## App development guidelines for TELUS Business Connect

### Calling the API

The API for BT Cloud Phone is the same as RingCentral Office. That means you can easily re-use the same code-base used for your RingCentral application and it should be 100% compatible with TELUS Business Connect.

API: `https://platform.ringcentral.com/restapi/v1.0/account/~`

**Response excerpt**

```json
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12xx04",
  "id": 12xx04,
  "serviceInfo": {
    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12xx04/service-info",
    "brand": {
      "id": "7310",
      "name": "TELUS Business Connect™",
      ...
```

### Partner test accounts

When you sign up for developer account and select to enable your App for RingCentral partners, you can reach out to developer support to request for partner test accounts (eg: TELUS Business Connect test account), in addition to RingCentral test account. These test accounts would have usage limitations like RingCentral Office. Additionally, there may be partner specific limitations such as countries of operation, languages, etc. For example, TELUS Business Connect support English and Canadian French languages and localization.

### App Submission for TELUS Business Connect

Follow the same App submission process as you do for RingCentral Office. When you submit, you will need to select the partners that you want to enable the App for. By default, you will be submitting the App for RingCentral Office. Additionally, now you can select the partners you want to enable your App for.

You will need to submit the following resources using the same process you follow for RingCentral Office.

* **App Gallery content page.** Once approved your App will be hosted on RingCentral App Gallery. You will need to submit the assets for your App page on the App Gallery. You can leverage the same content as RingCentral Office, except where there are differences such as branding or UI differences.
* **App test accounts.** If applicable, provide test accounts for RingCentral approvers to login to your App & verify partner integration.

Once submitted, RingCentral will review your App for compliance to TELUS Business Connect requirements. You will receive pertinent feedback on steps to approval.

When approved, and assuming this is a public App, it will have listed on the RingCentral App Gallery. This App Gallery serves as a great discovery portal for your App and prospective users can download or sign up for your App from here. You can view and access existing TELUS Business Connect application in the App Gallery.

We are excited to see you develop and scale your App across RingCentral and TELUS Business Connect!
