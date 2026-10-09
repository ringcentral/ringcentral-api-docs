# Number Lookup

REST API to find out statuses and network info of phone numbers.

<div markdown="1">
<iframe width="560" height="315" src="https://www.youtube.com/embed/yxsRIis8kHE" title="Number Lookup tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Setup

This tutorial will guide you through the setup of the Number Lookup API.

!!! info "Independent Account Required: To use the capabilities detailed below, you will need to sign up for a separate account directly via the Messente team. [Contact Messente to Sign-up →](https://messente.com/talk-to-sales)"

1. Log in to your Messente account*.
2. Obtain your Messente API username and API password from [API Settings page](https://dashboard.messente.com/api-settings).
3. Start using the API.

!!! note
    Please [contact sales](https://messente.com/talk-to-sales) if you don't have an account yet.

## Pricing

The cost for Number Lookup API is a fixed **€199 monthly fee** plus a **0.002€ per number lookup** charge.

## API request authentication

### API endpoint

Number Lookup API requests are made to the following server:

```text
https://api.messente.com
```

### Authentication

Authentication is done using HTTP Basic Authentication using your Messente API username and password.

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

---

## Next Steps

Check out a more detailed [Number Lookup API reference](https://messente.com/documentation/messente-api/number-lookup/).
