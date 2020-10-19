# Sending Faxes

Faxes remain a key way in which many business and industries share and transmit documents, and is another type of message that can be sent using the RingCentral SMS and Fax API. Using this API, developers can send one or more documents at a time to a single recipient. This for example makes it possible for a developer to attach and transmit a cover page that is stored independently from the core document being transmitted.

The Fax API is different from other RingCentral APIs in that it packages the message and each document as a separate MIME attachment. The root attachment is the main API message that identifies the recipient of the fax. Subsequent attachments are the documents to be transmitted in sequence. A typical call to the Fax API therefore follows this format:

1. Body of the Request
2. Cover Page
3. Main Document

## Attaching Documents

Documents being sent via fax can reside on the server's file system and be attached as a local file. For example, in Javascript you can attach a local file in the following manner:

```javascript
form = new FormData();
form.append('fax-document-1', require('fs').createReadStream('test.jpg'));
```

For larger files, it may be more economical to stream the file via a URL:

```javascript
var form = new FormData();
http.request('https://www.ringcentral.com/content/dam/rc-2018/en_us/images/logo.jpg', function(response) {
  form.append('fax-document-1', response);
});
```

Bear in mind of course that each language will utilize different libraries and capabilities with regards to creating MIME attachments.

## Code Samples

The following code samples show how to send a simple single document fax.

=== "JavaScript"
    ```javascript
    const RC = require('@ringcentral/sdk').SDK

    RECIPIENT = '<ENTER FAX NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    var rcsdk = new RC( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
    var platform = rcsdk.platform();

    platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )

    platform.on(platform.events.loginSuccess, function(e){
      send_fax()
    });

    async function send_fax() {
      var FormData = require('form-data');
      formData = new FormData();
      var body = {
        to: [{'phoneNumber': RECIPIENT}],
        faxResolution: 'High',
        coverPageText: "This is a demo Fax page from Node JS"
      }

      formData.append('json', new Buffer(JSON.stringify(body)), {
        filename: 'request.json',
        contentType: 'application/json'
      });

      formData.append('attachment', require('fs').createReadStream('test.jpg'));

      var resp = await platform.post('/account/~/extension/~/fax', formData)
      var jsonObj = await resp.json()
      console.log("FAX sent. Message status: " + jsonObj.messageStatus)
      } catch(e) {
        console.log(e.message)
      }
    }
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

    $RECIPIENT = '<ENTER FAX NUMBER>'

    $RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    $RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    $RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    $RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    $RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    $RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    $rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

    $platform = $rcsdk->platform();
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

    $request = $rcsdk->createMultipartBuilder()
    ->setBody(array(
      'to' => array(array('phoneNumber' => $RECIPIENT)),
      'faxResolution' => 'High',
    ))
    ->add(fopen('test.jpg', 'r'))
    ->request('/account/~/extension/~/fax');

    $resp = $platform->sendRequest($request);
    print_r ("FAX sent. Message status: " . $resp->json()->messageStatus);
    ```

=== "Python"
    ```python
    from ringcentral import SDK

    RECIPIENT = '<ENTER FAX NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    platform = rcsdk.platform()
    platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

    builder = rcsdk.create_multipart_builder()
    builder.set_body({
      'to': [{'phoneNumber': RECIPIENT}],
      'faxResolution': "High",
      'coverPageText': "This is a demo Fax page from Python"
    })

    attachment = ('test.jpg', open('test.jpg','r').read(), 'image/jpeg')
    builder.add(attachment)

    request = builder.request('/account/~/extension/~/fax')

    resp = platform.send_request(request)
    print 'Fax sent. Message status: ' + resp.json().messageStatus
    ```

=== "Java"
    ```java
    package Send_Fax;

    import java.io.IOException;

    import com.ringcentral.*;
    import com.ringcentral.definitions.*;

    public class Send_Fax {
      static String RECIPIENT_NUMBER = "<ENTER PHONE NUMBER>";
      static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
      static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
      static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";

      static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
      static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
      static String RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

      static RestClient restClient;

      public static void main(String[] args) {
        var obj = new Send_Fax();
        try {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
          restClient.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
          obj.send_fax()();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }

      public static void sendFax() throws RestException, IOException{
        CreateFaxMessageRequest postParameters = new CreateFaxMessageRequest();
        postParameters.to = new MessageStoreCallerInfoRequest[]{new MessageStoreCallerInfoRequest().phoneNumber(RECIPIENT_NUMBER)};
        postParameters.faxResolution = "High";
        postParameters.coverPageText = "This is a demo Fax page from Java";
        Attachment attachment = new Attachment();
        attachment.fileName = "test.jpg";
        attachment.contentType = "image/jpeg";
        attachment.bytes = Files.readAllBytes(Paths.get("./src/test/resources/test.jpg"));
        Attachment[] attachments = new Attachment[] { attachment };
        postParameters.attachments = attachments;

        var response = rc.restapi().account().extension().fax().post(postParameters);
        System.out.println("Fax sent. Delivery status: " + response.messageStatus);
      }
    }
    ```

=== "C#"
    ```c#
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace Send_Fax
    {
      class Program
      {
        const string RECIPIENT = "<ENTER PHONE NUMBER>";
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        const string RINGCENTRAL_PRODUCTION = false;

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static RestClient restClient;

        static void Main(string[] args)
        {
          restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
          restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
          send_fax().Wait();
        }

        static private async Task send_fax()
        {
          var requestParams = new SendFaxMessageRequest();
          var attachment = new Attachment { fileName = "test.jpg", contentType = "image/jpeg", bytes = System.IO.File.ReadAllBytes("test.jpg") };
          var attachments = new Attachment[] { attachment };
          requestParams.attachments = attachments;
          requestParams.to = new MessageStoreCallerInfoRequest[] { new MessageStoreCallerInfoRequest { phoneNumber = RECIPIENT } };
          requestParams.faxResolution = "High";
          requestParams.coverPageText = "This is a demo Fax page from C#";
          var resp = await rc.Restapi().Account().Extension().Fax().Post(requestParams);
          Console.WriteLine("Fax sent. Message status: " + resp.messageStatus);
        }
      }
    }
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    RECIPIENT = '<ENTER FAX NUMBER>'

    RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

    RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
    RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
    RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

    rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
    rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

    resp = rc.post('/restapi/v1.0/account/~/extension/~/fax', payload: {
        to: [{ phoneNumber: RECIPIENT }],
        faxResolution: "High",
        coverPageText: "This is a demo Fax page from Ruby"
      },
      files: [
        ['test.jpg', 'image/jpeg']
      ]
    )

    puts 'Fax sent. Current status: ' + resp.body['messageStatus']
    ```
