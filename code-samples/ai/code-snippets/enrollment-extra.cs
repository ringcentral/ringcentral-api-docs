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
        restClient = new RestClient("RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com");

        // Authenticate a user using a personal JWT token
        await restClient.Authorize("RC_USER_JWT");

        await read_enrollments();
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to authenticate to platform. Check credentials. " + ex.Message);
      }
    }
    /*
    * Read speakers identification
    */
    static private async Task read_enrollments()
    {
      try
      {
        var queryParams = new CaiEnrollmentsListParameters()
                          {
                            partial = true,
                            perPage = 100,
                            page = 1
                          };

        var resp = await restClient.Ai().Audio().V1().Enrollments().List(queryParams);
        Console.WriteLine(JsonConvert.SerializeObject(resp));
        foreach (var record in resp.records)
        {
          if (record.speakerId == "123456789")
          {
            await delete_enrollment(record.speakerId);
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to read speakers identification. " + ex.Message);
      }
    }
    // Delet a speakers identification
    static private async Task delete_enrollment(String speakerId)
    {
      try
      {
        var resp = await restClient.Ai().Audio().V1().Enrollments(speakerId).Delete();
        Console.WriteLine("Deleted");
      }
      catch (Exception ex)
      {
        Console.WriteLine("Unable to delete a speaker identification. " + ex.Message);
      }
    }
  }
}
