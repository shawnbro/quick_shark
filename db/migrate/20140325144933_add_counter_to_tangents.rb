class AddCounterToTangents < ActiveRecord::Migration
  def change
    change_table :tangents do |t|
      t.integer :counter
    end
  end
end
