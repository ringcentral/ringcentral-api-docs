using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using RingCentral;
using Newtonsoft.Json;

namespace SpeakserIdentificationEnrollment {
  class Program {
    static RestClient restClient;
    static async Task Main(string[] args){
      try
      {
        // Instantiate the SDK
        restClient = new RestClient("PRODUCTION-APP-CLIENT-ID", "PRODUCTION-APP-CLIENT-SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("PRODUCTION-JWT");

        // set your valid audio content file name and path
        var contentFile = "VALID_AUDIO_CONTENT_FILE";
        await create_speaker_enrollment(contentFile);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Enroll speaker identification
    */
    static private async Task create_speaker_enrollment(String contentFile)
    {
      try
      {
        // use own extension id as a unique enrollment id
        var enrollmentId = restClient.token.owner_id.ToString();

        var content_bytes = System.IO.File.ReadAllBytes(contentFile);
        var based64_data =  System.Convert.ToBase64String(content_bytes);

        // check if this speaker id exists
        var enrollmentObj = await read_enrollment(enrollmentId);
        EnrollmentStatus resp = null;

        if (enrollmentObj != null)
        {
          // speaker id exists => update it
          Console.WriteLine("Existing enrollment");
          Console.WriteLine(JsonConvert.SerializeObject(enrollmentObj));
          var bodyParams = new EnrollmentPatchInput()
                          {
                            content = based64_data,
                            encoding = "Mpeg",
                            languageCode = "en-US"
                          };
          resp = await restClient.Ai().Audio().V1().Enrollments(enrollmentId).Patch(bodyParams);
        }
        else
        {
          // speaker id does not exist => enroll a new one
          var bodyParams = new EnrollmentInput()
                          {
                            content = based64_data,
                            encoding = "Mpeg",
                            languageCode = "en-US",
                            enrollmentId = enrollmentId
                          };
          resp = await restClient.Ai().Audio().V1().Enrollments().Post(bodyParams);
        }

        Console.WriteLine("New enrollment");
        var jsonStr = JsonConvert.SerializeObject(resp);
        Console.WriteLine(jsonStr);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to enroll a speaker identification. " + ex.Message);
      }
    }
    // Read a speaker identification
    static private async Task<EnrollmentStatus> read_enrollment(String enrollmentId)
    {
      try
      {
        var resp = await restClient.Ai().Audio().V1().Enrollments(enrollmentId).Get();
        return resp;
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to read a speaker identification. " + ex.Message);
        return null;
      }
    }
}
