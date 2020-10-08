const RingCentral = require('@ringcentral/sdk').SDK
var fs = require('fs')
var https = require('https');

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })
  .then(function(resp) {
    create_compliance_export_task()
  });
}

async function create_compliance_export_task() {
  console.log("Create export task.")
  var params = {
    timeFrom: "2019-08-01T00:00:00.000Z",
    timeTo: "2019-08-26T23:59:59.999Z"
  }
  try {
    var resp = await platform.post("/restapi/v1.0/glip/data-export", params)
    var jsonObj = await resp.json()
    get_compliance_export_task(jsonObj.id)
  } catch (e) {
    console.log(e.message)
  }
}

async function get_compliance_export_task(taskId) {
  console.log("Check export task status ...")
  try {
    var resp = await platform.get(`/restapi/v1.0/glip/data-export/${taskId}`)
    var jsonObj = await resp.json()
    if (jsonObj.status == "Completed") {
      for (var i = 0; i < jsonObj.datasets.length; i++) {
        var fileName = `rc-export-reports-${jsonObj.creationTime}_${i}.zip`
        get_report_archived_content(jsonObj.datasets[i].uri, fileName)
      }
    } else if (jsonObj.status == "Accepted" || jsonObj.status == "InProgress") {
      setTimeout(function() {
        get_compliance_export_task(taskId)
      }, 5000);
    } else {
      console.log(jsonObj.status)
    }
  } catch (e) {
    console.log(e)
  }
}

async function get_report_archived_content(contentUri, fileName) {
  var uri = platform.createUrl(contentUri, { addToken: true });
  download(uri, fileName, function() {
    console.log("Save report zip file to the local machine.")
  })
}

const download = function(uri, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(uri, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  });
}