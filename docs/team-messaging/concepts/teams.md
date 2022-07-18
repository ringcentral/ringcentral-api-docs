# Working with Groups and Teams in Team Messaging

In RingCentral's team messaging product a "team" is a special kind of chat that is defined by the name or topic of discussion rather than the members of the chat (as is the case with "[conversations](../conversations/)"). 

## Team visibility

Teams can be either public or private. A public team is discoverable by everyone within an organization, whereas a private team is only discoverable by the members of that team.

## Creating Teams

Create a team by posting to the [teams endpoint](https://developers.ringcentral.com/api-reference/Teams/createGlipTeam). You can specify the name, description, its membership, and its visibility within the organization. 

```js
{!> code-samples/team-messaging/create-team.js [ln:1-38] !}
```

When specifying the members of a team, one can provide a mix of either person IDs and/or email addresses. If the email address refers to someone outside the organization that person will be added to the team as a guest, and invoke an email onboarding flow for that user. 

## Listing Teams

A list of teams can be retrieved by calling the [teams endpoint](https://developers.ringcentral.com/api-reference/Teams/createGlipTeam). Long lists can be [iterated over using page tokens](../../manual/pagination/). 

```js
{!> code-samples/team-messaging/get-chats-paginated.js [ln:1-47] !}
```

## Finding the members of a teams

!!! warning "Unfortunately, there is not currently a way to retrieve the members of a team. The only way to find the members of a team is via the [Compliance Export](../../manual/compliance-export/)."

## Joining and leaving teams

There are two ways a person can be added or removed from a team via the API:

1. The [join team](https://developers.ringcentral.com/api-reference/Teams/joinGlipTeam) and [leave team](https://developers.ringcentral.com/api-reference/Teams/leaveGlipTeam) endpoints can be called.
2. The [add team members](https://developers.ringcentral.com/api-reference/Teams/addGlipTeamMembers) and [remove team members](https://developers.ringcentral.com/api-reference/Teams/removeGlipTeamMembers) can be called. 

The join/leave endpoints work within the context of the currently authenticated user. Meaning if I authenticate to the API on behalf of user A, then calling these endpoints results exclusively in user A joining or leaving a team. 

The add/remove team members endpoints provides the means of adding anyone to a team, and to add/remove people in batch. Using this endpoint one can add people by ID or by email address. 

### Example: adding team members in batch

=== "Javascript"

    ```js
    {!> code-samples/team-messaging/add-team-members.js [ln:12-] !}
    ```
