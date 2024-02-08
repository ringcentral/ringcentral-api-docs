using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace AnalyzeInteraction {
  class Program {
    static RestClient restClient;
    static string NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static string WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    static string CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

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
            separateSpeakerPerChannel = true
        };
        var queryParams = new CaiAnalyzeInteractionParameters() { webhook = WEBHOOK_URL };

        var resp = await restClient.Ai().Insights().V1().Async().AnalyzeInteraction().Post(bodyParams, queryParams);
        Console.WriteLine("Job ID: " + resp.jobId);
        Console.WriteLine("Ready to receive response at: " + WEBHOOK_URL);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to analyze interaction. " + ex.Message);
      }
    }
  }
}
