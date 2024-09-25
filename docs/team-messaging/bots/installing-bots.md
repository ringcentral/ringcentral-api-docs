# Installing and uninstalling bots

A bot is a type of add-in that provides team messaging users with a conversational interface for completing various tasks. A bot is installed once per account or organization, and once installed, any user is free to add or remove the bot from a conversation. This guide will walk you through the process of installing a bot. 

## Needed permissions

To install and/or remove a bot one must be granted the "Install bot" and "Remove bot" permissions within their organization. This is typically done by your account administrator by editing a role and adding the corresponding permissions under "Desktop and Mobile App Features."

<img src="../bot-perms.png" class="img-fluid">

## Install a bot from the App Gallery

The most common way to install a bot from the App Gallery is to navigate to the bot's profile, and click the "Install Bot" button. 

<img src="../install-bot-app-gallery.png" class="img-fluid" style="max-width:500px">

Doing so will initiate the bot installation process in which you will be prompted to authorize the bot to access your account, after which you will asked if you wish to customize the name of the bot.

<img src="../install-bot-auth.png" class="img-fluid" style="max-width:500px">

You may wish to change the name of the bot. If so, edit it in the next step. The name you choose will be how your bot is addressed via an "@" message. 

A bot is removed in much the same way. Once a bot is installed, and assuming you have permission to remove it (see "Needed permissions" above), then the "Install bot" button will be replaced with a "Remove bot" button. 

<img src="../install-bot-change-name.png" class="img-fluid" style="max-width:500px">

Once the bot is installed, any user within your organization will be able add the bot to a conversation and converse with it. 

## Install a bot from within the Developer Console

!!! hint "Private bots can only be installed via the Developer Console"

During development, or if you have built a private bot (one that is only accessible to members of your account), you can install bots via the RingCentral Developer Console. To do, find the bot you wish to install. From the app's dashboard, click the "Install" button found under the "Credentials" section. 

<img src="../install-bot-dev-console.png" class="img-fluid" style="max-width:500px">

To remove the bot, click the "Remove bot" button after it has been installed. 

<!--

## Installing a bot from a third-party website

Some developers may wish to have users install their bot directly from their own website. To enable this workflow, find the bot you wish to install, and click its "Bot" tab. Under "Add to RingCentral button" enter the URL you wish users to be directed to upon successfully installing the bot into the "Landing URL" field. Then click Generate Code.

<img src="../install-bot-website.png" class="img-fluid" style="max-width:500px">

Then take the code that was generated for you and paste on your website. Feel free to style the button however you wish.

#### Sample bot installation code

```html
<a href="https://www.ringcentral.com/apps/7gufiGTxxxxxxDaQ~CRwnzRKNSS2eOAFzgD7uQw/install?\
   landing_url=https%3A%2F%2Fmajordojo.com%2Fbot-installation-success" target="_blank" \
   style="/* excluded for brevity */"><span>Add to </span> \
   <img style="width: 30px;display: inline-block;margin-left: 10px;" \
   src="https://netstorage.ringcentral.com/dpw/common/ringcentral_app_logo.svg"></a>
```

-->

