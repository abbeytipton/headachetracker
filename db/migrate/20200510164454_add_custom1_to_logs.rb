class AddCustom1ToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :custom1, :boolean
  end
end
