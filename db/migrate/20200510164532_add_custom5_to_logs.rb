class AddCustom5ToLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :logs, :custom5, :boolean
  end
end
