# Introduction to the RingCentral Video REST API

{! docs/video/beta-notice.md !}

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">See the RingCentral Video REST API in action!</h3>
  <p class="lead">The RingCentral Video API gives developers the ability to create and schedule meetings, as well as to access meeting history and recordings.</p>
  <p>We invite all developers to check out the RingCentral Video API by looking at a simple app to schedule a meeting in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
<!--  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>-->
  <a href="https://god.postman.co/run-collection/e021788b7335a0ba15ec?action=collection%2Fimport#?env%5BRC%20PasswordFlow%20(Sharable)%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6InBsYXRmb3JtLnJpbmdjZW50cmFsLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJSQ19BUFBfS0VZIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJSQ19BUFBfU0VDUkVUIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Mn0seyJrZXkiOiJSQ19VU0VSTkFNRSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjN9LHsia2V5IjoiUkNfRVhURU5TSU9OIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6NH0seyJrZXkiOiJSQ19QQVNTV09SRCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjV9LHsia2V5IjoibXlfYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Nn0seyJrZXkiOiJiYXNpY19hdXRoX2hlYWRlciIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjd9XQ==" class="btn btn-light qs-link">Postman &raquo;</a>
</div>

## Getting started using the Video REST API

Use the following quick steps to get started.

#### 1. If you are not an existing RingCentral customer, create a free RingCentral Video Pro account 

To build with the RingCentral Video API, you need a RingCentral Video Pro account, as **our "free developer account" does not support RingCentral Video**. If you do not have one, [create a free RingCentral account](https://app.ringcentral.com/signup) now.

#### 2. Create an application

Login to the [Developer Console](https://developers.ringcentral.com/login.html#/) and create an app with all the permissions you will need, or click the "Create Video App" button below. 
    
<a target="_new" href="https://developer.ringcentral.com/new-app?name=Video+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+video+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Video App</a>

#### 3. Contact us to graduate your app to production

During our beta program, access to the API is carefully controlled, and there is also no developer sandbox support. Therefore, in order to develop an app, RingCentral will need to add a private application scope to your application, and manually provision production credentials to it. To initiate this process, all developers will need to provide us with their application's client ID so that we can facilitate this request. Please submit a request via the button below:
    
<a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>

