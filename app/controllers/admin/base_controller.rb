class Admin::BaseController < ApplicationController
  before_action :require_admin_login

  private

  def require_admin_login
    unless session[:user_id] && User.exists?(session[:user_id])
      redirect_to admin_login_path, alert: "Please log in to continue."
    end
  end
end
