# Supported use cases for RingCentral Webinar

There are two primary use cases for webinars that RingCentral Webinar and its API have been optimized to address. In breif, the use cases are:

* Large-scale internal company meetings
* Online events designed for a company's customers or partners

There are different considerations a developer must make regarding how they would go about building a solution depending upon the use case they are trying to address above. Below we describe these two use cases in more details, and share some developer constraints and best practices for each. 

## The "all-hands webinar" use case

The "all-hands" use case refers to a large-scale meeting a company may wish to host for all of their employees. A webinar is key to this use case because for large companies, it may not be practical or even possible to host a traditional RingCentral Video meeting that can accommodate everyone. Here are some of the things developers should know about hosting a large-scale internal meeting or webinar. 

* Hosts will need to use the [invitation process](invitees.md) to onboard presenters into the meeting
* All-hands webinars should disable registration. This will produce a single join URL that will be shared by all attendees. 
* Hosts can invite attendees via a single calendar invite that contains the shared join URL for that webinar. 

## The "marketing webinar" use case

* Marketing webinars should enable [registration](registrants.md). This will give each attendee a unique join URL to better track attendance. 
* Hosts will need to invite each individual attendee individually to the webinar. While all prospective attendee may access the registration form, each attendee will need to be registered individually. 
