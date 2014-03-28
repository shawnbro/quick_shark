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


  # # PJ: Below is a suggeseted direction for your routes, to make them fit a more 
  # # RESTful convention. For more, see: http://guides.rubyonrails.org/routing.html
  
  # # your groups interface is very simple, and you got it mostly right...
  # root "topics#new"

  # resource  :session, only: [:new, :create, :destroy] # singular resource, maybe not with new

  # resources :users, shallow: true do
  #   resources :journeys do
  #     resources :tangents, only: [:create, :show]
  #   end
  # end

  # # this can be for future features, actually unnecessary now...
  # # resources :topics, only: [:index, :show]

  # # above, when you're getting data, definition, description, pictures, stats, and ytdata
  # # you should just be loading that from the tangent#show onto the page in the first place,
  # # if that content is then loaded by the browser asynchronously
end
