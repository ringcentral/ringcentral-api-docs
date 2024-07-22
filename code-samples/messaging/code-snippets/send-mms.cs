using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_MMS
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

            await read_extension_phone_number_detect_mms_feature();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
          Read phone number(s) that belongs to this user and detect if a phone number
          has the MMS capability
        */
        static private async Task read_extension_phone_number_detect_mms_feature()
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().PhoneNumber().Get();
                foreach (var record in resp.records)
                {
                    foreach (var feature in record.features)
                    {
                        if (feature == "MmsSender")
                        {
                            // If a user has multiple phone numbers, check and decide which number
                            // to be used for sending MMS message.
                            await send_mms(record.phoneNumber);
                            return;
                        }
                    }
                }
                if (resp.records.Length == 0)
                {
                    Console.WriteLine("This user does not own a phone number!");
                }
                else
                {
                    Console.WriteLine("None of this user's phone number(s) has the MMS capability!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /*
         Send a multi-media message from a user own phone number to a recipient number
        */
        static private async Task send_mms(string fromNumber)
        {
            try
            {
                var bodyParams = new CreateMMSMessage();
                bodyParams.from = new MessageStoreCallerInfoRequest
                {
                    phoneNumber = fromNumber
                };
                bodyParams.to = new MessageStoreCallerInfoRequest[] {
                    new MessageStoreCallerInfoRequest { phoneNumber = RECIPIENT }
                };
                // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
                /*
                requestBody.to = new MessageStoreCallerInfoRequest[] {
                  new MessageStoreCallerInfoRequest { phoneNumber = "Recipient_1_Number" },
                  new MessageStoreCallerInfoRequest { phoneNumber = "Recipient_2_Number" }
                };
                */
                bodyParams.text = "Hello World!";

                var attachment = new Attachment { filename = "test.jpg", contentType = "image/jpeg", content = System.IO.File.ReadAllBytes("test.jpg") };
                var attachments = new Attachment[] { attachment };
                bodyParams.attachments = attachments;

                var resp = await restClient.Restapi().Account().Extension().Mms().Post(bodyParams);
                Console.WriteLine("MMS sent. Message id: " + resp.id.ToString());
                await check_mms_message_status(resp.id.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /*
         Check the sending message status until it's no longer in the queued status
        */
        static private async Task check_mms_message_status(string messageId)
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().MessageStore(messageId).Get();
                Console.WriteLine("Message status: " + resp.messageStatus);
                if (resp.messageStatus == "Queued")
                {
                    Thread.Sleep(2000);
                    await check_mms_message_status(resp.id.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
