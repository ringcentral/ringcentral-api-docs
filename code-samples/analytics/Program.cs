using System;
using System.IO;

using RingCentral;
using Newtonsoft.Json.Linq;

namespace WebAPIClient {
  class Program {
    static RingCentral.RestClient rcClient;
    static void Main(string[] args){
	rcClient = new RestClient(
	    Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
	    Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
	    Environment.GetEnvironmentVariable("RC_SERVER_URL"));
	rcClient.Authorize(
	    Environment.GetEnvironmentVariable("RC_JWT")).Wait();
	getAggregateData(rcClient);
	getTimelineData(rcClient);
    }   
    private static async void getAggregateData(RingCentral.RestClient rcClient) {
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
