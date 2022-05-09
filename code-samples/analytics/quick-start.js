const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();
const fs = require("fs");

RINGCENTRAL_CLIENTID = process.env.RC_CLIENT_ID;
RINGCENTRAL_CLIENTSECRET = process.env.RC_CLIENT_SECRET;
RINGCENTRAL_SERVER = RC_SDK.server.sandbox;

RINGCENTRAL_USERNAME = process.env.RC_USERNAME;
RINGCENTRAL_PASSWORD = process.env.RC_PASSWORD;
RINGCENTRAL_EXTENSION = process.env.RC_EXTENSION;

let rcsdk = new RC_SDK({
  server: RINGCENTRAL_SERVER,
  clientId: RINGCENTRAL_CLIENTID,
  clientSecret: RINGCENTRAL_CLIENTSECRET
});

let platform = rcsdk.platform();

platform.login({
  username: RINGCENTRAL_USERNAME,
  password: RINGCENTRAL_PASSWORD,
  extension: RINGCENTRAL_EXTENSION
  }).then(async function(){
    try {
      let aggregateJSONString = fs.readFileSync("aggregate-request-body.json");
      let aggregateJSONBody = JSON.parse(aggregateJSONString);
      let aggregateResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/aggregate", aggregateJSONBody);
      let response = await aggregateResult.json();
      console.log("-----AGGREGATE DATA------");
      console.log(response.data[0]);
    }
    catch (e) {
      console.log(e.message);
    }
  }).then(async function(){
  try {
      let timelineJSONString = fs.readFileSync("timeline-request-body.json");
      let timelineJSONBody = JSON.parse(timelineJSONString);
      let timelineResult = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/timeline?interval=Week", timelineJSONBody);
      let response = await timelineResult.json();
      console.log("-----TIMELINE DATA------");
      console.log(response.data[0]);
    }
    catch (e) {
      console.log(e.message);
    }
  });