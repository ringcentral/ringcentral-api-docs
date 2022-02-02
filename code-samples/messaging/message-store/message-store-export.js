require('dotenv').config();
const RC    = require('@ringcentral/sdk').SDK;
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

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function createMessageStoreReport() {
  try {
    const endpoint = '/restapi/v1.0/account/~/message-store-report';
    const params = {
      dateFrom: '2021-08-08T00:00:00.000Z',
      dateTo: '2022-01-01T23:59:59.999Z'
    };
    const response = await platform.post(endpoint, params);
    const json = await response.json();
    getMessageStoreReportTask(json.id);
  } catch (e) {
    console.error(`Failed to request for message store report : ${e.message}`);
    process.exit(1);
  }
}

async function getMessageStoreReportTask(taskId) {
  console.log('check task creation status ...');
  try {
    const endpoint = `/restapi/v1.0/account/~/message-store-report/${taskId}`;
    const response = await platform.get(endpoint);
    const json = await response.json();
    if (json.status == 'Completed') {
      getMessageStoreReportArchive(json.id);
    } else {
      setTimeout(function() {
        getMessageStoreReportTask(taskId);
      }, 10000);
    }
  } catch (e) {
    console.error(`Failed to get message store report task status: ${e.message}`);
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
    json.records.forEach((record, i) => {
        const fileName = `message_store_content_${date.toISOString()}_${i}.zip`;
        getMessageStoreReportArchiveContent(record.uri, fileName);
    });
  } catch (e) {
    console.error(`Failed to get message store report archive : ${e.message}`);
    process.exit(1);
  }
}

async function getMessageStoreReportArchiveContent(contentUri, fileName) {
    try {
        const uri = await platform.signUrl(contentUri);
        download(uri, fileName, () => console.log('Save report zip file to the local machine.'));
    } catch (e) {
        console.error(`Failed to generate signed url : ${e.message}`);
        process.exit(1);
    }
}

function download (uri, dest, cb) {
  const file = fs.createWriteStream(dest);
  https.get(uri, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}
