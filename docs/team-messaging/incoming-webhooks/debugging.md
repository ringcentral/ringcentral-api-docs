# Testing Incoming Webhooks using cURL

A simple way to test an Incoming Webhook and to make formatting messages easier is to use a simple command-line tool called cURL. Using this simple technique, you can place your message contents in a stand alone file, and then post that file to the URL of an Incoming Webhook.

Let's begin by creating the file `test.json` using the following contents:

```json
{
    "attachments": [
	{
	    "type": "Card",
	    "fallback": "Something bad happened",
	    "color": "#00ff2a",
	    "intro": "There was a disturbance in the force.",
	    "author": {
		"name": "Ben Kenobi",
		"uri": "https://en.wikipedia.org/wiki/Obi-Wan_Kenobi",
		"iconUri": "https://imgur.com/eaL6deH"
	    },
	    "title": "I felt something...",
	    "text": "...as if millions of voices suddenly cried out in terror and were suddenly silenced.",
	    "fields": [
		{
		    "title": "Where",
		    "value": "Alderaan",
		    "style": "Short"
		},
		{
		    "title": "What",
		    "value": "Giant explosion",
		    "style": "Short"
		}
	    ]
	}
    ]
}
```

Then from the same directory in which you created the above file, run the following command -- being sure to use the [Webhook URL you created on your own](../webhook-creation/). 

```sh
% curl -d @test.json -H 'Content-Type: application/json' \
     https://hooks.glip.com/webhook/v2/9e116c5c-xxxx-yyyy-zzzz-c12a85cd6063
```
