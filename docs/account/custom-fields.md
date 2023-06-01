# Introduction to the Custom Fields API

## What are custom fields?

A custom field is an additional piece of information or metadata that can be associated with a RingCentral user (a.k.a. an extension). A maximum of 5 custom fields can be created and associated with a user per account. In order to use custom fields, an admin must first be [enable them for your account](https://support.ringcentral.com/s/article/11285-Configure-Custom-Fields?language=en_US).

## How can custom fields be used?

Custom fields can be used any time you need to extend the user object to store additional data relating to a user. Here are some specific use cases you may consider:

* **Advanced search.** Custom field data is searchable, so it could be a useful way to enable search to find users by their employee Id, or other information unique to your enterprise. 
* **Ad tracking**. Track and manage marketing campaigns by assigning campaign IDs to user records, and then track calls received per campaign.
* **Manage Your Organization**. Group users based on custom categories.

## Using custom fields in a federated account

Some RingCentral customers utilize a federated account model in which a single company managed multiple distinct accounts for their business. This is more common with large businesses in which there are practical or technical limitations that may exist that make managing tens of thousands of users, their extensions, and policies impractical. For businesses operating in this manner, custom fields are NOT shared across accounts and sub-accounts. If you wish to create a custom field across all accounts, then you will need to create that field independently in each. 

## How to insert and update a custom field value for a user's extension?

Once the custom fields are created developers can insert and update custom fields value for user extensions using the Update Extension API.

Only an Admin User can change and view the custom field values for other extensions. Standard users can only view custom field value on their assigned extensions.

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-update-value.py !}
    ```

## How to find and display a user's custom field values?

Once the custom field is created on a user extension, developers can use the Get Extension API to see custom field details on that extension.

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-read.py !}
    ```

**Sample response**

```json
{!> code-samples/account/custom-fields-response.json !}
```

## How to manage custom field definitions using the Custom Fields API

### How to create a custom field on all users' extensions

Developers can use this API to create a custom field on a user extension object. Maximum of 5 custom fields can be created.

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-create.py !}
    ```

=== "Raw"

    ```http
    POST /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
    Content-Type: application/json
    Content-Length: ACTUAL_CONTENT_LENGTH_HERE
    Authorization: Bearer <YOUR_ACCESS_TOKEN>

    {
       "category": "User",
       "displayName": "HRCODE-TEST3"
    }
    ```

### How to update custom field data

Developers can use this API to rename an existing custom field by specifying the custom field id in the query path parameter.

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-update.py !}
    ```

=== "Raw"

    ```http
    PUT /restapi/v1.0/account/{accountId}/custom-fields/2200033 HTTP/1.1
    Authorization: <YOUR_ACCESS_TOKEN>

    ```

### How to fetch/read custom fields

Developers can use this API to fetch all the custom fields created on a RingCentral Account.

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-list.py !}
    ```

=== "Raw"

    ```http 
    GET /restapi/v1.0/account/{accountId}/custom-fields HTTP/1.1
    Authorization: Bearer <YOUR_ACCESS_TOKEN>
    ```

### How to delete custom fields

Developers can delete one or more existing custom field by passing the custom field id in the query parameter (separate by comma in case of multiple custom fields)

=== "Python"

    ```python
    {!> code-samples/account/custom-fields-delete.py !}
    ```

=== "Raw"

    ```http
    DELETE /restapi/v1.0/account/{accountId}/custom-fields/2200033,2200589 HTTP/1.1
    Authorization: Bearer <YOUR_ACCESS_TOKEN>
    ```

