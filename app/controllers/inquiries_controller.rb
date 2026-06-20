class InquiriesController < ApplicationController

    def new
    @inquiry = Inquiry.new
    end

    def create
    @inquiry = Inquiry.new(inquiry_params)

    if @inquiry.save
      redirect_to root_path, notice: "Inquiry submitted successfully."
    else
      render :new, status: :unprocessable_entity
    end
    end

  private

  def inquiry_params
    params.require(:inquiry).permit(
      :name,
      :email,
      :message
    )
  end
end
