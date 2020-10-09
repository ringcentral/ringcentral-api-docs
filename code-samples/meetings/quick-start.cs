using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_Meeting
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        const string RINGCENTRAL_PRODUCTION = false;

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY '101'>";

        static RestClient restClient;

        static void Main(string[] args)
        {
            restClient = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_PRODUCTION);
            restClient.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD).Wait();
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
