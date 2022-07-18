require('dotenv').config();
var RingCentral = require('@ringcentral/sdk').SDK;
var rcsdk = new RingCentral({
  server:       RINGCENTRAL_SERVER_URL,
  clientId:     RINGCENTRAL_CLIENT_ID,
  clientSecret: RINGCENTRAL_CLIENT_SECRET
});
var platform = rcsdk.platform();
try {
    var personId = "1234";
    var groupId = "5678";
    await platform.post(`/restapi/v1.0/glip/chats/${groupId}/posts`, {
        "text": `Here is a mention: ![:Person](${personId})`
    })
} catch(e) {
    console.log(e)
}
