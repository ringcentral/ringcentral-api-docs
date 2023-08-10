#### Clone the Video Client SDK sample application repository

```shell
% git clone https://github.com/ringcentral/ringcentral-videosdk-js-samples.git
```

#### Install the SDK and prerequisites

```shell
% cd ringcentral-videosdk-js-samples/basicMeeting
% yarn install
```

#### Edit `app.config.js`

Look for the variables below and enter the appropriate values you obtained above for each of the following:

* `clientId`
* `clientSecret`
* `jwt`

### Run the sample applicaton

```shell
yarn install
yarn run dev
```

Finally, open your browser to [https://localhost:9000/](https://localhost:9000/) to create or join a meeting.


