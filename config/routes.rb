Rails.application.routes.draw do
  resources :inquiries, only: [:new, :create]
  get "home" => "pages#home", as: :home
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  root "pages#home"
  get "coolpage" => "pages#coolpage", as: :coolpage
  get "about" => "pages#about", as: :about
  get "contact" => "pages#contact", as: :contact
  get "portfolio" => "pages#portfolio", as: :portfolio
  get "resume" => "pages#resume", as: :resume
  get "testimonials" => "pages#testimonials", as: :testimonials
    # Admin auth
  get    "admin/login"  => "sessions#new",     as: :admin_login
  post   "admin/login"  => "sessions#create",  as: :admin_login_create
  delete "admin/logout" => "sessions#destroy", as: :admin_logout

  # Admin area
  namespace :admin do
    resources :inquiries, only: [:index]
  end
end
