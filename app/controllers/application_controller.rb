class ApplicationController < ActionController::Base

  # Protection from hackers
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  # Helper methods
  helper_method [:current_user]
  helper_method [:logs]

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
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
