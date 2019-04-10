no_breadcrumb:true

# Getting Started with Authentication

Authentication to the network is an essential part of any and every RingCentral application. There are two primary modes of authentication:

## Password-based

Password-based authentication is by far the simplest way technically to authenticate to the platform. It is a useful way for developers/applications to access their own organization's data. It is not recommended to use this form of authentication when accessing a customer's account information.
   
For simplicity, all of the quick starts in our Developer Guide utilize Password-based authentication. To try it out, consult our [SMS Quick Starts](../../../sms/quick-start/).

## Authorizaton Flow, a.k.a. "OAuth"

Utilizing RingCentral's authorization flow is the ideal way to access account data of a customer or third-party. It is more secure, and empowers the customer to control access to their data independently. The following quick starts will help you build a simple application capable of supporting the entire authorization flow:

* [Javascript/Node](./node/)
* [Python](./python/)
* [PHP](./php/)
* [C#](./c-sharp/)

