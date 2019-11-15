class ApplicationController < ActionController::Base

  # Protection from hackers
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  # Helper methods
  helper_method [:current_user]
  helper_method [:logs]

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Method to require teacher users to be logged in before accessing certain pages, redirects to their login pages and flashes error messages if they are not logged in
    def require_user
      redirect_to '/login' unless current_user
      flash[:danger] = 'Please log in first.'
    end

end
