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
            var requestParams = new CreateFaxMessageRequest();
            var attachment = new Attachment { fileName = "test.jpg", contentType = "image/jpeg", bytes = System.IO.File.ReadAllBytes("test.jpg") };
            var attachments = new Attachment[] { attachment };
            requestParams.attachments = attachments;
            requestParams.to = new MessageStoreCalleeInfoRequest[] { new MessageStoreCalleeInfoRequest { phoneNumber = RECIPIENT } };
            requestParams.faxResolution = "High";
            requestParams.coverPageText = "This is a demo Fax page from C#";
            var resp = await rc.Restapi().Account().Extension().Fax().Post(requestParams);
            Console.WriteLine("Fax sent. Message status: " + resp.messageStatus);
        }
    }
}

