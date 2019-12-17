# BT Cloud Phone Brand and Developer Guidelines

This document is intended for RingCentral ISVs and developers who want to enable their apps for BT Cloud Phone, leveraging their App for RingCentral Office.

## App requirements for BT Cloud Phone

The document outlines incremental App requirements to enable your application for BT Cloud Phone. It is important to comply with these requirements, to qualify your app for BT Cloud Phone. If you have any questions, please reach out to your RingCentral developer support. As noted above, this document assumes you have already enabled (or are enabling) your application for RingCentral Office and compliant with its guidelines.

### 1. Partner branding and logo

If you use "RingCentral Office" branding in your Application, replace it with "BT Cloud Phone" to reference BT Cloud Phone product.

Sample logo is shown below for BT Cloud Phone. This logo can be scaled to the appropriate pixel dimensions in your App

![BT logo](../logo-bt.png)

<div style="background-color: #6400AA; width: 160px; height: 100px; color: white; padding: 15px; margin-bottom: 15px;">
BT Purple<br>
&#35;6400AA
</div>

For example, the BT Cloud Phone version of Google Chrome application screen is shown below:

<img class="img-fluid mx-auto d-block" src="../bt-chrome-extension.png" style="max-width: 500px">

### 2. Regional Requirements

BT Cloud Phone is primarily offered in United Kingdom. Your Application needs to be supported in the UK to qualify for BT Cloud Phone integration.

### 3. Language support
   
BT Cloud Phone is primarily offered in United Kingdom. Your Application needs to be supported in the UK to qualify for BT Cloud Phone integration.

### 4. BT Cloud Phone T&Cs Link

[BT Cloud Phone T&Cs &raquo;](http://www2.bt.com/static/i/btretail/panretail/terms/index.html)

### 5. Support for BT Cloud Phone customers

You need to set up customer support for BT Cloud Phone customers, leveraging support model you have set up for RingCentral customers. Your App specific support for BT Cloud Phone customers should be handled by your support team. Where customers need additional BT Cloud Phone account specific support, you may route these support requests to your existing RingCentral support channel. Specifically note/tag “BT Cloud Phone” in your support requests, so it handled appropriately within RingCentral.

## App development guidelines for BT Cloud Phone

!!! warning "Feature limitations for BT Cloud Phone brand"
    At present, BT Cloud Phone service does not support sending and receiving SMS text messages to/from national and international DID numbers. Text messaging is supported only using pager messaging to connect extension numbers within a BT Cloud Phone account.

### Calling the API

The API for BT Cloud Phone is the same as RingCentral Office. That means you can easily re-use the same code-base used for your RingCentral application and it should be 100% compatible with BT Cloud Phone. 

API: `https://platform.ringcentral.com/restapi/v1.0/account/~`

**Response excerpt**

```json
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12133895004",
  "id": 12133895004,
  "serviceInfo": {
    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/12133895004/service-info",
    "brand": {
      "id": "7710",
      "name": "BT Cloud Phone"
...
```

### Partner test accounts

When you sign up for developer account and select to enable your App for RingCentral partners, you can reach out to developer support to request for partner test accounts (eg: BT Cloud Phone test account), in addition to RingCentral test account. These test accounts would have usage limitations like RingCentral Office. Additionally, there may be partner specific limitations such as countries of operation, languages, etc. For example, BT Cloud Phone support English and Canadian French languages and localization.

### App Submission for BT Cloud Phone

Follow the same App submission process as you do for RingCentral Office. When you submit, you will need to select the partners that you want to enable the App for. By default, you will be submitting the App for RingCentral Office. Additionally, now you can select the partners you want to enable your App for.

You will need to submit the following resources using the same process you follow for RingCentral Office.

* **App Gallery content page.** Once approved your App will be hosted on RingCentral App Gallery. You will need to submit the assets for your App page on the App Gallery. You can leverage the same content as RingCentral Office, except where there are differences such as branding or UI differences.
* **App test accounts.** If applicable, provide test accounts for RingCentral approvers to login to your App & verify partner integration.

Once submitted, RingCentral will review your App for compliance to BT Cloud Phone requirements. You will receive pertinent feedback on steps to approval.

When approved, and assuming this is a public App, it will have listed on the RingCentral App Gallery. This App Gallery serves as a great discovery portal for your App and prospective users can download or sign up for your App from here.

We are excited to see you develop and scale your App across RingCentral and BT Cloud Phone!