<?php

create_user_interaction_rule();

/*
* Create a user interaction rule
*/
function create_user_interaction_rule(){
  global $platform;
  try {
    $vipCustomerContacts = [
          [
              "phoneNumber" => "+16501111111",
              "name" => "Kristina Grant"
          ],
          [
              "phoneNumber" => "+16502222222",
              "name" => "Sandra Bell"
          ],
          [
              "phoneNumber" => "+16503333333",
              "name" => "David Peterson"
          ],
          [
              "phoneNumber" => "+16504444444",
              "name" => "Lena Shanon"
          ],
          [
              "phoneNumber" => "+16505555555",
              "name" => "Christine Lee"
          ]
      ];
    $bodyParams = [
        "conditions" => [
            [
                "type" => "Interaction",
                "from" => $vipCustomerContacts, // Assigned with the list of VIP customer contacts
                "to" => []
            ],
            [
                "type" => "State",
                "state" => [ "id" => "after-hours" ] // Match the after-hours schedule
            ]
        ],
        "dispatching" => [
            "actions" => [
                [
                    "type" => "RingGroupAction",
                    "enabled" => true,
                    "targets" => [
                        [
                            "type" => "AllMobileRingTarget",
                            "name" => "My mobile apps"
                        ]
                    ],
                    "duration" => 40
                ],
                [
                    "type" => "RingGroupAction",
                    "enabled" => true,
                    "targets" => [
                        [
                            "type" => "AllDesktopRingTarget",
                            "name" => "My desktop"
                        ]
                    ],
                    "duration" => 50
                ],
                [
                    "type" => "TerminatingAction",
                    "targets" => [
                        [
                            "type" => "VoiceMailTerminatingTarget",
                            "name" => "Voicemail",
                            "prompt" => [
                                "greeting" => [
                                    "effectiveGreetingType" => "Preset",
                                    "preset" => [
                                        "id" => "590080"
                                    ]
                                ]
                            ]
                        ],
                        [
                            "type" => "PlayAnnouncementTerminatingTarget",
                            "name" => "PlayAnnouncement",
                            "prompt" => [
                                "greeting" => [
                                    "effectiveGreetingType" => "Preset",
                                    "preset" => [
                                        "id" => "66816"
                                    ]
                                ]
                            ],
                            "dispatchingType" => "Ringing"
                        ],
                        [
                            "type" => "PhoneNumberTerminatingTarget",
                            "destination" => [
                                "phoneNumber" => "+14082324343" // Incoming calls are routed to Alex's personal phone number
                            ],
                            "dispatchingType" => "Terminating"
                        ]
                    ],
                    "ringingTargetType" => "PlayAnnouncementTerminatingTarget",
                    "terminatingTargetType" => "PhoneNumberTerminatingTarget"
                ]
            ],
            "type" => "Terminate"
        ],
        "enabled" => true,
        "displayName" => "VIP Calls After-Hours"
    ];
    $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules";
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ($resp->json());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to create a custom rule. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
