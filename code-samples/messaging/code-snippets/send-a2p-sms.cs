using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_HighVolume_SMS
{
    class Program
    {
        // For the purpose of testing the code, we put the recipient number in the variable.
        // Feel free to set the recipient number directly.
        static string RECIPIENT = "RECIPIENT-PHONE-NUMBER";
        static RestClient restClient;

        static async Task Main(string[] args)
        {
          try
          {
            // Instantiate the SDK
            restClient = new RestClient( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

            // Authenticate a user using a personal JWT token
            await restClient.Authorize("RC_USER_JWT");
            await read_extension_phone_number_detect_a2psms_feature();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }
        /*
          Read phone number(s) that belongs to this user and detect if a phone number
          has the A2P SMS capability
        */
        static private async Task read_extension_phone_number_detect_a2psms_feature()
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().PhoneNumber().Get();
                foreach (var record in resp.records)
                {
                    foreach (var feature in record.features)
                    {
                        if (feature == "A2PSmsSender")
                        {
                            // If a user has multiple phone numbers, check and decide which number
                            // to be used for sending SMS message.
                            await send_batch_sms(record.phoneNumber);
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
                    Console.WriteLine("None of this user's phone number(s) has the A2P SMS capability!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /*
         Broadcast a text message from a user own phone number to multiple recipients
        */
        static private async Task send_batch_sms(string fromNumber)
        {
            try
            {
                var bodyParams = new MessageBatchCreateRequest();
                bodyParams.from = fromNumber;
                bodyParams.messages = new MessageCreateRequest[] {
                    new MessageCreateRequest { to = new String[] { RECIPIENT } }
                    // Adding more recipients
                    /*
                    new MessageCreateRequest { to = new String[] { "Recipient2-Phone-Number } },
                    new MessageCreateRequest { to = new String[] { "RecipientN-Phone-Number } }
                    */
                };
                bodyParams.text = "Hello Team";

                var resp = await restClient.Restapi().Account().A2pSms().Batches().Post(bodyParams);
                Console.WriteLine("Batch sent. Batch id: " + resp.id);
                await check_batch_status(resp.id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /*
         Send a batch from a user own phone number to multiple recipient with personalized message
        */
        static private async Task send_personalized_sms(string fromNumber)
        {
            try
            {
                var bodyParams = new MessageBatchCreateRequest();
                bodyParams.from = fromNumber;
                bodyParams.messages = new MessageCreateRequest[] {
                    new MessageCreateRequest { to = new String[] { RECIPIENT }, text = "Hello Alice" }
                    // Adding more recipients
                    /*
                    new MessageCreateRequest { to = new String[] { "Recipient2-Phone-Number }, text = "Hello Bob" },
                    new MessageCreateRequest { to = new String[] { "RecipientN-Phone-Number }, text = "Hola Maria" }
                    */
                };
                // This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
                bodyParams.text = "Hello Team";

                var resp = await restClient.Restapi().Account().A2pSms().Batches().Post(bodyParams);
                Console.WriteLine("Batch sent. Batch id: " + resp.id);
                await check_batch_status(resp.id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /*
         Check the batch status until it's completed.
         Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
        */
        static private async Task check_batch_status(string batchId)
        {
            try
            {
                var resp = await restClient.Restapi().Account().A2pSms().Batches(batchId).Get();
                Console.WriteLine("Batch status: " + resp.status);
                if (resp.status != "Completed")
                {
                    Thread.Sleep(5000);
                    await check_batch_status(resp.id);
                }
                else
                {
                    Console.WriteLine(JsonConvert.SerializeObject(resp));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
