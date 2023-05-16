# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( "PRODUCTION-APP-CLIENTID", "PRODUCTION-APP-CLIENTSECRET", "https://platform.ringcentral.com" )

login()

# For the purpose of testing the code, we put the recipient number in the variable.
# Feel free to set the recipient number directly.
RECIPIENT = "RECIPIENT-PHONE-NUMBER"
####################################
