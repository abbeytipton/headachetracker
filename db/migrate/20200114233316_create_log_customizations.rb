class CreateLogCustomizations < ActiveRecord::Migration[5.2]
  def change
    create_table :log_customizations do |t|
      t.integer :userID
      t.boolean :trigger1
      t.string :trigger1Name
      t.boolean :trigger2
      t.string :trigger2Name
      t.boolean :trigger3
      t.string :trigger3Name
      t.boolean :trigger4
      t.string :trigger4Name
      t.boolean :trigger5
      t.string :trigger5Name
      t.string :trigger6
      t.string :boolean
      t.string :trigger6Name
      t.boolean :trigger7
      t.string :trigger7Name
      t.boolean :trigger8
      t.string :trigger8Name
      t.boolean :trigger9
      t.string :trigger9Name
      t.boolean :trigger10
      t.string :trigger10Name
      t.boolean :alcohol
      t.boolean :overeating
      t.boolean :stress
      t.boolean :sleep
      t.boolean :lights
      t.boolean :eyestrain
      t.boolean :exercise
      t.boolean :period
      t.boolean :chocolate
      t.boolean :dehydrated
      t.boolean :medicine

      t.timestamps
    end
  end
end
