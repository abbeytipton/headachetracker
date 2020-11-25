class UsersController < ApplicationController
  #set_primary_key :id
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # Require admin login (me) before users can access this page #
  before_action :require_admin, only: [:index]

  # Require admin login (me) before users can access this page #
  before_action :require_admin_id, only: [:index]

  # Redirects if a user is logged in and tries to access these pages
  before_action :logged_in, only: [:new, :index]

  def index
    @users = User.all
  end

  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    respond_to do |format|
      # If user is created successfully, then redirect to the user index #
      if @user.save
        session[:user_id] = @user.id
        format.html { redirect_to '/welcome/index' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  private
    def set_user
      @user = current_user
    end

    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end
end
