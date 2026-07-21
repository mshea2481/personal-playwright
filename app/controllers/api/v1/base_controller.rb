module Api
  module V1
    class BaseController < ApplicationController
      skip_before_action :verify_authenticity_token, raise: false

      before_action :authenticate_admin!

      private

      def authenticate_admin!
        unless session[:user_id] && User.exists?(session[:user_id])
          render json: { error: "Unauthorized" }, status: :unauthorized
        end
      end
    end
  end
end