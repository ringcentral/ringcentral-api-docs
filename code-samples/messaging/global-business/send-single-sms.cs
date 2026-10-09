using System;
using com.Messente.Api.Api;
using com.Messente.Api.Client;
using com.Messente.Api.Model;

namespace Example
{
    public class SendSingleSms
    {
        public static void Main()
        {
            Configuration conf = new Configuration
            {
                Username = "YOUR_MESSENTE_API_USERNAME",
                Password = "YOUR_MESSENTE_API_PASSWORD"
            };

            var apiInstance = new OmnimessageApi(conf);

            var sms = new SMS(sender: "<sender name (optional)>", text: "hello sms");
            OmnimessageMessagesInner smsInner = new OmnimessageMessagesInner(sms)
            {
                ActualInstance = sms
            };

            var omnimessage = new Omnimessage(
                to: "<recipient_phone_number>",
                messages: new System.Collections.Generic.List<OmnimessageMessagesInner> { smsInner }
            );

            try
            {
                var result = apiInstance.SendOmnimessage(omnimessage);
                Console.WriteLine(result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception when calling SendOmnimessage: " + e.Message);
            }
        }
    }
}
