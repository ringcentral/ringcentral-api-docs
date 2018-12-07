# Call Handling: Answering Rules

Answering Rules enable users to control how calls are handled when their extension is called. Users can set which phone numbers are called, in which order and after what delay, as well as configure Ring Groups.

Answering rules are handled by the `account/~/extension/~/answering-rule` endpoint and associate rules with phone numbers handled by the user's forwarding number endpoint. Each user has 2 default answering rules for business hours and after hours, known as `business-hours-rule` and `after-hours-rule`, as well as custom rules.

| API | path |
|-----|------|
| Answering Rule Endpoint | `v1.0/account/~/extension/~/answering-rule/` |
| Answering Rule Endpoint for Business Hours Rule | `v1.0/account/~/extension/~/answering-rule/business-hours-rule` |
| Answering Rule Endpoint for After Hours Rule | `v1.0/account/~/extension/~/answering-rule/after-hours-rule` |
| Forwarding Number Endpoint | `v1.0/account/~/extension/~/forwarding-number/` |

## Read Answering Rule List

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/account/{accountId}/extension/{extensionId}/answering-rule/` | Get extension rule list |

```http
GET /restapi/v1.0/account/11111111/extension/22222222/answering-rule HTTP/1.1
Accept: application/json
Authorization: Bearer MyAccessToken

{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule?page=1&perPage=100",
  "records": [
    {
      "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/33333333",
      "id": "33333333",
      "type": "Custom",
      "name": "My Custom Rule 1",
      "enabled": true,
      "callers": [
        {
          "callerId": "16505551212"
        }
      ],
      "callHandlingAction": "ForwardCalls"
    },
    {
      "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule",
      "id": "business-hours-rule",
      "type": "BusinessHours",
      "enabled": true,
      "callHandlingAction": "ForwardCalls"
    }
  ],
  "paging": {...},
  "navigation": {...}
}
```

## Read an Answering Rule

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}` | Get a rule |

**Example Request**

```http
GET /restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule HTTP/1.1
Accept: application/json
Authorization: Bearer MyAccessToken
```

**Example Response**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule",
    "id": "business-hours-rule",
    "type": "BusinessHours",
    "enabled": true,
    "schedule": {
        "ref": "BusinessHours"
    },
    "callHandlingAction": "ForwardCalls",
    "forwarding": {
        "notifyMySoftPhones": true,
        "notifyAdminSoftPhones": false,
        "softPhonesRingCount": 1,
        "ringingMode": "Sequentially",
        "rules": [
            {
                "index": 1,
                "ringCount": 4,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/33333333",
                        "id": "33333333",
                        "phoneNumber": "+16505551212",
                        "label": "My Cisco SPA-303 Desk Phone"
                    }
                ]
            },
            {
                "index": 2,
                "ringCount": 8,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/44444444",
                        "id": "44444444",
                        "phoneNumber": "+4155551212",
                        "label": "Home"
                    }
                ]
            },
            {
                "index": 3,
                "ringCount": 12,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/55555555",
                        "id": "55555555",
                        "phoneNumber": "+12125551212",
                        "label": "Mobile"
                    }
                ]
            }
        ]
    },
    "greetings": [
        {
            "type": "Voicemail",
            "prompt": {
                "id": "0",
                "type": "message",
                "name": "No One Available"
            }
        },
        {
            "type": "Introductory"
        },
        {
            "type": "AudioWhileConnecting",
            "prompt": {
                "id": "6",
                "type": "music",
                "name": "Acoustic"
            }
        },
        {
            "type": "ConnectingMessage",
            "prompt": {
                "id": "3",
                "type": "message",
                "name": "Forward hold 1"
            }
        }
    ],
    "screening": "Never",
    "voicemail": {
        "enabled": true,
        "recipient": {
            "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222",
            "id": 22222222
        }
    }
}
```

## Update an Answering Rule

Answering rules can be updated by configuring forwarding numbers individuall and in Ring Groups. For each forwarding number, the `index` and `forwardingNumber.id` is required.

The `ringCount` property indicates how many times the call should ring before moving to the next rule. Each ring corresponds to 5 seconds in the Online Account Portal.

**Example Request**


| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}` | Update a rule |

```http
PUT /restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule HTTP/1.1
Accept: application/json
Authorization: Bearer MyAccessToken
Content-Type: application/json

{
  "forwarding": {
    "rules": [
      {
        "index": 1,
        "ringCount": 2,
        "forwardingNumbers": [
          { id: "22223333" },
          { id: "22224444" }
        ]
      },
      {
        "index": 2,
        "ringCount": 4,
        "forwardingNumbers": [
          { id: "22225555" }
        ]
      }
    ]
  }
}
```

## Delete an Answering Rule

| Method | Endpoint | Description |
|--------|----------|-------------|
| `DELETE` | `v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}` | Delete a rule |

## Update a Forwarding Number

Permissions needed: EditExtensions
The business and after hours rules can forward calls to a set of forwarding numbers. To update the phone number used, identify the forwarding number in the list of rules and then update the phone number of that resource using a HTTP PUT request to the endpoint updating the phoneNumber property.

An update can be written as follows:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}` | Update a forwarding number |

**Example Request**

```http
PUT /restapi/v1.0/account/11111111/extension/22222222/forwarding-number/33333333 HTTP/1.1
Accept: application/json
Authorization: Bearer MyAccessToken
Content-Type: application/json

{
  "phoneNumber": "+16505551212"
}
```