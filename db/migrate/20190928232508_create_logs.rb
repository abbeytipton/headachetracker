class CreateLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :logs do |t|
      t.integer :userid
      t.datetime :date_started
      t.datetime :date_ended
      t.boolean :period
      t.boolean :dehydration
      t.boolean :exercise
      t.boolean :eye_strain
      t.boolean :lights
      t.boolean :sleep
      t.boolean :stress
      t.boolean :overeating
      t.string :medicine
      t.boolean :medicine_helped
      t.boolean :weather
      t.boolean :alcohol
      t.boolean :chocolate

      t.timestamps
    end
  end
end
