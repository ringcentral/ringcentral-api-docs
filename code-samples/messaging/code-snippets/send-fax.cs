using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_Fax
{
    class Program
    {
        static RestClient restClient;
        static string RECIPIENT = "RECIPIENT-PHONE-NUMBER";
        static async Task Main(string[] args)
        {
          try
          {
            // Instantiate the SDK
            restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

            // Authenticate a user using a personal JWT token
            await restClient.Authorize("RC_USER_JWT");
            await send_fax();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
         Send a high resolution fax message to a recipient number
        */
        static private async Task send_fax()
        {
          try
          {
            var bodyParams = new CreateFaxMessageRequest();

            bodyParams.to = new FaxReceiver[] { new FaxReceiver { phoneNumber = RECIPIENT } };
            // To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
            /*
            bodyParams.to = new FaxReceiver[] {
                new FaxReceiver { phoneNumber = "Recipient1-Phone-Number" },
                new FaxReceiver { phoneNumber = "Recipient1-Phone-Number" }
            };
            */
            bodyParams.faxResolution = "High";
            bodyParams.coverPageText = "This is a demo Fax page from C#";
            // Make sure you have the test.pdf file saved within the project location.
            // Otherwise, change the location path and file name accordingly
            var attachment = new Attachment { filename = "test.pdf", contentType = "application/pdf", content = System.IO.File.ReadAllBytes("test.pdf") };
            var attachments = new Attachment[] { attachment };
            bodyParams.attachments = attachments;

            var resp = await restClient.Restapi().Account().Extension().Fax().Post(bodyParams);
            Console.WriteLine("Fax sent. Message id: " + resp.id);
            await check_fax_message_status(resp.id.ToString());
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
         Check the sending message status until it's no longer in the queued status
        */
        static private async Task check_fax_message_status(string messageId)
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().MessageStore(messageId).Get();
                Console.WriteLine("Message status: " + resp.messageStatus);
                if (resp.messageStatus == "Queued")
                {
                    Thread.Sleep(10000);
                    await check_fax_message_status(resp.id.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
