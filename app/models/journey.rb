class Journey < ActiveRecord::Base
  belongs_to :user
  has_many :topics
end
