let bodyParams = {
    conditions: [
        {
            type: "Interaction",
            from: vipCustomerContacts, // Assigned with the list of VIP customer contacts
            to: []
        },
        {
            type: "State",
            state: { id: "after-hours" } // Match the after-hours schedule
        }
    ],
    dispatching: {
        actions: [
            {
		type: "RingGroupAction",
		enabled: true,
		targets: [
		    {
			type: "AllMobileRingTarget",
			name: "My mobile apps"
		    }
		],
		duration: 40
            },
            {
		type: "RingGroupAction",
		enabled: true,
		targets: [
		    {
			type: "AllDesktopRingTarget",
			name: "My desktop"
		    }
		],
		duration: 50
            },
            {
		type: "TerminatingAction",
		targets: [
		    {
			type: "VoiceMailTerminatingTarget",
			name: "Voicemail",
			prompt: {
			    greeting: {
				effectiveGreetingType: "Preset",
				preset: {
				    id: "590080"
				}
			    }
			}
		    },
		    {
			type: "PlayAnnouncementTerminatingTarget",
			name: "PlayAnnouncement",
			prompt: {
			    greeting: {
				effectiveGreetingType: "Preset",
				preset: {
				    id: "66816"
				}
			    }
			},
			dispatchingType: "Ringing"
		    },
		    {
			type: "PhoneNumberTerminatingTarget",
			destination: {
			    phoneNumber: "+14082324343" // Incoming calls are routed to Alex's personal phone number
			},
			dispatchingType: "Terminating"
		    }
		],
		ringingTargetType: "PlayAnnouncementTerminatingTarget",
		terminatingTargetType: "PhoneNumberTerminatingTarget" // Indicating that incoming calls are terminated and forwarded to a phone number.
            }
        ],
        type: "Terminate"
    },
    enabled: true,
    displayName: "VIP Calls After-Hours"
}
