require('dotenv').config();
const RC  = require('@ringcentral/sdk').SDK;
var fs    = require('fs')
var https = require('https');

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

platform.on(platform.events.loginSuccess, createComplianceExporTask);

async function createComplianceExporTask() {
    console.log('Create export task');
    try {
        const response = await platform.post('/restapi/v1.0/glip/data-export', {
            timeFrom: '2021-09-01T00:00:00.000Z',
            timeTo: '2022-02-01T23:59:59.999Z'
        });
        const json = await response.json();
        getComplianceExportTask(json.id);
    } catch (e) {
        console.error(`Failed to generate compliance export task : ${e.message}`);
        process.exit(1);
    }
}

async function getComplianceExportTask(taskId) {
    console.log('Check export task status ...');
    try {
        const response = await platform.get(`/restapi/v1.0/glip/data-export/${taskId}`);
        const json = await response.json();
        switch (json.status) {
            case 'Completed': {
                json.datasets.forEach((dataset, i) => {
                    const fileName = `rc-export-reports-${json.creationTime}_${i}.zip`;
                    getReportArchivedContent(dataset.uri, fileName);
                });
                break;
            }
            case 'Accepted':
            case 'InProgress': {
                setTimeout(() => getComplianceExportTask(taskId), 5000);
                break;
            }
            default: {
                console.log(json.status)
            }
        }
    } catch (e) {
        console.log(`Failed to get compliance task details: ${e.message}`);
        process.exit(1);
    }
}

async function getReportArchivedContent(contentUri, fileName) {
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
