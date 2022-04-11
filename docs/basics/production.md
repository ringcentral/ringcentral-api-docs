# Obtaining production app credentials

When you are finished developing your application, and ready to deploy the app to the RingCentral production environment, you will need to go through our "app graduation process" to obtain the credentials your app will need in production. 

## What is the graduation process?

The RingCentral app graduation process is a proving ground where apps demonstrate their reliability and quality prior to being allowed to operate in our production environment and given access to live customer data (with proper authorization from customers of course). By requiring apps to go through this process, we elevate the quality of all apps on the platform, heighten customer trust in the apps they use, and reduce risk to the platform as a whole. 

## What can I do to ensure a smooth graduation process?

The app graduation process is a requirement for all apps. Developers wrapping up their development work can be anxious to deploy to production. However, haste can lead to frustration, especially for developers who have not properly prepared for the process. 

Therefore, before you embark on the graduation process, take a moment to prepare your application in the following ways if you can to help expedite the graduation process. 

* **Create unit tests**. 
    Perhaps the single best thing you can do for your application is the creation of a set of automated tests that will collectively call each of the API endpoints used by your application. This will guarantee that each of the scopes used by your app will be properly utilized. 

* **Consider waiting a day or two before starting**.
    When evaluating an app for graduation, we look back to the last 48 hours of API activity. If you have just completed the development process and were recently actively debugging your app, there is a high likelihood that a large number of errors may have been triggered in the last 48 hours. If your error to success ratio is too high, your app will not be permitted to gradute. Waiting a day or two to initiate the graduation process will allow many of those errors to be naturally excluded from our evaluation. 

* **Complete a full round of QA prior to graduation**.
    In order to successfully graduate an app, that application needs to make a minimum number of API calls. Doing a full round of QA just prior to graduation should in most circumstances result in the requisite number of API calls being made. Furthermore, it should also decrease the error to success ratio, further demonstrating the reliability of your application.

## How does graduation work?

!!! warning "Graduation analytics not updated in real-time"
    Please be aware that historical API call data is not updated in real-time. Some developers have reported API call history data taking longer to update than stated. This is a known issue which we are working on a solution for. In the meantime, please consult the section above, "What can I do to ensure a smooth graduation process," to reduce frustration and successfully graduate your app.

### Graduation requirements

All apps must meet the following graduation criteria prior to obtaining production credentials. 

1. All apps must successfully make more than 20 non-authentication related API calls in the last 48 hours.
2. All apps must successfully call each API endpoint used by their application at last 5 times in the last 48 hours.
3. All apps must utilize every app scope declared by their application in the last 48 hours.
4. Authentication errors must account for less than 5% of overall API traffic. 

Once you meet the above criteria, you should start the graduation process.

### Step 1: Apply for Production

Click the 'Apply for production' button as soon as your app meets all graduation requirements which cover the **last two days** (UTC timezone) &#x2014; yesterday and today. You can see what requirements you currently satisfy by consulting the Status &amp; Review section:
    
<img class="img-fluid" src="../../img/console-status-review.png" style="max-width: 500px">

### Step 2: Review and approval by a RingCentral staff member

Upon clicking the "Apply for Production" button, your app will be queued for review by our team. A RingCentral staff member will then review your application. Reviews are conducted Monday-Friday, for each prior business day's production application requests. Weekend and holiday requests will be reviewed the next available business day.

!!! tip "Public apps may take longer to graduate"
    Public apps undergo more rigorous testing and review since they can be distributed to many RingCentral accounts. To ensure a smooth review process:
    
    * Include a full and comprehensive description of your app in the app settings screen.
    * Compose an app profile for our App Gallery and include at least two screenshots when applicable. 
    * Thoroughly test your application.

### Step 3. Update your app's settings and deploy to production

Once your app is approved for production, you will receive an email. After that, make sure to change API server URLs and credentials you have been using for sandbox development to production ones (see Credentials section), and you are all ready to go!

## Troubleshooting app graduation issues

### The analytics for my app do not appear to be updating and I can't graduate.

Developers have reported that API call history is sometimes not updated according to the schedule reported. This is a known issue for which a solution is being made. Eventually however, API call history will be updated. In the meantime, be patient and plan for app graduation to take 2-3 days to complete. 

### How do I meet the API minimum call volume requirement?

Your app is required to make at least 20 successful API calls AND it must call each endpoint 5 times. Here is an example of how this is calculated.

Suppose your app uses only two endpoints:

* `.../extension/{extensionId}/call-log`
* `.../extension/{extensionId}/presence`

You will need to make 5+ successful requests to each of these endpoints within the last two days, and the total number of requests within these two days should be at least 20. Let's say yesterday you have made 3 requests to the `call-log` endpoint, and 3 requests to `presence` endpoint. Then today you can make 2 requests to the `call-log` endpoint (to make it 5) and 12 requests to `presence` endpoint (to make it 20 in total) to pass.

!!! info "OAuth requests are not included in these API counts."

### How do I satisfy my app permission requirements?

We require your app to make API calls that collectively utilize all of the permissions (or app scopes) you have configured for your app. This means that your app must make at least one API call to each endpoint that exercises any given permission, while also satisfying all other API call requirments. 

If you find that you have inadvertently configured more permissions than your app requires, please remove the unused permissions from your app by editing its settings. Let's take a look at an example.

You have requested three permissions when you created your app: `ReadCallLog`, `SMS` and `ReadMessages`. After you have completed development, you realized that your app uses `SMS` and `ReadMessages` permissions, but you are not going to be using `ReadCallLog` permission in the first version of your app. To graduate your app, you should remove the `ReadCallLog` permission from your app and make at least one API call per each of the permissions you need (within the last two days).

