# Handling asynchronous responses from the Artificial Intelligence API

The Artificial Intelligence API operates in an asynchronous manner. Meaning the results of its operations are not returned in the HTTP response associated with the HTTP request performing the operation. Instead, developers specify a URL in their request, and when the operation completes, the response payload will be posted to the specified URL.

Th asynchronous nature of the Artificial Intelligence API requires developers to setup a simple web server in order to process results and run sample code found in this Developer Guide. Below, you will find simple web servers in a variety of languages to help you in this process.

## Passing the `webhook` parameter in your requests

Asynchronous endpoints in the Artificial Intelligence API set require a query parameter named `webhook`. When you pass a URL to the API via this query parameter, the server will then post the results of the corresponding asynchronous API call to the provided URL when the operation completes. This will allow the server to process the operation in the background without tying up resources in the process.

The server will not validate the webhook URL. It's the developer responsibility to make sure that the webhook URL is valid and publicly accessible.

### Correlating requests and responses

When processing files asynchronously, it is important to correlate every request with the proper response, as there is no guarantee in which order a response will be received. To help with this, a `jobId` is returned in the response body of every request, like so:

```json
{"jobId":"a919924e-ce4e-11ed-xxxx-0050568c48bc"}
```

You should parse this response, and store the `jobId` associated with the media file being processed so that you can reliably associate the response that will be delivered in a `webhook` later to the file for which it pertains.

!!! note "Job IDs expire after 1 week"
    The job ID returned in the response above only lasts for one week. To know the exact expiration time for the job, please use the GET `jobs` API below and look for the `expirationTime`.

### Check on the status of your AI API job request

Upon submitting your AI API job request, a `jobId` is sent in the response as mentioned above. With this `jobId`, you can check on the progress of your AI API job request as follows:

```html
GET /ai/status/v1/jobs/{jobId}
```

This will return a JSON response to show some details on your AI API job request:

```json
{
    "jobId": "80800e1a-a663-11ee-b548-0050568ccd07",
    "api": "/ai/insights/v1/async/analyze-interaction",
    "creationTime": "2023-12-29T16:01:18.558Z",
    "expirationTime": "2024-01-05T16:01:18.558Z",
    "status": "InProgress"
}
```

Once the AI API job request is completed, using this API command will return the results of your AI API request.

```json
{
    "jobId": "80800e1a-a663-11ee-b548-0050568ccd07",
    "api": "/ai/insights/v1/async/analyze-interaction",
    "creationTime": "2023-12-29T16:01:18.558Z",
    "completionTime": "2023-12-29T16:01:29.217Z",
    "expirationTime": "2024-01-05T16:01:18.558Z",
    "status": "Success",
    "response": {}
}
```

## Working with asynchronous responses in development

### Install and setup ngrok

If you are doing development on your local computer, or on a machine that is not publicly accessible on the Internet, then we recommend you download and install [ngrok](https://ngrok.com/download) if you have not done so. Once installed, start your ngrok server and make note of its https URL. You will need to use this URL later when specifying the webhook callback address in Artificial Intelligence API requests.


```bash
$ ngrok http 3000
  Forwarding https://xxxx-73-170-11-87.ngrok-free.app -> http://localhost:3000
```

### Create and start a simple web server

Let's create a simple web server on your local machine to receive `webhook` notifications when your Artificial Intelligence API file is processed and ready to be received.

=== "Javascript"

    Create a file called `server.js` using the contents below. Set the PORT to the same port number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.js !}
    ```

    Finally, start your server.

    ```bash
    $ node server.js
    ```

=== "Python"

    Create a file called `server.py` using the contents below. Set the PORT to the same PORT number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.py !}
    ```

    Finally, start your server.

    ```bash
    $ python server.py
    ```

=== "PHP"

    Create a folder named `webhook` and navigate to the new folder then create a file called `server.php` using the contents below.

    ```js
    {!> code-samples/ai/server.php !}
    ```

    Finally, start your server.

    ```bash
    php -S localhost:3000
    ```

=== "Ruby"

    First, install the prerequisites.

    ```bash
    $ pip install sinatra
    ```

    #### Create and edit `server.rb`

    Create a file called `server.rb` using the contents below. Set the PORT to the same PORT number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.rb !}
    ```

    #### Run your code

    Finally, start your server.

    ```bash
    $ ruby server.rb
    ```

=== "C#"

    We use .NET core which is cross-platform. You can get it [here](https://dotnet.microsoft.com/download).

    ### Create a Web server solution

    ```bash
    mkdir server
    cd server
    dotnet new web
    dotnet add package Newtonsoft.Json
    ```

    Edit the `Startup.cs` file and override its content with code below:

    ```c#
    {!> code-samples/ai/server/Startup.cs !}
    ```

    #### Run the server code

    The default port is 5000 and it is set in the `launchSettings.json` file under the `server/Properties` folder. Open the file and change the port number to match the opening port for the ngrok tunnel. E.g.

    ```JSON
    "applicationUrl": "https://localhost:3001;http://localhost:3000"
    ```

    Finally, start your server. At the server terminal, run:

    ```bash
    dotnet run
    ```

=== "Java"

    ### Create a WebhookServer project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "AIServer"
    * Open the <tt>build.gradle</tt> file and add the dependencies to the project as shown below:
    ```json
    dependencies {
        // ...
        implementation 'org.eclipse.jetty.aggregate:jetty-all:9.4.51.v20230217'
        implementation: 'javax.servlet:javax.servlet-api:4.0.1'
    }
    ```
    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    We use jetty-all version 9.4.x for our server. You can get a different version [here](https://mvnrepository.com/artifact/org.eclipse.jetty.aggregate/jetty-all) if you want to.

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "WebhookServer"

    Edit the `WebhookServer.java` with code below:

    ```Java
    {!> code-samples/ai/WebhookServer.java !}
    ```

    Build and run the app from Eclipse.

With your web server up and running, and a way to route requests to it via ngrok, you are now ready to run code samples.
