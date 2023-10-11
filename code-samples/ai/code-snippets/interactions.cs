using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace AnalyzeInteraction {
  class Program {
    static RestClient restClient;
    static string NGROK = "YourNGRokAddress";
    static string WEBHOOK_URL = NGROK + "/webhook";
    static string CONTENT_URI = "https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3";

    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("PRODUCTION-JWT");

        await analyze_interaction();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Transcribe a call recording and analyze interaction
    */
    static private async Task analyze_interaction()
    {
      try
      {
        var bodyParams = new InteractionInput()
        {
            contentUri = CONTENT_URI,
            encoding = "Mpeg",
            languageCode = "en-US",
            source = "RingCentral",
            audioType = "CallCenter",
            insights = new String[] { "All" },
            enableVoiceActivityDetection = true,
            separateSpeakerPerChannel = false
        };
        var queryParams = new CaiAnalyzeInteractionParameters() { webhook = WEBHOOK_URL };

        var resp = await restClient.Ai().Insights().V1().Async().AnalyzeInteraction().Post(bodyParams, queryParams);
        Console.WriteLine(JsonConvert.SerializeObject(resp));
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to analyze interaction. " + ex.Message);
      }
    }
  }
}
