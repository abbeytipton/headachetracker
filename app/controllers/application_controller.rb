class ApplicationController < ActionController::Base

  # Protection from hackers
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  # Helper methods
  helper_method [:current_user]
  helper_method [:logs]

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
