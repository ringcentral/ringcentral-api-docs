using System;
using System.Threading.Tasks;
using RingCentral;

namespace JWT_Auth
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
                Environment.GetEnvironmentVariable("RC_JWT")).Wait();
            Console.WriteLine("Successfully authed.");
        }
    }
}
