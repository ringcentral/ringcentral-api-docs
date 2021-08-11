no_breadcrumb:true

## API Definition

The RingCentral Call Performance API is HTTP/HTTPS-based RESTful APIs that accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs. It is defined with the following aspects :

BASE URI : `https://platform.ringcentral.com`

HTTP METHOD : `POST`

END POINT : `/restapi/v1.0/account/{accountId}/analytics/performance/calls/aggregate`

##### See the [API Reference](../swagger-api-ref.html) for more information.

### API Rate Limits

This API belongs to "Light" API Rate Limit Group. For more information please reference this [document.](https://developers.ringcentral.com/api-reference/Usage-Plan-Groups)

### Error Handling

We recommend writing your application code that tests for all use cases and gracefully handles all possible API exceptions and errors. For more information refer to the [troubleshooting guide](../troubleshooting/)