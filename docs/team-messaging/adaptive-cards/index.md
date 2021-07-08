# Adaptive Cards

RingCentral implements the Adaptive Card framework version 1.2. Originally developed by Microsoft, this open source framework aids developers and platforms with the development of richly formatted and interactive messages common to team messaging services. The framework has been implemented by  a number of service providers, including but not limited to:

* Microsoft Teams
* RingCentral MVP
* ??

This means that if you have developed integrations for any of the above platforms, the level of effort associated with developing for any of the other services that support Adaptive Cards is greatly reduced. 

## Supported actions

In addition to supporting the full array of display elements that aid in the rendering and presentation of a card, RingCentral currently supports the following actions:

* Action.OpenUrl - when invoked, RingCentral will open the designated URL in an external web browser
* Action.ShowCard - when invoked, RingCentral will display the designated Adaptive Card 
* Action.Submit - when invoked, RingCentral will collect the data entered into affiliated input elements and transmit them to the client
* Action.ToggleVisbility - when invoked, RingCentral will show and/or hide designated target elements 
