class Tangent < ActiveRecord::Base
  belongs_to :journey
  belongs_to :topic

  validates :journey, :topic, presence: true
  validates :counter, presence: true, on: :update
end
