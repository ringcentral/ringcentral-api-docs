require 'sinatra'
require 'json'

set :port, 3000
post '/webhook' do
    body = request.body.read
    jsonObj = JSON.parse(body)
    puts (jsonObj)
    status 200
    body 'OK'
end
