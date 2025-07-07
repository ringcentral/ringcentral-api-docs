<?php
// Provide your call queue extension id and the supervisor extension id!
create_callqueue_custom_answering_rule("Callqueue-ExtId", "Supervisor-ExtId");

/*
* Create a call queue custom answering rule
*/
function create_callqueue_custom_answering_rule($callqueueExtId, $supervisorExtId) {
  global $platform;
  try {
    $vipCustomerContacts = [
          [
            "callerId" => "+16501111111",
            "name" => "Kristina Grant"
          ],
          [
            "callerId" => "+16502222222",
            "name" => "Sandra Bell"
          ],
          [
            "callerId" => "+16503333333",
            "name" => "David Peterson"
          ],
          [
            "callerId" => "+16504444444",
            "name" => "Lena Shanon"
          ],
          [
            "callerId" => "+16505555555",
            "name" => "Christine Lee"
          ]
      ];

      $bodyParams = [
          'enabled' => true,
          'type' => 'Custom',
          'name' => 'VIP Support Rule',
          'callers' => $vipCustomerContacts,
          'schedule' => [
              'ref' => 'BusinessHours'
          ],
          'callHandlingAction' => 'AgentQueue',
          'queue' => [
              'transferMode' => 'Simultaneous',
              'maxCallers' => 10,
              'holdTime' => 20,
              'maxCallersAction' => 'TransferToExtension',
              'holdTimeExpirationAction' => 'TransferToExtension',
              'transfer' => [
                  [
                      'extension' => [
                          'id' => $supervisorExtId
                      ],
                      'action' => 'MaxCallers'
                  ],
                  [
                      'extension' => [
                          'id' => $supervisorExtId
                      ],
                      'action' => 'HoldTimeExpiration'
                  ]
              ]
          ]
      ];
    $endpoint = "/restapi/v1.0/account/~/extension/".$callqueueExtId."/answering-rule";
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ($resp->json());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Unable to create a call queue custom answering rule: ' . $e->getMessage() . PHP_EOL;
  }
}
?>
