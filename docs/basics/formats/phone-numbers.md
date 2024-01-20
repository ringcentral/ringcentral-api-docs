# Phone number formats and e.164

The API supports phone numbers in [e.164](https://en.wikipedia.org/wiki/E.164) format with plus sign `+` complying with the [ITU-T recommendation](https://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164D-11-2011-PDF-E.pdf).
```json
"from" :
    {
      "phoneNumber" : "+16501234567",
      "name" : "John Smith"
    }
```

The phone number processing also conforms to country specific compliance requirements, such as the California Consumer Privacy Act (US), the General Data Protection Regulation (EU), etc. relating to personal data protection, e.g. masking numbers in call log API, that looks as follows:

```json
"to" :
   {
      "phoneNumber" : "+1855201XXXX",
      "name" : "Jane Williams"
    }
```
