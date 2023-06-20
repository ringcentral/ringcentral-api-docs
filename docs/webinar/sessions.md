# Webinars and webinar sessions

{! mdx_includes/webinar-beta-notice.md !}

Among the first things to learn about the RingCentral Webinar system, is how webinars are structured. Unlike other webinar products, RingCentral has webinars that are heirarchical in nature. Meaning, that if you are hosting a webinar that is part of a series, then one would create a single webinar comprised of multiple sessions. Some examples of a webinar series might be:

* A company hosting two all-hands meetings for employees in widely different timezones
* A company hosting a weekly webinar series for customers
* A multi-day virtual conference

In all of the examples above, there is a need to host more than one event, each at a different time, for which all events are related to the same campaign, topic, or goal.

## Webinars vs webinar sessions

A "webinar" is a container that governs the behavior and settings of all the sessions associated with any given webinar. 

A webinar "session" on the other hand is associated with a date and time in which a webinar will be or was hosted. Furthermore, after a webinar's session has been concluded, it is the session that will contain a lot of the metadata that developers may wish to access to better understand at a high-level what transpired during the webinar session. For example, via the session, a developer can determine:

* How many participants there where
* How many people attended the webinar
* What the URL is of the webinar's recording
* The current runtime status of the webinar session, e.g. active, scheduled or finished
* The scheduled vs actual start and end time
* The bridge ID of the webinar, used by participants to join a webinar

{! mdx_includes/webinar-session-limits.md !}
