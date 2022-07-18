// This handler is called when a user submit data from an adaptive card
app.post('/user-submit', function (req, res) {
    console.log( "Received user submit event." )
    var body = req.body
    if (body.data.path == 'new-card'){
      var card = make_new_name_card( body.data.hellotext )
      send_card( body.conversation.id, card)
      res.status(200).end();
    }else if (body.data.path == 'update-card'){
      var card = make_hello_world_card( body.data.hellotext )
      update_card( body.card.id, card )
      res.status(200).end();
    }else if (body.data.path == 'open-dialog-card'){
      let dialog = {
          type: "dialog",
          dialog: {
              title: "This is a dialog in a card",
              size: "small",
              iconURL: "https://somedomain.com/icon.png",
              card: {
                  type: "AdaptiveCard",
                  version: "1.3",
                  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                  body: [{
                    type: "TextBlock",
                    text: "Hello dialog.",
                    wrap: true,
                    size: "ExtraLarge",
                    weight: "Bolder"
                  }]
              }
          }
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(dialog))
    }else if (body.data.path == 'open-dialog-iframe'){
      let dialog = {
          type: "dialog",
          dialog: {
              title: "This is a dialog in an iFrame",
              iFrameURL: "https://www.ringcentral.com"
          }
      }
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(dialog))
    }
});
