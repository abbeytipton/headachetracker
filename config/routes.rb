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

  # Log custom routes
  resources :log_customization, only: [:new, :create, :edit]
  get 'log_customization/create', :to => 'log_customization#new'
  get 'log_customization/edit', :to => 'log_customization#edit'

  # Graphs routes
  get 'graphs/index'
  resources :graphs


  # Graphs routes
  get 'home/index'
  resources :home

  # Home routes
  get 'welcome/index'

  # Edit Account
  get 'users/edit'

end
