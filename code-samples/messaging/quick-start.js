const RC = require('@ringcentral/sdk').SDK;

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;
const RECIPIENT    = process.env.SECONDARY_NUMBER;

const rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});

const  platform = rcsdk.platform();

platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
});

platform.on(platform.events.loginSuccess, readExtensionPhoneNumber);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
});

async function readExtensionPhoneNumber() {
    try {
        const response = await platform.get('/restapi/v1.0/account/~/extension/~/phone-number');
        const json = await response.json();
        for (let record of json.records) {
            for (feature of record.features) {
                if (feature == 'SmsSender') {
                    return sendSms(record.phoneNumber);
                }
            }
        }
    } catch(e) {
        console.error(`Failed to read extension phone number : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
    }
}

async function sendSms(fromNumber) {
    try {
        const response = await platform.post('/restapi/v1.0/account/~/extension/~/sms', {
            from: {'phoneNumber': fromNumber},
            to: [{'phoneNumber': RECIPIENT}],
            text: 'Hello World from JavaScript'
        })
        const json = await response.json()
        console.log('SMS sent. Message status: ' + json.messageStatus)
    } catch(e) {
        console.error(`Failed to send sms : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
    }
}
