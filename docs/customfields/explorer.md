# Exploring Custom Fields API


## Create custom fields on User Extension

Developers can use this API to create a custom field on a user extension object. Maximum of 5 custom fields can be created.


```HTTP tab="Raw"
POST /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
Content-Type: application/json
Content-Length: ACTUAL_CONTENT_LENGTH_HERE
Authorization: <YOUR_ACCESS_TOKEN>

{  
   "category": "User",
   "displayName": "HRCODE-TEST3"
}
```

```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

#POST Body
       body ={
            "category": "User",
            "displayName": "HRCODE-TEST3"
             }
       try:

           response =  platform.post('/account/~/custom-fields', body)
           print("Custom Field Created")

       except ApiException as e:
           print("Error while creating custom fields" + e)

```


## Fetch Custom fields

Developers can use this API to fetch all the custom fields created on a RingCentral Account.

```HTTP tab="Raw"
GET /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
Authorization: <YOUR_ACCESS_TOKEN>

```


```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

response = platform.get('/account/~/custom-fields')
        custom_fields = response.json()
        try:
         for x in range(len(custom_fields.records)):
             print('Display Name- ' + custom_fields.records[x].displayName + ' id- ' +custom_fields.records[x].id + ' Category- '+custom_fields.records[x].category + '\n' )

           #print(custom_fields.records)
        except ApiException as e:
         print("Error while fetching custom fields" + e)

```

## Update Custom fields

Developers can use this API to rename an existing custom field by specifying the custom field id in the query path parameter.

```HTTP tab="Raw"
PUT /restapi/v1.0/account/{accountId}/custom-fields/2200033 HTTP/1.1
Authorization: <YOUR_ACCESS_TOKEN>

```

```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

#POST Body
        body ={
                "displayName": "HRCODE"
              }
        try:

            response =  platform.put('/account/~/custom-fields/{}'.format(id), body)
            print(response.json().displayName)
        except ApiException as e:
            print("Error while creating custom fields" + e)

```

## Delete Custom fields

Developers can delete one or more existing custom field by passing the custom field id in the query parameter (separate by comma in case of multiple custom fields)


```HTTP tab="Raw"
DELETE /restapi/v1.0/account/{accountId}/custom-fields/2200033, 2200589 HTTP/1.1
Authorization: <YOUR_ACCESS_TOKEN>

```

```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

try:


            response =  platform.delete('/account/~/custom-fields/{}'.format(id))

            print("Deleted")
            print("Custom Field Deleted")
        except ApiException as e:
            print("Error while creating custom fields" + e)

```
