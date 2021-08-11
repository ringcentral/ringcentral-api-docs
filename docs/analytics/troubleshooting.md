no_breadcrumb:true

# Troubleshooting the RingCentral Call Perfromance API

### I receive an error when calling the API.

The RingCentral Call Performance API is currently not available in our sandbox enviornment but only in production. Make sure you're generating access credential and calling the API's using Production Account. To gain access to production, please <a href="mailto:55172087814@44466177.mvp.ringcentral.com?subject=Help with production environment">Email Us</a> for assistance. Please include the Client ID of the app you need promoted to production so that the team can assist you more quickly.

### I hard coded my credentials, how do I secure them safely?

It’s important to keep credentials such as your RingCentral App ID and Auth token secure by storing them in a way that prevents unauthorized access. One common method is to store them in environment variables which are then accessed from your app. This keeps them out of code and other places where credentials don’t belong.

### It seems I'm missing some required parameters for making API Request.

Check the [API Reference](swagger-api-ref.html) to make sure you are not missing on any required fileds in your JSON Request Body. The API Path requires 'accountId' string value and the Request Body requires value for 'timeRange' & 'responseOptions' JSON objects.
