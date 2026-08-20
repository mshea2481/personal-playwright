class InquiryMailer < ApplicationMailer
    def new_inquiry(inquiry)
    @inquiry = inquiry

    mail(
      to: "you@yourcompany.com",
      subject: "New Inquiry Received"
    )
  end
end


