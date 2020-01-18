class ApplicationController < ActionController::Base

  # Protection from hackers
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  # Helper methods
  helper_method [:current_user]
  helper_method [:logs]
  helper_method [:user_headaches]
  helper_method [:user_chocolate]
  helper_method [:user_dehydrated]
  helper_method [:user_alcohol]
  helper_method [:user_overeating]
  helper_method [:user_stressed]
  helper_method [:user_sleep]
  helper_method [:user_lights]
  helper_method [:user_eye_strain]
  helper_method [:user_exercise]
  helper_method [:user_period]
  helper_method [:user_medicine]
  helper_method [:user_medicine_helped]
  helper_method [:customized]

  # Get the current user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Determine if a user has customized their triggers
  def customized
    @customized ||= Log_customization.where(:userid => current_user.id).count
  end

  # Get the total number of headaches logged by this user
  def user_headaches
    @user_headaches ||= Logs.where(:userid => current_user.id).count
  end

  # Get the total number of each symptom for the current user
  def user_chocolate
    @user_chocolate ||= Logs.where(:userid => current_user.id, :chocolate => true).count
  end

  def user_dehydrated
    @user_dehydrated ||= Logs.where(:userid => current_user.id, :dehydration => true).count
  end

  def user_alcohol
    @user_alcohol ||= Logs.where(:userid => current_user.id, :alcohol => true).count
  end

  def user_overeating
    @user_overeating ||= Logs.where(:userid => current_user.id, :overeating => true).count
  end

  def user_stressed
    @user_stressed ||= Logs.where(:userid => current_user.id, :stress => true).count
  end

  def user_sleep
    @user_sleep ||= Logs.where(:userid => current_user.id, :sleep => true).count
  end

  def user_lights
    @user_lights ||= Logs.where(:userid => current_user.id, :lights => true).count
  end

  def user_eye_strain
    @user_eye_strain ||= Logs.where(:userid => current_user.id, :eye_strain => true).count
  end

  def user_exercise
    @user_exercise ||= Logs.where(:userid => current_user.id, :exercise => true).count
  end

  def user_period
    @user_period ||= Logs.where(:userid => current_user.id, :period => true).count
  end

  def user_medicine
    @user_medicine ||= Logs.where(:userid => current_user.id).where.not(:medicine => "").count
  end

  def user_medicine_helped
    @user_medicine_helped ||= Logs.where(:userid => current_user.id, :medicine_helped => true).count
  end

  # Method to require users to be logged in before accessing certain pages, redirects to login pages and flashes error messages if they are not logged in
    def require_user
      redirect_to '/login' unless current_user
      flash[:danger] = 'Please log in first.'
    end

    # Method to require admin login (me) before certain pages can be viewed #
    def require_admin
      redirect_to '/login' unless current_user
      flash[:danger] = 'You must be an admin to view this page.'
    end

    # Method to require admin login (me) before certain pages can be viewed #
    def require_admin_id
      redirect_to '/login' if current_user.id != 10
      flash[:danger] = 'You must be an admin to view this page.'
    end

    # Redirects users to their home page if they are logged in and try to access certain pages
    def logged_in
      redirect_to '/home/index' unless !current_user
    end

end
