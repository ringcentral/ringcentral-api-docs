from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
import os, json

HOSTNAME = "localhost"
PORT     = 3000

class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_POST(self):
        path = self.path
        if path == "/webhook":
            content_len = int(self.headers.get('Content-Length'))
            body = self.rfile.read(content_len)
            jsonObj = json.loads(body)
            print( json.dumps(jsonObj, indent=2, sort_keys=True))
            self._set_response()
        else:
            print ("Ignore this")


def run(server_class = HTTPServer, handler_class = S):
    server_address = (HOSTNAME, PORT)
    httpd = server_class(server_address, handler_class)
    print (f'Artificial Intelligence response server running at: https://{HOSTNAME}:{PORT}')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()
