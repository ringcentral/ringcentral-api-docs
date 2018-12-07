# Call Control

The Call Control API is a REST based interface, allowing developers to customize and integrate your phone system everywhere. It will help you build creative solutions based on our phone service and improve customer communications experience. The Call Control API makes it easy to make, retrieve, control and monitor calls.

*Please note that the API is currently in beta and subject to change. To gain access to this API please contact devsupport@ringcentral.com.*

## Terminology

*Session* - In the context of a call , a session is a high level resource, that contains all the 	 elements of a call, including the parties involved in the call.

*Party*  - Represents an active user in a call.

## Telephony Sessions Notifications

*telephony/sessions* - a new subscription endpoint filter that can be configured at an account or extension level to get notifications/data streams on an ongoing Active telephony sessions. 

The Extension Level Event Filter is: /restapi/v1.0/account/~/telephony/sessions

The Account Level Event Filter is: /restapi/v1.0/account/telephony/sessions

Based on the level where the subscription is configured,you will receive notifications accordingly and use the data there , primarily *telephonySessionId* & *partyId* to control an active call. 

*telephonySessionId* : The telephonySessionId represents an active Session and can be utilized to manage the session using Call Control APIs described later at a session level, example ending an active call.

*partyId* : The partyId represents an active party involved in the the active call/ Telephony Session. A combination of a telephonySessionId and partyId can be used to control parts of an active call for an user, like Hold/Unhold,Start,Stop recording etc using Call Control API's. Details are described later.

*Prerequisites for Using Call Control API* : The Prerequisites for using call control APIs are

                                             
1. Advanced User Permission - Call Control API is in Advanced API Category

2. Access to *telephonySessionId* and *partyId* for an Active Call. The access to these 2 components can be obtained in the following ways:

    * You can use presence endpoints to make a GET call to get active call details for a current user, including *telephonySessionId* and *partyId* , which you can then use to control parts of an Active Call.
    * You can user Telephony Sessions Subscriptions explained in the begining and covered later in the section to get all the status updates for various stages of an Active call from start to end including *telephonySessionId* and *partyId* data, which can then be used to control an active call. Details are covered later in the section.
    * You can also get *telephonySessionId* and *partyId*  by subscribing to Detail presence notifications(/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true).

