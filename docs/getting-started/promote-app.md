# Promoting your application in the RingCentral App Gallery

{! mdx_includes/first-api-call-reminder.md !}

RingCentral is a platform that gives developers access to hundreds of thousands of customers across some of the largest brands in the world, including AT&T, Avaya, BT, Telus, Verizon, and more. This guide will help you reach these customers by promoting your app within each brand's dedicated App Gallery. Let's get started!

!!! tip "Need to update an existing App Gallery profile? Learn how to [submit a revision &raquo;](../../basics/update-profile/)"

??? info "How to customize your app for our partner ecosystem"
    To best position and market your product to our brand and distribution partners, learn about their brand guidelines, and how to compose connect buttons for them.
    
    AT&T Office@Hand and Verizon have [additional technical requirements](../../basics/partners/segregated-environments/) developers should be aware of as well.
    
    Read our [Partner compatibility guide](../../basics/partners/) to learn more.

## Things to do before you submit your app profile to the app gallery

Developers are encouraged to begin producing their app profile as soon as they are able. However, a profile cannot be submitted for approval until the following prerequisites are met:

* The app has been graduated to production. 
* All required data has been provided about the app. 

## How do I invite someone from my marketing team to create a profile?

Not all software developers are the ideal individual within an organization to compose and manage an app's profile which serves a marketing function in the RingCentral App Gallery. 

Anyone can be invited to join the Developer Console to edit an app's profile. To do so, consult our documentation on [collaborating with others in the Developer Console](../../basics/inviting-developers/).

## In what app galleries will my profile appear?

Your profile once submitted and approved will automatically be published in the app galleries associated with the partners your app is configured for. To change where your app is promoted, login to the Developer Console, and edit your app's settings.

### Making your app available to all customers (recommended)

By default, your app will be made available to all RingCentral customers, brand partners, and carrier partners. We recommend this setting for most apps to maximize the distribution potential for your product. 

<figure class="figure">
  <img class="img-fluid mx-auto d-block" src="../../basics/app-gallery-public-app.png" style="max-width: 500px">
  <figcaption class="figure-caption text-center">Your app will be made available to <em>all partners and app galleries</em></figcaption>
</figure>

### Making your app available to only select carriers and partners

If you wish to only make your app available to specific partners, then expand "Advanced settings", and select "Make available only to specific service providers and brand partners." Then, select the partners you wish to make your app available to. By selecting a partner, you authorize RingCentral to promote your app in that partner's app gallery. 

<figure class="figure">
  <img class="img-fluid mx-auto d-block" src="../../basics/app-gallery-partners.png" style="max-width: 500px">
  <figcaption class="figure-caption text-center">Your app will be made available to select partners only</figcaption>
</figure>

!!! tip "Customize your profile for each partner using [variables](../app-gallery-variables/)"

## How do I publish my profile in the App Gallery?

We recommend you get started by successfully creating and publishing an App Gallery Profile for the official RingCentral App Gallery. Let's begin. Login to the RingCentral Developer Console, then from your list of application, select the one you would like to promote, and then click the "App Gallery" tab. Then follow the steps below. 

### Design your app's "app card"

An app card is a tile that is shown through out the RingCentral app gallery ecosystem in collections, categories, and other pages where apps are listed together. An app card consists of three components:

1. App icon
2. Display name
3. Short description

<figure class="figure">
  <img class="img-fluid mx-auto d-block" src="../../basics/app-card.png" style="max-width: 500px">
  <figcaption class="figure-caption text-center">Example app card</figcaption>
</figure>

An app card can be edited in two locations: the app's settings screen, and the app's profile editing screen. 

<figure class="figure">
  <img class="img-fluid mx-auto d-block" src="../../basics/app-card-editor.png" style="max-width: 500px">
  <figcaption class="figure-caption text-center">App card editor as seen in app settings</figcaption>
</figure>

### Create an app gallery profile

If you have not yet created an app gallery profile, you will be prompted to create one as shown in the following screenshot.

<img class="img-fluid mx-auto d-block" src="../../basics/promote-1a.png" style="max-width: 500px">

