# Client Credentials Authorization Flow

This authorization flow is mostly used by RingCentral partner applications which need to create RingCentral user accounts and control their lifecycle without providing credentials of these users. This flow uses Client Credentials OAuth grant type and, in fact, unlike other described flows authorizes only the application.

!!! alert "FYI"
    Since no user authorization is performed this flow is allowed for use only by trusted RingCentral partner applications.

    There are two types of partner authorization sessions: initial signup session (not connected to any specific RingCentral user account) and account-centric session (connected to certain RingCentral user account), which are initialized differently and have some limitations. Let's consider both sessions below.

## Signup Session

When the client needs to initiate creation of accounts by itself, the initial signup session is applied. It is the starting point for the client application when the user does not have any account. The access token obtained through this session allows the user to look up and reserve phone numbers and to read common dictionaries (countries, states, locations, timezones). Then the user can create an account with the reserved number.

The new application can be authenticated via the general authentication request by passing the following parameters:

* application credentials, provided by RingCentral in Basic Authorization header;
* `grant_type = client credentials`;
* `brand_id` - constant value, provided by RingCentral.
    
```http
POST /restapi/oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0
Accept: application/json

access_token_ttl=7200&grant_type=client_credentials&brand_id=1234
```
				
In response, the server returns the access token which serves for authorization in subsequent requests. Each access token has a limited lifetime which is returned in response alongside with the token itself.
	
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "access_token" : "UExBMDFUMDRQV1MwMXzROYH78MeLmsvo8Li9rA2_AY6YPw",
   "token_type" : "bearer",
   "expires_in" : 3599,
   "scope" : "EditExtensions ReadAccounts EditAccounts Accounts NumberLookup"
}
```

!!! alert "FYI"
    If you try to access any account related data through API with signup session token, you'll get the `401 Unauthorized` error. In order to work with the newly created account further, the client application needs to request another access token, see the next section.
	
## Account-Centric Session

Account-centric session should be established when the application user already has an active account. This session requires the access token which is issued to work with a particular account.

To continue working with the existing account the client application has to request another access token by passing the following parameters:

-  application credentials, provided by RingCentral in Basic Authorization header;
- `grant_type = client credentials`;
- `account_id` – RingCentral internal account id (alternatively a pair `brand_id`/`partner_account_id` can be used)
- `brand_id` – constant value provided by RingCentral
- `partner_account_id` – specific identifier of account designed and stored by the partner
    
```http
POST /restapi/oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0 
Accept: application/json

partner_account_id=BAN0009&access_token_ttl=7200&grant_type=client_credentials&brand_id=1234
```
		
In case of successful authentication the RingCentral API returns the new access token. This access token is tied to a specific account and may only be used to access account-related APIs for the specific account or to access non-account APIs.
    
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "access_token" : "UExBMDFUMDRQV1MwMXyr1gnxGh-egGk5mUfgpMpNmdSGKQ",
   "token_type" : "bearer",
   "expires_in" : 3599,
   "scope" : "EditExtensions ReadAccounts EditAccounts..."
}
```

!!! warning "Attempt to access any other account with this access token will result in the `401 Unauthorized` error message."
