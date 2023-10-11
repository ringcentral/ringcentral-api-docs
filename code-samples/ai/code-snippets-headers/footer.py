# Instantiate the SDK and get the platform instance
rcsdk = SDK("PRODUCTION-APP-CLIENTID", "PRODUCTION-APP-CLIENTSECRET", "https://platform.ringcentral.com")
platform = rcsdk.platform()

login()
