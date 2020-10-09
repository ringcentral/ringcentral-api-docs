Rails.application.routes.draw do
  get 'main/login'
  get 'main/test'
  match '/main/:api' => 'main#callapis', via: :get
  match '/oauth2callback' => 'main#oauth2callback', via: :get
end
