Rails.application.routes.draw do

  get 'graphs/index'
  # Sets up home page of entire app
  root 'home#index'

  # Users and sessions routes
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  # Logs routes
  get 'logs/index'
  resources :logs
  get 'newlog', to: 'logs#new', as: 'newlog'

  # Graphs routes
  get 'graphs/index'
  resources :graphs

end
