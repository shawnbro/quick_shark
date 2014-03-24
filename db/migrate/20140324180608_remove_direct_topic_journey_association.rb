class RemoveDirectTopicJourneyAssociation < ActiveRecord::Migration
  def change 
    change_table :topics do |t|
      t.remove_references(:journey)
    end
  end
end
