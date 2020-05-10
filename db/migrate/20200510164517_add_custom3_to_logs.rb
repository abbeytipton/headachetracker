class AddCustom3ToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :custom3, :boolean
  end
end
