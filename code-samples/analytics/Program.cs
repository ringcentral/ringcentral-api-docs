using System;
using System.IO;

using RingCentral;
using Newtonsoft.Json.Linq;

namespace WebAPIClient {
  class Program {

    private static string RINGCENTRAL_CLIENTID = "";
    private static string RINGCENTRAL_CLIENTSECRET = "";
    // Set this boolean value to true if you wish to use Production Credentials
    private static bool IS_RINGCENTRAL_PRODUCTION = false;
    private static string RINGCENTRAL_JWT = "";

    static RingCentral.RestClient rcClient;

    static void Main(string[] args) {
      try {
        rcClient = new RingCentral.RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
        rcClient.Authorize(RINGCENTRAL_JWT).Wait();
        getAggregateData(rcClient);
        getTimelineData(rcClient);
      }
      catch (Exception e) {
        System.Console.WriteLine(e.Message);
      }
    }   
    private static async void getAggregateData(RingCentral.RestClient restClient) {
      var jsonRequestObject = loadJson("aggregate-request-body.json");
      var response = await rcClient.Post("/analytics/phone/performance/v1/accounts/~/calls/aggregate", jsonRequestObject);
      Console.WriteLine("---- Aggregate Data ----");
      Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
    private static async void getTimelineData(RingCentral.RestClient rcClient) {     
      var jsonRequestObject = loadJson("timeline-request-body.json");
      var response = await rcClient.Post("/analytics/phone/performance/v1/accounts/~/calls/timeline?interval=Day", jsonRequestObject);
      Console.WriteLine("---- TimeLine Data ----");
      Console.WriteLine(await response.Content.ReadAsStringAsync());
    }

    // Helper function to load the JSON file, make sure to edit this based on your requirements
    private static JObject loadJson(string filePath) {
      try {
        string result = string.Empty;
        using (StreamReader r = new StreamReader(filePath)) {
          var jsonString = r.ReadToEnd();
          JObject jsonObject = JObject.Parse(jsonString);
          return jsonObject;
        }
      }
      catch (Exception e) {
        System.Console.WriteLine(e.Message);
        return null;
      }
    }
  }
}