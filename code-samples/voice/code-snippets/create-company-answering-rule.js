var platform = require('./../quick-start.js').platform;

create_company_custom_answering_rule()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    create_company_custom_answering_rule()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a company custom answering rule
*/
async function create_company_custom_answering_rule() {
  try {
    var bodyParams = {
      enabled: true,
      type: "Custom",
      name: "New Year Holiday",
      schedule: {
        ranges: [{
          from: "2025-12-31T17:00:00.00Z",
          to: "2026-01-02T08:00:00.00Z"
        }]
      },
      callHandlingAction: "Bypass",
      extension: { id: "62952481016" } // id of an announcement-only extension
    };
    let endpoint = "/restapi/v1.0/account/~/answering-rule"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json();
    console.log(jsonObj);
  } catch (e) {
    console.log("Unable to create a company custom answering rule. ", e.message);
  }
}
