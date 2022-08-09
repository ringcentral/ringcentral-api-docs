# SMS Sending Numbers

RingCentral numbers have SMS and MMS capabilities depending on the account plan. Users can send and receive SMS from enabled phone numbers assigned to their extension. The operator extension can further send and receive SMS from the Main Company Number. See more below on using the Main Company Number.

Phone numbers can have different capabilities determined by the presence of the following values in the `features` property of the Phone Number info object:

| Feature | Description |
|-|-|
| `SmsSender` | send and receive regular texts |
| `A2PSmsSender` | send and receive high volume SMS. To be used with the `a2p-sms` APIs |
| `MmsSender` | send and receive group texts and files |
| `InternationalSmsSender` | send and receive regular texts to international numbers |