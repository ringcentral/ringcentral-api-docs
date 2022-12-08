import requests
import base64

url = "https://platform.ringcentral.com/ai/audio/v1/async/speaker-diarize"

querystring = {"webhook":"<webhookUrl>"}

payload = {
    "encoding": "Mpeg",
    "languageCode": "en-US",
    "source": "RingCentral",
    "audioType": "Meeting",
    "separateSpeakerPerChannel": False,
    "speakerCount": 2,
    "speakerIds": [
        "speakerId1",
        "speakerId2"
    ],
    "enableVoiceActivityDetection": True,
}

# The api accepts data either as a url or as base64 encoded content
# passing payload as contentUri:
payload["contentUri"] = "https://publicly-facing-url.mp3"
# alternatively, passing payload as content:
with open(audioFileName, 'rb') as fin:
    audioContent = fin.read()

payload["content"] = base64.b64encode(audioContent).Decode('Utf-8')

headers = {
    'Content-Type': "application/json",
}

response = requests.post(url, json=payload, headers=headers, params=querystring)
print(response.status_code)
