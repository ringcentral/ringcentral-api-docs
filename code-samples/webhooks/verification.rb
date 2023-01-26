require 'sinatra'

post '/webhook' do
  v = request.env['HTTP_VALIDATION_TOKEN']
  unless v.nil? || v.length == 0
    headers['Validation-Token'] = v
    return
  end
end
