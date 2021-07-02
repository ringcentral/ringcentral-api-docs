# Interactive messaging events for Team Messaging

Unlike other outbound events sent by RingCentral, events related to interactive messages so not require a subscription. Instead, when creating your application you will provide an "Outbound webhook URL." By so doing, your application will automatically be subscribed to any and all events relating to users engaging with interactive message elements. 

Interactive messaging events are also unique in that applications are expected to issue a response upon receiving an event that will signal to RingCentral how the system should respond to the event. See "Responding to interactive message events" below. 

## Interactive message event structure

## Responding to interactive message events

Upon receiving an interactive messaging event, applications are expected to respond with a payload that will instruct RingCentral on how to respond to a user's input. Responses can be used to:

* Return an error message to the user to let them know an action could not be performed. 
* Update the contents of the message.
* Post a new message in response.

Applications have 3 seconds in which to return a response. If a response is not returned in that timeframe, then TODO.

### Handling long running or asynchronous processes

Some actions that a user intiates may result in a process that takes longer than 3 seconds to complete. In these circumstances it is recommended that the application respond immediately by updating the message's contents to indicate that a process is running. When the action eventually completes, update the message contents a second time with the results of that action. 

### Responses
