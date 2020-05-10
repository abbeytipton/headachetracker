class AddCustom4ToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :custom4, :boolean
  end
end
