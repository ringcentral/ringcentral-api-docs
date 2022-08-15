using System;
using System.IO;

using RingCentral;
using Newtonsoft.Json.Linq;

namespace WebAPIClient {
  class Program {

    private static string RINGCENTRAL_CLIENTID = "";
    private static string RINGCENTRAL_CLIENTSECRET = "";
    // Set this boolean value to true if you wish to use Production Credentials
    private static bool RINGCENTRAL_PRODUCTION = false;
    private static string RINGCENTRAL_USERNAME = "";
    private static string RINGCENTRAL_PASSWORD = "";
    private static string RINGCENTRAL_EXTENSION = "";

    static RingCentral.RestClient rcClient;

    static void Main(string[] args){
      rcClient = new RingCentral.RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
      rcClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
      getAggregateData(rcClient);
      getTimelineData(rcClient);
    }   
    private static async void getAggregateData(RingCentral.RestClient restClient) {
      var jsonRequestObject = loadJson("aggregate-data-request.json");
      var response = await rcClient.Post("/analytics/calls/v1/accounts/~/aggregation/fetch", jsonRequestObject);
      Console.WriteLine("---- Aggregate Data ----");
      Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
    private static async void getTimelineData(RingCentral.RestClient rcClient) {     
      var jsonRequestObject = loadJson("timeline-data-request.json");
      var response = await rcClient.Post("/analytics/calls/v1/accounts/~/timeline/fetch?interval=Day", jsonRequestObject);
      Console.WriteLine("---- TimeLine Data ----");
      Console.WriteLine(await response.Content.ReadAsStringAsync());
    }

    // Helper function to load the JSON file, make sure to edit this based on your requirements
    private static JObject loadJson(string filePath) {
      string result = string.Empty;
      using (StreamReader r = new StreamReader(filePath)) {
        var jsonString = r.ReadToEnd();
        JObject jsonObject = JObject.Parse(jsonString);
        return jsonObject;
      }
    }
  }
}