import os,sys
import logging
import requests
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# Server config. Set this to your local server and port
HOSTNAME = "localhost"
PORT     = 8080

# Handle Incoming HTTP requests
class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) 
        post_data = self.rfile.read(content_length) 
        print( json.dumps(json.loads(post_data), indent=2, sort_keys=True))
        self._set_response()

def run(server_class=HTTPServer, handler_class=S, hostName='localhost', port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = (HOSTNAME, port)
    httpd = server_class(server_address, handler_class)
    logging.info('Artificial Intelligence response server running at: https://%s:%s\n', hostName, port)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Artificial Intelligence response server stopping...\n')

try:
    run( hostName = HOSTNAME, port=PORT )
except Exception as e:
    print(e)