If you have already published an app gallery profile, you will see an option to edit your profile, as well as a list of all the app galleries your profile is currently published within.

<img class="img-fluid mx-auto d-block" src="../../basics/promote-1b.png" style="max-width: 500px">

### Tell us about your app

Use the profile editor to compose a profile that is both informative and attractive to potential customers. Our editor will prompt you not only for content that will be displayed publicly in the app gallery, but also information RingCentral administrators will use to help you promote your app throughout our app gallery network. 

#### Enter basic organizational info

The name we publish as the developer of the app is determined by your organization's developer profile. That name is easily edited by navigating to the "Organization" tab within the Developer Console. 

<img class="img-fluid mx-auto d-block" src="../../basics/profile-org-info.png" style="max-width: 500px">

You will also need to provide us with your company's website URL in the "Organization info" section of the editor. 

Some developers may also see a "Lead email" field. This field is made available exclusively to Premier Partners and allows partners to collect and download leads from people who visit and share their information via the App Gallery. 

<img class="img-fluid mx-auto d-block" src="../../basics/profile-info.png" style="max-width: 500px">

#### Upload screenshots and videos

Arguably one of the most important aspects of your app's profile is the set of screenshots and videos you will upload. This will help customers visualize your product and how it specifically integrates with RingCentral. 

<img class="img-fluid mx-auto d-block" src="../../basics/profile-screenshots.png" style="max-width: 500px">

!!! hint "Screenshot and media best practices"
    The following will help you know what types of media lead to the best conversion rates with customers:
	
	* **Showcase your integration**. It is not enough to only showcase your own product without also showing the functionality that is introduced once integrated with RingCentral.
	* **Videos are king**. Customers want to see the integration in action so they understand how they will use it, and how it will bring them value. 
	* **Augment screenshots with text**. Tell the story of your integration's experience with words and pictures. Highlight the values you bring with text. 
	* **Clear, hires images matter**. Take care to produce high-quality screenshots. Don't be afraid to zoom-in to highlight a specific part of your UI. Make sure your screenshots are high-resolution and don't pixelate. Quality really does matter.

#### Provide a name and detailed description

Your detailed description starts with a "profile name." This is the title as it will appear to search engines and to customers when they visit your profile. Whereas your app's display name is how your app will be present internally within our app (on app cards, in OAuth flows, and elsewhere). We differentiate between profile and display names, to allow the page used for marketing purposes (the profile) to contain a richer, more complete name. This provides for greater SEO to help customers find your app via search. We recommend a profile name that follows this pattern:

    <Name of app> for {{ partner.full_name }}

When the profile is published, `{{ partner.full_name }}` will be substituted with the name of the partner's app gallery, as an app can be promoted within multiple app galleries. For example:

    My app name for {{ partner.full_name }}

Will produce profiles with the following names:

* "My app name for RingCentral"
* "My app name for AT&T Office@Hand"
* "My app name for Avaya Cloud Office"
* etc. 

Learn more about these "[profile variables](../../basics/app-gallery-variables/)."

The detailed description of your integration tells customers what your integration does, what value and benefits it provides, and how it does it. It not only helps to market your integration, but also serves as your integration's documentation. Therefore, the more information you provide, the better. 

<img class="img-fluid mx-auto d-block" src="../../basics/profile-description.png" style="max-width: 500px">

!!! hint "Description best practices"
    Treat your detailed description as you would your integration's documentation. As such, be sure to include the following:
	
	* A list of your integration's benefits
	* A list of features your integration provides
	* Installation instructions
	* How to use your integration
	* Prerequisites admins should know about prior to using your integration

#### Share helpful links and documents

RingCentral will display a set of links and resources alongside your profile. We consider all of these links to be essential, even if they are not required. Please provide a link to your app's documentation, terms of service, your privacy policy, and a link to where customers can get support. 

You can optionally link to other documents as you see fit. These could be whitepapers, support resources and knowledge base articles, marketplaces, and more. 

#### Help us promote your app in the right place

Finally, you can help RingCentral promote your app through the right channels by telling us where and how best to do that. Use the Promotion area to:

