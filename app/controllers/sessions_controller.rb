class SessionsController < ApplicationController
  def new
  end

  # Redirects if a user is logged in and tries to access these pages
  before_action :logged_in, only: [:create, :new]

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to '/welcome/index', notice: "You are logged in, welcome!"
    else
      flash.now[:alert] = "Email or password is invalid"
      render "new"
    end
  end
  def destroy
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out!"
  end
end
