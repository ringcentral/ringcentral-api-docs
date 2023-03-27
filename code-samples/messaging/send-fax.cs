using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_Fax
{
    class Program
    {
        static RestClient restClient;
        static void Main(string[] args)
        {
            restClient = new RestClient(
                Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            restClient.Authorize(
                Environment.GetEnvironmentVariable("RC_JWT")).Wait();
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

