const MessenteApi = require('messente_api');

const defaultClient = MessenteApi.ApiClient.instance;
const basicAuth = defaultClient.authentications['basicAuth'];
basicAuth.username = 'YOUR_MESSENTE_API_USERNAME';
basicAuth.password = 'YOUR_MESSENTE_API_PASSWORD';

const api = new MessenteApi.OmnimessageApi();

api.cancelScheduledMessage('<omnimessage_id>', (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Scheduled omnimessage cancelled');
  }
});
