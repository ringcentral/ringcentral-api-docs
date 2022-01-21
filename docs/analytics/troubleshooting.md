no_breadcrumb:true

# FAQs

### Is there an SDK for my favorite programming language ?

Yes, RingCentral offers developers a number of [SDKs for the most popular programming languages](../../sdks/). 

During our beta however, Java and C# programmers will need to call Analytics API endpoints directly. When this API is made available publicly, our Java and C# SDKs will be updated as well. 

### What permission does my application need to have ?

Your application needs to have 'Analytics' permission. If you are using an application that doesn't have that permission, you can reach out to our support team with your Application's Client ID and request 'Analytics' permission to be added.

### How is LOB Analytics API different than Call Log API ? 

Call Log API is suitable for hop by hop call analysis on individual call basis. Analtics API is suitable for aggregate call analysis. Analytics APIs also provide an easy way to filter out data by conditional logic such as filter calls on time spent in ringing, holds etc.

### Is there a limit on the number of API calls ?

Yes, Analytics APIs belongs to "Light" API [Rate Limit Group](https://developers.ringcentral.com/api-reference/Usage-Plan-Groups).

### I hard coded my credentials, how do I secure them safely ?

It’s important to keep credentials such as your RingCentral App ID and Auth token secure by storing them in a way that prevents unauthorized access. One common method is to store them in environment variables which are then accessed from your app. This keeps them out of code and other places where credentials don’t belong.

### How can I test the API quickly ?

You can use the [API Reference](https://developers.ringcentral.com/api-reference/analytics) to test the API in our API Explorer or [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/ec998118d5bd3d56e4b6?action=collection%2Fimport#?env%5BRC%20Sharable%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5kZXZ0ZXN0LnJpbmdjZW50cmFsLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoicGxhdGZvcm0uZGV2dGVzdC5yaW5nY2VudHJhbC5jb20iLCJzZXNzaW9uSW5kZXgiOjB9LHsia2V5IjoiUkNfQVBQX0tFWSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjF9LHsia2V5IjoiUkNfQVBQX1NFQ1JFVCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjJ9LHsia2V5IjoiUkNfVVNFUk5BTUUiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX0VYVEVOU0lPTiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjR9LHsia2V5IjoiUkNfUEFTU1dPUkQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjZ9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fV0=)
