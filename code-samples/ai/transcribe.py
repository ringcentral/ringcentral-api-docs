import os,sys
import logging
import requests
from ringcentral import SDK
from dotenv import load_dotenv
from http.server import BaseHTTPRequestHandler, HTTPServer

# Load Enviroment variables
load_dotenv()

# Handle Incoming HTTP requests
class S(BaseHTTPRequestHandler):
    def _set_response(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        if self.path == '/webhook':
            print(post_data)
        self._set_response()

# Invoke Speech to Text API
def speechToText():

    # Endpoint to invoke Speech to Text API 
    endpoint = os.getenv('RC_SERVER_URL')+"/ai/audio/v1/async/speech-to-text"

    querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}

    # Payload
    payload = {
        "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
        "encoding": "Wav",
        "languageCode": "en-US",
        "source": "RingCentral",
        "audioType": "Meeting",
        "enablePunctuation": True,
        "enableSpeakerDiarization": False
    }
    try:
        # Instantiate Ringcentral SDK 
        rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
        platform = rcsdk.platform()
        
        # Login Using JWT
        platform.login( jwt=os.getenv('RC_JWT') );
        
        # Make HTTP POST call to the Speech to Text endpoint with the query string and payload
        response = platform.post(endpoint, payload, querystring);
        print(response.json());

    except Exception as e:
        print(e)   

# Create HTTP server to listen on the defined port
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
    speechToText()
    run()

except Exception as e:
    print(e)

