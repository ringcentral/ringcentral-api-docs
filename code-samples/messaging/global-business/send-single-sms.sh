curl -X POST \
  'https://api.messente.com/v1/omnimessage' \
  -u 'YOUR_MESSENTE_API_USERNAME:YOUR_MESSENTE_API_PASSWORD' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "to": "<recipient_phone_number>",
    "messages": [
      {
        "channel": "sms",
        "sender": "<sender name (optional)>",
        "text": "hello sms"
      }
    ]
  }'
