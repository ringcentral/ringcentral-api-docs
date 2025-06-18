# Call handling rules

Call handling refers to how incoming phone calls are processed within a RingCentral RingEX account to ensure they are routed to the appropriate extension or deliver an appropriate experience to the person making the call. Call handling is governed by a set of rules. Each rule contains a condition and an action to be followed when the condition is met. Below, you will learn how call handling works at a high-level, and in subsequent sections we will dive into the different elements to govern the routing and handling of call in more detail. 

## Use case: VIP call routing

To better understand the purpose of call routing, and to better help you imagine scenarios within your own company where call handling could be applied, let's look at an example use case involving AcmeTech, a hypothetical company that provides IT services to a range of clients. AcmeTech uses a CRM to manage customer information, including contract tiers, issue histories, account managers, and support SLAs. The company wants to ensure that VIP customers (those with premium support contracts) always receive expedited service when they call, even outside of regular business hours.

To achieve this, AcmeTech’s developers create an integration between their CRM and the RingCentral platform using our Call Handling APIs that does the following:

1. **Generates a list of VIPs from the CRM**. The CRM automatically generates a list of phone numbers associated with VIP customers. This list is kept up to date in real-time or on a scheduled basis.

2. **Updates call handling rules**. Using the Call Handling APIs, the integration updates call handling rules for key support agents and managers in the following ways:
    - The rule is engaged if the call is received after work hours. 
    - The system matches the caller's phone number to numbers on the VIP list.
    - If the caller is a VIP, the rule forwards the call to the appropriate agent’s mobile device or backup support contact.
    - Finally, if the call is not answered within a specified duration, it is routed to a voicemail with a custom greeting or escalated to another team.

#### Benefits

This use case illustrates how call handling rules can help AcmeTech achieve the following:

* **Improved Responsiveness:** VIP and high-priority clients receive faster and more personalized responses.
* **Automation:** Reduces the need for manual call handling configuration, saving time and ensuring consistency.
* **Scalability:** New users and call handling scenarios can be programmatically added or modified as business needs evolve.

## Creating call handling rules using Admin Console

To begin, let's see how one can manage and setup call handling rules using the RingCentral Admin Console. This is a good place to start because the user interface provides an easy way to experiment with different configurations, and is ideal for most use cases. We will later discuss how rules can be constructed programmatically via an API, which is appropriate for use cases that require automated rule setting, or automated user provisioning. 

One can access their personal call handling from the [Admin Console](https://service.ringcentral.com) under the personal settings under "Phone." 

!!! info "Users can also access call handling rules from the [RingCentral desktop app](https://app.ringcentral.com) under Settings > Phone > Incoming call rules"

![Where to find call handling in Admin Console](../../../img/call-handling-sw.png){ .img-fluid .mw-600 }

User can add and change call handling rules from their admin portal:

![Call handling rules in Admin Console](../../../img/call-handling-sw-rules.png){ .img-fluid .mw-600 }

## Call handling rule types

Given that any account could have a number of different and often competing rules in effect, rules are divided into different categories, with each category or type having a different priority or precedence. Rules are evaluated in the following order. The first rule whose conditions match the incoming call will be executed. 

When it comes to the API, each rule is expressed using a relatively unique syntax, which you will learn about with each rule. 

1. [Company rules](../company-rules.md)
2. [Forward-all-calls rules](forward-all-calls-rules.md)
3. [Do-not-disturb rules](dnd-rules.md)
4. [Custom, or interaction-based rules](custom-rules.md)
7. [Agent rules](agent-rules.md)
6. [Work-hour and after-hour rules](work-hour-rules.md)

## Dispatching methods

* Forward call
* Play announcement
* Send to voicemail

## Call handling conditions

* the number being called
* the person making the call
* time of day
* day of the week
* user availability

## Call handling actions



When the user is available, the system can apply:

- **Greeting** – Plays a customizable welcome message when a call is received.
- **Connecting Audio** – Plays music or a message while the call is being connected.
- **Simultaneous or Sequential Ringing** – Rings multiple devices either simultaneously or in a fixed order (e.g., desk phone, mobile app, desktop app) to help ensure the user doesn’t miss a call.

When the user is unavailable, the system can automatically perform one of the following actions:

- **Call Forwarding** – Redirects the call to another phone number or another user extension, such as a co-worker or a call queue.
- **Voicemail** – Sends the call to the user's voicemail with a preset or custom greeting.
- **Announcement Playback** – Plays a pre-recorded message and then ends the call.

This functionality allows users to tailor their call handling experience, ensuring that important calls are managed efficiently and in alignment with business workflows or personal preferences.

## User Call Handling Configuration Types

RingCentral's user call handling settings are divided into two main categories: state-based and custom (interaction-based) configurations. These configuration types define how incoming calls are routed based on predefined or user-defined conditions.

### State-Based Configurations

State-based configurations are system-defined and include the following five states:

- **Forward-All-Calls**
- **Do-Not-Disturb** (DND)
- **Work-Hours**
- **After-Hours** (if the Work-Hours schedule is defined different than 24/7)
- **Agent** (if the user is a member of a call queue)

These states are automatically created and come with default call handling behavior but can be customized by the user to suit individual preferences or operational needs. All state-based rules are triggered based on the user's set time schedules, with the exception of the **Do-Not-Disturb** state, which is activated by the user's presence status (DnD).

### Custom (Interaction-Based) Configurations

Custom configurations, also known as interaction rules, allow users to define additional call handling logic based on specific matching conditions. These rules can be triggered by:

- Caller ID
- Called number
- Custom time ranges (e.g., holidays, special events)

Custom configurations offer more granular control, allowing users to tailor their call routing logic beyond the constraints of the standard state-based system.

## User Call Handling Rules

A call handling rule defines how incoming calls are managed based on specific conditions. It determines how a call is greeted and how it rings through to the user when they are available. When the user is unavailable, the rule specifies how the call should be routed—such as to voicemail, another phone number, or a recorded announcement.

Each state-based and custom (interaction-based) configuration has its own set of rules, allowing users to tailor their call handling behavior for different scenarios. This flexibility helps streamline call management and ensures a consistent caller experience.

For example, a user can assign different voicemail greetings for the Forward-All-Calls and Do-Not-Disturb states. This enables callers to receive context-aware messages, such as estimated callback times or the reason for unavailability.

## Using User Call Handling APIs

All user call handling features available in the RingCentral Admin Portal can also be managed programmatically through APIs. This allows developers to integrate call handling controls with external systems and build intelligent workflows that dynamically configure or update user call handling settings—without requiring manual adjustments in the Admin Portal.

For example, if a user's paid time off (PTO) request is approved, the system can automatically enable the "Forward-All-Calls" state and set the appropriate schedule to cover the duration of the PTO, ensuring uninterrupted call routing during their absence.

The User Call Handling APIs in RingCentral give developers powerful capabilities to programmatically manage call handling configurations for individual user extensions. These APIs allow developers to create, read, update, and delete call handling rules—also known as user answering rules—which define how and when incoming calls should be managed.

For example, a developer could configure a rule that forwards calls from VIP clients during after-hours to a mobile device, while routing all other calls to voicemail. This type of automation can significantly enhance responsiveness and customer service—particularly for use cases such as after-hours support, holiday call routing, or dynamic team scheduling.

