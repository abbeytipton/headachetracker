class AddCustom2ToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :custom2, :boolean
  end
end
