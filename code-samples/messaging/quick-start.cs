using System;
using System.Threading.Tasks;
using RingCentral;
using dotenv.net;

namespace Send_SMS
{
    class Program
    {
        static string RECIPIENT;
        static RestClient restClient;
        static async Task Main(string[] args)
        {
          try
          {
            DotEnv.Load();
            // Instantiate the SDK
            restClient = new RestClient(
                Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
                Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
                Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            // Authenticate a user using a personal JWT token
            await restClient.Authorize( Environment.GetEnvironmentVariable("RC_USER_JWT") );

            // For the purpose of testing the code, we put the SMS recipient number in the environment variable.
            // Feel free to set the SMS recipient directly.
            RECIPIENT = Environment.GetEnvironmentVariable("SMS_RECIPIENT");

            await read_extension_phone_number_detect_sms_feature();
          }
          catch (Exception ex)
          {
            Console.WriteLine(ex.Message);
          }
        }

        /*
          Read phone number(s) that belongs to the authenticated user and detect if a phone number
          has the SMS capability
        */
        static private async Task read_extension_phone_number_detect_sms_feature()
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().PhoneNumber().Get();
                foreach (var record in resp.records)
                {
                    foreach (var feature in record.features)
                    {
                        if (feature == "SmsSender")
                        {
                            // If a user has multiple phone numbers, check and decide which number
                            // to be used for sending SMS message.
                            await send_sms(record.phoneNumber);
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
                    Console.WriteLine("None of this user's phone number(s) has the SMS capability!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /*
         Send a text message from a user own phone number to a recipient number
        */
        static private async Task send_sms(string fromNumber)
        {
            try
            {
                var requestBody = new CreateSMSMessage();
                requestBody.from = new MessageStoreCallerInfoRequest
                {
                    phoneNumber = fromNumber
                };
                requestBody.to = new MessageStoreCallerInfoRequest[] {
                    new MessageStoreCallerInfoRequest { phoneNumber = RECIPIENT }
                };
                // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
                /*
                requestBody.to = new MessageStoreCallerInfoRequest[] {
                  new MessageStoreCallerInfoRequest { phoneNumber = "Recipient_1_Number" },
                  new MessageStoreCallerInfoRequest { phoneNumber = "Recipient_2_Number" }
                };
                */
                requestBody.text = "Hello World!";

                var resp = await restClient.Restapi().Account().Extension().Sms().Post(requestBody);
                Console.WriteLine("SMS sent. Message id: " + resp.id.ToString());
                await check_message_status(resp.id.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        /*
         Check the sending message status until it's no longer in the queued status
        */
        static private async Task check_message_status(string messageId)
        {
            try
            {
                var resp = await restClient.Restapi().Account().Extension().MessageStore(messageId).Get();
                Console.WriteLine("SMS message status: " + resp.messageStatus);
                if (resp.messageStatus == "Queued")
                {
                    Thread.Sleep(2000);
                    await check_message_status(resp.id.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
