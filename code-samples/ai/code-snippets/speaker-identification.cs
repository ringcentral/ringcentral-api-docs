using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace SpeakersIdentification {
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

        await speakers_identification();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Identify spoeakers from a conversation
    */
    static private async Task speakers_identification()
    {
      var enrolledSpeakerIds = await read_enrolled_speakers();
      if (enrolledSpeakerIds.Length > 0)
      {
        try
        {
          var bodyParams = new IdentifyInput()
          {
            contentUri = CONTENT_URI,
            encoding = "Wav",
            languageCode = "en-US",
            source = "RingCentral",
            audioType = "CallCenter",
            enableVoiceActivityDetection = true,
            speakerIds = enrolledSpeakerIds
          };

          var queryParams = new CaiSpeakerIdentifyParameters() { webhook = WEBHOOK_URL };
          var resp = await restClient.Ai().Audio().V1().Async().SpeakerIdentify().Post(bodyParams, queryParams);
          Console.WriteLine("Job ID: " + resp.jobId);
          Console.WriteLine("Ready to receive response at: " + WEBHOOK_URL);
        }
        catch (Exception ex)
        {
          Console.WriteLine("Unable to call speaker identify API. " + ex.Message);
        }
      }
      else
      {
        Console.WriteLine("No enrolled speakers. Please enroll a few speaker ids and try again.");
      }
    }

    /*
    * Read the account enrolled speakers
    */
    static private async Task<String[]> read_enrolled_speakers()
    {
      List<String> enrolledSpeakerIds = new List<String>();
      try
      {
        var queryParams = new CaiEnrollmentsListParameters();
        queryParams.partial = false;
        queryParams.perPage = 100;
        queryParams.page = 1;
        var resp = await restClient.Ai().Audio().V1().Enrollments().List(queryParams);
        foreach (var enrollment in resp.records)
        {
          enrolledSpeakerIds.Add(enrollment.speakerId);
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to find enrolled speakers. " + ex.Message);

      }
      return enrolledSpeakerIds.ToArray();
    }
  }
}
