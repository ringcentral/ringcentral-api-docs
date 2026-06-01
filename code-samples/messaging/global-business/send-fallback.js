const MessenteApi = require('messente_api');

const defaultClient = MessenteApi.ApiClient.instance;

// Configure HTTP basic authorization: basicAuth
const basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'YOUR_MESSENTE_API_USERNAME';
basicAuth.password = 'YOUR_MESSENTE_API_PASSWORD';

const api = new MessenteApi.OmnimessageApi();

const sms = MessenteApi.SMS.constructFromObject({
  text: 'Hello SMS!',
  sender: '<sender name (optional)>',
});

const omnimessage = MessenteApi.Omnimessage.constructFromObject({
  messages: [sms],
  to: '<recipient_phone_number>',
});

api.sendOmnimessage(omnimessage, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ', data);
  }
});
