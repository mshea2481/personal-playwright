class SessionsController < ApplicationController
  def new
    # renders the login form
  end

  def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      respond_to do |format|
        format.html { redirect_to admin_inquiries_path, notice: "Logged in successfully." }
        format.json { render json: { status: "ok"}, status: :ok }
      end
    else
      respond_to do |format|
        format.html do
          flash.now[:alert] = "Invalid username or password."
          render :new, status: :unprocessable_entity
        end
        format.json { render json: { error: "Invalid username or password" }, status: "unauthorized" }
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to admin_login_path, notice: "Logged out."
  end
end
