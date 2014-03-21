QuickShark::Application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  resources :users do
    resources :journeys, shallow: true
  end

  resources :topics
  
  get "/login", to: "session#new"
  post "/session", to: "session#create"
  delete "/session", to: "session#destroy"

  root "topics#new"

  get "/data", to: "topics#data"

  get "/journey_data", to: "journeys#journey_data"

  post "/add_topic", to: "topics#add_topic"
end
