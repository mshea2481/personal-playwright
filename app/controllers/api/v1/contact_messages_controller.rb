module Api
  module V1
    class ContactMessagesController < BaseController
      skip_before_action :authenticate_admin!, only: [:create]
      before_action :set_contact_message, only: [:show, :destroy]

      def index
        contact_messages = ContactMessage.order(created_at: :desc)
        render json: contact_messages, status: :ok
      end

      def show
        render json: @contact_message, status: :ok
      end

      def create
        contact_message = ContactMessage.new(contact_message_params)

        if contact_message.save
          render json: contact_message, status: :created
        else
          render json: { errors: contact_message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @contact_message.destroy
        head :no_content
      end

      private

      def set_contact_message
        @contact_message = ContactMessage.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Contact message not found" }, status: :not_found
      end

      def contact_message_params
        params.require(:contact_message).permit(:name, :email, :message)
      end
    end
  end
end