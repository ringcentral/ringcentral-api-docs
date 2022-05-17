const express = require('express')
const app = express()
const port = 3000

app.post('/ringcentral/webhooks', (req, res) => {
    let dialog = {
        "type": "dialog",
        "dialog": {
            "title": "I openned a dialog", "size": "small",
            "iconUrl": "https://somedomain.com/icon.png",
            "card": {
                "type": "AdaptiveCard", "version": "1.3",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "body": [ { "type": "TextBlock", "text": "Hello.",
                            "wrap": true, "size": "ExtraLarge", "weight": "Bolder" } ]
            }
        }
    }
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dialog))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
