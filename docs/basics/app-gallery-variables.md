# Using variables in your app gallery profiles

RingCentral's App Gallery is special in that it is leveraged by a wide ranging set of carriers and partners who whitelabel RingCentral's cloud platform to power their own. To help developers make the most of this huge advantage our marketplace has over others in the industry, we allow developers and marketers to customize their app profiles for each of the partners, and the markets these partners operate within. 

This customization is made possible with variables that can be accessed and manipulated using a templating language powered by [Handlebars](https://handlebarsjs.com/). At the core of this language are the variables present inherent in every page when the page is published. 

## Available partner variables

App Gallery profiles can be customized on a per-partner basis by embedding a simple templating language in any text field of your App Gallery profile. At the center of this language and what you can customize centers on the template variables present when RingCentral published your profile to each of our partners' app galleries. These variables are:

| Variable | Description | Example(s) |
|-|-|-|
| `partner.domain` | The base URL for the service operated by RingCentral. | https://www.ringcentral.com, https://app.officeathand.att.com |
| `partner.full_name` | The full official name of the partner. | RingCentral, Avaya Cloud Office, AT&T Office@Hand |
| `partner.gallery_name` | The name of the partner's App Gallery. | RingCentral Gallery, AT&T Office@Hand Gallery,  |
| `partner.id` | The internal ID of the partner within RingCentral. This id is used, for example, in login URLs to show the partner's branding. | 2010, 7010 |
| `partner.short_name` | A short name for the partner. | AT&T, Avaya, Verizon, Ecotel |
| `partner.url_slug` | The URL-safe string used to construct links to apps in a partner's app gallery. | avaya, officeathand, vodafone-business |

These variables can be output directly by enclosing any of them in "handlebars" like so:

    {{partner.full_name}}

These variables can be utilized within conditional statements as well, like so:

    {{#if (eq partner.full_name "AT&T Office@Hand")}}
    This text only appears on the Office@Hand App Gallery profile.
    {{/if}}

We currently support the following conditional operators:

* `eq` or equal to
* `ne` or not equal to


Variables can also be manipulated using [handlebar helpers](https://handlebarsjs.com/guide/builtin-helpers.html). The helper below for example will change the partner's name to all uppercase. 

    {{uppercase partner.full_name}}

Here are list of helpers:

* `lowercase`
* `uppercase` 
* `replace`
* `replaceAll`

## Recipes

### Create a SEO optimized profile name

We recommend that the profile name of all apps be qualified to each partner they apply to. For example, the Salesforce integration produced by RingCentral has a profile name of "{{ partner.full_name }} for Salesforce" as shown below:

<img class="img-fluid" src="../variables-ex1.png" />

When this profile is published across our partner ecosystem, the profile's title for each page reflects the partner the integration is built for:

* RingCentral for Salesforce, see [example](https://www.ringcentral.com/apps/ringcentral-salesforce)
* Avaya Cloud Office for Salesforce, see [example](https://www.ringcentral.com/apps/avaya-cloud-office/avaya-cloud-office-for-salesforce)
* Vodafone Business for Salesforce, see [example](https://www.ringcentral.com/apps/vodafone-business/vodafone-business-for-salesforce)
* and so forth

### Create download URLs with utm tracking codes

These variables can also be used to better help you understand where traffic to your website is coming from. If for example you use [utm tracking codes](https://agencyanalytics.com/blog/utm-tracking) you can create links that track which partners visitors to your website come from. 

<img class="img-fluid" src="../variables-ex2.png" />

For example, the text below when placed in your app's "Access method" field will construct a link with campaign code equal to the partner's short name. 

    https://www.mycompany.com/signup.html?urm_source=ringcentral&utm_campaign={{partner.short_name}}

### Login URLs customized with partner's branding

Perhaps you would like to link to a login page that contains the partner's branding. RingCentral's universal login page can be passed a partner's ID to surface branding appropriate to that partner. 

* [RingCentral's login page](https://login.ringcentral.com/?brandId=1210)
* [Unify Office's login page](https://login.ringcentral.com/?brandId=2020)
* [AT&T's login page](https://login.ringcentral.com/?brandId=3420)

Those URL's are constructed like so:

    https://login.ringcentral.com/?brandId={{partner.id}}

### Simple string replacement

You can perform string replacement using two different helpers.

    {{replace partner.full_name '@' 'at'}}

Replace all spaces with hyphens:

    {{replaceAll partner.full_name ' ' '-'}} 
