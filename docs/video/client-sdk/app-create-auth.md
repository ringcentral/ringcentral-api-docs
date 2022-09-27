no_breadcrumb:true


## Create Application using PasswordFlow Authentication

1. Login to [RingCentral Developer Console](https://developers.ringcentral.com) to create a new application. If you already have an existing application with "Meetings" permission and "password flow" authentication in "Production", skip to the last. 

  - Click `CreateApp` button.

  - For `App Type`, select `REST API App`, then click `Next`.

  - Fill out all the required fields and under `Auth` section, select  `Password-based auth flow`

  - Under `Security -> App Permissions` section, select `Meetings` along with any other permission that your app may need.

  - Finally when done, click `Create`.

  - Navigate to `Apps -> Your App -> Credentials` and note the following under `Production Enviornment`. We will need these for the next step.
    - Client ID
    - Client Secret
    - Username
    - Password
    - Extension

### Getting Access Token

Now that you have your application created, we will use the Production Credential for your application and your developer account to generate access token for the user.

### Sample HTTP Request

```bash
POST /restapi/oauth/token HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==

grant_type=password&username=18559100010&extension=101&password=121212
```

### Sample HTTP Response:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
    "access_token" : "U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw",
    "token_type" : "bearer",
    "expires_in" : 7199,
    "refresh_token" : "U1BCMDFUMDRKV1MwMXxzLFL4ec6A0XMsUv9wLriecyxS_w",
    "refresh_token_expires_in" : 604799,
    "owner_id" : "256440016"
}
```
### Node.JS Example to obtain access token

```js

  const SDK = require('@ringcentral/sdk').SDK;

  const rcsdk = new SDK({
      server: SDK.server.sandbox,
      clientId: 'yourClientId',
      clientSecret: 'yourClientSecret',
      redirectUri: '' // optional, but is required for Implicit Grant and Authorization Code OAuth Flows (see below)
  });
  rcsdk
      .login({
          username: 'your email address',
          extension: '', // leave blank if there is no extension
          password: 'yourpassword'
      })
      .then(function(response) {
            // get access token
      })
      .catch(function(e) {
          alert(e.message  || 'Server cannot authorize user');
      });
```

### Java Example to obtain auth token
```java
  private String getToken() throws Exception {
    initCredentials();
    RestClient rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);
    TokenInfo token = rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
    System.out.println(token.access_token);
    return token.access_token;
  }
```

 
### Generate & Obtain Access Token manually

1. Now we will generate the `access token` that you will need to enter in your Application Code as a way to authenticate against RingCentral Platform. We will do this by using a popular open source tool, tool. If you don't have CURL on your machine, you need to [install it.](https://curl.se/download.html)

- First we need to encode the Client ID and Secret of your Application obtain in previous section to base 64 format. To do the same open [https://www.base64decode.org](https://www.base64decode.org). Under "Encode to Base64 format" heading, paste using the following format `<Client ID>:<Client Secret>`. Make sure there is no extra space anywhere including between Client ID and Client Secret. Click `Encode` and copy the encoded string.

- Open your command line and paste the lines from below to form a CURL request. Here make sure to fill out the fields:

  - Base 64 encoded string for the header generated using the step above

  - RingCentral Production credentials - username (email address)

  - RingCentral Developer Production credential - password

  - RingCentral Developer Production - extension (optional)

### Get Access Token

Paste the curl request below and fill out the information in the lines higlighted below, then execute the CURL command.

  ```bash hl_lines="2 5"
    $ curl --location --request POST 'https://platform.ringcentral.com/restapi/oauth/token' \
           --header 'Authorization: Basic <Base 64 encoded string>' \
           --header 'Accept: application/json' \
           --header 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8' \
           --data-urlencode 'grant_type=password&username=18559100010&extension=101&password=121212' \
  ```

### Copy the aceess token after successful CURL HTTP Response

You should get a HTTP 200 Response that looks something like what is seen in the example below (confidential information not shown)

  ```json hl_lines="2 4"
    {
      "access_token" : "<your access token>",
      "token_type" : "bearer",
      "expires_in" : 3600,
      "refresh_token" : "<your access token>",
      "refresh_token_expires_in" : 604800,
      "scope" : "Meetings",
      "owner_id" : "<owner id>",
      "endpoint_id" : "<endpoint id>"
    } 
  ```        

##### Here "your access token" is the string you will need to enter so navigate back to [Android](android.md) or [iOS](ios.md) guide in order to complete the steps and successfully make RingCentral Video SDK API calls.

 Note: The access token in this example is set to expire in 3600 seconds or 60 minutes. You will need to write additional code in your application in order to renew the access or refresh token. More information about the same can be found in the [Authentication Guide.](https://developers.ringcentral.com/guide/authentication/tokens)