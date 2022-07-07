using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_Phone_Number {
    class Program {
		static void Main(string[] args) {
	    	detect_phone_number_feature().Wait();
		}
		static private async Task detect_phone_number_feature() {

            RestClient rc = new RestClient(
                Environment.GetEnvironmentVariable("RC_CLIENT_ID"),
                Environment.GetEnvironmentVariable("RC_CLIENT_SECRET"),
                Environment.GetEnvironmentVariable("RC_SERVER_URL"));
            
            await rc.Authorize(
                Environment.GetEnvironmentVariable("RC_JWT")).Wait();
	    
	    	var response = await rc.Restapi().Account().Extension().PhoneNumber().Get();
	    
	    	foreach (var record in response.records) {
				foreach (var feature in record.features) {
			    	if (feature == "A2PSmsSender") {
						if (record.paymentType == "TollFree") {
			    			Console.WriteLine("This phone number " + record.phoneNumber + " is a toll-free number and provisioned for using to send high volume SMS" );
						} else {
			    			Console.WriteLine("This phone number " + record.phoneNumber + " is a 10-DLC local number and provisioned for using to send high volume SMS" );
						}
		    		}
				}
	    	}
		}
    }
}
