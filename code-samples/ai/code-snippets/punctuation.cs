using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace Punctuation {
  class Program {
    static string NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static string WEBHOOK_URL = NGROK_ADDRESS + "/webhook";

    static RestClient restClient;
    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("PRODUCTION-JWT");

        await punctuation();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Add punctuation to text paragraphs
    */
    static private async Task punctuation()
    {
        try
        {
            var bodyParams = new PunctuateInput();
            bodyParams.texts = new String[] {
                "so its more fluid than it is and you know its not the best kind of feedback right",
                "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
                "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
            };
            var queryParams = new CaiPunctuateParameters() { webhook = WEBHOOK_URL};
            var resp = await restClient.Ai().Text().V1().Async().Punctuate().Post(bodyParams, queryParams);
            Console.WriteLine("Job ID: " + resp.jobId);
            Console.WriteLine("Ready to receive response at: " + WEBHOOK_URL);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Unable to call punctuate API. " + ex.Message);
        }
    }
}
