class Admin::InquiriesController < Admin::BaseController
  def index
    @inquiries = Inquiry.order(created_at: :desc)
    @contact_messages = ContactMessage.order(created_at: :desc)
  end
end
