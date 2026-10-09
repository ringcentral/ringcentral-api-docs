// 1. Get a temporary WebHook URL from https://webhook.site.
// Leave the website open. This is where you'll see your incoming delivery reports.
// 2. Edit the previous code example by adding the delivery URL to the request.
const omnimessage = MessenteApi.Omnimessage.constructFromObject({
  messages: [sms],
  to: '<recipient_phone_number>',
  dlrUrl: '<webhook_url>',
});
// 3. Send an SMS with the script and monitor the incoming requests on the webhook's website.
