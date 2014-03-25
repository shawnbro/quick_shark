class Journey < ActiveRecord::Base
  belongs_to :user
  has_many :tangents
  has_many :topics, through: :tangents
end
