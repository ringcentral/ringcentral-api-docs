# Instantiate the SDK and get the platform instance
rcsdk = SDK("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com")
platform = rcsdk.platform()

login()
