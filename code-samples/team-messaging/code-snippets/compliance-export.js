var platform = require('./../quick-start.js').platform;
create_compliance_export_task()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    create_compliance_export_task()
})

/*
* Create a task to export the Team Messaging store for a period of time.
*/
async function create_compliance_export_task() {
  console.log("Create export task.")
  try {
    let bodyParams = {
        timeFrom: "2023-01-01T00:00:00.000Z",
        timeTo: "2023-01-31T23:59:59.999Z"
    }
    let endpoint = "/team-messaging/v1/data-export"
  	var resp = await platform.post(endpoint, bodyParams)
  	var jsonObj = await resp.json()
  	get_compliance_export_task(jsonObj.id)
  } catch (e) {
	  console.log(e.message)
  }
}

/*
* Check the status of the task using the taskId.
*/
async function get_compliance_export_task(taskId) {
  console.log("Check export task status ...")
  try {
    let endpoint = `/team-messaging/v1/data-export/${taskId}`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    if (jsonObj.status == "Completed") {
      for (var i = 0; i < jsonObj.datasets.length; i++) {
        var fileName = `rc-export-reports-${jsonObj.creationTime}_${i}.zip`
        get_report_archive_content(jsonObj.datasets[i].uri, fileName)
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


const fs    = require('fs')
const https = require('https')
const url = require('url')
const path = require('path')
/*
* Download the task compressed file and save to a local storage.
*/
async function get_report_archive_content(contentUri, fileName){
  var u = url.parse(contentUri)
  var tokenObj = await platform.auth().data()
  var accessToken = tokenObj.access_token
  download(u.host, u.path, accessToken, fileName, function(){
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
