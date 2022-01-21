no_breadcrumb:true

## API Structure: 

### API Rate Limits

Line of Business Analytics APIs belongs to "Light" API [Rate Limit Group](https://developers.ringcentral.com/api-reference/Usage-Plan-Groups).

### Call performance aggregate API:

#### API Endpoint: `/analytics/phone/performance/v1/accounts/{accountId}/calls/aggregate`

This API allows users to get the aggregation of calls count (counter) and time spent (timer) on calls for specified data scopes.

For example, this end point will provide aggregated data for specified grouping over the period of time . Like sum of Answered calls by users for the period of entire week 

Request:
Grouping - Allows users to specify data scope. All the data retrieved will represent the portion of the calls that involved the specified GroupBy type. GroupBy types cannot be mixed in one request, there can only be one type. In API request structure, it can be specified in groupby section on top


