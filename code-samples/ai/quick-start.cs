using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;
using dotenv.net;

namespace ConvertSpeechToText {
  class Program {
    static RestClient restClient;

    static async Task Main(string[] args){
      try
      {
        DotEnv.Load();
        // Instantiate the SDK
        restClient = new RestClient(
            Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
            Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
            Environment.GetEnvironmentVariable("RC_SERVER_URL"));

        // Authenticate a user using a personal JWT token
        await restClient.Authorize( Environment.GetEnvironmentVariable("RC_JWT") );

        await speech_to_text();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Convert speech to text
    */
    static private async Task speech_to_text()
    {
      try
      {
        var bodyParams = new AsrInput()
                {
                    contentUri = Environment.GetEnvironmentVariable("CONTENT_URI"),
                    encoding = "Wav",
                    languageCode = "en-US",
                    source = "RingCentral",
                    audioType = "CallCenter",
                    enablePunctuation = true,
                    enableSpeakerDiarization = false
                };
        var callbackAddress = Environment.GetEnvironmentVariable("NGROK_URL") + "/webhook";
        var queryParams = new CaiSpeechToTextParameters() { webhook = callbackAddress };

        var resp = await restClient.Ai().Audio().V1().Async().SpeechToText().Post(bodyParams, queryParams);

        Console.WriteLine("Job ID: " + resp.jobId);
        Console.WriteLine("Ready to receive response at: " + callbackAddress);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to convert speech to text. " + ex.Message);
      }
    }
  }
}
