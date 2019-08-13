# Partner Compatibility Guide

RingCentral works with a number of carriers and partners to deliver a cutting edge white labeled Cloud Communications service directly to their respective customers. This guide will assist developers in building apps that are aware of these partners and their brands to reach those audiences and customers.

Our partners include:

* AT&T Office@Hand
* TELUS
* BT

### Benefits

Our partners give developers and companies access to entirely different customer bases to which they can market their applications and products. Our partners are often deeply embedded in different geographic markets which can help developers and companies grow their markets internationally. 

## Creating Apps

The first step in making your application available to our partner's customers is to select the partner your app can be made available to when you initially create your app. In step 2 of the [Create Application Process](../create-app/) you must:

1. Make sure your app is Application Type is set to "Public."
2. Select your desired partners under "Carrier." *By default, all are selected.*

<img class="img-fluid" src="../partners-create-app.png" width="75%" />

*If a partner is not selected, then customers associated with that partner will be prohibited from authenticating or using your application.*

## Authentication

### Buttons

Our partner's customers may not always be aware that RingCentral is the service powering the solution they use everyday. They may only know their service by the name our partner's give the product, for example "AT&T Office@Hand." For this reason, we recommend developers use buttons, or at least copy/language, to help customer connect via the right service. The following buttons have been crafted to help you construct buttons to initiate the login flow with RingCentral, or any of our partners.

#### AT&T Office@Hand

![Office@Hand Logo](https://login-officeathand.att.com/static/media/logo-19.3.0.svg)

**Button HTML**

```html
<a href="http://platform.ringcentral.com/login?brandId=3420&<OAUTH PARAMS>">
  <img src="https://login-officeathand.att.com/static/media/logo-19.3.0.svg">
</a>
```

#### TELUS
#### BT

### Branding

When constructing a login URL to initiate the authorization process in a [3-legged Auth Flow](../../authentication/auth-code-flow) you can add a query string parameter called `brandId` which will allow you to select which partner's logo will appear on the page. The following values can be used to control the brand displayed.

| Brand Id Value | Service | Logo Displayed |
|-|-|-|
| `3420` | AT&T Office@Hand | ![Office@Hand Logo](https://login-officeathand.att.com/static/media/logo-19.3.0.svg) |
| `7310` | TELUS | ![TELUS Logo]() |
| `7710` | BT | ![BT Logo]() | 

Leaving `brandId` blank will result in RingCentral's logo being displayed. 

### AT&T Office@Hand Implementation Considerations

!!! warning "AT&T Office@Hand Guidelines"
    AT&T Office@Hand's product is slightly different from our other partners. Please read the guidelines below to ensure your application will be 100% compatible with our AT&T infrastructure.

AT&T Office@Hand customers on RingCentral operate in a completely separate environment. This creates additional requirements for developers wishing to provide applications that care compatible with both RingCentral and Office@Hand customers. Primarily, developers need to architect their applications to direct their API requests to either the RingCentral or Office@Hand server environments, depending upon the customer they are acting on behalf. The table below shows these two server environments:

| Service | Domain |
|-|-|
| RingCentral | `https://platform.ringcentral.**com**/` |
| Office@Hand | `https://platform.ringcentral.**biz**/` |

Below are a set of recommendations for developers when building their applications.

1. When constructing the Login URL to initiate the 3-legged authorization flow:
   * Developers should direct their users to the proper domain depending upon whether the user is a customer of RingCentral or Office@Hand.
   * Developers should include the `brandId` querystring parameter and set it to `3420`.
   * Developers wishing to use the same OAuth Redirect URI for both Office@Hand and RingCentral customers should also provide a value in the `state` querystring parameter. The `state` parameter will be returned verbatim in the redirect to complete the OAuth flow. The value provided can help developers disambiguate between a RingCentral and Office@Hand customer.
2. Developers should make efforts to remember whether their users are associated with RingCentral or Office@Hand, as all subsequent API requests need to be directed to the proper server environment in order to be completed successfully.

#### Sample Application

A [sample application]() was created to help illustrate the guidelines above. Here are a few code snippets of interest:

```javascript

```

## Promotion in the App Gallery

Each RingCentral partner has its own independent App Gallery in which apps on the platform can be listed and promoted. If your application is known to be compatible with a given partner it is recommended you publish a separate profile in the partner's respective App Gallery.

This can be accomplished by:

1. Login to the RingCentral Developer Console.
2. Navigate to the "Publish" tab for your application.
3. Using the pull-down menu as seen in the screenshot below, select the correct partner.
4. Edit your app's profile and submit when finished.

<img class="img-fluid" src="../partners-publish-app.png" width="75%" />

### Why do you require multiple profiles?

To best cater to our partner's customers we suggest you publish an App Profile for each profile that is different in the following key ways:

* Screenshot should use partner's branding. Our partner's customers are often unaware that RingCentral powers their service, and are more accustomed to seeing the partner's brand instead.
* Descriptions should not mention "RingCentral." For the same reason as above, we recommend app profiles refer to the partner's service name, rather than "RingCentral."
