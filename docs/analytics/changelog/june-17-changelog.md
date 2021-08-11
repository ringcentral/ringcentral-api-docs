no_breadcrumb:true

## Announcements

Call Performance API is available only to private beta developers and partners 🎉

Note: Please be aware going forward, current API endpoint may change, any changes will be mentioned in this section.

### What's new ?

Private Beta Launch :  June 17, 2021

### Known Issues

- Ring Groups and Shared Line Groups are not supported in this release
- Aggregation functions, Avg, Min, Max are not functional at the time of the release, will be made available soon after the release
- Some call scenarios are currently resulting in the call not getting accounted for in calculations, they are; 
    - Internal calls between two RingCentral extensions where the caller puts the call on hold and transfers the call
    - Some cases of call parking, exact scenarios are under investigation
- DTMF Transfers where users can input some shortcut codes to perform a transfer, are currently not supported and hence won’t be accounted for in count of transfers.



