Rails.application.routes.draw do

  get 'log_customization/new'
  get 'log_customization/create'
  get 'log_customization_controller/new'
  get 'log_customization_controller/create'
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
  get 'log_customization/create'
  resources :logcustomizations
  get 'newlogcustomization', to: 'logcustomization#new', as: 'newlogcustomization'

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
