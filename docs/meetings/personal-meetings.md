# Finding your personal meeting ID

??? warning "This is for RingCentral Video. Looking for the RingCentral Meetings API?"
     This Quick Start is designed for **RingCentral Video**, RingCentral's built-from-the-ground-up meetings platform. If you are looking to get started using our older RingCentral Meetings API, we have just the [RingCentral Meetings guide for you](../../rcm/create-meeting/). 

Every RingCentral Video account holder has a "Personal Meeting ID." This personal meeting ID is a persistent location in which to hold meetings. It is often used for having a quick ad-hoc meeting with a group of people. Developers may need to find a user's personal meeting ID when building user flows that allow users to schedule meetings -- often you may want to ask, "use your personal meeting ID?"

To retrieve your person meeting ID formulate a request like the following:

    GET /rcvideo/v1/bridges?default=true