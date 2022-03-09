# Facilitating authentication within RingCentral's partner ecosystem

## Customizing the branding of the login page

When constructing a login URL to initiate the authorization process in a [3-legged Auth Flow](../../authentication/auth-code-flow), a query string parameter called `brandId` can be added to control which partner's logo will appear on the page as illustrated below.

<img src="../login-avaya.png" class="img-fluid mx-auto" style="max-width: 350px">
<img src="../login-unify-office.png" class="img-fluid mx-auto" style="max-width: 350px">

A list of partners and their brand IDs can be found in our [brand guidelines](../brand-guidelines/) documentation. 


Leaving `brandId` blank will result in RingCentral's logo being displayed. 

### Constructing the login URL for partners

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

## Appendix: custom login buttons

Our partner's customers may not always be aware that RingCentral is the service powering the solution they use everyday. They may only know their service by the name our partner's give their product, for example "AT&T Office@Hand." For this reason, we recommend developers make specific reference to each of the services a customer may wish to connect to.

The following images have been provided to help you construct buttons to initiate the login flow with RingCentral and all of its partners.

| Service Provider   | Login Button                                                              |
|--------------------|---------------------------------------------------------------------------|
| RingCentral        | <img src="../../button-ringcentral.png" alt="RingCentral connect button"> |
| AT&T Office@Hand   | <img alt="ATT Login Button" src="../../button-att.png">                   |
| Atos Unify Office  | <img alt="Atos Unify Office Login Button" src="../../button-atos.png">    |
| Avaya Cloud Office | <img alt="Avaya Cloud Office Button" src="../../button-avaya.png">        |
| BT                 | <img alt="ATT Login Button" src="../../button-bt.png">                    |
| Rainbow Office     | <img alt="Rainbow Office Login Button" src="../../button-rainbow.png">    |
| TELUS              | <img alt="TELUS Login Button" src="../../button-telus.png">               |

