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
  get "/definitions", to: "topics#definition"
  get "/description", to: "topics#description"
  get "/pictures", to: "topics#pictures"
  get "/stats", to: "topics#stats"

  post "/add_topic", to: "topics#add_topic"

  get "/ytdata", to: "topics#ytdata"

end
