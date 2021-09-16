# Postings tasks

Using tasks in RingCentral, teams can better assign action items following a meeting, keep track of personal to-do lists, or even sychronize project management tasks from external systems. Simply put, at the end of the day all of our lives can be boiled down to a set of tasks we are responsible for, and tasks in RingCentral team messaging cam help us keep track of it all. 

Using the RingCentral API, the creation and management of tasks can be completely automated. 

<img src="../task.png" class="img-fluid" style="max-width: 800px">

## Posting a task via the REST API

Select your preferred language below.

=== "Javascript"

    ```JavaScript
    {!> code-samples/team-messaging/post-task.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/team-messaging/post-task.py !}
    ```

=== "PHP"

    ```PHP
    {!> code-samples/team-messaging/post-task.php !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/team-messaging/post-task.rb !}
    ```

## Tasks Schema

Please consult our [API Reference for creating a task](https://developers.ringcentral.com/api-reference/Tasks/createTask) to learn more about the following options:

* start and due dates
* color and appearance
* task recurrence
* assignees
* attachments
* sections/categories

## Keep learning

Using the Tasks API you can do more than just create a task, you can also:

* [Listing tasks in a chat](https://developers.ringcentral.com/api-reference/Tasks/listChatTasks)
* [Update](https://developers.ringcentral.com/api-reference/Tasks/patchTask) and [delete](https://developers.ringcentral.com/api-reference/Tasks/deleteTask) tasks
* [Mark a task as completed](https://developers.ringcentral.com/api-reference/Tasks/completeTask)
