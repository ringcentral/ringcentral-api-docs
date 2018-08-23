The RingCentral API allows to modify extensions. The user can modify extension information (status, contact information, password/PIN, partnerId) and permissions.

---

**Note**

The API is accessible only when the dedicated permission "EditExtensions" is granted to the application.

---

It is possible to change extension settings via the request:

    PUT/restapi/v1.0/account/{accountId}/extension/{extensionId} HTTP/1.1

For example, changing extension user **contact information** and **regional settings**:

```
PUT /restapi/v1.0/account/402186908008/extension/402186908008 HTTP/1.1
Accept: application/json
Authorization: Bearer UExBMDFUMDRQV1MwMXwDgCrKBsFtC3MZMUR9MaDIFOZ7fQ
Content-Type: application/json
Content-Length: 553

{
   "contact":    {
      "firstName": "Louis",
      "lastName": "Smith",
      "company": "MyCompany Inc.",
      "email": "louis.smith@mycompany.com",
      "businessPhone": "+16502091086",
      "businessAddress": {
         "street": "1400 Fashion Island Blvd Ste 7",
         "city": "San Mateo",
         "state": "California",
         "country": "US",
         "zip": "94404"
      }
   },      
   "regionalSettings":    {
      "language": {"id": "1033" },
      "timezone": {"id": "2"}
   },

  "setupWizardState" : "Incomplete"

}
```
