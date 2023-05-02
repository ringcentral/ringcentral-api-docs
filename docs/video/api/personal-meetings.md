# Finding your personal meeting ID

{! mdx_includes/video-beta-notice.md !}

Every RingCentral Video account holder has a "Personal Meeting ID." This personal meeting ID is a persistent location in which to hold meetings. It is often used for having a quick ad-hoc meeting with a group of people. Developers may need to find a user's personal meeting ID when building user flows that allow users to schedule meetings -- often you may want to ask, "use your personal meeting ID?"

To retrieve the personal meeting ID for a user, formulate a request like the following:

    GET /rcvideo/v2/account/{accountId}/extension/{extensionId}/bridges/default

## Example code

=== "Javascript"

    ```js
    {!> code-samples/video/personal-meeting.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/video/personal-meeting.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/video/personal-meeting.php !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/video/personal-meeting.rb !}
    ```

=== "C#"

    !!! warning "C# and .NET SDKs are not currently available"
	    If you are looking to call RingCentral Video APIs using Java or C#, RingCentral Video APIs can't be invoked using RingCentra's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

=== "Java" 

    !!! warning "A Java SDK is not currently available"
        If you are looking to call RingCentral Video APIs using Java or C#, RingCentral Video APIs can't be invoked using RingCentra's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

## Sample personal meeting room response

```json
{!> code-samples/video/personal-meeting.json !}
```
