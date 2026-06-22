class SessionsController < ApplicationController
  def new
    # renders the login form
  end

  def create
    admin_username = Rails.application.credentials.admin_username
    admin_password = Rails.application.credentials.admin_password

    if params[:username] == admin_username && params[:password] == admin_password
      session[:admin_logged_in] = true
      redirect_to admin_inquiries_path, notice: "Logged in successfully."
    else
      flash.now[:alert] = "Invalid username or password."
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session[:admin_logged_in] = nil
    redirect_to admin_login_path, notice: "Logged out."
  end
end
