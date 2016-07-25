RingCentral does not retain your [Call Log](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html) data indefinitely. This is one of the driving factors that cause developers to author integrations with RingCentral.

The data retention policies for RingCentral accounts differ if your account is a HIPAA-Compliant, or Non-HIPAA-Compliant account. There are multiple ways you can download your call log data, please refer to the official [RingCentral KB Article on Message Storage and Data Retention](http://success.ringcentral.com/articles/en_US/RC_Knowledge_Article/2178#2) for comprehensive information about your account.

## Developer Implications

Developers who are building monitoring and dashboard solutions which provide historical analysis features will need to pay close attention to how RingCentral Call Log Data Retention Policy.

For instance, if your application or integration requires the ability to analyze Call Log data which goes beyond the current storage threshold, you will want to download your Call Log data at a regular interval into persistent storage for data-crunching and performance reasons.

The below information about Data Retention is accurate as of (2016-06-06), please refer to the KB article referenced above for the most up-to-date information about RingCentral Data Retention policies.

### Account Data Retention Table for Non-HIPAA Accounts

| Feature                                    | Duration                                             | Count -or- Size                                                                         |
|--------------------------------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Automatic Call Recordings                  | 90 Days                                              | 100K Recordings per Account                                                             |
| On-Demand Call Recordings                  | 90 Days                                              | 200 Recordings per Mailbox or User                                                      |
| Fax / Voice Messages (Inbox, Outbox, Sent) | 30 Days                                              | 200 Messages per folder, per User (Inbox, Outbox, Sent) Fax and Voice messages combined |
| Fax / Voice Messages (Deleted)             | 5 Days                                               | 200 Messages per User (Fax and Voice messages combined)                                 |
| Text Messages                              | No Limit                                             | 5K Messages per folder, per User (Inbox, Outbox, Sent, Deleted)                         |
| Call Log                                   | 12 months (9 months in mobile apps on some accounts) | No Limit                                                                                |
 
### Account Data Retention for HIPAA Accounts

| Feature                                    | Duration                                             | Count -or- Size                                                                         |
|--------------------------------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Automatic Call Recordings                  | 30 Days                                              | 100K Recordings per Account                                                             |
| On-Demand Call Recordings                  | 30 Days                                              | 200 Recordings per Mailbox or User                                                      |
| Fax / Voice Messages (Inbox, Outbox, Sent) | 30 Days                                              | 200 Messages per folder, per User (Inbox, Outbox, Sent) Fax and Voice messages combined |
| Fax / Voice Messages (Deleted)             | 5 Days                                               | 200 Messages per User (Fax and Voice messages combined)                                 |
| Text Messages                              | Not Available                                        | Not Available                                                                           |
| Call Log                                   | 12 months (9 months in mobile apps on some accounts) | No Limit                                                                                |

NOTE: Voice and Fax messages are not sent via email in HIPAA-Compliant accounts

## Dowloading Call Log Data via API

The Call Log API resource is the perfect tool for downloading long-term data records into the persistent storage system of choice for developers.

There are two levels of Call Log data available depending upon how you decide to build your integration in terms of the Role of the user who has authenticated:

| Role of authenticated user | Call Log data available | Route                                             |
|----------------------------|-------------------------|---------------------------------------------------|
| Admin                      | Account-Level           | /restapi/v1.0/account/~/call-log                  |
| Non-Admin (aka: Extension) | Extension-Level         | /restapi/v1.0/account/~/extension/~/call-log      |

This is a very important distinction for developers which will impact application design decisions and heavily relate on the type of application you are building. Developers creating SaaS or cloud-based applications which use RingCentral Authorization Flow to obtain access_tokens, would need to modify the route used depending upon the scope of the view of data being represented. Compare this to developers who are building a Server-Only (No UI) application which uses Password Credentials (ROPC) to obtain an access_token for downloading the account-level call log data.

// TODO: Add links to => How to Download Account-Level Call Log Data && Developing Call Log Dashboards
