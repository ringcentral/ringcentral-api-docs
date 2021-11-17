# Introduction to Call Routing on RingCentral

## What is Call Routing?

Within the RingCentral platform "call routing" refers to the set of activities and configurations within a RingCentral account to control how calls flow and are routed through their network.

## What are the components of call routing?

Calls that are placed into a RingCentral account can be managed and routed a number of different ways via the Call Routing API. These are:

### Business Hours

Developers can designate a schedule for both users and companies to reflect when a user or company is able to receive calls. Once a set of business hours are defined, a [Call Handling Rule](./manual/answering-rules/) can be setup to determine what actions should be taken during business hours and outside of business hours.

* [Set up your business hours using the Admin Console](https://success.ringcentral.com/lc/cms/AdminSettings?pageid=a6C34000000TNFzEAO&isotope=a6734000000Go56AAC)

### Call Blocking

Developers can define via the Call Routing API what types of calls should be blocked, or specifically allowed. Calls can be allowed or blocked and handled based upon any of the following criteria:

* Was caller ID transmitted?
* Was a pay phone used?
* Is the call a voice or fax call?
* What is the specific phone number making the call?

When a call is blocked, developers can designate a recorded message to direct the caller to hear.

### Call Forwarding and Flipping

Call Forwarding rules allow a developer to specify for an extension within an organization to which calls will be automatically forwarded to when another extension is called. This is a good solution for individuals, for example, to say, "while I am out of town, please forward my calls to Janice."

Call Flipping specifically applies to active calls, and allows a call to be instantly and transparently transferred to another phone number. For example, I may be on my desk phone and need to get in my car to head home - in which case I would flip the call from my desk phone to my mobile phone without the person on the other end being away the transfer took place.

* [Learn how to set call forwarding for your business hours in the Admin Console](https://support.ringcentral.com/article/9758.html?language=en_US)

### Call Queues

A Call Queue is a group of users one can designate to share incoming calls. For example, you may wish to group all customer support representatives together so that a call can be routed to the first available person in that group. The Call Queue API allows developers to manage call queues by adding and removing extensions from a Call Queue to assist in routing calls quickly and efficiently to a human to answer.

* [Read about the Call Queue API](./manual/call-queues/)
* [Learn how to create a Call Queue Group in the Admin Console](https://support.ringcentral.com/s/article/How-to-change-the-number-of-your-department-members?language=en_US)

### Call Routing and IVR

Call Routing, or IVR ("Interactive Voice Response"), is the means by which one builds what is commonly referred to as a phone tree, e.g. "if you would like to speak to someone in Sales, please press '2' now." The Call Routing API allows developers to:

* **Create, update and delete IVR prompts** - an IVR prompt is the recorded greeting that is played to the caller.
* **Create, update and delete IVR menus** - an IVR menu is what is bound to an IVR prompt and is what governs what menu options will be made available to users, and what actions will be taken when those options are selected.

* [Learn how to setup Multi-level IVR in the Admin Console](https://support.ringcentral.com/article/6562.html?language=en_US)
                                                            
### Rule Management

The Rule Management API allows developers to create highly customized call handling systems that seek to optimize how quickly a caller is connected to another individual within a large enterprise. The Rule Management API enables the following use cases:

* Allow personal phones to be dialed when an internal extension is dialed.
* Transfer a call to another extension.
* Force calls that meet specific criteria to voicemail.
* Fine tune the rules to govern call queues: hold/wait times.
* Set dial sequences to run serially or in parallel.
* Manage an agent's availability status after a call is concluded.
* Determine what greetings are played.
* Setup call screening rules, e.g. when should a caller be prompted for their name.
