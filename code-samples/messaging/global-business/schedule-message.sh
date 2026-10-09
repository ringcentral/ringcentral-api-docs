curl -X POST \
  'https://api.messente.com/v1/omnimessage' \
  -u 'YOUR_MESSENTE_API_USERNAME:YOUR_MESSENTE_API_PASSWORD' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "to": "<recipient_phone_number>",
    "time_to_send": "2019-06-22T09:05:07+04:00",
    "messages": [
      {
        "channel": "sms",
        "sender": "<sender name (optional)>",
        "text": "hello sms"
      }
    ]
  }'
