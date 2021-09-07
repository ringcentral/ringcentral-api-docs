from http.server import BaseHTTPRequestHandler, HTTPServer

class S(BaseHTTPRequestHandler):
    def do_POST(self):
        path = self.path
        if path == "/webhookcallback":
            validationToken = self.headers['Validation-Token']
            if validationToken is not None:
                self.send_response(200)
                self.send_header('Validation-Token', validationToken)
                return self.end_headers()
            else:
                content_len = int(self.headers.get('Content-Length'))
                payload = self.rfile.read(content_len)
                print (payload)
                return
        else:
            print ("Ignore this")


def run(server_class = HTTPServer, handler_class = S, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print ('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()
