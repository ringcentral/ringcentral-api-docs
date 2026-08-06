const MessenteApi = require('messente_api');

const defaultClient = MessenteApi.ApiClient.instance;
const basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'YOUR_MESSENTE_API_USERNAME';
basicAuth.password = 'YOUR_MESSENTE_API_PASSWORD';

const api = new MessenteApi.OmnimessageApi();

const sms = MessenteApi.SMS.constructFromObject({
  text: 'hello sms',
  sender: '<sender name (optional)>',
});

const omnimessage = MessenteApi.Omnimessage.constructFromObject({
  messages: [sms],
  to: '<recipient_phone_number>',
  timeToSend: '2019-06-22T09:05:07+04:00',
});

api.sendOmnimessage(omnimessage, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ', data);
  }
});
