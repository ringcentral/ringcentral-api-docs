using System;
using System.Threading.Tasks;
using RingCentral;

namespace Update_CallQueue_Members
{
class Program
{
  static RestClient rcsdk;
  static void Main(string[] args)
  {
    rcsdk = new RestClient("client_id", "client_secret", "server_url");
    await rcsdk.Authorize("username", "extension_number", "password");
    add_callqueue_members().Wait();
  }
  static private async Task add_callqueue_members()
  {
    var resp = await rcsdk.Restapi().Account().CallQueues().Get();
    foreach (var group in resp.records)
    {
      if (group.name == "Support Department")
      {
        var parameters = new CallQueueBulkAssignResource();
        parameters.addedExtensionIds = new string[] { "888888888", "999999999" };
        await rcsdk.Restapi().Account().CallQueues(group.id).BulkAssign().Post(parameters);
        Console.WriteLine("Members added");
        break;
      }
    }
  }
}
}
