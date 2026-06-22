class Admin::BaseController < ApplicationController
  before_action :require_admin_login

  private

  def require_admin_login
    unless session[:admin_logged_in]
      redirect_to admin_login_path, alert: "Please log in to continue."
    end
  end
end
