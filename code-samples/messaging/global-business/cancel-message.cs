using System;
using com.Messente.Api.Api;
using com.Messente.Api.Client;

namespace Example
{
    public class CancelMessage
    {
        public static void Main()
        {
            Configuration conf = new Configuration
            {
                Username = "YOUR_MESSENTE_API_USERNAME",
                Password = "YOUR_MESSENTE_API_PASSWORD"
            };

            var apiInstance = new OmnimessageApi(conf);

            try
            {
                apiInstance.CancelScheduledMessage("<omnimessage_id>");
                Console.WriteLine("Scheduled omnimessage cancelled");
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception when cancelling an omnimessage: " + e.Message);
            }
        }
    }
}
