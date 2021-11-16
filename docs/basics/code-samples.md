# Running code samples in the Developer Guide

??? hint "About RingCentral code samples and environment variables"
    To help developers make use of the many code samples found throughout this Developer Guide, each code sample is designed around the same usage pattern familiar to many developers. Commonly used variables, like your RingCentral application client ID, secret key, server URL and more, are collected together and placed in a config file, that is then loaded into your local environment upon script execution. 
    
    This is helpful as developers should know because it keeps your code separate from the preferences ands data that govern your code's behavior. This is how most modern CI/CD system are architected today, and makes it much easier for developers to containerize their code.

## Your RingCentral .env file

Each code sample found within this Developer Guide is designed to use the variables found within a `.env` file to properly configure itself to run. 

To begin, copy the contents of the file below and save it to your local development machine in a file named `.env`. Be sure to place that file within the same directory you will be running your test scripts from. Finally, edit the `.env` file to set the values of its variables accordingly.

```sh
{!> code-samples/env-template !} 
```

Finally, run your code sample from the command line as you would normally. The script should read in the values from this file, and set all the local configuration properties accordingly.
