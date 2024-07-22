const SHARED_SECRET = "abcdefghijklmnopqrstuvwxyz"
api.post('/hook', function (req, res) {
 var signature = req.get('X-Glip-Signature');
 var bodyCrypted = require('crypto')
     .createHmac(
         'sha1',
         SHARED_SECRET
     )
     .update(JSON.stringify(req.body))
     .digest()
     .toString('hex');

 if (bodyCrypted !== signature) {
     res.status(401).send();
     return;
 }

 console.log('Webhook received')
 // code continues
})
