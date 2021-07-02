# Automating notification app installation

To provide users of the RingCentral desktop app with the best possible experience to install your app, developers can optionally implement a web-based user interface that facilitates the installation process. This often includes the following:

1. Authenticate the user with the target service
2. Allow the user to elect what notifications they would like to subscribe to
3. Install the generated webhook URL into the target service

!!! warn "Third-party service prerequisites"

    To create a simple form to automate the setup of a notification app, the target third-party service in question must support the following:
    
    * OAuth for user authentication and authorization.
    * An API for creating, updating and deleting webhooks.

## Providing an fully-integrated experience

The installation process you implement will be delivered as a simple web app, and will be rendered to the user during the installation flow via an iframe. 

**iFrame dimensions**
| Width | Height |
|-|-|
| 570px | 260px |

### Design and Development Guidelines

To accomplish the above, developers need to create what amounts to a mini-web application. This web app will then be embedded into the install flow via an iFrame. We recommend developers adhere to the following guidelines when building this app.

* Present only a simple form. Try to minimize or suppress entirely branding and other UI-elements that might distract the user from completing the installation process.
* Do not display a submit button. The submission of your form will be triggered via a javascript callback. You should not display a button to submit your form.
* Limit your app to a single screen. Other than the step in which you present the user with a button to login, limit your setup form to a single page.
