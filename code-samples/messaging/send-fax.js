const RC = require('@ringcentral/sdk').SDK

RECIPIENT = '<ENTER FAX NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
var platform = rcsdk.platform();

platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )

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
