# Instantiate the SDK and get the platform instance
rcsdk = SDK("SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com")
platform = rcsdk.platform()

login()

# For the purpose of testing the code, we put the recipient number in the variable.
# Feel free to set the recipient number directly.
RECIPIENT = "RECIPIENT-PHONE-NUMBER"
####################################
