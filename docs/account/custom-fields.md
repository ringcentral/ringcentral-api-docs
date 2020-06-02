# Introduction to the Custom Fields API

## What are custom fields?

A custom field is an additional piece of information or metadata that can be associated with a RingCentral user (a.k.a. an extension). A maximum of 5 custom fields can be created and associated with a user. In order to use custom fields, an admin must first be [enable them for your account](https://support.ringcentral.com/s/article/11285-Configure-Custom-Fields?language=en_US).

## How can custom fields be used?

Custom fields can be used any time you need to extend the user object to store additional data relating to a user. Here are some specific use cases you may consider:

* **Advanced search.** Custom field data is searchable, so it could be a useful way to enable search to find users by their employee Id, or other information unique to your enterprise. 
* **Ad tracking**. Track and manage marketing campaigns by assigning campaign IDs to user records, and then track calls received per campaign.
* **Organization**. Group users based on custom categories.

## What is the Custom Fields API?

The Custom Fields API is a REST-based interface that enables developers to create, update, delete and fetch custom fields programatically.
  
## Explore Custom Fields API sample code

### Create custom fields on User Extension

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


### Fetch Custom fields

Developers can use this API to fetch all the custom fields created on a RingCentral Account.

```http tab="Raw"
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
    except ApiException as e:
        print("Error while fetching custom fields" + e)
        
```

### Update Custom fields

Developers can use this API to rename an existing custom field by specifying the custom field id in the query path parameter.

```http tab="Raw"
PUT /restapi/v1.0/account/{accountId}/custom-fields/2200033 HTTP/1.1
Authorization: <YOUR_ACCESS_TOKEN>

```

```python tab="Python"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException

sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

body ={
    "displayName": "HRCODE"
    }

try:
    response =  platform.put('/account/~/custom-fields/{}'.format(id), body)
    print(response.json().displayName)
except ApiException as e:
    print("Error while creating custom fields" + e)
```

### Delete Custom fields

Developers can delete one or more existing custom field by passing the custom field id in the query parameter (separate by comma in case of multiple custom fields)

```http tab="Raw"
DELETE /restapi/v1.0/account/{accountId}/custom-fields/2200033,2200589 HTTP/1.1
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

## How to insert and update the Custom fields Value for User Extensions?
Once the custom fields are created developers can insert and update custom fields value for user extensions using the Update Extension API.
Only an Admin User can change and view the custom field values for other extensions. Standard users can only view custom field value on their assigned extensions.

```python tab="Python"
from __future__ import print_function

from ringcentral.http.api_exception import ApiException
from ringcentral import SDK
from config import USERNAME, EXTENSION, PASSWORD, APP_KEY, APP_SECRET, SERVER
sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)
 
         #POST Body
        body =  {
                   "customFields": [
                       {
                         "id":"64016",
                          "value":"Test for Update"
                       }
                                  ]
                }
        try:
            response =  platform.put('/account/~/extension/~', body)
            user = response.json()
            print('Custom Field value updated for Custom Field id 64016')
            for x in user.customFields:
                 print('Custom Field Display Name -'+ x.displayName +  ' |  Custom Field Value - ' + x.value + ' | id - ' +  x.id)

        except ApiException as e:
            print("Error while updatibg custom field value" + e)
``` 
## How to find the Custom fields Value from User Extensions?

Once the custom field is created on a user extension, developers can use the Get Extension API to see custom field details on that extension


```python tab="Python"
from __future__ import print_function

from ringcentral.http.api_exception import ApiException
from ringcentral import SDK
from config import USERNAME, EXTENSION, PASSWORD, APP_KEY, APP_SECRET, SERVER
sdk = SDK(APP_KEY, APP_SECRET, SERVER)
platform = sdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)
        try:
            response = platform.get('/account/~/extension/~')
            user = response.json()
            for x in user.customFields:
                 print(x.value)
      
       except ApiException as e:
            print("Error fetching Custom Fields" + e)

```
