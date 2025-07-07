const RC_SDK = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const CALLER       = process.env.RINGOUT_CALLER
const RECIPIENT    = process.env.RINGOUT_RECIPIENT

var rcsdk = new RC_SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
  call_ring_out()
})

/*
* Place a ring-out call
*/
async function call_ring_out() {
  try {
    let bodyParams = {
      from: { phoneNumber: CALLER },
      to: { phoneNumber: RECIPIENT },
      playPrompt: false
    }
    let endpoint = '/restapi/v1.0/account/~/extension/~/ring-out'
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log("Call placed. Call status: " + jsonObj.status.callStatus)
  } catch (e) {
    console.log("Unable to place a ring-out call.", e.message)
  }
}
// End of Quick Start Code Section

/**********************************************************
***********************************************************
 TEST SECTION - THESE FUNTIONS ARE NOT SHOWN IN DEV GUIDE
***********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}

exports.platform = platform;

boostrap_test_function()
async function boostrap_test_function(){
  console.log("boostrap_test_function")

  // await sleep(2000)
  // console.log("Test create a call monitoring group")
  // require ('./code-snippets/create-update-call-monitoring-group.js')
  // return
  //
  // await sleep(2000)
  // console.log("Test List Call Monitoring Groups")
  // require ('./code-snippets/call-monitoring-group.js')
  // return

  // await sleep(2000)
  // console.log("Test Supervise Call Session")
  // require ('./code-snippets/call-supervision.js')
  // return

/*
  await sleep(2000)
  console.log("Test Enrollment Speaker Identification")
  require ('./code-snippets/enrollment.js')
  return

  await sleep(2000)
  console.log("Test Summarization")
  require ('./code-snippets/summarize.js')
  return

  await sleep(2000)
  console.log("Test Speaker Diarization")
  require ('./code-snippets/speaker-diarization.js')
  return


  await sleep(2000)
  console.log("Test Speaker Identification")
  require ('./code-snippets/speaker-identifier.js')
  return

  await sleep(2000)
  console.log("Test Enrollment Extra")
  require ('./code-snippets/enrollment-extra.js')
  return

  await sleep(2000)
  console.log("Test Punctuation")
  require ('./code-snippets/punctuation.js')
  return
*/

  // await sleep(2000)
  // console.log("Test Call Handling V2")
  // require ('./code-snippets/change-fac-state-call-terminating-rules.js')
  // return

  // await sleep(2000)
  // console.log("Test Call Handling V2")
  // require ('./code-snippets/set-fac-state-schedule.js')
  // return

  // await sleep(2000)
  // console.log("Test Interaction Rule V2")
  // require ('./code-snippets/create-interaction-rule.js')
  // return

  // await sleep(2000)
  // console.log("Test Company Custom Rule")
  // require ('./code-snippets/create-company-answering-rule.js')
  // return

  await sleep(2000)
  console.log("Test Call queue Custome Rule")
  require ('./code-snippets/callqueue-answering-rule.js')
  return
}
