class Admin::ContactMessagesController < Admin::BaseController
  def index
    @contact_messages = ContactMessage.order(created_at: :desc)
  end
end