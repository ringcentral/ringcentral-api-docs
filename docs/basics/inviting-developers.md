# Collaborating with other developers

Depending on the app you are building, or the size of your company, you may need to work with other developers or technical associates to help with the production, testing and/or deployment of your app. To do this, you will need to add developers to your account so that everyone can have access to the same apps, credentials, analytics and resources. 

## How to add a developer to your RingCentral Developer account?

### Free developer accounts

If you are using a free developer account, then you can invite a new developer to your account by following these steps:

1. Login to the RingCentral Developer Console. 
2. Click the "Organization" tab in the left-hand menu.
   <img class="img-fluid" src="../collab-free-dev-list.png">
3. Click the "Invite new developer" button and fill out the form. 
   <img class="img-fluid" src="../collab-invite-dev.png">

When complete, the developer you invited will receive an email asking them to accept the invitation. When they accept, they will select a password for themselves and automatically be added to your account. 

### Paying-customer developer accounts

If you are a paying customer, then there is a slightly different process since access to the Developer Console is based on your own company's roles, permissions and policies. Here is what you need to do to grant a coworker of yours access to the Developer Console. 

First, the developer you wish to invite needs to be registered as a user in your account via the RingCentral Admin Console. This can be done by navigating to the "Users" tab, and clicking the "Add User" button as shown below. 

<img class="img-fluid" src="../collab-invite-user.png">

Add the user following the on-screen instructions if the user you wish to invite does not already have an account. 

Next, you will need to make sure the role they are assigned in the RingCentral Admin Console has the "Developer Portal Access" permission. This will allow them to login to the Developer Console. Look for this permission under the "Features" permission group. 

<img class="img-fluid" src="../collab-roles.png">

And that's it. This user is now free to login to the Developer Console. They will not receive an email as they are not being "invited" in the classic sense. If they have a RingCentral account, and their admin allows for it, they will simply be able to login. 

## What roles can developers have in my account?

Once a developer account has been added to the system after they login for the first time, admins can assign any of the following roles to them.

| Role            | Description                                             |
|-----------------|---------------------------------------------------------|
| Developer Admin | This user is permitted to manage any app, manage developers, and manage developer JWT credentials. |
| Developer       | This user is permitted to manage apps they create only, and manage their own personal JWT credentials. |
| Audit-user      | This user is permitted to view apps and profiles only.  |

