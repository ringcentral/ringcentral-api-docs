const http = require('http');
const PORT = 8080;

// Create a server to receive callback from RingCentral
const server = http.createServer( function(req, res) {
    if (req.method == 'POST' && req.url == "/webhook") {
        console.log("Response received from RingCentral...");
        if (req.headers.hasOwnProperty("validation-token")) {
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Validation-Token', req.headers['validation-token']);
        } 
        let body = []
        req.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            console.log(JSON.stringify(JSON.parse(body),null,4));
            res.statusCode = 200;
            res.end();
        });
    } else {
        console.log("Unknown HTTP content received")
    }
});

// Start the server
try {
    server.listen(PORT);
} catch (e) {
    console.log("There was a problem starting the server: " + e)
}
console.log("Artificial Intelligence response server running at: https://localhost:" + PORT)
