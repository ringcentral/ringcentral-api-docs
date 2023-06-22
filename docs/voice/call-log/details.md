# Working with detailed call log data

In this tutorial, you will learn how to navigate and make use of more detailed and comprehensive call log data. In case you don't have a lot of data in your account to work with, we will begin by creating some test data.  

## Create Test Data

1. There are a few ways you can do this, but the easiest way is to login to the RingCentral [unified app sandbox](https://app.devtest.ringcentral.com/) via the web and to place and receive calls from that phone.

2. Make sure to record one of these calls by pressing the `Record` button in the soft phone and ensuring the call lasts for at least 30-60 seconds, then click the `Record` button again to stop the recording.

3. Now, make two more outbound calls from your RingCentral Soft Phone (making sure to adjust the settings of the SoftPhone Calling set to `Direct Dial` instead of `RingOut`. (this generates calls with a single leg)

## Retrieve Call Log Data via the API

Now check that the call records exist in the API, first fetch an `access_token` for the User you used to initiate the above calls.

```http
GET /restapi/v1.0/account/~/extension/~/call-log HTTP/1.1
Host: platform.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_VALID_ACCESS_TOKEN 
```

We should now have a list of call records. If you followed steps 1 through 3 above you should see these records specifically. You should observe:

* The legs for multi-legged calls are missing.
* We can see the three different recordings, but one of these calls was made to a call group from an outside line. 

```json
{
    "uri": "https://platform.ringcentral.com/restapi/..snip..&page=1&perPage=100",
    "records": [
        {
            "uri": "https://platform.ringcentral.com/restapi/..snip../ASaxDDkSZ5s42MA?view=Simple",
            "id": "ASaxDDkSZ5s42MA",
            "sessionId": "13916417004",
            "startTime": "2016-06-06T23:07:20.000Z",
            "duration": 55,
            "type": "Voice",
            "direction": "Inbound",
            "action": "Phone Call",
            "result": "Accepted",
            "to": {
                "phoneNumber": "+15625555778",
                "name": "SDK Engineer Candidate"
            },
            "from": {
                "phoneNumber": "+14155555908",
                "name": "SAN FRANCSCO CA",
                "location": "San Francisco (South), CA"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../recording/1662272004",
                "id": "1662272004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../recording/1662272004/content"
            }
        },
        {
            "uri": "https://platform.ringcentral.com/restapi/..snip../ASaoSC9FIMaOF24?view=Simple",
            "id": "ASaoSC9FIMaOF24",
            "sessionId": "13914800004",
            "startTime": "2016-06-06T18:12:30.000Z",
            "duration": 55,
            "type": "Voice",
            "direction": "Outbound",
            "action": "VoIP Call",
            "result": "Call connected",
            "to": {
                "phoneNumber": "+14155555908",
                "location": "San Francisco (South), CA"
            },
            "from": {
                "phoneNumber": "+16505556100",
                "name": "SDK Engineer Candidate"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../1659910004",
                "id": "1659910004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../1659910004/content"
            }
        },
        {
            "uri": "https://platform.devtest.ringcentral.com/restapi/..snip..?view=Simple",
            "id": "ASaoLzRiqjLaFYU",
            "sessionId": "13914782004",
            "startTime": "2016-06-06T18:07:41.000Z",
            "duration": 64,
            "type": "Voice",
            "direction": "Outbound",
            "action": "VoIP Call",
            "result": "Call connected",
            "to": {
                "phoneNumber": "+14155555908",
                "location": "San Francisco (South), CA"
            },
            "from": {
                "phoneNumber": "+16505556100",
                "name": "SDK Engineer Candidate"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../1659903004",
                "id": "1659903004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
            }
        }
    ],
    "paging": {
        "page": 1,
        "perPage": 100,
        "pageStart": 0,
        "pageEnd": 2
    },
    "navigation": {
        "firstPage": {
            "uri": "https://platform.ringcentral.com/restapi/..snip..&page=1&perPage=100"
        }
    }
}
```

### Filtering by a Time Range

If you already have plenty of call log data to sample from, you can scope the request to an appropriate time range by adding the `dateTo` and `dateFrom` query parameters (remember, ISO 8601 formatted and URL Encoded strings).

```http
GET /restapi/v1.0/account/~/extension/~/call-log?dateFrom=DATE&dateTo=DATE HTTP/1.1
Host: platform.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_VALID_ACCESS_TOKEN 
```

## Retrieve Detailed Call Log Data

Fetch the list of "Detailed" call logs so we can inspect the Detailed records. We do this by adding the `view` query paremter and setting it equal to `Detailed`.

```http
GET /restapi/v1.0/account/~/extension/~/call-log?view=Detailed HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_VALID_ACCESS_TOKEN 
```

If everything worked, we should receive an HTTP 200 response with the JSON body which contain the `legs` property. Specifically, for the most recent item in the list which was used to make an inbound call to a Call Group, we can see the second leg being connected from the outside line to the Call Group main number:

```json
{
    "uri": "https://platform.ringcentral.com/restapi/..snip../call-log?..snip..&perPage=100",
    "records": [
        {
            "uri": "https://platform.ringcentral.com/restapi/..snip../ASaxDDkSZ5s42MA?view=Detailed",
            "id": "ASaxDDkSZ5s42MA",
            "sessionId": "13916417004",
            "startTime": "2016-06-06T23:07:20.000Z",
            "duration": 55,
            "type": "Voice",
            "direction": "Inbound",
            "action": "Phone Call",
            "result": "Accepted",
            "to": {
                "phoneNumber": "+15625555778",
                "name": "SDK Engineer Candidate"
            },
            "from": {
                "phoneNumber": "+14155555908",
                "name": "SAN FRANCSCO CA",
                "location": "San Francisco (South), CA"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../1662272004",
                "id": "1662272004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
            },
            "transport": "PSTN",
            "lastModifiedTime": "2016-06-06T23:08:23.336Z",
            "legs": [
                {
                    "startTime": "2016-06-06T23:07:20.000Z",
                    "duration": 55,
                    "type": "Voice",
                    "direction": "Inbound",
                    "action": "Phone Call",
                    "result": "Accepted",
                    "to": {
                        "phoneNumber": "+15625555778",
                        "name": "SDK Engineer Candidate"
                    },
                    "from": {
                        "phoneNumber": "+14155555908",
                        "name": "SAN FRANCSCO CA",
                        "location": "San Francisco (South), CA"
                    },
                    "recording": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../1662272004",
                        "id": "1662272004",
                        "type": "OnDemand",
                        "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
                    },
                    "transport": "PSTN",
                    "legType": "Accept",
                    "extension": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
                        "id": 664573005
                    }
                },
                {
                    "startTime": "2016-06-06T23:07:20.000Z",
                    "duration": 55,
                    "type": "Voice",
                    "direction": "Outbound",
                    "action": "VoIP Call",
                    "result": "Accepted",
                    "to": {
                        "phoneNumber": "+16505559233",
                        "location": "San Mateo, CA"
                    },
                    "from": {
                        "phoneNumber": "+14155555908",
                        "name": "SDK Engineer Candidate"
                    },
                    "recording": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../1662272004",
                        "id": "1662272004",
                        "type": "OnDemand",
                        "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
                    },
                    "transport": "VoIP",
                    "legType": "PstnToSip",
                    "extension": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
                        "id": 664573005
                    }
                }
            ]
        },
        {
            "uri": "https://platform.ringcentral.com/restapi/..snip../ASaoSC9FIMaOF24?view=Detailed",
            "id": "ASaoSC9FIMaOF24",
            "sessionId": "13914800004",
            "startTime": "2016-06-06T18:12:30.000Z",
            "duration": 55,
            "type": "Voice",
            "direction": "Outbound",
            "action": "VoIP Call",
            "result": "Call connected",
            "to": {
                "phoneNumber": "+14155555908",
                "location": "San Francisco (South), CA"
            },
            "from": {
                "phoneNumber": "+16505556100",
                "name": "SDK Engineer Candidate"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../1659910004",
                "id": "1659910004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
            },
            "transport": "VoIP",
            "lastModifiedTime": "2016-06-06T18:13:43.335Z",
            "legs": [
                {
                    "startTime": "2016-06-06T18:12:30.000Z",
                    "duration": 55,
                    "type": "Voice",
                    "direction": "Outbound",
                    "action": "VoIP Call",
                    "result": "Call connected",
                    "to": {
                        "phoneNumber": "+14155555908",
                        "location": "San Francisco (South), CA"
                    },
                    "from": {
                        "phoneNumber": "+16505556100",
                        "name": "SDK Engineer Candidate"
                    },
                    "recording": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../1659910004",
                        "id": "1659910004",
                        "type": "OnDemand",
                        "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
                    },
                    "transport": "VoIP",
                    "legType": "SipToPstnUnmetered",
                    "extension": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
                        "id": 664573005
                    }
                }
            ]
        },
        {
            "uri": "https://platform.ringcentral.com/restapi/..snip../ASaoLzRiqjLaFYU?view=Detailed",
            "id": "ASaoLzRiqjLaFYU",
            "sessionId": "13914782004",
            "startTime": "2016-06-06T18:07:41.000Z",
            "duration": 64,
            "type": "Voice",
            "direction": "Outbound",
            "action": "VoIP Call",
            "result": "Call connected",
            "to": {
                "phoneNumber": "+14155555908",
                "location": "San Francisco (South), CA"
            },
            "from": {
                "phoneNumber": "+16505556100",
                "name": "SDK Engineer Candidate"
            },
            "recording": {
                "uri": "https://platform.ringcentral.com/restapi/..snip../recording/1659903004",
                "id": "1659903004",
                "type": "OnDemand",
                "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
            },
            "transport": "VoIP",
            "lastModifiedTime": "2016-06-06T18:09:03.334Z",
            "legs": [
                {
                    "startTime": "2016-06-06T18:07:41.000Z",
                    "duration": 64,
                    "type": "Voice",
                    "direction": "Outbound",
                    "action": "VoIP Call",
                    "result": "Call connected",
                    "to": {
                        "phoneNumber": "+14155555908",
                        "location": "San Francisco (South), CA"
                    },
                    "from": {
                        "phoneNumber": "+16505556100",
                        "name": "SDK Engineer Candidate"
                    },
                    "recording": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../1659903004",
                        "id": "1659903004",
                        "type": "OnDemand",
                        "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
                    },
                    "transport": "VoIP",
                    "legType": "SipToPstnUnmetered",
                    "extension": {
                        "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
                        "id": 664573005
                    }
                }
            ]
        }
    ],
    "paging": {
        "page": 1,
        "perPage": 100,
        "pageStart": 0,
        "pageEnd": 2
    },
    "navigation": {
        "firstPage": {
            "uri": "https://platform.ringcentral.com/restapi/..snip..&page=1&perPage=100"
        }
    }
}
```

## Inspecting Multi-Leg Calls

Inspecting the `legs` property of the multi-leg call, we can see two different `legType` properties, the most recent (legs[0]) was the `Accept` which occurred when the call was accepted on your SoftPhone, while the former (legs[1]) was the `PstnToSip` which occurred when the inbound call from my celluar device was pointed by RingCentral to the IVR setup within my account. The `from.name` property would not make sense if you were to neglect looking at the call legType.

```json
"legs": [
    {
        "startTime": "2016-06-06T23:07:20.000Z",
        "duration": 55,
        "type": "Voice",
        "direction": "Inbound",
        "action": "Phone Call",
        "result": "Accepted",
        "to": {
            "phoneNumber": "+15625555778", // The direct number of the Call Group defined in RingCentral
            "name": "SDK Engineer Candidate" // Name of the Extension that handled the call
        },
        "from": {
            "phoneNumber": "+14155555908",
            "name": "SAN FRANCSCO CA",
            "location": "San Francisco (South), CA"
        },
        "recording": {
            "uri": "https://platform.ringcentral.com/restapi/..snip../recording/1662272004",
            "id": "1662272004",
            "type": "OnDemand",
            "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
        },
        "transport": "PSTN",
        "legType": "Accept",
        "extension": {
            "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
            "id": 664573005
        }
    },
    {
        "startTime": "2016-06-06T23:07:20.000Z",
        "duration": 55,
        "type": "Voice",
        "direction": "Outbound",
        "action": "VoIP Call",
        "result": "Accepted",
        "to": {
            "phoneNumber": "+16505559233",
            "location": "San Mateo, CA"
        },
        "from": {
            "phoneNumber": "+14155555908",
            "name": "SDK Engineer Candidate"
        },
        "recording": {
            "uri": "https://platform.ringcentral.com/restapi/..snip../1662272004",
            "id": "1662272004",
            "type": "OnDemand",
            "contentUri": "https://media.ringcentral.com:443/restapi/..snip../content"
        },
        "transport": "VoIP",
        "legType": "PstnToSip",
        "extension": {
            "uri": "https://platform.ringcentral.com/restapi/..snip../664573005",
            "id": 664573005
        }
    }
]
```
