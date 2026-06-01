using System;
using com.Messente.Api.Api;
using com.Messente.Api.Client;

namespace Example
{
    public class GetSyncDlr
    {
        public static void Main()
        {
            Configuration conf = new Configuration
            {
                Username = "YOUR_MESSENTE_API_USERNAME",
                Password = "YOUR_MESSENTE_API_PASSWORD"
            };

            var apiInstance = new DeliveryReportApi(conf);

            try
            {
                var result = apiInstance.RetrieveDeliveryReport("<omnimessage_id>");
                Console.WriteLine(result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine("Exception when retrieving delivery report: " + e.Message);
            }
        }
    }
}
