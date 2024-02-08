# Instantiate the SDK and get the platform instance
rcsdk = SDK("SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com")
platform = rcsdk.platform()

login()
