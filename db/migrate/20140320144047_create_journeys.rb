class CreateJourneys < ActiveRecord::Migration
  def change
    create_table :journeys do |t|
      t.string :title
      t.references :user
      t.timestamps
    end
  end
end
