class Tangent < ActiveRecord::Base
  belongs_to :journey
  belongs_to :topic

  validates :journey, :topic, presence: true
  validates :counter, presence: true, on: :update

  def duration
    end_time = next_tangent.try(:created_at) || journey.updated_at

    (end_time - self.created_at).to_i
  end

  def next_tangent
    journey.tangents.where("created_at > ?", self.created_at).order("created_at").first
  end
end
