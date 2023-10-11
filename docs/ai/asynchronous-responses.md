# Handling asynchronous responses from the Artificial Intelligence API

The Artificial Intelligence API operates in an asynchronous manner. Meaning the results of its operations are not returned in the HTTP response associated with the HTTP request performing the operation. Instead, developers specify a URL in their request, and when the operation completes, the response payload will be posted to the specified URL.

Th asynchronous nature of the Artificial Intelligence API requires developers to setup a simple web server in order to process results and run sample code found in this Developer Guide. Below, you will find simple web servers in a variety of languages to help you in this process.

## Passing the `webhook` parameter in your requests

Many endpoints in the Artificial Intelligence API take as input a query parameter called `webhook`. When you pass a URL to the API via this query parameter, the server will then transmit the results of the corresponding operation to the provided URL when the operation completes. This will allow the server to process the operation in the background without tying up resources in the process.

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
    "jobId": "a919924e-ce4e-11ed-xxxx-0050568c48bc",
    "creationTime": "2023-04-04T21:20:20.246Z",
    "expirationTime": "2023-04-11T21:20:20.246Z",
    "status": "InProgress"
}
```

Once the AI API job request is completed, using this API command will return the results of your AI API request.

## Working with asynchronous responses in development

### Install and setup ngrok

If you are doing development on your local laptop, or on a machine that is not publicly accessible on the Internet, then we recommend you download and install [ngrok](https://ngrok.com/download) if you have not already. Once installed, start your ngrok server and make note of its https URL. You will need to use this URL later when specifying the `webhook` in Artificial Intelligence API requests.

```bash
$ ngrok http 8080
  Forwarding https://xxx-yyy-zzz.ngrok.io -> http://localhost:8080
```

### Create and start a simple web server

Let's create a simple web server on your local machine to receive `webhook` notifications when your Artificial Intelligence API file is processed and ready to be recevied.

=== "Javascript"

    Create a file called `server.js` using the contents below. Edit `server.js` to properly reference the `NGROK_URL` generated in the previous step.

    ```js
    {!> code-samples/ai/server.js !}
    ```

    Finally, start your server.

    ```bash
    $ node server.js
    ```

=== "Python"

    Create a file called `server.py` using the contents below. Edit `server.py` to properly reference the `NGROK_URL` generated in the previous step.

    ```python
    {!> code-samples/ai/server.py !}
    ```

    Finally, start your server.

    ```bash
    $ python server.py
    ```

With your web server up and running, and a way to route requests to it via ngrok, you are now ready to run code samples.
