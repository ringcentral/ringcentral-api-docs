# TODO list for interactive messaging documentation

* Update all code samples to use Adaptive Cards
* Document outgoing webhook responses
* Document outgoing webhook event structures
* Update posting.md with link to Post Message endpoint in API Reference
* Update screenshots for how to create a notification app
* Update landing page for team messaging
* Add screenshots to add-ins installation.md
* Update quick start guides with new "detailed instructions."
* Clarify differences between subscribing to bot events and interactive message events
  - Investigate consolidating bot and interactive messaging events to use the same URL
* Document asynchronous message updates
* Document uninstalling notification apps - removing incoming webhook URLs from external systems
* Remove bot frameworks page
* Have paco update sample bot apps with Adaptive Cards

# Questions

* When you post a response asynchronously, what OAuth token do I use?
* How do developers authorize/obtain an access key to update messages asynchronously? 
  (for notification apps only)

# New files to populate

* docs/team-messaging/adaptive-cards/containers.md
* docs/team-messaging/adaptive-cards/static-elements.md
* docs/team-messaging/adaptive-cards/input-elements.md
* docs/team-messaging/adaptive-cards/actions.md
* docs/team-messaging/adaptive-cards/outbound-webhooks.md
* docs/team-messaging/bots/events.md
* docs/team-messaging/events/interactive-messages.md
* docs/team-messaging/manual/permissions.md
* docs/team-messaging/posting/index.md

# Redirects to put in place
team-messaging/manual/node/ -> team-messaging/bots/node/
team-messaging/manual/local-bots/ -> team-messaging/bots/walkthrough/
team-messaging/manual/chats/ -> team-messaging/concepts/chats/
team-messaging/manual/conversations/ -> team-messaging/concepts/conversations/
team-messaging/manual/teams/ -> team-messaging/concepts/teams/
team-messaging/manual/events-posts/ -> team-messaging/events/posts/
team-messaging/manual/events-groups/ -> team-messaging/events/groups/
team-messaging/manual/events-incoming-webhooks/ -> team-messaging/events/incoming-webhooks/
team-messaging/manual/outgoing-webhooks/ -> team-messaging/events/outgoing-webhooks/
team-messaging/manual/testing-webhooks/ -> team-messaging/incoming-webhooks/debugging/
team-messaging/manual/formatting/ -> team-messaging/incoming-webhooks/posting-v1/
team-messaging/manual/webhook-posting/ -> team-messaging/incoming-webhooks/posting/
team-messaging/manual/webhook-service-providers/ -> team-messaging/incoming-webhooks/service-providers/
team-messaging/manual/webhook-creation/ -> team-messaging/incoming-webhooks/webhook-creation/
team-messaging/manual/webhook-posting.png -> team-messaging/incoming-webhooks/webhook-posting.png
team-messaging/manual/posting-cards/ -> team-messaging/posting/cards/
team-messaging/manual/attaching-files/ -> team-messaging/posting/file-uploads/
team-messaging/manual/posting-images/ -> team-messaging/posting/images/
team-messaging/manual/posting/ -> team-messaging/posting/rest-api/

