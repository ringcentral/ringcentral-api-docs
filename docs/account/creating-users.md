# Creating users

Creating users within RingCentral is a common need among customers. We currently support two ways of creating users, as discussed below. 

## Creating users via the Admin Console

The most common and recommended approach for creating users is via our [Admin Console](https://service.ringcentral.com). By using our administrative console, you will be able to best control costs, as the number of users in your account may impact the pricing tier you belong to. You will also have greater control over the onboarding process for this user. You will be able to better control:

* Whether the user is sent a welcome email so that they can complete the account creation process privately and securely.
* Whether the user is provisioned a new phone or device.

Consult our knowledge base [to learn how to create a user via the RingCentral Admin Console](https://support.ringcentral.com/article/adding-mobile-user-extensions-admin-portal.html). 

## Creating users via the REST API

Creating users is, generally speaking, a highly priveleged capability since adding users may have impacts to the costs associated with your RingCentral account. For this reason, apps utilizing these endpoints must possess the "Edit Accounts" application scope. This app scope can only be provisioned by a RingCentral administrator. To request this scope be added to your application, please [submit a help ticket with our Developer Support team](https://developers.ringcentral.com/support/create-case). 

To create a user via the API, you will utilize the [Create Extension API](https://developers.ringcentral.com/api-reference/Extensions/createExtension). At a minimum, you will need to specify the following:

* the full name of the user
* email address
* a user type of `User`

### Using the extension ID

A user's extension ID is globally unique identifier for the user across all of RingCentral. Bear in mind that an "extension ID" is not the same thing as the user's "extension," which is used within our phone system when attempting to dial or call a user. Furthermore, while an extension is unique within an account, it is not a reliable way to reference a user since their value is subject to change according to your organization's wishes, but an extension ID is immutable. 

### Enabling users after they have been created

In order for an account to be fully activated, a user must select a password for themselves. This is commonly accomplished through the user onboarding process that is initiated via a welcome email that is automatically sent to the user's specified email address. However, the API can be used to bypass this process by explicitly setting the user's password and their status to `Enabled` when the user is created, or by [updating the user record](https://developers.ringcentral.com/api-reference/User-Settings/updateExtension). For example, the following shows the user object one would transmit to setup a fully enabled user in a single transaction.

```javascript
{!> code-samples/account/create-user-with-password.json !} 
```

### Setting a profile image

If possible, we recommend uploading a profile image for every user as this will create a more personable experience for everyone within RingCentral. To set a profile image, use the [Upload Profile Image API](https://developers.ringcentral.com/api-reference/User-Settings/createUserProfileImage) or [Update Profile Image API](https://developers.ringcentral.com/api-reference/User-Settings/updateUserProfileImage).

### Setting the user's name

You may notice in the definition of the user object, two different representations of a user's name. First is in the `contact` section. This contains the first name and last name as separate fields for use within your accounts user directory and facilitates finding the user via search. 

You may also see a representation of the user's name in the top-level `name` field. This is the name of the user as displayed more informally within RingCentral. For example, this is what will appear within RingCentral Video when this user joins a meeting. The value of this field is set automatically by appending the first and last name of the user, but can be overridden via [updating the user record](https://developers.ringcentral.com/api-reference/User-Settings/updateExtension).

### Example code

=== "Javascript"

    ```javascript
    {!> code-samples/account/create-user.js !} 
    ```

### Example user object

```javascript
{!> code-samples/account/user-object.json !} 
```

