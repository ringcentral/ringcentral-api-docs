const RC = require('@ringcentral/sdk').SDK
var fs    = require('fs')
var https = require('https');
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
    create_compliance_export_task()
})

async function create_compliance_export_task() {
    console.log("Create export task.")
    var params = {
	timeFrom: "2019-08-01T00:00:00.000Z",
	timeTo: "2019-08-26T23:59:59.999Z"
    }
    try {
	var resp = await platform.post("/team-messaging/v1/data-export", params)
	var jsonObj = await resp.json()
	get_compliance_export_task(jsonObj.id)
    } catch (e) {
	console.log(e.message)
    }
}

async function get_compliance_export_task(taskId) {
  console.log("Check export task status ...")
  try {
    var resp = await platform.get(`/team-messaging/v1/data-export/${taskId}`)
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

async function get_message_store_report_archive_content(contentUri, fileName){
  var arr = contentUri.split("//")
  var index = arr[1].indexOf('/')
  var domain = arr[1].substring(0, index)
  var path = arr[1].substring(index, arr[1].length)
  var tokenObj = await platform.auth().data()
  var accessToken = tokenObj.access_token
  download(domain, path, accessToken, fileName, function(){
    console.log("Save atttachment to the local machine.")
  })
}

const download = function(domain, path, accessToken, dest, cb) {
  var file = fs.createWriteStream(dest);
  var options = {
          host: domain,
          path: path,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
      }
  const req = https.request(options, res => {
    res.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    });
  })
  req.on('error', error => {
    console.error(error)
  })
  req.end()
}
