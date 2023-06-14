// ref: https://github.com/tylerlong/RingCentral.WebSocket.Demo

using RingCentral;
using dotenv.net;
using RingCentral.Net.WebSocket;

var envVars = DotEnv.Read();

var rc = new RestClient(envVars["RINGCENTRAL_CLIENT_ID"], envVars["RINGCENTRAL_CLIENT_SECRET"], envVars["RINGCENTRAL_SERVER_URL"]);
await rc.Authorize(envVars["RINGCENTRAL_JWT_TOKEN"]);
Console.WriteLine(rc.token.access_token);

var wsExtension = new WebSocketExtension(new WebSocketOptions
{
    debugMode = true
});
await rc.InstallExtension(wsExtension);
await wsExtension.Subscribe(new string[] {"/restapi/v1.0/account/~/extension/~/message-store"}, message =>
{
    Console.WriteLine(message);
});

// Trigger some notifications for testing purpose
var timer = new PeriodicTimer(TimeSpan.FromMinutes(10));
while (await timer.WaitForNextTickAsync())
{
    await rc.Refresh();
    await rc.Restapi().Account().Extension().CompanyPager().Post(new CreateInternalTextMessageRequest
    {
        text = "Hello world",
        from = new PagerCallerInfoRequest
        {
            extensionId = rc.token.owner_id
        },
        to = new []{ new PagerCallerInfoRequest
        {
            extensionId = rc.token.owner_id
        }}
    });
    Console.WriteLine("Pager sent");
}

await rc.Revoke();