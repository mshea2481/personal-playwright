class ContactMessagesController < ApplicationController
  def create
    @contact_message = ContactMessage.new(contact_message_params)

    if @contact_message.save
      redirect_to contact_path, notice: "Thanks! I'll get back to you soon."
    else
      render "pages/contact", status: :unprocessable_entity
    end
  end

  private

  def contact_message_params
    params.require(:contact_message)
          .permit(:name, :email, :subject, :message)
  end
end
