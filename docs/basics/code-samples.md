# Running code samples in the Developer Guide

??? hint "About RingCentral code samples and environment variables"
    To help developers make use of the many code samples found throughout this Developer Guide, each code sample is designed around the same usage pattern familiar to many developers. Commonly used variables, like your RingCentral application client ID, secret key, server URL and more, are collected together and placed in a config file, that is then loaded into your local environment upon script execution. 
    
    This is helpful as developers should know because it keeps your code separate from the preferences ands data that govern your code's behavior. This is how most modern CI/CD system are architected today, and makes it much easier for developers to containerize their code.

## Creating a JWT credential

All code samples within the RingCentral Developer Guide utilize JWT authentication, which requires developers to first create a JWT credential. A JWT auth works similarly to username and password auth by following the same basic sequence of calls:

* Developer presents JWT credential to `/restapi/oauth/token`
* RingCentral responds with an access token
* Developer presents access token in HTTP Authorization header to call the API

To execute code samples in the Developer Guide, please [create a JWT credential](../getting-started/create-credential.md) now. 

## Your RingCentral .env file

Each code sample found within this Developer Guide is designed to use the variables found within a `.env` file to properly configure itself to run. 

To begin, copy the contents of the file below and save it to your local development machine in a file named `.env`. Be sure to place that file within the same directory you will be running your test scripts from. Finally, edit the `.env` file to set the values of its variables accordingly.

```sh
{!> code-samples/env-template !} 
```

Finally, run your code sample from the command line as you would normally. The script should read in the values from this file, and set all the local configuration properties accordingly.

!!! tip ".env file security"
    Your `.env` files contain sensitive information. Here are some tips to help keep them secure. 
    * **Keep `.env` files out of source control.** Don't check in .env files to source control. Consider using a vault instead, and add `.env` files to your `.git-ignore` (or equivalent) file. 
    * **Don't make `.env` files web-accessible.** Do not deploy your .env file to a directory that is accessible via http. Keep these files out of your web root folder. 	



