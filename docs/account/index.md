# Introduction to the RingCentral Account API

The Account API enables developers to access the following account settings:

* Basic customer account information (main phone number, service plan, available features, etc.)
* The list of extensions in the account
* Details relating to each extension in the account
* The list of assigned phone numbers in the account (per extension or globally per account)

Some limits may be placed upon your ability to access and modify this information depending upon the authenticated user making the request. Common access control rules are as follows:

* access is allowed only to the information related to the authenticated account;
* any user may access public information about the account;
* any user may access all the information about their own extension;
* only users with administrator rights may access all information about account and all of its extensions.

## What app scopes are to required to use the Account API?

What actions you are allowed to perform via the Account API will depend upon the permissions granted to your application when it was initially setup. Here are the app permissions relevant to managing phone numbers and extensions:

| Permission | Description |
|-|-|
| `ReadAccounts` | Enables retrieving account and extension data. |
| `EditExtensions` | Enables modifying extension settings and everything under `ReadAccounts`. |
| `EditAccounts` | Enables modifying account settings, including creating, modifying and deletion of extensions, and everything under `EditExtensions`. | 
| `Accounts` | Enables the creating of new accounts and everything under `EditAccounts`. |

## How do I retrieve account data?

The Account API allows one to retrieve information about a particular account, such as your billing information, your service plan, your company's main phone number, etc. One can retrieve this information using the following request:

    GET /restapi/v1.0/account/{accountId}

One may provide either explicit `accountId` or use the simplified syntax of a tilde (`~`). A tilde instructs RingCentral to use the account id associated with the current authentication context.

What follows is sample response to getting the current account's configuration.

```json
{
  "uri" : "https.../restapi/v1.0/account/401145624008",
  "id" : 401145624008,
  "serviceInfo" : {
    "uri" : "https.../restapi/v1.0/account/401145624008/service-info",
    "brand" : {
      "id" : "1210",
      "name" : "MyCompany Inc.",
      "homeCountry" : {
        "id" : "1",
        "uri" : "https.../restapi/v1.0/dictionary/country/1"
      }
    },
    "servicePlan" : {
      "id" : "1216",
      "name" : "Professional"
    },
    "billingPlan" : {
      "id" : "159",
      "name" : "Monthly - 14.99 - Pro 101503",
      "durationUnit" : "Month",
      "duration" : 1,
      "type" : "Regular"
    }
  },
  "operator" : {
    "uri" : "https.../restapi/v1.0/account/401145624008/extension/401145624008",
    "id" : 401145624008,
    "extensionNumber" : "101"
  },
  "mainNumber" : "18885550014",
  "status" : "Confirmed"
}
```