require 'sinatra'
set :port, 5000
post '/' do
    status 200
    headers('Validation-Token' => request.env['HTTP_VALIDATION_TOKEN']) if request.env['HTTP_VALIDATION_TOKEN']
    request.body.rewind
    body = request.body.read
    puts body
    # do whatever with body
    body 'OK'
end
