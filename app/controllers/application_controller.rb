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
  helper_method [:customized_redirect]
  helper_method [:include_chocolate]
  helper_method [:include_period]
  helper_method [:include_dehydrated]
  helper_method [:include_alcohol]
  helper_method [:include_overeating]
  helper_method [:include_stress]
  helper_method [:include_sleep]
  helper_method [:include_lights]
  helper_method [:include_eyestrain]
  helper_method [:include_exercise]
  helper_method [:include_medicine]
  helper_method [:include_trigger1]
  helper_method [:user_trigger1]
  helper_method [:include_trigger2]
  helper_method [:user_trigger2]
  helper_method [:include_trigger3]
  helper_method [:user_trigger3]
  helper_method [:include_trigger4]
  helper_method [:user_trigger4]
  helper_method [:include_trigger5]
  helper_method [:user_trigger5]

  # Get the current user
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Determine if a user has customized their triggers
  def customized
    @customized ||= LogCustomization.where(:userID => current_user.id).count
  end

  # Get the total number of headaches logged by this user
  def user_headaches
    @user_headaches ||= Logs.where(:userid => current_user.id).count
  end

  # Get whether the user wants each of the symptoms/custom triggers to show
  def include_chocolate
    @include_chocolate ||= LogCustomization.where(:userID => current_user.id, :chocolate => true).count
  end

  def include_period
    @include_period ||= LogCustomization.where(:userID => current_user.id, :period => true).count
  end

  def include_exercise
    @include_exercise ||= LogCustomization.where(:userID => current_user.id, :exercise => true).count
  end

  def include_eyestrain
    @include_eyestrain ||= LogCustomization.where(:userID => current_user.id, :eyestrain => true).count
  end

  def include_lights
    @include_lights ||= LogCustomization.where(:userID => current_user.id, :lights => true).count
  end

  def include_sleep
    @include_sleep ||= LogCustomization.where(:userID => current_user.id, :sleep => true).count
  end

  def include_stress
    @include_stress ||= LogCustomization.where(:userID => current_user.id, :stress => true).count
  end

  def include_overeating
    @include_overeating ||= LogCustomization.where(:userID => current_user.id, :overeating => true).count
  end

  def include_alcohol
    @include_alcohol ||= LogCustomization.where(:userID => current_user.id, :alcohol => true).count
  end

  def include_dehydrated
    @include_dehydrated ||= LogCustomization.where(:userID => current_user.id, :dehydrated => true).count
  end

  def include_medicine
    @include_medicine ||= LogCustomization.where(:userID => current_user.id, :medicine => true).count
  end

  def include_trigger1
    @include_trigger1 ||= LogCustomization.where(:userID => current_user.id, :trigger1 => true).count
  end

  def user_trigger1
    @user_trigger1 ||= LogCustomization.where(:userID => current_user.id).pluck(:trigger1Name).flatten.join(' ')
  end

  def include_trigger2
    @include_trigger2 ||= LogCustomization.where(:userID => current_user.id, :trigger2 => true).count
  end

  def user_trigger2
    @user_trigger2 ||= LogCustomization.where(:userID => current_user.id).pluck(:trigger2Name).flatten.join(' ')
  end

  def include_trigger3
    @include_trigger3 ||= LogCustomization.where(:userID => current_user.id, :trigger3 => true).count
  end

  def user_trigger3
    @user_trigger3 ||= LogCustomization.where(:userID => current_user.id).pluck(:trigger3Name).flatten.join(' ')
  end

  def include_trigger4
    @include_trigger4 ||= LogCustomization.where(:userID => current_user.id, :trigger4 => true).count
  end

  def user_trigger4
    @user_trigger4 ||= LogCustomization.where(:userID => current_user.id).pluck(:trigger4Name).flatten.join(' ')
  end

  def include_trigger5
    @include_trigger5 ||= LogCustomization.where(:userID => current_user.id, :trigger5 => true).count
  end

  def user_trigger5
    @user_trigger5 ||= LogCustomization.where(:userID => current_user.id).pluck(:trigger5Name).flatten.join(' ')
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
