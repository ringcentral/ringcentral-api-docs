require 'sinatra'
set :port, 5000
post '/webhook' do
    status 200
    headers('Content-Type' => 'application/json')
    headers('Validation-Token' => request.env['HTTP_VALIDATION_TOKEN'])
    if request.env['HTTP_VALIDATION_TOKEN']
      request.body.rewind
    end
    body = request.body.read
    puts body
    # do whatever with body
    body 'OK'
end
