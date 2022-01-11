const RC  = require('@ringcentral/sdk').SDK;
const fs    = require('fs');
const https = require('https');

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;

const rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});

const platform = rcsdk.platform();

platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
});

platform.on(platform.events.loginSuccess, createMessageStoreReport);

async function createMessageStoreReport() {
  try {
    const endpoint = '/restapi/v1.0/account/~/message-store-report';
    const params = {
      dateFrom: '2019-03-01T00:00:00.000Z',
      dateTo: '2019-03-31T23:59:59.999Z'
    };
    const response = await platform.post(endpoint, params);
    const json = await response.json();
    getMessageStoreReportTask(json.id);
  } catch (e) {
    console.error(e);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}

async function getMessageStoreReportTask(taskId) {
  console.log('check task creation status ...');
  try {
    const endpoint = '/restapi/v1.0/account/~/message-store-report/' + taskId;
    const response = await platform.get(endpoint);
    const json = await response.json();
    if (json.status == 'Completed') {
      getMessageStoreReportArchive(json.id);
    } else {
      setTimeout(function() {
        getMessageStoreReportTask(taskId)
      }, 10000);
    }
  } catch (e) {
    console.error(e);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}

async function getMessageStoreReportArchive(taskId) {
  console.log('getting report uri ...');
  try {
    const endpoint = `/restapi/v1.0/account/~/message-store-report/${taskId}/archive`;
    const response = await platform.get(endpoint);
    const json = await response.json();
    const date = new Date();
    for (let i = 0; i < json.records.length; i++) {
      const fileName = 'message_store_content_' + date.toISOString() + '_' + i + '.zip';
      getMessageStoreReportArchiveContent(json.records[i].uri, fileName);
    }
  } catch (e) {
    console.error(e);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}

async function getMessageStoreReportArchiveContent(contentUri, fileName) {
  const uri = await platform.signUrl(contentUri);
  download(uri, fileName, function() {
    console.log('Save report zip file to the local machine.');
  })
}

const download = function(uri, dest, cb) {
  const file = fs.createWriteStream(dest);
  https.get(uri, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}
