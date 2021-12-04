class MainController < ActionController::Base
  require 'ringcentral'
  require 'dotenv/load'

  REDIRECT_URL = ENV['RC_REDIRECT_URL']

  $rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                         ENV['RC_CLIENRT_SECRET'],
                         ENV['RC_SERVER_URL'] )

  def login
    base_url = $rc.authorize_uri(REDIRECT_URL, "initialState")
    @authorize_uri = base_url
  end

  def oauth2callback
    auth_code = params[:code]
    $rc.authorize(username: nil, extension: nil, password: nil,
                  auth_code: auth_code, redirect_uri: REDIRECT_URL)
    # Save tokens to session
    session[:tokens] = $rc.token
    redirect_to "/main/test"
  end

  def callapis
    req = params[:api]
    api = req.split(/=/)
    if $rc.token == nil
      return redirect_to "/main/login"
    end

    if api[1] == 'extension'
      resp = $rc.get("/restapi/v1.0/account/~/extension")
    elsif api[1] == "extension-call-log"
      resp = $rc.get("/restapi/v1.0/account/~/extension/~/call-log")
    elsif api[1] == "account-call-log"
      resp = $rc.get("/restapi/v1.0/account/~/call-log")
    elsif api[0] == "logout"
      $rc.revoke()
      session[:tokens] = nil
      return redirect_to "/main/login"
    else
      return redirect_to "/main/test"
    end
    render({plain: resp.body})
  end
end
