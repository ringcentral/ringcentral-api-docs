# Outbound webhooks to enable interactive messages

Messages posted RingCentral add-ins can optionally contain interactive elements such as buttons, and forms. When users engage with these interactive elements, RingCentral will transmit a message to your add-in via the outgoing webhook URL associated with your app. Your application can then take the corresponding action, and respond to RingCentral in order to inform RingCentral if the action was successful or not. This will give your application the means of providing some feedback directly to the user who took action on a message your add-in posted. 

In the sections that follow, we will walk you through this interaction model so that your add-in can effectively respond to button clicks, form submissions and other interactive message events. 

## Outgoing webhook event

When a user engages with an interactive message, RingCentral will transmit to your add-in's outgoing webhook URL a message that looks similar to the following:

```json

```

## Responding to an outgoing webhook event




