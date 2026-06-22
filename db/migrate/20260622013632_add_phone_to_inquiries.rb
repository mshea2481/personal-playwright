class AddPhoneToInquiries < ActiveRecord::Migration[8.1]
  def change
    add_column :inquiries, :phone, :string
  end
end
