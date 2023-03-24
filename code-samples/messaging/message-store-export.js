const RC  = require('@ringcentral/sdk').SDK
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

platform.on(platform.events.loginSuccess, function(e) {
  create_message_store_report()
});

async function create_message_store_report() {
  try {
    var endpoint = "/restapi/v1.0/account/~/message-store-report"
    var params = {
      dateFrom: "2019-03-01T00:00:00.000Z",
      dateTo: "2019-03-31T23:59:59.999Z"
    }
    var resp = await platform.post(endpoint, params)
    var jsonObj = await resp.json()
    get_message_store_report_task(jsonObj.id)
  } catch (e) {
    console.log(e)
  }
}

async function get_message_store_report_task(taskId) {
  console.log("check task creation status ...")
  try {
    var endpoint = "/restapi/v1.0/account/~/message-store-report/" + taskId
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    if (jsonObj.status == "Completed") {
      get_message_store_report_archive(jsonObj.id)
    } else {
      setTimeout(function() {
        get_message_store_report_task(taskId)
      }, 10000);
    }
  } catch (e) {
    console.log(e)
  }
}

async function get_message_store_report_archive(taskId) {
  console.log("getting report uri ...")
  try {
    var endpoint = `/restapi/v1.0/account/~/message-store-report/${taskId}/archive`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    var date = new Date()
    for (var i = 0; i < jsonObj.records.length; i++) {
      var fileName = "message_store_content_" + date.toISOString() + "_" + i + ".zip"
      get_message_store_report_archive_content(jsonObj.records[i].uri, fileName)
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
