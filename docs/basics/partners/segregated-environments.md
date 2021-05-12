# Technical requirements for segregated partner environments

A number of RingCentral partners exist in a completely segregated environment in order to comply with specific regulations that govern the markets they operate in. As a result, these partners have additional technical requirements developers must satisfy in order for their applications to function for these partners. 

These additional requirements relate to an application's ability to detect the partner a customer is associated with, and based upon that partner directing API calls to one of two different environments:

| Environment Name | Base API URL |
|-|-|
| Commercial | https://platform.ringcentral.com/ |
| Segregated | https://platform.ringcentral.biz/ |

The partners that operate in our segregated environment are:

* AT&T Office@Hand

For the purposes of this documentation, we call these partners "segregated partners."

## How to build support for RingCentral's segregated environment

The main technical challenge developers must address in supporting RingCentral partners operating in a segregated environment is identifying a customer who is affiliated with one of these partners, and sending API requests to a different URL. 

The following high-level technique provides a good framework for understanding how you might architect your own solution to this problem.

### Utilize a custom login button

Many customers are not always cognizant of the fact that RingCentral is powering their carrier cloud communication. Therefore if they are presented with a prompt to "login to RingCentral" they may not understand that the prompt is intended for them. 

As a result, we recommend developers who are directly targeting RingCentral partners to create prompts and design user interfaces that bear this in mind. One simple way to do this is to use one of the [login buttons we have provided developers](../../partner-compatibility/#buttons) that are partner-specific.

### Composing a login URL

When constructing the login URL used to initiate the 3-legged authorization flow, developer should consider the following:

* The login URL may differ depending upon the RingCentral partner a user is affiliated with. The login URL will be one of the following:

   * https://login.ringcentral.com
   * https://login.ringcentral.biz

* To ensure the user sees the proper branding when logging in, developers should [pass the brand ID of the partner](../../partner-compatibility/#login-page-branding) via the `brandId` query parameter. 

* We recommend developers pass the partner's brand ID via the `state` query parameter. The `state` parameter will be passed through to your OAuth Redirect URI verbatim and can be used to differentiate between users affiliated with our commerial and segregated environments. 

### Calling the API

Customers of segregated partners operate in a completely separate environment. This creates additional requirements for developers wishing to provide applications that are compatible with both RingCentral and our segregated partners. Primarily, developers need to architect their applications to direct their API requests to either the commercial or segregated server environments, depending upon the customer they are acting on behalf of. 

### Persisting partner affiliations

Developers should make efforts to persist whether their users are associated with RingCentral or a segregated partner, as all subsequent API requests need to be directed to the proper server environment in order to be completed successfully. 

## Sample Application

A [sample application](https://github.com/byrnereese/ringcentral-office-at-hand-sample-app) was created to help illustrate the guidelines above. It's README highlights the specific code changes you may need to make to your application to ensure compatibility with all of our partners. 

API: `https://platform.ringcentral.biz/restapi/v1.0/account/~`
