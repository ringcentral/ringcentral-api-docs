no_breadcrumb:true

# Authorization Flow Authentication - Ruby on Rails Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server/Web' for Platform Type.</li>
  </ul>
  </li>
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>ReadAccounts,ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authorization Flow

### Create a new Rails app and install the RingCentral Ruby SDK

```bash
$ rails new authorization-flow
$ cd authorization-flow
$ bundle add ringcentral-sdk
```

### Create a new controller

```bash
$ rails generate controller main login
```

Browse to the "app/controllers" folder and edit the <tt>main_controller.rb</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials.

```ruby
class MainController < ActionController::Base
  require 'ringcentral'

  RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
  RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
  RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
  RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

  $rcsdk = RingCentral.new(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);

  def login
    base_url = $rcsdk.authorize_uri(RINGCENTRAL_REDIRECT_URL, "initialState")
    @authorize_uri = base_url
  end

  def oauth2callback
    auth_code = params[:code]
    $rcsdk.authorize(username: nil, extension: nil, password: nil, auth_code: auth_code, redirect_uri: RINGCENTRAL_REDIRECT_URL)
    # Save tokens to session
    session[:tokens] = $rcsdk.token
    redirect_to "/main/test"
  end

  def callapis
    req = params[:api]
    api = req.split(/=/)
    if $rcsdk.token == nil
      return redirect_to "/main/login"
    end

    if api[1] == 'extension'
      resp = $rcsdk.get("/restapi/v1.0/account/~/extension")
    elsif api[1] == "extension-call-log"
      resp = $rcsdk.get("/restapi/v1.0/account/~/extension/~/call-log")
    elsif api[1] == "account-call-log"
      resp = $rcsdk.get("/restapi/v1.0/account/~/call-log")
    elsif api[0] == "logout"
      $rcsdk.revoke()
      session[:tokens] = nil
      return redirect_to "/main/login"
    else
      return redirect_to "/main/test"
    end
    render({plain: resp.body})
  end
end
```

### Edit the routes.rb file

Browse the the "config" folder and edit the file <tt>routes.rb</tt>

```ruby
Rails.application.routes.draw do
  get 'main/login'
  get 'main/test'
  match '/main/:api' => 'main#callapis', via: :get
  match '/oauth2callback' => 'main#oauth2callback', via: :get
end
```

### Implement a login page

Browse to the "app/views/main" folder and edit the <tt>login.html.erb</tt>.

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <title>RingCentral Authorization Code Flow Authentication</title>
  </head>
  <body>
    <h2>
        RingCentral Authorization Code Flow Authentication
    </h2>
    <a href="<%= @authorize_uri %>">Login RingCentral Account</a>
  </body>
</html>
```

### Implement a test page

```bask
$ rails generate controller main test
```

!!! warning "Do not overwrite the main_controller.rb"
    Answer "no" to the overwrite main_controller.rb confirmation!

Browse to the "app/views/main" folder and edit the <tt> test.html.erb</tt>.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
  <b><a href="logout">Logout</a></b>
  <h2>Call APIs</h2>
  <ul>
      <li><a href="api=extension">Read Extension Info</a></li>
      <li><a href="api=extension-call-log">Read Extension Call Log</a></li>
      <li><a href="api=account-call-log">Read Account Call Log</a></li>
  </ul>
</body>
</html>
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ bin/rails server -p 5000
```

Open a Web browser and load localhost:5000/main/login

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
