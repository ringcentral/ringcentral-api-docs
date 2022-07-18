const RingCentral  = require('@ringcentral/sdk').SDK

CHAT_ID = '<GROUP ID>'

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
})

platform.on(platform.events.loginSuccess, () => {
    post_card( CHAT_ID )
})

const { Template } = require('adaptivecards-templating');
const cardTemplate = require('callNotesCard.json');

async function post_card( group ) {
    try {
        var cardData = {
            'callerPhoneNumber' : '510-555-2823'
        }
        const template = new Template(cardTemplate);
        const card = template.expand({ $root: cardData });
        var resp = await platform.post('/restapi/v1.0/glip/chats/'+group+'/adaptive-cards',
                                       card);
        var jsonObj = await resp.json()
        console.log( JSON.stringify(jsonObj) )
    } catch (e) {
        console.log(e)
    }
}
