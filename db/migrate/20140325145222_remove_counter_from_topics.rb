class RemoveCounterFromTopics < ActiveRecord::Migration
  def change
    change_table :topics do |t|
      t.remove :counter
    end
  end
end
