/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */

const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

const RECIPIENT    = process.env.FAX_RECIPIENT

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

var platform = rcsdk.platform();

platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    send_fax()
});

async function send_fax() {
    var FormData = require('form-data');
    formData = new FormData();
    var body = {
        to: [{'phoneNumber': RECIPIENT}],
        faxResolution: 'High',
        coverPageText: "This is a demo Fax page from Node JS"
    }
    
    formData.append('json', new Buffer(JSON.stringify(body)), {
        filename: 'request.json',
        contentType: 'application/json'
    });
    
    formData.append('attachment', require('fs').createReadStream('test.jpg'));
    
    try {
        var resp = await platform.post('/restapi/v1.0/account/~/extension/~/fax', formData)
        var jsonObj = await resp.json()
        console.log("FAX sent. Message status: " + jsonObj.messageStatus)
    } catch(e) {
        console.log(e.message)
    }
}
