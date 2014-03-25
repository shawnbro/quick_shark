class ChangeCreateTangents < ActiveRecord::Migration
  def change
    change_table :tangents do |t|
      t.remove_references(:journeys)
      t.remove_references(:topics)
      t.references :topic
      t.references :journey
    end
  end
end