* Which [partners and app galleries](../../basics/partners/) to promote your app within
* If you app has implemented the [additional technical requirements](../../basics/partners/segregated-environments/) to be promoted to AT&T and Verizon customers, please let us know
* Any categories your app should be promoted within (select up to 3)
* What products your integration is meant to specifically extend

<img class="img-fluid mx-auto d-block" src="../../basics/profile-promotion.png" style="max-width: 500px">

Click "Save as draft" to save your work and come back later to finish. When you are finished, click "Submit for approval" to continue on to the next step. 

### Save and preview often

Be sure to save your app profile often as you go, and to preview it to see what it will look like when it goes live. This will help you create a profile that is complete, and looks good. We recommend partners pay close attention to the following:

* Upload or link to a video that shows your product in action.
* Upload a number of detailed screenshots.
* Provide us with sufficient content for the Support and Installation areas. 

<img class="img-fluid mx-auto d-block" src="../../basics/promote-4.png" style="max-width: 500px">

### Submit your application for review

Before your app can be listed in an app gallery, the RingCentral team will first review your app and will make recommendations to help you improve your app profile to better reach our customer base.

??? tip "You can only submit your application for approval, after the app has graduated."
    The [graduation process](../../basics/production/) ensures that only high-quality and reliable applications are permitted access to our production environment. While you are free to compose your app gallery profile at any time, you will be required to go through our graduation process before you are allowed to publish your app profile to any app gallery.

??? warning "Please note special technical requirements for AT&T Office@Hand and Verizon"
    To make your application available to AT&T Office@Hand and Verizon customers, developers will have to make special accommodations. Please read about the [technical requirements for apps operating in our segregated environment](../../basics/partners/segregated-environments/) to learn more. 

After you have entered all the information describing your brand new app, you can preview it by clicking the 'Save and preview' button.

<!--
## Become a partner

Partners receive a number of benefits, one of the most valuable being featured in the RingCentral App Gallery. To join the CP3 program as a Premier Partner, please fill out our [partner application form](https://www.ringcentral.com/partner/isvagentform.html). Being featured is at the discretion of our Connect Platform Partner team.

??? info "Reference: App Gallery Fields"
    | Field Name | Description |
    |------------|-------------|
    | Application Name  | The name of your app as you wish it to appear in the directory. This may be different from the app name in the Developer Console. |
    | Free or Paid  | How does your application make money? This information will be displayed publicly. |
    | Get App URL  | Choose between accessing the app directly from within the App Gallery (common for bots), or provide a URL at which someone can download/access your application.  |
    | Publisher  | The name of the publisher as it will appear on the profile.  |
    | Publisher Website | The URL to link the publisher's name to. |
    | Supported By | The name of the entity providing support for the plugin. This is often the same as the publisher.  |
    | Supported By Website | The URL to link the supported by's name to.  |
    | Short Description | Text that will appear on the Overview tab, above the screenshots as a headline. Please limit to a sentence or two at most. |
    | Long Description | Large block of text that will appear on the Overview tab below the screenshots. This field supports markdown. |
    | System Requirement | A list of requirements that will be displayed on the Overview tab in the sidebare. |
    | App Type | The RingCentral product this application extends or provides value to. This field will help your app get discovered by the right people. |
    | App Category | Select the category or categories you want your application to be listed in. |
    | Publish Date | The date of publication. You may also select a date in the future to schedule the app profile's publication in the Gallery. |
    | Installation | A large block text that will appear in the Installation tab if any text is provided. This field supports markdown. |
    | Resource Links | Add as many links as you would like. These links will be displayed in the sidebar of the Overview tab. |
    | App Logo | Upload versions of your application's logo. |
    | App Screenshots | Upload screenshots of your application. |
    | App Video | Specify an embed URL to render a playable video on the app's profile. |
    | Support Email | The email address to direct support inquiries to. |
    | Support Phone | A phone number to direct support inquiries to. |
    | Support Time | Enter in the time's your support team is available. |
    | Support Request URL | If your system support help tickets, or form-based support inquiries, provide the URL to that form. |
    | Document URL | The URL to your application's documentation. |
    | Community URL | The URL to your application's support community or forums. |
    | Wiki URL | The URL to your application's online documentation portal/wiki. |
-->
