# Working with Groups and Teams in Team Messaging

In RingCentral's team messaging product a "team" is a special kind of chat that is defined by the name or topic of discussion rather than the members of the chat (as is the case with "[conversations](../conversations/)").

## Team visibility

Teams can be either public or private. A public team is discoverable by everyone within an organization, whereas a private team is only discoverable by the members of that team.

## Creating Teams

Create a team by posting to the [teams endpoint](https://developers.ringcentral.com/api-reference/Teams/createGlipTeam). You can specify the name, description, team members, and its visibility within the organization.

When specifying the members of a team, one can provide a mix of either person IDs and/or email addresses. If the email address refers to someone outside the organization that person will be added to the team as a guest, and invoke an email onboarding flow for that user.

Please refer to the [Team Messaging Quick start](../../quick-start) for sample code

## Listing Teams

A list of teams can be retrieved by calling the [teams endpoint](https://developers.ringcentral.com/api-reference/Teams/listGlipTeamsNew). Long lists can be [iterated over using page tokens](../../manual/pagination/).

## Sample Code: Listing Teams from an account

The following code sample shows how to list all created teams under and account print out the team name and creation date and time.

!!! note "Running the code"
    * If you have tried the [Team Messaging quick start](../../quick-start), you can just copy all the functions below and add them to the quick start project then call the `list_teams("")` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"
    ```javascript
    {!> code-samples/team-messaging/code-snippets-headers/header.js !}
    {!> code-samples/team-messaging/code-snippets/list-teams.js [ln:10-] !}
    ```

=== "Python"
    ```python
    {!> code-samples/team-messaging/code-snippets/list-teams.py !}
    {!> code-samples/team-messaging/code-snippets-headers/footer.py !}
    ```

=== "PHP"
    ```php
    {!> code-samples/team-messaging/code-snippets-headers/header.php !}
    {!> code-samples/team-messaging/code-snippets/list-teams.php [ln:2-] !}
    ```

=== "Ruby"
    ```ruby
    {!> code-samples/team-messaging/code-snippets/list-teams.rb !}
    {!> code-samples/team-messaging/code-snippets-headers/footer.rb !}
    ```

=== "C#"
    ```c#
    {!> code-samples/team-messaging/code-snippets/list-teams.cs !}
    ```

=== "Java"
    ```java
    {!> code-samples/team-messaging/code-snippets/list-teams.java !}
    ```

## Finding the members of a teams

!!! warning "Unfortunately, there is not currently a way to retrieve the members of a team. The only way to find the members of a team is via the [Compliance Export](../../manual/compliance-export/)."

## Joining and leaving teams

A public team is visible to all users under the same account, a user can join a public team to become a new team member and existing members from any team can leave the team.

Joining a team and leaving a team can be done via the API:

The [join team](https://developers.ringcentral.com/api-reference/Teams/joinGlipTeamNew) and [leave team](https://developers.ringcentral.com/api-reference/Teams/leaveGlipTeamNew) endpoints can be called.

The join/leave endpoints work within the context of the currently authenticated user. Meaning if I authenticate to the API on behalf of user A, then calling these endpoints results exclusively in user A joining or leaving a team.

## Adding and removing team members

The add/remove team members endpoints provides the means of adding anyone to a team, and to add/remove people in batch. Using this endpoint one can add new members by their extension id or by their email address.

The [add team members](https://developers.ringcentral.com/api-reference/Teams/addGlipTeamMembersNew) and [remove team members](https://developers.ringcentral.com/api-reference/Teams/removeGlipTeamMembersNew) can be called.


### Example: adding team members in batch

The following code sample shows how to find a team id using a team name and add more members to the team.

!!! note "Running the code"
    * If you have tried the [Team Messaging quick start](../../quick-start), you can just copy all the functions below and add them to the quick start project then call the `find_team("", ...)` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"
    ```javascript
    {!> code-samples/team-messaging/code-snippets-headers/header.js !}
    {!> code-samples/team-messaging/code-snippets/add-team-members.js [ln:10-] !}
    ```

=== "Python"
    ```python
    {!> code-samples/team-messaging/code-snippets/add-team-members.py !}
    {!> code-samples/team-messaging/code-snippets-headers/footer.py !}
    ```

=== "PHP"
    ```php
    {!> code-samples/team-messaging/code-snippets-headers/header.php !}
    {!> code-samples/team-messaging/code-snippets/add-team-members.php [ln:2-] !}
    ```

=== "Ruby"
    ```ruby
    {!> code-samples/team-messaging/code-snippets/add-team-members.rb !}
    {!> code-samples/team-messaging/code-snippets-headers/footer.rb !}
    ```

=== "C#"
    ```c#
    {!> code-samples/team-messaging/code-snippets/add-team-members.cs !}
    ```

=== "Java"
    ```java
    {!> code-samples/team-messaging/code-snippets/add-team-members.java !}
    ```
