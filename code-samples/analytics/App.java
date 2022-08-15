import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.ringcentral.RestClient;
import com.ringcentral.definitions.TokenInfo;

public class App {

  static String RINGCENTRAL_CLIENT_ID = "";
  static String RINGCENTRAL_CLIENT_SECRET = "";
  static String RINGCENTRAL_USERNAME = "";
  static String RINGCENTRAL_PASSWORD = "";
  static String RINGCENTRAL_EXTENSION = "";

  private static final String AGGREGATE_API_PATH = "/analytics/calls/v1/accounts/~/aggregation/fetch";
  private static final String TIMELINE_API_PATH = "/analytics/calls/v1/accounts/~/timeline/fetch?interval=Week";
  // Update the URL based on if you're running using RingCentral Sandbox or Production Credentials. Currently set for sandbox
  private static String RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";

  public static void main(String[] args) throws Exception {

    RestClient rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);
    TokenInfo token = rc.authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
    String accessToken = token.access_token;

    String aggregate_json_file_path = "src/main/resources/aggregate-request-body.json";
    String timeline_json_file_path = "src/main/resources/timeline-request-body.json";
    String aggregateJsonStr = App.readFileAsString(aggregate_json_file_path);
    String timelineJsonStr = App.readFileAsString(timeline_json_file_path);

    try {
      HttpResponse<String> aggreageteHttpResponse = getData(aggregateJsonStr, AGGREGATE_API_PATH, accessToken);
      System.out.println("---AGGREGATE API RESPONSE---");
      System.out.println(aggreageteHttpResponse.statusCode());
      System.out.println(aggreageteHttpResponse.body());
      HttpResponse<String> timelineHttpResponse = getData(timelineJsonStr, TIMELINE_API_PATH, accessToken);
      System.out.println("---TIMELINE API RESPONSE---");
      System.out.println(timelineHttpResponse.statusCode());
      System.out.println(timelineHttpResponse.body());
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  static HttpResponse<String> getData(String jsonStr, String endpoint, String accessToken) throws Exception {
    HttpClient httpClient = HttpClient.newHttpClient();
    HttpRequest httpRequest = HttpRequest.newBuilder()
      .header("Content-Type", "application/json")
      .header("Authorization", "Bearer " + accessToken)
      .uri(URI.create(RINGCENTRAL_SERVER_URL + endpoint))
      .POST(HttpRequest.BodyPublishers.ofString(jsonStr))
      .build();

    HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
    return httpResponse;
  }

  static String readFileAsString(String file) throws Exception {
    return new String(Files.readAllBytes(Paths.get(file)));
  }
}