using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace SpeakersDiarization {
  class Program {
    static RestClient restClient;
    static string NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
    static string WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    static string CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");

        await speakers_detection();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Detect spoeakers from a conversation
    */
    static private async Task speakers_detection()
    {
      try
      {
        var bodyParams = new DiarizeInput()
        {
          contentUri = CONTENT_URI,
          encoding = "Wav",
          languageCode = "en-US",
          source = "RingCentral",
          audioType = "CallCenter"
        };
        var callbackAddress = Environment.GetEnvironmentVariable("NGROK_URL") + "/webhook";
        var queryParams = new CaiSpeakerDiarizeParameters() { webhook = callbackAddress };

        var resp = await restClient.Ai().Audio().V1().Async().SpeakerDiarize().Post(bodyParams, queryParams);
        Console.WriteLine("Job ID: " + resp.jobId);
        Console.WriteLine("Ready to receive response at: " + callbackAddress);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to call speaker diarization API. " + ex.Message);
      }
    }
  }
}
