using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_SMS
{
    class Program
    {
	const string SMS_RECIPIENT = "<ENTER PHONE NUMBER>";
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
	    read_extension_phone_number().Wait();
	}
	static private async Task read_extension_phone_number()
	{
	    var resp = await restClient.Restapi().Account().Extension().PhoneNumber().Get();
	    foreach (var record in resp.records)
	    {
		foreach(var feature in record.features)
		{
		    if (feature == "SmsSender")
		    {
			send_sms(record.phoneNumber).Wait();
			goto LoopEnd;
		    }
		}
	    }
	    LoopEnd:
	    Console.WriteLine("\nDone.");
	}
	
	static private async Task send_sms(string fromNumber)
	{
	    var parameters = new CreateSMSMessage();
	    parameters.from = new MessageStoreCallerInfoRequest {
		phoneNumber = fromNumber
	    };
	    parameters.to = new MessageStoreCallerInfoRequest[] { new MessageStoreCallerInfoRequest {
		    phoneNumber = Environment.GetEnvironmentVariable("SMS_RECIPIENT")
		} };
	    parameters.text = "Hello World from C#";
	    
	    var resp = await restClient.Restapi().Account().Extension().Sms().Post(parameters);
	    Console.WriteLine("SMS sent. Message status: " + resp.messageStatus);
	}
    }
}
