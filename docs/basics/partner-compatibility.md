# Partner Compatibility Guide

RingCentral works with a number of carriers and partners to deliver a cutting edge white labeled Cloud Communications service directly to their respective customers. This guide will assist developers in building apps that are aware of these partners and their brands to reach those audiences and customers.

Our partners include:

* AT&T Office@Hand
* Avaya Cloud Office
* TELUS
* BT Cloud Work

??? tip "Learn how to promote your app to our partners"
    Each of our brand partners has an app gallery in which are promoted all of the apps available to their customers. Learn how to create a profile for your app that can be listed in these galleries.

    Learn [how to get listed in our app gallery &raquo;](../app-gallery/)

!!! warning "Specific AT&T Office@Hand Guidelines"
    AT&T Office@Hand's product is slightly different from our other partners. Please read the specific requirements outlined in our [AT&T Office@Hand Brand and Developer Guidelines](../partners/att/) to ensure your application will be 100% compatible with our AT&T infrastructure.

### Benefits

Our partners give developers and companies access to entirely different customer bases to which they can market their applications and products. Our partners are often deeply embedded in different geographic markets which can help developers and companies grow their markets internationally. 

## Creating Apps

The first step in making your application available to our partner's customers is to set the proper access permissions when you initially create your app. There are two ways to make your app available to RingCentral brand partners when configuring "who will be authorized to access your app?" They are:

1. Select "All RingCentral customers." When this is selected, your app will be made available to all RingCentral customers, including those of our brand partners. If RingCentral were to add more brand partners, then your app will automatically be available to them as well. *This is the recommended option.*

2. Select "Only customers of selected brand partners," then select the specific brand partners you want to limit access to. For those wishing to maximize the reach of their application, we recommend selecting "All RingCentral customers."

<img class="img-fluid mx-auto d-block" src="../partners-create-app.png" style="max-width:500px" />

## Authentication

### Buttons

Our partner's customers may not always be aware that RingCentral is the service powering the solution they use everyday. They may only know their service by the name our partner's give their product, for example "AT&T Office@Hand." For this reason, we recommend developers make specific reference to each of the services a customer may wish to connect to.

The following images have been provided to help you construct buttons to initiate the login flow with RingCentral and all of its partners.

#### RingCentral

<img src="../button-ringcentral.png" alt="RingCentral connect button">

#### AT&T Office@Hand

<img alt="ATT Login Button" src="../button-att.png">

#### Avaya Cloud Office

<img alt="Avaya Cloud Office Button" src="../button-avaya.png">

#### BT

<img alt="ATT Login Button" src="../button-bt.png">

#### TELUS

<img alt="TELUS Login Button" src="../button-telus.png">

### Login Page Branding

When constructing a login URL to initiate the authorization process in a [3-legged Auth Flow](../../authentication/auth-code-flow), a query string parameter called `brandId` can be added to control which partner's logo will appear on the page. The following values can be used to control the brand displayed on the RingCentral login page.

| Brand Id Value | Service | Logo Displayed |
|-|-|-|
| `3420` | AT&T Office@Hand | <img alt="Office@Hand Logo" src="../logo-att.png"> |
| `6010` | Avaya Cloud Office | <img alt="Avaya Cloud Office Logo" src="../logo-avaya-sm.jpg"> |
| `7310` | TELUS | <img alt="TELUS Logo" src="../logo-telus.png"> |
| `7710` | BT | <img alt="BT Logo" src="../logo-bt.png"> | 

Leaving `brandId` blank will result in RingCentral's logo being displayed. 

### Constructing a Login URL for RingCentral Partners

Developers should take care in building the URLs used to initiate the login and authorization (a.k.a. OAuth) flow for their app, as the URL will specify the logo that will appear on the login page. Here is a sample login URL that will display the BT Cloud Work logo to the user on our login page. 

```
https://platform.ringcentral.com/restapi/oauth/authorize\
   ?response_type=code&redirect_uri=<my_uri>&client_id=<client_id>\
   &brand_id=7710&display=&prompt=
```

Remember, pay close attention to the following:

* The domain you utilize may depend upon the carrier you are linking to.
    * AT&T Office@Hand users will use a domain of `platform.ringcentral.biz`
    * All other users will use a domain of `platform.ringcentral.com`
* The `brandId` parameter will need to be customized based on the logo you want to appear on the login page.

!!! warning "Additional AT&T Office@Hand Technical Requirements"
    Working with AT&T Office@Hand comes with additional technical requirements in order to meet the compliance and security requirements mandated by the platform. At a high-level, API calls must be directed to a dedicated environment and URL for AT&T Office@Hand. Please read our guide for a complete list of requirements and best practices.

    Read the [AT&T Office@Hand Brand and Developer Guidelines &raquo;](../partners/att/)

!!! tip "Promotion in the App Gallery"
    Each RingCentral partner has its own independent App Gallery in which apps on the platform can be listed and promoted. If your application is known to be compatible with a given partner it is recommended you publish a separate profile in the partner's respective App Gallery.
    
    Read our guide on [getting listed in the RingCentral app gallery &raquo;](../app-gallery/)

