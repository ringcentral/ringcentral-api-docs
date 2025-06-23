# Determining the correct meetings API to call

{! mdx_includes/video-beta-notice.md !}

RingCentral is committed to supporting both of our meeting solutions for the foreseeable future. These products are:

* [RingCentral Video](index.md) - our next-generation, built-from-the-ground-up meetings platform

Every account can be configured for either one meetings product or the other. It is important to know what meetings solution an account is configured for if you are to build an integration successfully for the platform.

To see which meetings product a user has configured, construct a request like the following:

```json
GET /restapi/v1.0/account/~/extension/~/video-configuration
```

This will return a simple response like the following:

```json
{ provider: 'RCMeetings' }
```

The two possible values for `provider` are:

* `RCMeetings`
* `RCVideo`
