var http = require('http');
PORT  = 3000

var server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    if (req.url == "/webhook") {
      if (req.headers.hasOwnProperty("validation-token")) {
        res.setHeader('Content-type', 'application/json');
        res.setHeader('Validation-Token', req.headers['validation-token']);
        res.statusCode = 200;
        res.end();
      } else {
        var body = []
        req.on('data', function(chunk) {
          body.push(chunk);
        }).on('end', function() {
          body = Buffer.concat(body).toString();
          var jsonObj = JSON.parse(body)
          console.log(jsonObj.body);
        });
      }
    }
  }
});

server.listen(PORT);
console.log(`Listening on port ${PORT}`)
