no_breadcrumb:true

## Frequently Asked Questions (FAQ)

### General Platform Related FAQs:
### How do I get started ?

It's a simple 3 step process to use Artificial Intelligence APIs.

Step 1: Use your existing RingCentral MVP/Video Pro account or create a new one.

Step 2: Create an application from your developer console.

Step 3: Contact us to graduate your app to production.

Once done, you can start calling our AI APIs using the sample code mentioned under each API page.

Follow the [Prerequisites](prerequisites.md) guide to get up and running with your first API call.

### Where can I get Ringcentral account from?
In case you want to use your phone or video recordings with these APIs, you would need a RingCentral MVP account. You can get it from [here](https://www.ringcentral.com/office/plansandpricing.html).

For using these APIs with only RCV recordings, you can create a video only account from [here](https://www.ringcentral.com/office/plansandpricing.html#video).

### Is RingCentral Video Free, how do I get an account ?
It depends on your plan, RingCentral Video comes in both free and paid plans. Please refer to [this page for more information](https://www.ringcentral.com/office/plansandpricing.html#video). For testing purpose, you're welcome to create a free [RingCentral Video Pro account](https://www.ringcentral.com/signup.html).

### I receive an error when calling the API in the sandbox environment...
The RingCentral Artificial Intelligence API is not currently available in our sandbox. We ask developers to do their development in production. To gain access to production, please contact us as described in [Prerequisites](prerequisites.md)


### Artificial Intelligence API Related FAQs:
### What are Artificial Intelligence APIs?

These APIs provide ability to add intelligence to your 

1. audio/video meetings recordings

2. audio telephony calls recordings

3. contact center recordings

4. Textual conversations

i.e. automated call/meeting transcripts, interaction analysis, summaries, emotion detection, etc


### What capabilities these Artificial Intelligence APIs don't provide today?

Below are the capabilities that are not provided out of the box today (and may come in later)

1. Live meeting/call closed captioning

2. Automated Chatbots 

3. Automated Voice bots


### What can you build with Artificial Intelligence APIs ?

You can build next-generation AI-enabled analytics applications using our Artificial Intelligence APIs. There are some "hero" use cases that we have identified:

1. As a meeting admin or attendee in a corporate setup, I need enhanced post-meeting experience by automatically getting searchable transcript, summary, highlights, and actionable tasks to the attendees and getting them auto tracked.

2. As a healthcare service admin, I need an enhanced post doctor-patient virtual visit experience by automatically getting a transcript, summary, highlights, and log it against the patient record.

3. As a teacher in a school setup, I need to gauge my virtual teaching classes productivity via "talk to listen" ratios, and key topics discussed.

4. As a supervisor in a contact center setup, I need to gauge analyze calls coming into my agents' queue, talk to listen ratios, emotional and sentimental analysis.

5. As a compliance member, I need to understand the sentimental analysis of calls between HR members and employees and take corrective actions if needed.

### What languages are supported for media input? i.e English, German, Spanish?
Speaker identification itself is language-agnostic, but for all other APIs we only support English. Other languages to some soon.

### What dialects and accents are supported for the English language?
By default, we enable the global English model which now supports a majority of english regional dialects out of the box. Developers don't need to worry about identifying and specifying the dialect in the API.

### How does AI API respond if the meeting recording has a mix of two languages, let's say 3 speakers with 2 speaking in English, and 3rd in Spanish.
All of it will be transcribed in English today, The transcription depends on the language code passed in the API call. More details to come here later on language codes.

### What languages are supported for text in API response?
Currently only English is supported.


### Technical FAQs:

### Is there an SDK for my favorite programming language ?

Yes, we have various SDK's for the RingCentral platform that you can refer to [here](https://developers.ringcentral.com/guide/sdks). However, for this particular API, you need to directly call the API endpoint. 

### Why my async request takes much time to get a 202 response?

You are probably passing the audio stream as `content` in the body request which takes more time to submit the request due to network latency. Even though `content` is supported, we recommend you to use a public-facing URL and pass it as `contentUri` parameter for faster request submission.

### What value should I pass for audioType in async requests?

Use `CallCenter` if the audio stream has 2-3 speakers. For 4-6 speakers use `Meeting`. Use `EarningsCalls` if you are analyzing earnings call recordings.

### Why my webhook callback URL from an async request takes upto 30 minutes sometimes? 

Yes, this happens, and it depends on the the amount of requests being processed in the cloud for the AI API. Most of the times, response should come in first 5-10 minutes, but in some exceptional cases it may take upto 30 mins as well. We are planning to add a status API, where you can check status of your job/request in case the response doesn't come back in 10-15 minutes.

### What audio formats are supported?

RingCentral supports various audio types for ease of integration. As a rule of thumb, we support all the audiotypes which are inherently supported by [ffmpeg](https://trac.ffmpeg.org/wiki/audio%20types). A more exhaustive list can be fetched via the command `ffmpeg -formats`.

### Can I call audio API on RingCentral Video (RCV) ?

Yes, you can get RingCentral Video recording (.mp4) using the RCV Meeting History API and use that to perform various ML Tasks such as speech to text, interaction analysis, etc using Audio AI APIs.

### What are webhooks and how to use them?

Webhooks are the user-defined HTTP callbacks, wherein, instead of pulling results from the server every now and then, you provide a webhook to the server while making a job request, to notify you when the job is complete. To know more about webhooks visit https://simonfredsted.com/1583.

To link up your requests to webhooks you can pass a `webhook` parameter when making these calls, containing a custom-defined webhook identifier. We’ll pass this identifier back to you with the webhook request.

For testing you can create a temporary webhook using [webhook.site](https://webhook.site) or [ngrok](https://ngrok.com)

For obvious reasons, DO NOT use LOCALHOST, 127.0.0.1 for the webhook.

### What is different between an Abstractive and a Extractive Summary?
The \analyze-interaction API returns the abstractive and extractive summary amongst other data objects. Abstracts or abstracted summaries are the AI's own generated words to summarize the content based on the speakers' speech. Extractive summaries,on the other hand, are highlighted paragraphs from the meeting/call.

<!--
### Is this correct understanding that Emotion API will provide Emotion quantification for the entire video/audio blog, but if we need utterance level emotion, then we need to use Interaction Analytics API?
Yes, it is advised to use interaction analytics to tie emotions to utterances. The audio emotion API works on the simple granularity of 3-second input. So if an input file is longer, we will return output for every 3-second chunk in the same JSON output. However, this isn't super helpful in analytics and isn't tying transcription together. Hence it is recommended to use interaction analytics if the end goal is to understand emotion at utterance level and not time-based (at every 3 seconds). 
-->

### How would speaker enrollment work for end customers? In simple words, what's the chronology of speaker APIs we need to use to get Speaker ID or Name in "Speech to Text" or "Interaction API" responses?
Speaker Enrollment needs to be added to the onboarding flow. So if there are 500 employees in an enterprise, and that enterprise wants to use RC AI APIs and tag speaker names/IDs/Titles in there, they would need to enroll all these employees.

 From a flow perspective, 
 
 1. Firstly, developers need to call the speaker enrollment API (by passing speakerId reference and voice sample) for all the users they want to enroll. This will create an association between ID and voice signature on the RC side for that account. (This would be in an onboarding flow-one time experience like Siri Onboarding)
 
 2. Then after meeting is done and the recording is available, in Interaction Analytics API/Speech to Text API response, RC platform will pass the speakerId reference/speaker ID for every user in that meeting/call recording.
 
 3. Based on the speakerID, the developer can reference it against the Speakers Name, Title, or other attributes to show in the application for a meaningful experience.

 For example, in a medical facility, let's say there are 50 doctors, who underwent this one-time onboarding. So, when there is a call between a doctor and a patient, the Interaction Analytics API will be able to provide references to the doctors, and not to the Patients. So in the front end application, we can show Doctor's name like "Doctor Matthew", and for an unidentifiable speaker, the application can say "Speaker" or "Patient" or "Other Speaker".

