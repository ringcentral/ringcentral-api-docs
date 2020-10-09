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
