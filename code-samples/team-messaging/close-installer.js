import { RingCentralNotificationIntegrationHelper } from 'ringcentral-notification-integration-helper'

const app = new RingCentralNotificationIntegrationHelper()

// Notify RingCentral app that the integration can submit (or not).
// RingCentral app can then toggle submit button in RingCentral app UI
app.send({
  canSubmit: true // or false if can not submit
})

// Receive message from RingCentral app that user has already
// clicked submit button so integration can proceed to submit.
app.on('submit', async function someSubmitFunction (e) {
  console.log(e.data.payload)
  // do something like submit
  const submitSuccess = await doSubmit()
  return {
      status: !!submitSuccess // true means submit success
                              // RingCentral app will close integration window
  }
})
