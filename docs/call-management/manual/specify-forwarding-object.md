# Call Forwarding Object

The call handling can be any of the following actions:

* forwarding: re-route an incoming call to multiple phone numbers in a specific order with greeting settings apply.

* `notifyMySoftPhones`: set 'True' or 'False' to specify if the user's soft-phone(s) are notified before forwarding the incoming call to desk phones and forwarding numbers.
* `notifyAdminSoftPhones`: set 'True' or 'False' to specify if the administrator's soft-phone is notified before forwarding the incoming call to desk phones and forwarding numbers. The default value is 'False'
* `softPhonesRingCount`: specifies number of rings before forwarding starts
* `rules`:
    - `index`:
    - `ringCount`:
    - `enabled`:
    - `forwardingNumbers`:
        - `uri`:
        - `id`:

### Sample code to create a user custom answering rule

The following code sample shows how to create a user custom answering rule, which will re-route all incoming calls to a voice mailbox during the user's weekly meeting times on Monday and Friday.

```json

```
