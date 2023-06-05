var platform = require('./../quick-start.js').platform;
create_message_store_report()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    create_message_store_report()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a task to export the account messages within March 2023
*/
async function create_message_store_report() {
  try {
    var bodyParams = {
      dateFrom: "2023-03-01T00:00:00.000Z",
      dateTo: "2023-03-31T23:59:59.999Z"
    }
    var endpoint = "/restapi/v1.0/account/~/message-store-report"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    get_message_store_report_task(jsonObj.id)
  } catch (e) {
    console.log(e)
  }
}

/*
* Check the task completion status
*/
async function get_message_store_report_task(taskId) {
  try {
    var endpoint = `/restapi/v1.0/account/~/message-store-report/${taskId}`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    console.log(`Task creation status: ${jsonObj.status}`)
    if (jsonObj.status == "Completed") {
      get_message_store_report_archive(jsonObj.id)
    } else if ( jsonObj.status == "AttemptFailed" ||
                jsonObj.status == "Failed" ||
                jsonObj.status == "Cancelled" ) {
      console.log("Export message store failed.")
    } else {
      setTimeout(function() {
        get_message_store_report_task(taskId)
      }, 10000);
    }
  } catch (e) {
    console.log(e)
  }
}

/*
* When the task is completed, use the task id to get the uri of the report file
*/
async function get_message_store_report_archive(taskId) {
  console.log("Getting report uri ...")
  try {
    var endpoint = `/restapi/v1.0/account/~/message-store-report/${taskId}/archive`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    var date = new Date()
    for (var i = 0; i < jsonObj.records.length; i++) {
      var fileName = `message_store_content_${date.toISOString()}_${i}.zip`
      get_message_store_report_archive_content(jsonObj.records[i].uri, fileName)
    }
  } catch (e) {
    console.log(e)
  }
}

const fs    = require('fs')
const https = require('https')
const url = require('url')

async function get_message_store_report_archive_content(contentUri, fileName){
  var u = url.parse(contentUri)
  var tokenObj = await platform.auth().data()
  var accessToken = tokenObj.access_token
  download(u.host, u.path, accessToken, fileName, function(){
    console.log(`${fileName} file is saved to the local machine.`)
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
