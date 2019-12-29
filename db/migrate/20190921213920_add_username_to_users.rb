class AddUsernameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :string
    add_column :username, :string
  end
end
