# Ensuring partner compatibility

## Benefits of working with RingCentral partners

RingCentral works with a number of carriers and partners to deliver a cutting edge white-labeled Cloud Communications service directly to their customers. Adherance to our best practices, and working to be compatible with our partners operating in [segregated environments](../partners/segregated-environments/) come with the following benefits:

1. Extend the reach of your application to hundreds of thousands of potential customers.  

2. Our partners are often deeply embedded in different geographic markets which can help developers and companies grow their markets internationally. 

3. Our partners have active sales channels. Having your app listed in their app galleries helps their channels market and connect customers to your product. 

This guide will assist developers in building apps that are aware of these partners and their brands to reach those audiences and customers.

??? tip "Learn how to promote your app to our partners in the App Gallery"
    Each of our brand partners has an app gallery in which are promoted all of the apps available to their customers. Learn how to create a profile for your app that can be listed in these galleries.

    Learn [how to get listed in our app gallery &raquo;](../app-gallery/)

!!! warning "Additional requirements for AT&T Office@Hand and Verizon"
    Some partners operate in a completely segregated environment and as a result require developers to adhere to [additional technical requirements](../partners/segregated-environments/) in order to maintain compatibility with those partners. 

## Tips and recommendations

### Grant partners access to your app

The first step in making your application available to our partner's customers is to set the proper access permissions when you initially create your app. There are two ways to make your app available to RingCentral brand partners when configuring "who will be authorized to access your app?" They are:

1. Select "All RingCentral customers." When this is selected, your app will be made available to all RingCentral customers, including those of our brand partners. If RingCentral were to add more brand partners, then your app will automatically be available to them as well. *This is the recommended option.*

2. Select "Only customers of selected brand partners," then select the specific brand partners you want to limit access to. For those wishing to maximize the reach of their application, we recommend selecting "All RingCentral customers."

<img class="img-fluid mx-auto d-block" src="../partners-create-app.png" style="max-width:500px" />

### Help customers authenticate with the right service

#### Use a custom login button

Our partner's customers may not always be aware that RingCentral is the service powering the solution they use everyday. They may only know their service by the name our partner's give their product, for example "AT&T Office@Hand." For this reason, we recommend developers make specific reference to each of the services a customer may wish to connect to.

The following images have been provided to help you construct buttons to initiate the login flow with RingCentral and all of its partners.

##### RingCentral

<img src="../button-ringcentral.png" alt="RingCentral connect button">

##### AT&T Office@Hand

<img alt="ATT Login Button" src="../button-att.png">

##### Atos Unify Office

<img alt="Atos Unify Office Login Button" src="../button-atos.png">

##### Avaya Cloud Office

<img alt="Avaya Cloud Office Button" src="../button-avaya.png">

##### BT

<img alt="ATT Login Button" src="../button-bt.png">

##### Rainbow Office

<img alt="Rainbow Office Login Button" src="../button-rainbow.png">

##### TELUS

<img alt="TELUS Login Button" src="../button-telus.png">

### Customize the branding of the login page

When constructing a login URL to initiate the authorization process in a [3-legged Auth Flow](../../authentication/auth-code-flow), a query string parameter called `brandId` can be added to control which partner's logo will appear on the page. The following values can be used to control the brand displayed on the RingCentral login page.

| Brand Id | Provider | Service Name | Logo Displayed |
|-|-|-|-|
| `3420` | AT&T | AT&T Office@Hand | <img alt="Office@Hand Logo" src="../partners/logo_att.svg"> |
| `6010` | Avaya | Avaya Cloud Office | <img alt="Avaya Cloud Office Logo" src="../partners/logo_aco.jpg"> |
| `7310` | TELUS | TELUS | <img alt="TELUS Logo" src="../partners/logo_telus.svg"> |
| `7710` | BT | BT Cloud Work | <img alt="BT Cloud Work Logo" src="../partners/logo_bt.svg"> | 
| `2110` | Alcatel | Rainbow Office | <img alt="Rainbow Office Logo" src="../partners/logo_rainbow.png"> | 
| `2020` | Atos | Unify Office | <img alt="Atos Unify Office Logo" src="../partners/logo_atos.png"> | 

Leaving `brandId` blank will result in RingCentral's logo being displayed. 

### Construct the proper login URL

Developers should take care in building the URLs used to initiate the login and authorization (a.k.a. OAuth) flow for their app, as the URL will specify the logo that will appear on the login page. Here is a sample login URL that will display the BT Cloud Work logo to the user on our login page. 

```
https://platform.ringcentral.com/restapi/oauth/authorize\
   ?response_type=code&redirect_uri=<my_uri>&client_id=<client_id>\
   &brand_id=7710&display=&prompt=
```

Remember, pay close attention to the following:

* The domain you utilize may depend upon the carrier you are linking to.
    * AT&T Office@Hand and Verizon users will use a domain of `platform.ringcentral.biz`
    * All other users will use a domain of `platform.ringcentral.com`
* The `brandId` parameter will need to be customized based on the logo you want to appear on the login page.

!!! warning "Additional AT&T Office@Hand and Verizon Technical Requirements"
    Working with partners operating in a segregated environment, like AT&T Office@Hand and Verizon, comes with [additional technical requirements](../partners/segregated-environments/) in order to meet the compliance and security requirements mandated by their products.


