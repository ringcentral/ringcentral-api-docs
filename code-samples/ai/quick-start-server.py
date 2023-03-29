import os,sys
import logging
import requests
from pprint import pprint
from http.server import BaseHTTPRequestHandler, HTTPServer

PORT = 5000

# Handle Incoming HTTP requests
class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) 
        post_data = self.rfile.read(content_length) 
        if self.path == '/webhook':
            pp.pprint(post_data)
        self._set_response()

def run(server_class=HTTPServer, handler_class=S, port=8080):
    logging.basicConfig(level=logging.INFO)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    logging.info('Starting httpd...\n')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    logging.info('Stopping httpd...\n')

try:
    run( port=PORT )
except Exception as e:
    print(e)
