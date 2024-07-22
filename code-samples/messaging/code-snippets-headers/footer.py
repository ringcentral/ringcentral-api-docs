# Instantiate the SDK and get the platform instance
rcsdk = SDK("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com")
platform = rcsdk.platform()

login()

# For the purpose of testing the code, we put the recipient number in the variable.
# Feel free to set the recipient number directly.
RECIPIENT = "RECIPIENT-PHONE-NUMBER"
####################################
