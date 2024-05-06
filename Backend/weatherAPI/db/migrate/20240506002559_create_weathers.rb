class CreateWeathers < ActiveRecord::Migration[7.1]
  def change
    create_table :weathers do |t|
      t.string :location
      t.date :date
      t.float :max_temperature
      t.float :min_temperature
      t.float :precipitation
      t.integer :daylight_duration
      
      t.timestamps
    end
  end
end
