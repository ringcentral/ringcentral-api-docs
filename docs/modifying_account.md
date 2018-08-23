The RingCentral API allows to modify accounts. The user is able to perform the following actions:

- Activate account and change account status;

- Modify the current account info (status, partner identifier, service plan);

- Change account company address;

- Create and delete extensions.

---

**Note**

The API is accessible only when the dedicated permission "EditAccounts" is granted to the application.

---

# Change Account Company Address

It is possible to change the current account company (business) address via the following request:

```
PUT /restapi/v1.0/account/{accountId}/business-address
Authorization: Bearer OAUTH2_ACCESS_TOKEN
Content-Type: application/json
Accept: application/json
 
{
   "company": "MyCompany Inc.",
   "businessAddress": {
      "street": "1400 Fashion Island Blvd Ste 7",
      "city": "San Mateo",
      "state": "California",
      "zip": "94404"
   },
   "email": "FirstName.LastName@mycompany.com"
}
```

# Create and Delete Extensions

As an account administrator you can create, modify and delete extensions under the registered account.

This call `POST/restapi/v1.0/account/~/extension HTTP/1.1` creates a new user extension for a particular account, and assigns basic information to it. The created extension has default configuration settings, and no phone numbers or devices assigned to it. After creation, on first attempt to sign in to the Service Web, the user is presented with the initial configuration wizard, and he/she has to pass to configure extension. This behavior can be suppressed using `setupWizardState` attribute.

1. Create extension

        POST /restapi/v1.0/account/402450416008/extension HTTP/1.1
        Accept: application/json
        Authorization: Bearer UExBMDFUMDRQV1MwMXzfo8UhD6xDGwMfCPfiwcsMAvbqHg
        Content-Type: application/json
        Content-Length: 449

        {
          "extensionNumber": "104",  
          "contact": {
            "firstName": "George",
            "lastName": "Harrison",
            "company": "MyCompany Inc.",
            "email": "George.Harrison@mycompany.com",
            "businessPhone": "+16500101086"
          },
          "type": "DigitalUser",
          "status": "Enabled",
          "password": "Test!123",
          "ivrPin": "123123123",
          "regionalSettings":    {
              "language": {"id": "1033"},
              "timezone": {"id": "2"}
           },
           "partnerId": "SID00084" 
         }

        HTTP/1.1 200 OK
        Content-Type: application/json
        Content-Length: 633

        {
          "uri" : "https.../restapi/v1.0/account/402450416008/extension/402450420008",
          "id" : 402450420008,
          "partnerId" : "SID00084",
          "extensionNumber" : "104",
          "contact" : {
            "firstName" : "George",
            "lastName" : "Harrison",
            "company" : "MyCompany Inc.",
            "email" : "George.Harrison@mycompany.com",
            "businessPhone" : "+16500101086"
          },
          "name" : "George Harrison",
          "type" : "DigitalUser",
          "status" : "Enabled",
          "regionalSettings" : {
            "language" : {
              "id" : "1033"
            },
            "timezone" : {
              "id" : "2"
            }
          },
          "setupWizardState" : "NotStarted"
        }
             
After the extension is successfully created you can easily modify it, as described in the corresponding chapter, please refer to [Modifying Extension Settings](modifying_extension.md).

If the extension is not useful anymore it can be deleted completely. The deletion may preserve phone numbers associated with the deleted extension, by making them additional company numbers. Thus you can either save phone numbers or not.

2. Delete extension

        DELETE /restapi/v1.0/account/402450416008/extension/402450420008?savePhoneNumbers=true HTTP/1.1
        Accept: application/json
        Authorization: Bearer UExBMDFUMDRQV1MwMXzfo8UhD6xDGwMfCPfiwcsMAvbqHg

        HTTP/1.1 204 No Content

