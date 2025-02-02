using System;
using System.Threading.Tasks;
using RingCentral;

namespace Update_CallQueue_Members
{
  class Program
  {
    static RestClient restClient;
    static async Task Main(string[] args)
    {
      restClient = new RestClient(
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_ID"),
      Environment.GetEnvironmentVariable("RC_APP_CLIENT_SECRET"),
      Environment.GetEnvironmentVariable("RC_SERVER_URL"));
      await restClient.Authorize(Environment.GetEnvironmentVariable("RC_USER_JWT"));

      await add_callqueue_members();
    }
    static private async Task add_callqueue_members()
    {
      var resp = await restClient.Restapi().Account().CallQueues().Get();
      foreach (var group in resp.records)
      {
        if (group.name == "Support Department")
        {
          var parameters = new CallQueueBulkAssignResource();
          parameters.addedExtensionIds = new string[] { "888888888", "999999999" };
          await restClient.Restapi().Account().CallQueues(group.id).BulkAssign().Post(parameters);
          Console.WriteLine("Members added");
          break;
        }
      }
    }
  }
}
