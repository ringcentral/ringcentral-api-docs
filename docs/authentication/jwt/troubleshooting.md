# Troubleshooting JWT authentication
    
### Sandbox versus Production
	
A JWT credential is associated with a specific environment. A JWT created for the sandbox environment cannot be used in production, and vice-versa. Make sure you are using the right credential in the right environment.
    
### JWT tokens are NOT presented in an HTTP Authorization header
	
A JWT is not itself a way to authenticate to the API. Instead, JWT credentials are used to create access tokens. Only access tokens can be used in an HTTP Authorization header to authenticate with an API.
    
### Setting the right access for a JWT
	
For heightened security, JWTs can be restricted to be used by a select group of apps. This is especially useful when you wish to exchange your JWT with a third-party. However, if you intend a JWT to be used exclusively to call apps within your own organization, we recommend selecting the access option of, "All apps belonging to my organization."
    
### JWTs and auth expiration
	
The expiration of a JWT credential should not be confused with the expiration of the access token that a JWT helps create. A JWT can be optionally configured to never expire. However, the same is not true for access tokens. Access tokens will always expire eventually. When that happens, a JWT can be used to quickly and easily generate a new access token to call the API. 

