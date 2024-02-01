# Uninstalling a RingCentral Add-in

At any time, a previously installed add-in or incoming webhook can be deleted or uninstalled by an end user. It is recommended that when this happens, applications handle any necessary garbage collection - specifically the removal of any webhook that was created during the installation process. One can do this by subscribing to [event notifications related to the corresponding incoming webhook](../events/incoming-webhooks.md).

Consider the following sequence:

1. Priya installs an add-in for Service Foo into Team A. 
2. The add-in receives an incoming webhook URL from RingCentral and creates a webhook in Service Foo.
3. Service Foo begins delivering events to the add-in. 
4. Priya uninstalls the add-in. *At this point the app is uninstalled and no more messages will be posted by RingCentral. However, the originating service doesn't know this, and may still attempt to deliver events to the now defunct incoming webhook.*
5. The add-in receives notification that it has been uninstalled. 
6. The add-in makes an API call to Service Foo to delete the webhook it installed previously, ceasing the delivery of future event notifications. 

