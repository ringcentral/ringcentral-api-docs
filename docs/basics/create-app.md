# Creating an Application

Create your application at [Developer Portal](https://developers.ringcentral.com/) following the steps:

1. [Sign in](https://developers.ringcentral.com/login.html#/) to Developer Portal with your account login and password. If you do not have RingCentral account, please sign up.

2. Go to [Console/Apps](https://developers.ringcentral.com/my-account.html#/applications) and click 'Create App' button.

3. Fill in the 'General Settings' form:

    <img src="../../img/create-app-general-settings.png" class="img-fluid">
  
    * **Application Name** Enter the name of your app.
    * **Organization Name** Enter the name of your organization.
    * **Description** Enter the text describing your app which is needed for app graduation only and will not be displayed to your app users. It should contain minimum 20 characters.
    Continue by clicking the 'Next' button.

4. Fill in the 'App Type & Platform' form:

    <img src="../../img/create-app-type-and-platform.png" class="img-fluid">

    * **Application Type**

        Specify the application type. Please take time to specify correct value as it is not editable after your app is created and affects Authorization flows available for your app.
        You can choose one app type out of two:

        * **Private** - if you are developing an app for your own RingCentral account use;

        * **Public** - if you are developing an app for many RingCentral accounts.

        Note: If you'd like to move from a private app to a public app, please email: [devsupport@ringcentral.com](mailto:devsupport@ringcentral.com).

    * **Platform Type**

        Select the application type from the list. Please take time to specify correct value as it is not editable after your app is created and affects Authorization flows available for your app.

        You can select one platform type from the list:

        * **Mobile (iOS/Android/Other)** - native and hybrid mobile apps for iOS, Android and other mobile platforms.
	
        * **Desktop (Mac/Windows/Other)** - installable desktop apps including Windows, Mac and others. This includes Chrome apps.
	
        * **Browser-based** - in-browser, client-side apps that communicate with RingCentral APIs on the client, e.g. client-side JavaScript.
	
        * **Server/Web** - web-based apps are apps that communicate with RingCentral APIs from the server, e.g. Node.js,cPHP / Laravel, Ruby on Rails, etc.
	
        * **Server/Bot** - chat bot apps built for Glip that communicate with RingCentral APIs (including Glip API) from the server side and can be running on your private or public network
	
        * **Server-only (No UI)** - if your app does not have any user interface please pick this option.

    * **Authorization Flows**

        [Authorization Flows](http://ringcentral-api-docs.readthedocs.io/en/latest/oauth/#authorization-flows) available for your app are listed here.

        Continue by clicking the 'Next' button.

5. Select the permissions useful for your app from the drop list. And if your app will use Authorization Code Flow, specify the OAuth Redirect URI. Click the 'Create' button.

      <img src="../../img/create-app-oauth-settings.png" class="img-fluid">

6. Your application is successfully created!
  
