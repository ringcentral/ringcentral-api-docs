using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_Meeting
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_JWT"));
      await create_meeting();
    }
    static private async Task create_meeting()
    {
      var parameters = new MeetingRequestResource();
      parameters.topic = "Test Meeting";
      parameters.meetingType = "Instant";
      parameters.allowJoinBeforeHost = true;
      parameters.startHostVideo = true;
      parameters.startParticipantsVideo = false;

      var resp = await restClient.Restapi().Account().Extension().Meeting().Post(parameters);
      Console.WriteLine("Start Your Meeting: " + resp.links.startUri);
      Console.WriteLine("join the Meeting: " + resp.links.joinUri);
    }
  }
}
