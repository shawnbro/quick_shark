class CreateTangents < ActiveRecord::Migration
  def change
    create_table :tangents do |t|
      t.references :topics
      t.references :journeys
      t.timestamps
    end
  end
end
