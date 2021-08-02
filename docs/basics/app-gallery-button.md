# Build an App Gallery button

To help our partners promote the app they build to their customers, and to help those customers find and install their app successfully, we make available a simple "Get in the App Gallery" button. 

<img src="../app-gallery-button/png/2x/ag-button@2x.png">

## Constructing a link to the App Gallery

At a very minimum, this button can simply point to your RingCentral App Gallery profile. However, you can also format the link and pass query parameters to affect the behavior of the link to achieve your desired result. 

### Building the base URL

The base URL of the link should be in the following format:

`https://www.ringcentral.com/apps/<APP ID>`

The URL above will exhibit the following behaviors:

1. It will prompt the user to login.
2. Upon successfully logging in, it will direct the user to the app associated with their partner, e.g. AT&T, Avaya, Verizon, and others. 
3. It will autodetect the user's platform, e.g. iOS, Android, Windows and MacOS, and direct them to corresponding download option.

### Triggering the app download automatically

If you would like to trigger the download of your application automatically and immediately upon a user loading the page, then add `auto_download=true` as a query parameter. For example:

`https://www.ringcentral.com/apps/<APP ID>?auto_download=true`

## Button assets

* [SVG](../app-gallery-button/svg/ag-button.svg)
* [PNG 1x](../app-gallery-button/png/1x/ag-button.png)
* [PNG 2x](../app-gallery-button/png/2x/ag-button@2x.png)

## Icon assets

* [SVG](../app-gallery-button/svg/app-icon.svg)
* [PNG 1x](../app-gallery-button/png/1x/app-icon.png)
* [PNG 2x](../app-gallery-button/png/2x/app-icon@2x.png)

