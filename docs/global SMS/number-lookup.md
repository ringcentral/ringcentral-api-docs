# Number Lookup

REST API to find out statuses and network info of phone numbers.

<div markdown="1">
<iframe width="560" height="315" src="https://www.youtube.com/embed/yxsRIis8kHE" title="Number Lookup tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Setup

This tutorial will guide you through the setup of the Number Lookup API.

!!! info "Independent Account Required: To get started contact [developer relations](https://developers.ringcentral.com/sms-api#requestinfo)"


## API request authentication

### API endpoint

Number Lookup API requests are made to the following server:

```text
https://api.messente.com
```

### Authentication

Authentication is done using HTTP Basic Authentication using your API username and password.

### Request and response body

All request and response bodies for the API calls are JSON encoded strings according to the specification.

### Response HTTP status codes

API call responses have status codes according to REST specifications.

Always set Accept and Content-Type headers to application/json as well.

Only 2xx response codes indicate a successful response.

### Number Lookup Call

Request to lookup a number will be made to the following URL:

```text
POST https://api.messente.com/v1/hlr/sync
```

### Request Headers

| HTTP header | Value | Required |
| :--- | :--- | :--- |
| Content-Type | application/json | Yes |
| Accept | application/json | Yes |

### Example request

```bash
curl -X POST \
  https://api.messente.com/v1/hlr/sync \
  -u YOUR_MESSENTE_API_USERNAME:YOUR_MESSENTE_API_PASSWORD \
  -H 'Content-Type: application/json' \
  -d '{
  "numbers": [
      "+37251000000",
      "+37251000001"
    ]
  }'
```

### Result fields

| Field | Description | Example |
| :--- | :--- | :--- |
| `number` | Number queried in e.164 format | e.g. `+15073040148` |
| `currentNetwork` | Detailed network information object | — |
| &nbsp;&nbsp;`currentNetwork.mccmnc` | Mobile Country Code and Network Code (e.g., 310 = USA, 170 = AT&T) | e.g. `310170` |
| &nbsp;&nbsp;`currentNetwork.networkName` | Mobile network name | e.g. `AT&T Mobility` |
| &nbsp;&nbsp;`currentNetwork.countryName` | Country name | e.g. `United States` |
| &nbsp;&nbsp;`currentNetwork.countryPrefix` | Country dialling prefix | e.g. `+1` |
| &nbsp;&nbsp;`currentNetwork.countryCode` | Country code | e.g. `USA` |
| `ported` | Indicates if a number is ported | `true`, `false` |
| `portedNetwork` | Network information for the network the number was ported to | `null` / e.g. `T-Mobile` |
| `roaming` | Indicates if a number is roaming | `true`, `false` |
| `roamingNetwork` | Network information for the network the number is roaming on | `null` / e.g. `Vodafone` |
| `status` | Status of phone number. *(Live Toll-Free numbers not text-enabled show as `INVALID`)* | `ON`, `OFF`, `INVALID`, `UNKNOWN` |
| `type` | Indicates SMS capability: `MOBILE` (Mobiles/text-enabled landlines) or `LANDLINE` (Cannot receive SMS) | `MOBILE`, `LANDLINE` |

#### Example response

```"numbers": [
        {
            "number": "+15713152421",
            "currentNetwork": {
                "mccmnc": "310160",
                "networkName": "T-Mobile US",
                "countryName": "United States",
                "countryPrefix": "+1",
                "countryCode": "USA"
            },
            "ported": true,
            "portedNetwork": null,
            "originalNetwork": null,
            "roaming": false,
            "roamingNetwork": null,
            "status": "ON",
            "type": "MOBILE"
        }
```
---

