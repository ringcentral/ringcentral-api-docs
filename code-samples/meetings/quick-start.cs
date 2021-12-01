using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_Meeting
{
    class Program
    {
	static RestClient restClient;
	static void Main(string[] args)
	{
            restClient = new RestClient(
		Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
		Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
		Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            restClient.Authorize(
		Environment.GetEnvironmentVariable("RC_USERNAME"),
		Environment.GetEnvironmentVariable("RC_EXTENSION"),
		Environment.GetEnvironmentVariable("RC_PASSWORD")).Wait();
	    create_meeting().Wait();
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
