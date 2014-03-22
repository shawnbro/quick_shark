class AddCounterToTopics < ActiveRecord::Migration
  def change
    change_table :topics do |t|
      t.integer :counter
    end
  end
end
