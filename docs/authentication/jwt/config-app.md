# Configuring apps to use JWT

To use a JWT, the app you wish to present your JWT credentials to must first be configured to accept JWT tokens as a means of authentication. To configure an app for JWT authentication, follow these steps:

1. Login to the [RingCentral Developer Console](https://developers.ringcentral.com/my-account.html). 
2. Select "Apps" from the left-hand navigation.
3. Click "Create App."
4. Select the "REST API App" app type, and click Next.
5. Under the "Auth" section of the subsequent screen, select "JWT auth flow."
6. Save and create the app.

<img src="../../jwt-auth-config.png" class="img-fluid" style="max-width:500px">

## How do I create a JWT for an app?

A common misunderstanding is that one needs to generate a JWT for an app. That is true in a way, but JWTs are not directly associated with an app. Instead, JWTs are associated with users. That way, when a JWT is presented to an app, the platform has a way to evaluate whether the credentials used to make the API call possess the permission to perform that action. 

Therefore, to [create a JWT](../../../getting-started/create-credential/) start by logging into the Developer Console, clicking your name in the upper-righthand corner, and selecting "Credentials."

<img src="../../jwt-credentials-menu.png" class="img-fluid" style="max-width:300px">
