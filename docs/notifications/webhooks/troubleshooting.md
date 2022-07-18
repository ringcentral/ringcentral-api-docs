# Troubleshooting webhooks and notifications 

## Why has RingCentral stopped delivering webhooks to my app?

If applications do not respond properly to webhooks being transmitted to them, either because the application fails to return a 200 response, or because of a prolonged outage, RingCentral may flag the webhook URL and the corresponding subscription as invalid. When this happens, RingCentral will suspend the subscription permanently and webhooks will no longer be delivered. 

### How can I check the status of my subscription?

One can retrieve a list of subscriptions, or fetch a single subscription, to determine the current status of that subscription. Below is a sample response showing a subscription that has been "blacklisted."

```javascript hl_lines="8"
{!> code-samples/webhooks/blacklist.json !}
```

To fix the problem, a developer can delete the subscription and register a new one. The developer is free to use the same URL as before. 
