module Api
  module V1
    class InquiriesController < BaseController
      # Allow anyone to submit an inquiry without an admin session
      skip_before_action :authenticate_admin!, only: [:create]
    
      # POST /api/v1/inquiries
      def create
        inquiry = Inquiry.new(inquiry_params)

        if inquiry.save
          render json: inquiry, status: :created
        else
          render json: { errors: inquiry.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActionController::ParameterMissing => e
        render json: { error: e.message }, status: :bad_request
      end

      def index
        render json: Inquiry.order(created_at: :desc)
      end

      def show
        render json: Inquiry.find(params[:id])
      end

      def destroy
        Inquiry.find(params[:id]).destroy!
        head :no_content
      end

      private

      def inquiry_params
        params.require(:inquiry).permit(:name, :email, :phone, :message)
      end
    end
  end
end