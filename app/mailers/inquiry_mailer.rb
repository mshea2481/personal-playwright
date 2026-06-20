class InquiryMailer < ApplicationMailer
    def new_inquiry(inquiry)
    @inquiry = inquiry

    mail(
      to: "you@yourcompany.com",
      subject: "New Inquiry Received"
    )
  end

  if @inquiry.save
  InquiryMailer.new_inquiry(@inquiry).deliver_later
  redirect_to root_path, notice: "Inquiry submitted successfully."
  
end
